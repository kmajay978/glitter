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
const order=require('./app/routes/order');
var db_config = require('./config/development.json');

/* Database connection config*/

// var db_config={
// 	host:"167.172.209.57",
// 	user:"systemadmin",
// 	password:"G$tintoPc",
// 	database:"meowchownow"
// };

// var db_config={
// 	host:"167.172.209.57",
// 	user:"richestsoft",
// 	password:"ypnV*><3XTAx",
// 	database:"glitter-101"
// };
function intalizationConnection(db_config)
{
	 var connectionPool=0
	  var conn = mysql.createConnection(db_config);
	 console.log("host", db_config.host);
	console.log("user", db_config.user)
	console.log("password", db_config.password)
	console.log("database", db_config.database)
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
  // app.post('/login', validate.validate,users.login); //Routing For login Api
  // app.post('/order', validate.bookingValidate,jobs.order);  // Routing of booking Api
  // app.post('/acceptRide', validate.rideValidate,drivers.acceptRide); // Routing of Accept Ride
  // app.post('/rejectRide',validate.driverCancelRideValidate,drivers.rejectRide); //Routing of Update Location Api
  // app.post('/changeRideStatus',validate.changeRideStatusValidate,drivers.changeRideStatus);
  // app.post('/userCancelRide',validate.userCancelRideValidate,jobs.userCancelRide);
  // app.post('/getRideCurrentData',validate.getRideCurrentDataValidate,drivers.getRideCurrentData);
  // app.post('/getUserRideCurrentData',validate.getUserRideCurrentDataValidate,jobs.getUserRideCurrentData);
  // app.post('/getDriverPaymentDetail',validate.getDriverPaymentDetailValidate,drivers.getDriverPaymentDetail);
  // app.post('/driverRideStatus',validate.driverRideStatusValidate,drivers.driverRideStatus);
  // app.post('/getDistance',validate.getDistanceValidate,jobs.getDistance);
  // app.post('/getThumbnail',validate.getThumbnailValidate,jobs.getThumbnail);
  // app.post('/pickOrder',validate.pickOrderValidate,order.pickOrder);
 // app.post('/dropOrder',validate.dropOrderValidate,order.dropOrder);
 const http = require('http');

startServer = http.createServer(app).listen(port,function() {
    connection=intalizationConnection(db_config.databasesettings);
    console.log("Express server listening on port "+ port);
    socketJs.socketInitialize(startServer);
});

app.get('/', (req, res) => {
  res.send('Chat Server is running on port 3001');
});