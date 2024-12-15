const bodyParser = require("body-parser")
const express  =  require("express")
require("dotenv").config()
const app  = express()

app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send("Vote App is Running")
})

app.listen(process.env.PORT || 3000 , ()=>{
    console.log("voting app running on this PORT ",process.env.PORT || 3000)
})