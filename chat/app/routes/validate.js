const Joi=require('joi');
const constants = require('../constants');
const _ = require('underscore');

//Validation For login Api
function validate(req,res,next){
	let schema=Joi.object({
		phone:Joi.string().required(),
		password:Joi.string().required()
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

//Validation For confirm Booking
function bookingValidate(req,res,next){
	let schema=Joi.object({
		session_id:Joi.string().required(),
		fromaddress:Joi.string().required(),
		toaddress:Joi.string().required(),
		package_size:Joi.string().optional(),
		fromzipcode:Joi.string().required(),
		tozipcode:Joi.string().required(),
		per_mile_rate:Joi.string().optional(),
		total_distance:Joi.string().optional(),
		shipment_type:Joi.string().required(),
		amount:Joi.string().required(),
		packages:Joi.string().required(),
		deliveryon:Joi.string().optional(),
		pickup_latitude:Joi.string().required(),
		pickup_longitude:Joi.string().required(),
		destination_latitude:Joi.string().required(),
		destination_longitude:Joi.string().required(),
		source_address2:Joi.string().optional(),
		source_company_name:Joi.string().required(),
		source_city:Joi.string().required(),
		source_state:Joi.string().required(),
		desti_address2:Joi.string().optional(),
		desti_company_name:Joi.string().required(),
		desti_city:Joi.string().required(),
		desti_state:Joi.string().required()
});
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

//Validation For Accept Ride
function rideValidate(req,res,next){
	let schema=Joi.object({
		session_id:Joi.string().required(),
		shipment_id:Joi.string().required(),
		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

//Validation For Update Location
function locationValidate(req,res,next){
	let schema=Joi.object({
		session_id:Joi.string().required(),
		address:Joi.string().required(),
		latitude:Joi.string().required(),
		longitude:Joi.string().required()
		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

//Validation For Change Ride Status
function changeRideStatusValidate(req,res,next){
	let schema=Joi.object({
		session_id:Joi.string().required(),
		ride_id:Joi.string().required(),
		job_status:Joi.string().required()
		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

//Validation For Nearest Drivers 
function nearestValidate(req,res,next){
	let schema=Joi.object({
		session_id:Joi.string().required(),
		latitude:Joi.string().required(),
		longitude:Joi.string().required()
		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

//Validation For Driver Cancel Ride 
function driverCancelRideValidate(req,res,next){
   let schema=Joi.object({
		session_id:Joi.string().required(),
		ride_id:Joi.string().required()
		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

function userCancelRideValidate(req,res,next){
   let schema=Joi.object({
		session_id:Joi.string().required(),
		ride_id:Joi.string().required()
		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

function getRideCurrentDataValidate(req,res,next){
   let schema=Joi.object({
		session_id:Joi.string().required(),
		ride_id:Joi.string().required()
		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

function getUserRideCurrentDataValidate(req,res,next){
   let schema=Joi.object({
		session_id:Joi.string().required(),
		ride_id:Joi.string().required()
		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}


function getDriverPaymentDetailValidate(req,res,next){
   let schema=Joi.object({
		session_id:Joi.string().required()		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

function driverRideStatusValidate(req,res,next){
   let schema=Joi.object({
		session_id:Joi.string().required()		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}


function pickOrderValidate(req,res,next){
   let schema=Joi.object({
		session_id:Joi.string().required(),
		order_id:Joi.string().required()		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

function dropOrderValidate(req,res,next){
   let schema=Joi.object({
		session_id:Joi.string().required(),		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

function getDistanceValidate(req,res,next){
   let schema=Joi.object({
		origin:Joi.string().required(),
		destination:Joi.string().required()		
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}

function getThumbnailValidate(req,res,next){
   let schema=Joi.object({
		ride_id:Joi.string().required(),
				
   });
	Joi.validate(req.body , schema, {}, function(err,value){
		if(err)
		{
			res.json({
				"message":constants.responseMessages.PARAMETER_MISSING,
				"status":constants.responseMessages.PARAMETER_MISSING,
				"data":err.details[0].message.replace(/["]/ig, "")
			})
		}else
		{
			req=value;
			next();
		}
	});
}



module.exports = {
    validate: validate,
	bookingValidate:bookingValidate,
	rideValidate:rideValidate,
	locationValidate:locationValidate,
	changeRideStatusValidate:changeRideStatusValidate,
	nearestValidate:nearestValidate,
	driverCancelRideValidate:driverCancelRideValidate,
	userCancelRideValidate:userCancelRideValidate,
	getRideCurrentDataValidate:getRideCurrentDataValidate,
	getDriverPaymentDetailValidate:getDriverPaymentDetailValidate,
	driverRideStatusValidate:driverRideStatusValidate,
	getUserRideCurrentDataValidate:getUserRideCurrentDataValidate,
	getDistanceValidate:getDistanceValidate,
	getThumbnailValidate:getThumbnailValidate,
	dropOrderValidate:dropOrderValidate,
	pickOrderValidate:pickOrderValidate
};