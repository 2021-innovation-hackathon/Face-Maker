var express = require('express');
var router = express.Router();


var mysql = require('mysql');
var db_config = {
  host:'us-cdbr-east-04.cleardb.com',
  user:'b629f7bf92c0a3',
  password:'cf6f0b58',
  database:'heroku_0d9db5affa3ffb5'
};

function handleDisconnect() {
  db = mysql.createConnection(db_config);
  db.connect(function(err) {            
    if(err) {                            
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }
    console.log("connected");                                   
  });                                 
                                         
  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      return handleDisconnect();                      
    } else {                                    
      throw err;                              
    }
  });
}

handleDisconnect();

 

  



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('stretching', { title: '스트레칭' });
});
router.get('/up', function(req, res, next) {
  res.render('stretching_up', { title: 'up!스트레칭' });
});
router.get('/alert', function(req, res, next) {
  res.render('alert', { title: '스트레칭알람' });
});



router.get('/count', function(req, res) {
  db.query(`SELECT * from stretching where stretching_id=1`, function (err2, re){
    if(err2) throw err2;
    
  
    db.query(`UPDATE stretching set count=${re[0].count}+1 WHERE stretching_id=1`, function(err, result){
      if(err)throw err;
    
      res.status(200).json(result[0]);
    })
  })
})
router.get('/alltime', function(req, res) {

  db.query(`UPDATE stretching set alltime=alltime+1 WHERE stretching_id=1`, function(err, result){
    if(err)throw err;
  
    res.status(200).json(result[0]);
  })
  
})

router.get('/average/:pageId', function(req,res){
  console.log(req.params.pageId);
  db.query(`UPDATE stretching set averagecount=averagecount+1, sumscore= sumscore+${req.params.pageId} WHERE stretching_id=1`, function(err, result){
    if(err)throw err;
  db.query(`UPDATE stretching set average=sumscore/averagecount where stretching_id=1`, function(error3, result2){
    res.status(200).json(result2[0]);
  })
    
  })

  
})



module.exports = router;
