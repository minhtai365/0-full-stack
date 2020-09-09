var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("my-database");
  dbo.collection("product").findOne({pro_name:"Dusicyon thous"}, function(err, result) {
    if (err) throw err;
    console.log(result.pro_img);
    db.close();
  });
});


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
/* GET home page.
"start": "node ./bin/www" 
    */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Minh Tài nhé' });
});

module.exports = router;
