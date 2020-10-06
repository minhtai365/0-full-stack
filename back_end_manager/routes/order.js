var express = require('express');
var router = express.Router();

const Order = require('../models/order');
const Product = require('../models/product');

var Cart = require('../models/Cart');
// start order
//get order
router.get('/', (req, res, next) => {
  Order.find({}, (err, dt) => {
    res.send(dt);
  })
})
//add order
router.post('/add', (req, res, next) => {
  const { userid, item, name, phone, address, tp, quan, cmnd, total } = req.body;
  var con = {
    name: name,
    phone: phone,
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
    status:1,
    date: now
  });

  // console.log(item[0].productid);

  Order.create(ord)
    .then(re => {
      item.map(x => {
        Product.updateOne({ _id: x.productid }, { $inc: { proNumber: - x.qty } })
          .then(re => {
            Cart.findOneAndRemove({ userid: userid })
              .then(re => {

                res.status(200).json({ mess: 'Ok' })
              })
              .catch(er => {
                res.status(400).json({ mess: 'Fail' })
              })
          })
          .catch(er => {
            res.status(400).json({ mess: 'Fail' })
          })
      })
    })
    .catch(e => {
      res.status(400).json({ mess: 'Fail' })
    })
})

module.exports = router;