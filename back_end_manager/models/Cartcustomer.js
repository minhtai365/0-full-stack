var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Cartcustomer=new Schema({
    
    userid:{type:Schema.Types.ObjectId,ref:'User'},
    item:[{
    productid:{type:Schema.Types.ObjectId,ref:'Product'},
    qty:{type:Number,required:true},
    price:{type:String,required:true},
    buy:{type:String,required:true},
    name:{type:String,required:true}

    }],
    totalprice:{type:String,required:true}
});
module.exports=mongoose.model('Cartcustomer',Cartcustomer);