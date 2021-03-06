var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var db_config = {
  host:'127.0.0.1',
  user:'root',
  password:'qsdrwe159',
  database:'gijigae'
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
  res.render('posture', { title: '자세교정' });
});

router.get('/alltime', function(req, res) {

  db.query(`UPDATE posture set alltime=alltime+1 WHERE posture_id=1`, function(err, result){
    if(err)throw err;
  
    res.status(200).json(result[0]);
  })
  
})
router.get('/goodpose', function(req, res) {

  db.query(`UPDATE posture set goodpose=goodpose+1 WHERE posture_id=1`, function(err, result){
    if(err)throw err;
  
    res.status(200).json(result[0]);
  })
  
})
router.get('/leftpose', function(req, res) {

  db.query(`UPDATE posture set leftpose=leftpose+1 WHERE posture_id=1`, function(err, result){
    if(err)throw err;
  
    res.status(200).json(result[0]);
  })
  
})
router.get('/rightpose', function(req, res) {

  db.query(`UPDATE posture set rightpose=rightpose+1 WHERE posture_id=1`, function(err, result){
    if(err)throw err;
  
    res.status(200).json(result[0]);
  })
  
})
router.get('/backpose', function(req, res) {

  db.query(`UPDATE posture set backpose=backpose+1 WHERE posture_id=1`, function(err, result){
    if(err)throw err;
  
    res.status(200).json(result[0]);
  })
  
})
router.get('/frontpose', function(req, res) {

  db.query(`UPDATE posture set frontpose=frontpose+1 WHERE posture_id=1`, function(err, result){
    if(err)throw err;
  
    res.status(200).json(result[0]);
  })
  
})
router.get('/nonetime', function(req, res) {

  db.query(`UPDATE posture set nonetime=nonetime+1 WHERE posture_id=1`, function(err, result){
    if(err)throw err;
  
    res.status(200).json(result[0]);
  })
  
})



module.exports = router;
