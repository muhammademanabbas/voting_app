const bodyParser = require("body-parser")
const express  =  require("express")
const db  =  require("./db.js")
const userRoutes =  require("./routes/userRoutes.js")
const candidateRoutes =  require("./routes/candidateRoutes.js")
require("dotenv").config()
const app  = express()

// middlewares
app.use(bodyParser.json())

app.use("/user",userRoutes)
app.use("/candidate",candidateRoutes)

app.get("/",(req,res)=>{
    res.send("Vote App is Running")
})

app.listen(process.env.PORT || 3000 , ()=>{
    console.log("voting app server is running on this PORT ",process.env.PORT || 3000)
})