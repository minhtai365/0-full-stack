const mongoose=require('mongoose');

var Schema=mongoose.Schema;
var catelogySchema=new Schema({
    catelogy:{type:String,required:true},
    typeid:{
        type : Schema.Types.ObjectId,
        ref:'Type'
    }
})
module.exports=mongoose.model('Catelogy',catelogySchema);