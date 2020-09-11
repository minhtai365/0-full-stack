var express = require('express');
var router = express.Router();

//connect database
const mongoose = require('mongoose');
var Product = require('../models/product');

router.get('/', function (req, res, next) {
  
  res.render('index', { title: 'Minh Tài nhé' });
});
router.get('/product',function(req,res,next){
  Product.find(function(err,dt){
    console.log(dt.length);
    res.send(dt);
  });
})
module.exports = router;

// var MogoCl=require('mongodb').MongoClient;
// var url="mongodb://localhost:27017/";
// MogoCl.connect(url,function(err,db){
//   if(err) throw err;
//   var dt=db.db("my-database");
//   dt.collection("user").findOne({roleid:"1"},function(err,res){
//     if(err) throw err;
//     console.log(res.username);
//     dt.close();
//   })
// })