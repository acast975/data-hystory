var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});

// add a connect listener
socket.on('connect', function(socket) {
    console.log('Connected!');
});

//receive updates for location with id 41
socket.on("41",function(data){
	var row = data[0];
	console.log("Received update for location 41: " + " row id: " + row.id + " read_time: " + row.read_time);

});



//receive updates for location with id 41
socket.on("42",function(data){
	var row = data[0];
	console.log("Received update for location 42: " +" row id: " + row.id + " read_time: " + row.read_time);
	
});


//receive updates for location with id 41
socket.on("61",function(data){
	var row = data[0];
	console.log("Received update for location 61: " + " row id: " + row.id + " read_time: " + row.read_time);
});


//receive updates for location with id 41
socket.on("90",function(data){
	var row = data[0];
	console.log("Received update for location 90: " + " row id: " + row.id + " read_time: " + row.read_time);
});