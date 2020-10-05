var express = require('express');
var router = express.Router();
const User = require('../models/user');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

process.env.MY_KEY = 'secret';
router.get('/', function (req, res, next) {
    User.find(function (err, dt) {
      res.send(dt);
    })
  })
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
  //set info user
  router.post('/setinfo',(req,res,next)=>{
    const {id,phone,cmnd,address,quan,tp}=req.body;
    User.updateOne({_id:id},[
      {
        $set:{
          'cmnd':cmnd,
          'phone':phone,
          'address':address,
          'quan':quan,
          'tp':tp
        }
      }
    ])
    .then(re=>{
      res.status(200).json({mess:'ok'})
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
  //end user//////////////////////////////////////////////////////////////////////////
  
  module.exports=router