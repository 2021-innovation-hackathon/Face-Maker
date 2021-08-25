var express = require('express');
var router = express.Router();
var timer = require('../public/javascripts/stretching_js/stretching_timer.js');


 

  



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('stretching', { title: '스트레칭' });
});
router.get('/alert', function(req, res, next) {
  res.render('alert', { title: '스트레칭알람' });
});
router.get('/dbupdate', function(req, res){
  timer.updatetime(request, response);
})


module.exports = router;
