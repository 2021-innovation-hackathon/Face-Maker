var express = require("express");
var router = express.Router();

var mysql = require("mysql");
var db_config = {
  host:'127.0.0.1',
  user:'root',
  password:'qsdrwe159',
  database:'gijigae'
};

function handleDisconnect() {
  db = mysql.createConnection(db_config);
  db.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
    console.log("connected");
  });

  db.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      return handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("statistics", { title: "Express" });
});

router.get("/page/1", function (req, res, next) {
  res.render("page_1");
});
router.get("/page/2", function (req, res, next) {
  res.render("page_2");
});
router.get("/page/3", function (req, res, next) {
  res.render("page_3");
});

router.get("/one/stretching", function (request, response) {
  db.query(
    `SELECT * FROM stretching where stretching_id=1`,
    function (err, result) {
      if (err) throw err;
      response.status(200).json(result[0]);
    }
  );
});

router.get("/posture", function (request, response) {
  db.query(`SELECT * FROM posture where posture_id=1`, function (err, result) {
    if (err) throw err;
    else {
      console.log("Sdfwf");
    }
  });
});

//스트레칭 정보 받기
router.get("/one/stretching", function (request, response) {
  db.query(
    `SELECT * FROM stretching where stretching_id=1`,
    function (err, result) {
      if (err) throw err;

      response.status(200).json(result[0]);
    }
  );
});

//자세 정보 받기
router.get("/one/posture", function (request, response) {
  db.query(`SELECT * FROM posture where posture_id=1`, function (err, result) {
    if (err) throw err;

    response.status(200).json(result[0]);
  });
});

// router.get('/page/2', function(req, res, next) {
//   res.render('page_2');
// });
// router.get('/page/3', function(req, res, next) {
//   res.render('page_3');
// });
// router.get('/two/stretching', function(request, response){
//   db.query(`SELECT * FROM stretching where stretching_id=2`, function(err, result){
//     if(err)throw err;

//     response.status(200).json(result[0]);
//   })
// })
// router.get('/three/stretching', function(request, response){
//   db.query(`SELECT * FROM stretching where stretching_id=3`, function(err, result){
//     if(err)throw err;

//     response.status(200).json(result[0]);
//   })
// })
// router.get('/two/posture', function(request, response){
//   db.query(`SELECT * FROM posture where posture_id=2`, function(err, result){
//     if(err)throw err;

//     response.status(200).json(result[0]);
//   })
// })
// router.get('/three/posture', function(request, response){
//   db.query(`SELECT * FROM posture where posture_id=3`, function(err, result){
//     if(err)throw err;

//     response.status(200).json(result[0]);
//   })
// })
//
//    response.status(200).json(result[0]);
//  };
//});

module.exports = router;
