var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

process.env.MY_KEY = 'secret';
//connect database
const mongoose = require('mongoose');
var Product = require('../models/product');
var User = require('../models/user');

var Type = require('../models/type');
var Catelogies = require('../models/Catelogies');


router.get('/', function (req, res, next) {

  res.render('index', { title: 'Minh Tài nhé' });
});
router.get('/products', function (req, res, next) {
  Product.find(function (err, dt) {
    console.log(dt.length);
    res.send(dt);
  });
})
router.post('/addproducts',(req,res,next)=>{
  var now=new Date();
  var pro={
    title:req.body.title,
    description:req.body.description,
    price:req.body.price,
    sale:req.body.sale,
    proNumber:req.body.proNumber,
    imgPath:req.body.imgPath,
    catelogyid:req.body.catelogyid,
    created:now
  }
  Product.create(pro)
  .then(res.send('create ok'))
  .catch(res.send('fail'))
})
//end product
router.get('/user', function (req, res, next) {
  User.find(function (err, dt) {
    res.send(dt);
  })
})

//xóa
router.post('/remove', (req, res, next) => {
  const id = req.body.id;
  User.deleteOne({ _id: id })
    .then(resp => {
      res.send('remove ok');
    })
    .catch(
      Type.deleteOne({ _id: id })
        .then(resp => {
          deleteCate(id);
          res.send('remove ok');
        })
        .catch(err=>{
          deleteCate(id);
          deletePro(id);
        }
        )
    )
})
//dele catelogy
function deleteCate(id) {
  Catelogies.deleteOne({ _id: id })
    .then(resp => {
      res.send('remove ok');
    })
  Catelogies.deleteOne({ typeid: id })
    .then(resp => {
      res.send('remove ok');
    })
}
function deletePro(id){
  Product.deleteOne({_id:id})
  .then(resp=>{
    res.send("remove ok");
  })
}
//khóa user
router.post('/change', (req, res, next) => {
  User.findOne({ _id: req.body.id })
    .then(user => {
      if (user.role === '1') {
        res.send("fail");
      }
      else {
        var st = !user.status;
        User.updateOne({ _id: req.body.id }, [{ $set: { 'status': st } }])
          .then(re => {
            res.send('lock ok');
          })
          .catch(err => {

            res.send('fail');
          })
      }
    })
    .catch(err => {
      res.send('fail');
    })
})
//đăng ký
router.post('/register', (req, res) => {
  const now = new Date();
  const userdt = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: "0",
    status: true,
    created: now
  }
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userdt.password = hash;
          User.create(userdt)
            .then(user => {
              res.send(user.email)
            })
            .catch(err => {
              res.send('err ' + err)
            })

        })
      } else {
        res.send('exist');
      }

    })
    .catch(err => {
      res.send('err ' + err)
    })
})
//end user
//get type
router.get('/types', (req, res, next) => {
  Type.find((err, dt) => {
    res.send(dt)
  })
})
//create types
router.post('/addtypes', (req, res, next) => {
  var now = new Date;
  Type.create({
    typename: req.body.typename,
    created: now
  })
    .then(cre => {
      res.send('create ok');
    })
    .catch(err => {
      res.send('fail');
    });
});
//end types
//get catelogy
router.get('/catelogys', (req, res, next) => {
  Catelogies.find((err, resp) => {
    res.send(resp)
  })
})
//create catelogy
router.post('/addcatelogys', (req, res, next) => {
  console.log(req.body.typeid);

  var now = new Date;
  Catelogies.create({
    catelogy: req.body.catelogy,
    typeid: req.body.typeid,
    typename: "phụ kiện",
    created: now
  })
    .then(resp => {
      res.send('create ok');
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    }
    )
})
router.post('/login', function (req, res, next) {
  var email = req.body.email, password = req.body.password;
  User.findOne({
    $or: [{ email: email }, { username: email }]
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          res.send(user);
        } else {
          res.send('fail')
        }
      } else {
        res.send('fail')
      }
    })
    .catch(err => {
      res.send('fail')
    })
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
