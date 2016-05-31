//DataBaseAccess.js
var oracledb = require('oracledb');  
var config = require('./config.js');

var pool;

//create connectino pool
exports.init = function(cb){
	oracledb.createPool(config.oracledb.con_str, 
		(err, createdPool) => {
			if (err) return cb(err);
    		pool = createdPool;
		});
};

//release connection
function doRelease(connection) {  
     connection.release(  
          err => {  
               if (err) {console.error(err.message);}  
          }  
     );  
}  

exports.isReady = function(){
	if(pool)
		return true;
	else
		return false;
};

//get row by id
exports.getByID = function(id, cb){
	pool.getConnection((err, connection) =>{
		if(err) return cb(err);
		connection.execute("SELECT * FROM data_history WHERE id=:id",
			[id],
			(err, result) =>{
				doRelease(connection);
				if(err) return cb(err);
				return cb(null, formattResult(result));
			});

	});
};

//find rows using read time interval
exports.getByReadTime = function(readAfter, readBefore, maxNumOfRows, cb){
	pool.getConnection((err, connection) =>{
		if(err) return cb(err);

		if(maxNumOfRows != -1)
		{
			connection.execute("SELECT * FROM data_history WHERE read_time>=:readAfter AND read_time<=:readBefore AND ROWNUM<=:maxNumOfRows",
				[readAfter, readBefore, maxNumOfRows],
				(err, result) =>{
					doRelease(connection);
					if(err) return cb(err);
					return cb(null, formattResult(result));
				});
		}else{
			connection.execute("SELECT * FROM data_history WHERE read_time>=:readAfter AND read_time<=:readBefore",
				[readAfter, readBefore],
				(err, result) =>{
					doRelease(connection);
					if(err) return cb(err);
					return cb(null, formattResult(result));
				});
		}

	});
};

//find rows using location id and read time interval
exports.getByLocationAndReadTime = function(locationID, readAfter, readBefore, maxNumOfRows, cb){
	pool.getConnection((err, connection) =>{
		if(err) return cb(err);

		if( maxNumOfRows != -1){
			connection.execute("SELECT * FROM data_history WHERE location_id =:locationID AND "
						+	"read_time>=:readAfter AND read_time<=:readBefore AND ROWNUM<=:maxNumOfRows",
				[locationID, readAfter,readBefore, maxNumOfRows],
				(err, result) =>{
					doRelease(connection);
					if(err) return cb(err);
					return cb(null, formattResult(result));
				});
		}else{
			connection.execute("SELECT * FROM data_history WHERE location_id =:locationID AND "
						+	"read_time>=:readAfter AND read_time<=:readBefore",
				[locationID, readAfter,readBefore],
				(err, result) =>{
					doRelease(connection);
					if(err) return cb(err);
					return cb(null, formattResult(result));
				});
		}
	});
};


exports.getNthRowByReadTimeForLocation = function(location_id, row_num, cb){
	pool.getConnection((err, connection) =>{
		if(err) return cb(err);

		connection.execute("select * " +
								"from ( select a.*, rownum rnum " +
						          "from ( select * from data_history where location_id = :location_id order by read_time asc, id asc ) a " +
						      "where rownum <= :n ) " +
						  "where rnum >= :n",
			[location_id, row_num],
			(err, result) =>{
				doRelease(connection);
				if(err) return cb(err);
				return cb(null, formattResult(result));
			});
	});
};



//by default properties names are uppercase, this 
//function make it lowercase
function formattResult(queryResult){
	var rows = queryResult.rows;
	var columns = queryResult.metaData;

	var formattedObjArray = [];
	var formattedObj = {};
	var row;

	//no results
	if(rows.length == 0)
		return formattedObjArray;


	if(rows.length == 1){
		//there is one row in result
		row = rows[0];
		for(var i=0; i<columns.length; i++)
			formattedObj[columns[i].name.toLowerCase()] = row[i];

		formattedObjArray.push(formattedObj);
		return formattedObjArray;
	}else{
		//there are multiple rows in result
		for(var i=0; i<rows.length; i++){
			row = rows[i];

			//add proerty to object and its value
			for(var j=0; j<columns.length; j++)
				formattedObj[columns[j].name.toLowerCase()] = row[j];

			formattedObjArray.push(formattedObj);
		}
		return formattedObjArray;
	}
};
