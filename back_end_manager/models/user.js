var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    name:{type:String,required:true},
    created:{type:Date,required:true}
});
module.exports=mongoose.model('User',userSchema,'users');