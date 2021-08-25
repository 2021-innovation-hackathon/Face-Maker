var express = require('express');
var router = express.Router();
var dbtest = require('../public/javascripts/statistics_js/dbtest.js');
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
  res.render('statistics', { title: 'Express' });
});


router.get('/page', function(request, response) { 
  db.query(`SELECT * FROM stretching`, function(error2,result){
    if(error2){
      throw error2;
    }
    else {
      //console.log(result);
      response.status(200).json(result[0]);
    }
   
   });
    
  
  //let answer = dbtest.home();
  //console.log(answer)
  //response.status(200).json(answer);
  });



module.exports = router;
