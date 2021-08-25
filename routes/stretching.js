var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('stretching', { title: '스트레칭' });
});
router.get('/alert', function(req, res, next) {
  res.render('alert', { title: '스트레칭알람' });
});

module.exports = router;
