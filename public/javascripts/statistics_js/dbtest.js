var mysql = require('mysql');
var db_config = require('./db.js');
var template = require('./template.js');
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


exports.home = function(request, response){
   db.query(`SELECT * FROM stretching`, function(error2,result){
     if(error2){
       throw error2;
     }
     else {
       //console.log(result);
       return result[0];
     }
    
    });
  
};

