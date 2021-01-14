// server.js
const express= require('express');
const bodyParser= require('body-parser');
const config=require('config');
const mysql=require('mysql');
const autoload = require('./app/routes/autoload');
const users = require('./app/routes/users');
const jobs = require('./app/routes/jobs');
const drivers =require('./app/routes/drivers');
const validate = require('./app/routes/validate');
const socketJs = require('./app/routes/socket');
const order=require('./app/routes/notification');

var db_config={
	host:config.get('databasesettings.host'),
	user:config.get('databasesettings.username'),
	password:config.get('databasesettings.password'),
	database:config.get('databasesettings.database')
};

function intalizationConnection(db_config)
{
	 var connectionPool=0
	  var conn = mysql.createConnection(db_config);
	  conn.connect(function(err) {
	  	connectionPool++;
		  if (err) throw err;
		  console.log("number of connections",connectionPool);
		});
	  return conn;
}


const app = express();
// server.js
const port = config.get('port');

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//require('./app/routes')(app, {});
//Api's 
  app.post('/login', validate.validate,users.login); //Routing For login Api
  app.post('/booking', validate.bookingValidate,jobs.booking);  // Routing of booking Api
  app.post('/acceptRide', validate.rideValidate,drivers.acceptRide); // Routing of Accept Ride
  app.post('/driverCancelRide',validate.driverCancelRideValidate,drivers.driverCancelRide); //Routing of Update Location Api
  app.post('/changeRideStatus',validate.changeRideStatusValidate,drivers.changeRideStatus);
  app.post('/userCancelRide',validate.userCancelRideValidate,jobs.userCancelRide);
  app.post('/getRideCurrentData',validate.getRideCurrentDataValidate,drivers.getRideCurrentData);
  app.post('/getUserRideCurrentData',validate.getUserRideCurrentDataValidate,jobs.getUserRideCurrentData);
  app.post('/getDriverPaymentDetail',validate.getDriverPaymentDetailValidate,drivers.getDriverPaymentDetail);
  app.post('/driverRideStatus',validate.driverRideStatusValidate,drivers.driverRideStatus);
  app.post('/getDistance',validate.getDistanceValidate,jobs.getDistance);
  app.post('/getThumbnail',validate.getThumbnailValidate,jobs.getThumbnail);
  app.post('/pickOrder',validate.notificationValidate,order.pickOrder);
  app.post('/cancelOrder',validate.notificationValidate,order.cancelOrder);
 const http = require('http');
startServer = http.createServer(app).listen(port, function() {
    connection=intalizationConnection(db_config);
    console.log("Express server listening on port "+ port);
    socketJs.socketInitialize(startServer);
});
