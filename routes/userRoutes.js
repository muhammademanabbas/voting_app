const express = require("express");
const router = express.Router();
const { generateToken, jwtAuthMiddleware } = require("../jwt");
const user = require("../models/userSchema");

router.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new user(userData);
    console.log("New User is: ", newUser);

    const response = await newUser.save();
    console.log("response is: ", response);

    const payload = {
      id: newUser.id,
    };

    console.log("payload is: ", payload);

    const token = generateToken(payload);
    console.log("token is: ", token);
    res.status(200).json({ Response: response, Token: token });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { CNIC, password } = req.body;

    const userData = await user.findOne({ CNIC: CNIC });
    if (!userData || !(await userData.comparePassword(password))) {
      return res.status(401).json({ credientials: "Invalid CNIC or password" });
    }

    const payload = {
      id: userData.id,
    };
    const token = generateToken(payload);
    return res.status(200).json({ Token: token });
  } catch (error) {
    console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/user/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!req.userDetail)
      res
        .status(401)
        .json({ Error: "Please Login first to access this route" });
    const userData = await user.findById(req.userDetail.id);
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});
router.patch("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      res.status(401).json({ message: "please fill all the fields" });

    const userData = await user.findById(req.userDetail.id);

    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user || !(await userData.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    userData.password = newPassword; // Assign the new password to the user object

    const response = await userData.save();
    res
      .status(200)
      .json({ message: "Password Updated", Response: response });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json({ Users: users });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

module.exports = router;