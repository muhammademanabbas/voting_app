const express = require("express");
const router = express.Router();
const {jwtAuthMiddleware} = require("../jwt");
const candidate = require("../models/candidateSchema");
const user = require("../models/userSchema");


// check the admin role if the user is voter or admin
const checkAdminRole  =   async (userID)=>{
    try {
        const userData = await user.findById(userID)
        return userData.role ===  'admin'
    } catch (error) {
        return false;
    }
}

// admin can create a new candidate
router.post("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const adminRole =  await checkAdminRole(req.userDetail.id)
    if(!adminRole) return res.status(403).json({message:"User does not have the admin role"})

    const newCandidateData = new candidate(req.body)
    const response  =  await newCandidateData.save()

    res.status(200).json({"Candiate Saved" : response})
    
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

// admin can update the candidate informtion or detail
router.patch("/:id",jwtAuthMiddleware, async (req, res) => {
    
  try {
    const {id}  =  req.params;

    const adminRole =  await checkAdminRole(req.userDetail.id);
    if(!adminRole) return res.status(403).json({message:"User does not have the admin role"});

    const response = await candidate.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if(!response) return res.status(401).json({message:"No Candidate Found"});

      res.status(200).json(response);

  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

// admin can delete the candidate
router.delete("/:id",jwtAuthMiddleware, async (req, res) => {
    
  try {
    const {id}  =  req.params;

    const adminRole =  await checkAdminRole(req.userDetail.id);
    if(!adminRole) return res.status(403).json({message:"User does not have the admin role"});

    const response = await candidate.findByIdAndDelete(id, req.body);

      if(!response) return res.status(401).json({message:"No Candidate Found"});

      res.status(200).json({ message:"Candidate Deleted" , response});

  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

module.exports = router;