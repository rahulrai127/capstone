var express = require('express');
var router  = express.Router();
var db = require('./db');

var cars = ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"];

//DONE
router.post('/entry', function(req, res) {

  // Parking slot allocation...
  var s = ""
  for (i = 0; i < 20; i++) {
    if(cars[i] == "0")
    {
      cars[i] = req.body['vehicle'];
      s="A"+i;
      break;
    }
  }
  // DB registration...
  if(s!=""){
 db.query('INSERT into current values ( ?,?,?,?,default);',[req.body['username'],req.body['vehicle'],s,req.body['phone']], function(err, results, query) {
  if (err) throw err;
  if(!err) {
      console.log(results);
  }
});
db.query('INSERT into come values ( ?,?,?,?,default);',[req.body['username'],req.body['vehicle'],s,req.body['phone']], function(err, results, query) {
  if (err) throw err;
  if(!err) {
      console.log(results);
  }
});

  // returning slot...
  res.send(s)
  }
else{
  res.send("PARKING FULL");
}

});
  
//DONE
router.post('/exit', function(req, res) {
  // Deleting from current record and add to permanent record
  db.query('INSERT into go values ( ?,?,?,?,default);',[req.body['username'],req.body['vehicle'],req.body['slot'],req.body['phone']], function(err, results, query) {
    if (err) throw err;
    if(!err) {
      db.query('DELETE from current where vehicle = ?;',[req.body['vehicle']], function(err, results, query) {
        if (err) throw err;
        if(!err) {
            console.log(results);
        }
      });
        console.log(results);
    }
  });
  res.send("OK");
});

//DONE
router.get('/admin/current', function (req, res) {
  db.query('select * from current', function(err, results, query) {
    if (err) throw err;
    if(!err) {
        console.log(results);
        res.send(JSON.stringify({"record":results}));
    }
  });
});

router.get('/admin/police', function (req, res) {
  db.query('SELECT count(*) from stolen where Vehicle = ? ;',[req.body['vehicle']], function(err, results, query) {
    if (err) throw err;
    if(!err) {
      if(results == 0)
      {
        res.send("0");
      }
      else
      {
        res.send("1");
      }
    }
  });
});

//DONE
router.get('/admin/entry', function (req, res) {
  db.query('select * from come', function(err, results, query) {
    if (err) throw err;
    if(!err) {
        console.log(results);
        res.send(JSON.stringify({"record":results}));
    }
  });
});

//DONE
router.get('/admin/exit', function (req, res) {
  db.query('select * from go', function(err, results, query) {
    if (err) throw err;
    if(!err) {
        console.log(results);
        res.send(JSON.stringify({"record":results}));
    }
  });
});

module.exports = router;
