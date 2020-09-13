const mongoose = require('mongoose');
const Catelogy = require('../models/catelogy');
const Type = require('../models/type');
mongoose.connect('mongodb://localhost:27017/manager-product', { useNewUrlParser: true, useUnifiedTopology: true });
var catelogys = [
    new Catelogy({
        catelogy: 'Áo cưới',
        // typeid: Type.findOne({typename:'Trang phục'})
    }),
    new Catelogy({
        catelogy: 'Áo dài',
        // typeid: Type.findOne({typename:'Trang phục'})
    }),
    new Catelogy({
        catelogy: 'Cổ trang',
        // typeid: Type.findOne({typename:'Trang phục'})
    }), new Catelogy({
        catelogy: 'Khác',
        // typeid: Type.findOne({typename:'Trang phục'})
    })
]
done = 0;
for (let i; i < catelogys.length; i++) {
    console.log(Type.findOne({typename:'Trang phục'}));
    catelogys[i].save(function (err) {
        if(err) throw err;
        done++;
        mongoose.disconnect();
    })
}
