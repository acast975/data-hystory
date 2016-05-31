###Subscriber

This is a nodejs example program that shows how to connect to data-history server and receive updates. You can run it on different computer.

#### Installation
Prerequisites: installed [NodeJS](https://nodejs.org/en/).
  1. download *subscriber* folder
  2. open command line and navigate to *subsriber* folder 
  3. execute command:
```
npm install
```

#### Starting subscribar application
Run from command line:
```
node subscriber.js
```
By default, this application will try to connect server on address *http://localhost:3000*. If you are running server on different machine or using different port you have to open *subscriber.js* file and change server address.
#### Code example

When the application receive data from server for location with *id=41* this code will be executed.
```
socket.on("41",function(data){
	var row = data[0];
	console.log("Received update for location 41: " + " row id: " + row.id + " read_time: " + row.read_time);
});
```
