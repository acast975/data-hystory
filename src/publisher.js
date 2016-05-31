var db = require('./db_access.js');
var config = require('./config').publisher;

var io;
var publisher = {};

var intervalID;

var locUpdateSettings = config.locationsUpdateSettings;
var resetAfterLastUpdate = config.resetAfterLastUpdate;


//constructor
module.exports = function(ioParam){
	io = ioParam;

	io.on('connection', function (socket) {
	  console.log("Client connected!");
	  socket.emit('update', { hello: 'world' });
	});

	io.on('disconnect', function (socket) {
	  console.log("Client disconnected!");
	});

	//expose API
	return publisher;
};


//start sending updates for locations
publisher.start = function(){
	for(var location_id in locUpdateSettings){
		var loc = locUpdateSettings[location_id];

		if(!loc.probability)
			loc.probability =1.0;

		locUpdateSettings[location_id].intervalID = startSendingUpdatesForLocation(location_id, loc.interval, loc.probability);
	}
};


function startSendingUpdatesForLocation(location_id, interval, probability){
	var lastRowNum = 1; 
	var intervalID = setInterval(function(){
		if(!db.isReady() || io.engine.clientsCount < 1) return; //prevent unnecessary db access

		if(probability > Math.random()){
			db.getNthRowByReadTimeForLocation(location_id, lastRowNum,function(err,data){
				if(err) {console.log(err); return;}
				if(data.length > 0){
					//lastRowNum++;
					//send data to subscribers
					console.log("Update for location: " + location_id + " Sending row: " +
						 data[0].id + ". Time: " + new Date().toLocaleDateString("en-US")+ " " + new Date().toLocaleTimeString("en-US"));
					io.emit(location_id,data);

				}else{
					console.log("All updates for location " + location_id + " have been sent!");
					if(resetAfterLastUpdate){
						console.log("Sending again, from begginning!");
						lastRowNum = 1;
					}else{
						//console.log("There is not any update for location " + location_id + ".");
					}

				}
			});
		}
		//put increment inside 'if(data.length > 0)' if you don't want to skip rows
		lastRowNum++;
	}, interval * 1000);
	return intervalID;
}

//stop sending updates
publisher.stop = function(){
	for(var location_id in locUpdateSettings){
		var loc = locUpdateSettings[location_id];

		var intervalID = locUpdateSettings[location_id].intervalID;
		if(intervalID){
			clearInterval(intervalID);
			console.log("Publisher is stopped.")
		}
	}
};


