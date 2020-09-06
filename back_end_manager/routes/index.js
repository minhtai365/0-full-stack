var express = require('express');
var router = express.Router();

/* GET home page.
"start": "node ./bin/www" 
    */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Minh Tài nhé' });
});

module.exports = router;
