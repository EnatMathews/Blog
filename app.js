const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
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

app.post("/View", (req, res) => {
    let token = req.headers["token"];
    jwt.verify(token, "block-app", (error, decoded) => {
        if (error) {
            res.json({ status: "unauthorized user" });
        } else {
            if (decoded) {
                blockmodel.find()
                    .then((response) => {
                        res.json(response);
                    }).catch()
                }
            }
        })
    })




app.listen(8080,()=>{
    console.log("server running")
})