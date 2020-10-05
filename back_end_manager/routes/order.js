var express = require('express');
var router = express.Router();

const Order = require('../models/order');
// start order
//get order
router.get('/', (req, res, next) => {
    Order.find({}, (err, dt) => {
      res.send(dt);
    })
  })
  //add order
  router.post('/add', (req, res, next) => {
    const { userid, item, name, sdt, address, tp, quan, cmnd, total } = req.body;
    var con = {
      name: name,
      sdt: sdt,
      address: address,
      tp: tp,
      quan: quan,
      cmnd: cmnd
    };
    var now = new Date;
    var ord = new Order({
      userid: userid,
      total: total,
      item: item,
      contact: con,
      date: now
    });
    Order.create(ord)
      .then(re => {
        console.log('ok');
      })
      .catch(e => {
        console.log('lỗi');
      })
  })
  
module.exports = router;