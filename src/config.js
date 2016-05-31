var config = {};

config.oracledb = {};
config.server = {};
config.publisher = {};

//database configuration
config.oracledb.con_str = {  
     user: "s14518",  
     password: "novasifra",  
     connectString: "160.99.9.199:1521/gislab.elfak.ni.ac.rs"};


//server configuration

//max number of rows in result
config.server.maxNumOfRows = -1; //set -1 for unlimited

//Define ignore request (GET or POST) probability for
//locations or default value will be used instead.
config.server.returnResultProbabilityDefault = 1.0
var returnResultProbability = {};
returnResultProbability["41"] = 0.8;
returnResultProbability["42"] = 0.6; 			

config.server.returnResultProbability = returnResultProbability;



//publisher configuration
config.publisher.resetAfterLastUpdate = true;
var locationsUpdates = {};
//send periodicaly updates with defined probability
locationsUpdates["41"] = {interval: 15, probability: 0.8};
locationsUpdates["42"] = {interval: 100};				//probability is 1.0 by default
locationsUpdates["90"] = {interval: 10, probability: 0.9};
locationsUpdates["61"] = {interval: 20, probability: 0.5};

config.publisher.locationsUpdateSettings = locationsUpdates;


module.exports = config;
 