var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var db = require('./db_access.js');
var publisher = require('./publisher.js')(io);
var config = require('./config').server;


var maxNumOfRows = config.maxNumOfRows;
var returnResultProbability = config.returnResultProbability;
var returnResultProbabilityDefault = config.returnResultProbabilityDefault;

publisher.start();

db.init(function(err){
    //If connection settings are incorrect application 
    //will throw exception after first query. This function
    //is called if createPool method failed.
    console.log(err);
});

//parse body inside post request
app.use(bodyParser.json());

//attach db object to all requests objects
app.use('/', function (req, res, next) {
    req.db = db;
    next();
});

app.get("/", function(req, res){
    res.send("data-hystory server is running!");
});

//get row by id
app.get("/row/:id",function(req, res, next){
  var db = req.db;
  var id = req.params.id;
  if(!isNaN()) next();
  db.getByID(id,(err, data) =>{
      if(err) return next(err);
      res.json(data);
    });
});

//find rows by read time interval
app.get("/read-time/:read_after/:read_before", function(req, res, next){
  var db = req.db;
  var readAfter = new Date(req.params.read_after);
  var readBefore = new Date(req.params.read_before);

  if(isNaN(readAfter) || isNaN(readBefore)){
    res.send(JSON.stringify({error:"Date format is not valid."}));
    return;
  }

  if(sendResultDecision2()){
    db.getByReadTime(readAfter, readBefore, maxNumOfRows, function(err,data){
        if(err) return next(err);
        res.json(data);
    });
  }else{
    return res.json([]);
  }
});


//find rows by location id and read time interval
app.get("/loc-read-time/:location_id/:read_after/:read_before", function(req, res, next){
  var db = req.db;
  var locationId = req.params.location_id;
  var readAfter = new Date(req.params.read_after);
  var readBefore = new Date(req.params.read_before);

  if(isNaN(readAfter) || isNaN(readBefore)){
    res.send(JSON.stringify({error:"Date format is not valid."}));
    return;
  }

  if(sendResultDecision(locationId)){
    db.getByLocationAndReadTime(locationId,readAfter, readBefore, maxNumOfRows, function(err,data){
        if(err) return next(err);
        res.json(data);
    });
  }else{
    res.json([]);
  }

});

//find rows by read time and loaction id or just by read timie interval
//POST example
//url: http://localhost:3000/loc-read-time
//content type: application/json
//body: {"location_id":"41","read_after":"2015-04-27T18:44:13.000Z","read_before":"2015-04-27T18:44:16.000Z" }
app.post("/loc-read-time", function(req, res, next){
  //find data by location id and read time interval
  //or just by read time interval
  var db = req.db;
  var body = req.body;
  var readAfter = new Date(body.read_after);
  var readBefore = new Date(body.read_before);

  if(isNaN(readAfter) || isNaN(readBefore)){
    res.send(JSON.stringify({error:"Date format is not valid."}));
    return;
  }

  if(body.hasOwnProperty("location_id"))
  {
    if(sendResultDecision(body.location_id)){
      db.getByLocationAndReadTime(body.location_id,readAfter, readBefore, maxNumOfRows, function(err,data){
          if(err) return next(err);
          res.json(data);
      });
    }else{
      res.json([]);
    }
  }else{
    db.getByReadTime(readAfter, readBefore, maxNumOfRows, function(err,data){
        if(err) return next(err);
        res.json(data);
    });
  }
});



function sendResultDecision(location_id){
    var probability;

    probability = returnResultProbability[location_id];

    if(!probability)
      probability = returnResultProbabilityDefault;

    var rand = Math.random();
    if(rand<probability)
      return true;
    else
      return false;
}


function sendResultDecision2(){
  if(Math.random() < returnResultProbabilityDefault)
    return true;
  else
    return false;
}
//error-handling function, this function must be defined last 
app.use(function(err, req, res, next) {
  console.log("Error handler: ");
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


http.listen(3000, function(){
	console.log('Data-history app listening on port 3000!');
});

