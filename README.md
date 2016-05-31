# Data-history

Data-history is application that demonstrate using Node.js with Oracle SQL database. 
It have two main functionalities:
  1. It provides api to retreive data over HTTP request methods (GET and POST).
  2. Sending automatically data to another Node.js application. 

## Installing data-history application
Before you install, make sure you've read the [instructions!](INSTALLATION.md) 
  1. download project or clone it with git
  2. open command line and navigate to the *data-history/src* folder
  3. execute command:
```
npm install
```
This will install application dependencies including *oracledb*. When installation is finished you can start applicatoin.

## Running

Before you start server you need to setup connection to oracle database. Open *src/config.js* file and set username, password and connection string to your database.
```javascript
config.oracledb.con_str = {  
     user: "s14518",  
     password: "123456",  
     connectString: "160.xx.xxx.xxx:1521/example.com"}; //hostname:port/service_name
```

Open command line and navigate to the *data-history/src* folder and type:
```
node server.js
```
This will start *localhost* server on port 3000. 

## Usage

#### GET and POST
After you started the server you can send GET and POST request to recive data.
For example, if you want to get all rows from database where:
```
location_id=41
read_time is between 2015-04-27T18:44:13.000Z and 2015-04-27T18:44:16.000Z
```
you can send GET request 
```
http://localhost:3000/loc-read-time/41/2015-04-27T18:44:13.000Z/2015-04-27T18:44:16.000Z
```
  or POST request
```
Url: http://localhost:3000/loc-read-time
Content Type: application/json
Body: {"location_id":"41","read_after":"2015-04-27T18:44:13.000Z","read_before":"2015-04-27T18:44:16.000Z" }
```
Date can be in any format that the javascript constructor *new Date(date)* can parse.

#####Configuration

  Application can ignore HTTP requests with specific probability. To set probabliity open *src/config.js* and assigne value to: 
  ```
  config.server.returnResultProbabilityDefault = 0.8;
  ```
 If you do not want to ignore any request set it to to 1.0.
 
You can set a different probability for each location. For exmaple, to ignore all request for location with *id=90* with probability of 0.3 add next line in *config.js*:
```
returnResultProbability["90"] = 0.7;
```

####Publisher

This application can read rows from database and send it, in sequential order using *read_time* column, to another node js application.

#####Configuration

You can set sending frequency and probability for each location by adding line in *config.js*:
```
locationsUpdates["41"] = {interval: 15, probability: 0.8};

41 - location id inside database
15 - send update every 15 seconds
0.8 - there is 20 chance to skip udate
```

Here is [demo subscriber](subscriber)  that shows how to receive updates.
## License
MIT
