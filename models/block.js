const mongoose= require("mongoose")
const schema = mongoose.Schema(
    {

      "name":{type:String,required:true},
            "email":{type:String,required:true},
            "pass":{type:String,required:true}
            
    }
)
let blockmodel = mongoose.model("users",schema)
module.exports={blockmodel}