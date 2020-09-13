var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var productSchema=new Schema({
    imgPath:{type:String},
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    sale:{type:String},
    proNumber:{type:Number,required:true}
});
module.exports=mongoose.model('Product',productSchema);