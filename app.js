const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const { blockmodel } = require("./models/block")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://Enat:EnatVibin@cluster0.ts1wpg0.mongodb.net/blockdb?retryWrites=true&w=majority&appName=Cluster0")


const generatedHashedPassword = async(password)=>{
const salt = await bcrypt.genSalt(10)
return bcrypt.hash(password,salt)
}




app.post("/Signup",async(req,res)=>{
    let input = req.body
    let hashedPassword = await generatedHashedPassword(input.pass)
    console.log(hashedPassword)
    input.pass = hashedPassword
    let block = new blockmodel(input)
    block.save()
    res.json({status:"success"})
})


app.post("/Signin",(res,req)=>{
  let input = req.body
  blockmodel.find({"email":req.body.email}).then(
    (response)=>{
       if (response.length>0) {
let dbPassword = response[0].pass
console.log(dbPassword)
        
       } else {
        res.json({status:"user not found"})
       }
    }
  ).catch()
})
app.listen(8080,()=>{
    console.log("server running")
})