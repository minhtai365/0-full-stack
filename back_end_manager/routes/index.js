var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

process.env.MY_KEY = 'secret';
//connect database
const mongoose = require('mongoose');
var Product = require('../models/product');
var User = require('../models/user');


router.get('/', function (req, res, next) {

  res.render('index', { title: 'Minh Tài nhé' });
});
router.get('/product', function (req, res, next) {
  Product.find(function (err, dt) {
    console.log(dt.length);
    res.send(dt);
  });
})
router.get('/user', function (req, res, next) {
  User.find(function (err, dt) {
    res.send(dt);
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