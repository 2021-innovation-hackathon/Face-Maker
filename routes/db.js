var mysql = require('mysql');
var db_config = {
  host:'us-cdbr-east-04.cleardb.com',
  user:'b629f7bf92c0a3',
  password:'cf6f0b58',
  database:'heroku_0d9db5affa3ffb5'
};
db = mysql.createConnection(db_config);
db.connect(function(err){
  console.log("connect");
})

module.exports = db;