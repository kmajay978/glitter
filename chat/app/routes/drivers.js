const autoload = require('./autoload');
const validate = require('./validate');
const async = require('async');
const constants = require('./../constants');
const autoAssign=require('./auto-assignment');
const commFunc=require('./commonfunction');
var moment = require('moment');
const NodeGeocoder = require('node-geocoder');
const emailModule = require('./emailModule');

//Function For Driver Ride Status
exports.driverRideStatus=function(req,res)
{
	var session_id=req.body.session_id;
	async.waterfall([
            function (cb) {
            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user)=> {
                if (error) {
                    cb({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        response_data: {}
                    });

                } else 
                {
                    cb(null, user);
                }
            });
        },
        function(user,cb)
        {
        	//console.log(user);
              if (!user || (user && user.length === 0)) 
	           {
	           	//console.log('yes');
	                    return cb({
	                        message: constants.responseMessages.INVALID_ACCESS,
	                        status: constants.responseFlags.INVALID_ACCESS,
	                        driver_payment_response: {}
	                    });
	            }
	            else
	            {
	            	var driver_id=user[0]['driver_id'];
	            	var driver_sql=`SELECT ride.*, CONCAT_WS(' ', user.first_name, user.last_name) as customer_name,
        CONCAT_WS(' ', driver.first_name, driver.last_name) as driver_name, driver.email as driver_email, driver.phone as driver_phone,
        driver.latitude as driver_latitude, driver.longitude as driver_longitude
        FROM rides ride
        INNER JOIN user ON user.id = ride.user_id
        LEFT JOIN drivers driver ON driver.id=ride.driver_id
        WHERE ride.driver_id = ? AND ride.status IN(1,2,3,4) ORDER BY id DESC LIMIT 1`;
                    connection.query(driver_sql,[driver_id],(error,driverResult)=>{
                    	if(error)
                    	{
                    		console.log(error);
                    	}else
                    	{
                    		cb(null,driverResult);
                    	}
                    });
	                
	          	}
        },
        function(driverResult,cb)
        {
        	 if (!driverResult || (driverResult && driverResult.length === 0)) 
	           {
	           	//console.log('yes');
	                    return cb({
	                        message: constants.responseMessages.DATA_NOT_FOUND,
	                        status: constants.responseFlags.DATA_NOT_FOUND,
	                        driver_payment_response: {}
	                    });
	            }
	            else
	            {
	            	var job_detail={
	            		ride_id:driverResult[0]['id'],
	            		ride_status:driverResult[0]['status'],
	            		driver_name:driverResult[0]['driver_name'],
	            		user_name:driverResult[0]['customer_name']
	            	}
	            	   return cb
                    ({
	                    message: constants.responseMessages.ACTION_COMPLETE,
	                    status: constants.responseFlags.ACTION_COMPLETE,
	                   ride_detail: job_detail
	                });
	            }
        }
    ], function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));
    });
}

//Function For Accept Ride Api
exports.acceptRide=function(req, res) 
{
	res.setHeader('Content-Type', 'application/json');
	var session_id = req.body.session_id;
	var shipment_id = req.body.shipment_id;
	var stop=0;
	var sql = `SELECT * FROM app_login WHERE session_id = ?`;
	connection.query(sql, [session_id], function(error, user) 
	{
	    if (error) 
	    {
	    	var response = {
            "message": constants.responseMessages.ERROR_IN_EXECUTION,
            "status": constants.responseFlags.ERROR_IN_EXECUTION,
            "pickup_detail": {}
            };
            res.send(JSON.stringify(response));
            return;
	            
	    }
	    else 
	    {
	        if (!user || (user && user.length === 0)) 
	        {
		        
		        var response = {
                "message": constants.responseMessages.INVALID_ACCESS,
                "status": constants.responseFlags.INVALID_ACCESS,
                "pickup_detail": {}
                 };
                res.send(JSON.stringify(response));
                return;
	        }
	        else
	        {
		        var driver_id=user[0]['driver_id'];
		        var ids=[];
	            var shipment_ids=shipment_id.split(',');
	            shipment_ids.forEach(function(id)
	            {
	               ids.push(id);
	            })
		        var ride_response_data=`SELECT * FROM shipment WHERE id IN (?) ORDER BY created_at DESC`;
			    connection.query(ride_response_data, [ids], function(errors, ride)
			    {
			    	if(errors)
			        {
		                var response = {
		                "message": constants.responseMessages.ERROR_IN_EXECUTION,
		                "status": constants.responseFlags.ERROR_IN_EXECUTION,
		                "pickup_detail": {}
		                 };
		                res.send(JSON.stringify(response));
		                return;
			        }
			        else
			        {
			        	
			        	ride.forEach(function (fl) 
			            {
			            	if(fl.status == constants.jobStatus.ASSIGNED || 
				            fl.status == constants.jobStatus.STARTED  || 
				            fl.status == constants.jobStatus.ENDED ) 
			            	{
			            		if(stop==0)
			            		{
				            		var response = {
						            "message": constants.responseMessages.DRIVER_ALREADY_ASSIGNED,
						            "status": constants.responseFlags.DRIVER_ALREADY_ASSIGNED,
						            "pickup_detail": {}
						            };
						            res.send(JSON.stringify(response));
	                                stop=1;
                                }
					        }
			            	else if(fl.status == constants.jobStatus.FAILED || 
				            fl.status == constants.jobStatus.CANCELLED) 
			            	{
			            		if(stop==0)
			            		{
				            		var response = {
						            "message": constants.responseMessages.BULK_RIDE_ERROR,
						            "status": constants.responseFlags.SHOW_ERROR_MESSAGE,
						            "pickup_detail": {}
						            };
						            res.send(JSON.stringify(response));
	                                stop=1;
                                }
					        }
			            	else
			            	{

	                            commFunc.getDistance(fl.pickup_latitude,fl.pickup_longitude,fl.destination_latitude,fl.destination_longitude,2,function(err,getresult)
							    {
							    	//console.log(getresult);
							    	commFunc.getShipmentType(fl.fromzipcode,fl.tozipcode,function(err,shipmenttype)
							        {
	                                   var ride_acceptation_time=moment.utc().format('YYYY-MM-DD HH:mm:ss');
	                                   var sql_value=`SELECT * FROM shipmentprocess WHERE refshipmentid=? AND driver_id=? ORDER BY created_at DESC`;
									   connection.query(sql_value,[fl.id,driver_id],function(errord,resd){
										   if(errord)
										    {
										    	//console.log(error);
										    	if(stop==0)
										    	{
											    	var response = {
										            "message": constants.responseMessages.ERROR_IN_EXECUTION,
										            "status": constants.responseFlags.ERROR_IN_EXECUTION,
										            "pickup_detail": {}
										            };
										            res.send(JSON.stringify(response));
	                                                stop=1;
                                                }
									        }else
											{
												if (!resd || (resd && resd.length === 0)) 
	                                            {
													   var update_job='INSERT INTO `shipmentprocess` (`refshipmentid`,`driver_id`,`fromaddress`,`toaddress`,`shipment_distance`,`driver_response`,`driver_status`,`s_lat`,`s_long`,`d_lat`,`d_long`,`created_at`,`updated_at`,`shipmenttype`,`source_address2`,`source_city`,`source_state`,`desti_address2`,`desti_city`,`desti_state`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
													   var query=connection.query(update_job,[fl.id,driver_id,fl.fromaddress,fl.toaddress,getresult,constants.jobStatus.ASSIGNED,constants.driverJobStatus.ASSIGN,fl.pickup_latitude,fl.pickup_longitude,fl.destination_latitude,fl.destination_longitude,ride_acceptation_time,ride_acceptation_time,shipmenttype,fl.source_address2,fl.source_city,fl.source_state,fl.desti_address2,fl.desti_city,fl.desti_state], function(errorr, result)
														{
															if(errorr)
															{
																console.log(error);
																if(stop==0)
																{
																	var response = {
																	"message": constants.responseMessages.ERROR_IN_EXECUTION,
																	"status": constants.responseFlags.ERROR_IN_EXECUTION,
																	"pickup_detail": {}
																	};
																	res.send(JSON.stringify(response));
																	stop=1;
																}
															}
															else
															{
															   var update_status='UPDATE `shipment` SET `status`=? WHERE `id`=?';
															   connection.query(update_status,[constants.jobStatus.ASSIGNED,fl.id],(errs,resd)=>
															   {
																	if(errs)
																	{
																		if(stop==0)
																		{
																			var response = {
																			"message": constants.responseMessages.ERROR_IN_EXECUTION,
																			"status": constants.responseFlags.ERROR_IN_EXECUTION,
																			"pickup_detail": {}
																			};
																			res.send(JSON.stringify(response));
																			stop=1;
																		}
																			
																	}
																	else
																	{
																	   var ride_detail=`SELECT * FROM shipmentprocess WHERE driver_id=? AND driver_response=? AND driver_status=? ORDER BY created_at DESC`;
																	   connection.query(ride_detail, [driver_id,constants.jobStatus.ASSIGNED,constants.driverJobStatus.ASSIGN],function(errosr, ride_result)
																	   {
																		   if(errosr)
																		   {
																				if(stop==0)
																				{
																					var response = {
																					"message": constants.responseMessages.ERROR_IN_EXECUTION,
																					"status": constants.responseFlags.ERROR_IN_EXECUTION,
																					"pickup_detail": {}
																					};
																					res.send(JSON.stringify(response));
																					stop=1;
																				}
																		   }
																		   else
																		   {
																				if(!ride_result ||(ride_result && ride_result.length==0))
																				{
																					if(stop==1)
																					{
																						var response = {
																						"message": constants.responseMessages.ERROR_IN_EXECUTION,
																						"status": constants.responseFlags.ERROR_IN_EXECUTION,
																						"pickup_detail": {}
																						};
																						res.send(JSON.stringify(response));
																						stop=1;
																					}
																				}
																				else
																				{
																					var update_driver='UPDATE `drivers` SET `status`=? WHERE `id`=?';
																					connection.query(update_driver, [constants.driverStatus.BUSY,driver_id],function(errore, result)
																					{
																					   if(errore)
																					   {
																							if(stop==1)
																							{
																								var response = {
																								"message": constants.responseMessages.ERROR_IN_EXECUTION,
																								"status": constants.responseFlags.ERROR_IN_EXECUTION,
																								"pickup_detail": {}
																								};
																								res.send(JSON.stringify(response));
																								return;
																							}
																						}
																					   else
																					   {
																						   var driver_response_data=`SELECT * FROM drivers where id=?`;
																						   connection.query(driver_response_data, [driver_id],function(eror, driver_detail)
																						   {
																								if(eror)
																								{
																									if(stop==0)
																									{
																										var response = {
																										"message": constants.responseMessages.ERROR_IN_EXECUTION,
																										"status": constants.responseFlags.ERROR_IN_EXECUTION,
																										"pickup_detail": {}
																										 };
																										res.send(JSON.stringify(response));
																										stop=1;
																									}
																								}
																								else
																								{
																								   var message_fleet = driver_detail[0]['first_name']+' accepted your order';
																								   var user_response_data=`SELECT * FROM user where id=?`;
																								   connection.query(user_response_data, [fl.user_id], function(error, user_result)
																								   {
																										if(error)
																										{
																										   if(stop==0)
																										   {
																											   var response = {
																											   "message": constants.responseMessages.ERROR_IN_EXECUTION,
																											   "status": constants.responseFlags.ERROR_IN_EXECUTION,
																											   "pickup_detail": {}
																											   };
																											   res.send(JSON.stringify(response));
																											   stop=1;
																										   }
																											
																										}
																										else
																										{
																											var notification_response_data={
																											notification_type:constants.notificationFlags.RIDE_ACCEPT,
																											message:message_fleet,
																											};

																											commFunc.sendNotificationToCustomer(user_result[0]['id'], notification_response_data,message_fleet);
																											//Cancel remaining scheduled jobs
																											autoAssign.cancelJobSchedule(ride_result[0]['id']);
																											commFunc.getDistance(driver_detail[0]['latitude'],driver_detail[0]['longitude'],ride_result[0]['s_lat'],ride_result[0]['s_long'],2,function(error,souredistance)
																											{
																											  commFunc.getDistance(driver_detail[0]['latitude'],driver_detail[0]['longitude'],ride_result[0]['s_lat'],ride_result[0]['s_long'],2,function(error,destinationdistance)
																											  {
																													var response_response_data={
																													  id:ride_result[0]['id'],
																													  refshipmentid:ride_result[0]['refshipmentid'],
																													  driver_id:ride_result[0]['driver_id'],
																													  user_id:user_result[0]['id'],
																													  fromaddress:ride_result[0]['fromaddress'],
																													  toaddress:ride_result[0]['toaddress'],
																													  driver_response:ride_result[0]['driver_response'],
																													  driver_status:ride_result[0]['driver_status'],
																													  s_lat:ride_result[0]['s_lat'],
																													  s_long:ride_result[0]['s_long'],
																													  d_lat:ride_result[0]['d_lat'],
																													  d_long:ride_result[0]['d_long'],
																													  shipmenttype:ride_result[0]['shipmenttype'],
																													  sourcedistance:souredistance,
																													  destinationdistance:destinationdistance
																													};  

																												if(stop==0)
																												{
																												
																													var response = {
																													status_code: constants.responseFlags.ACTION_COMPLETE,
																													message: constants.responseMessages.ACTION_COMPLETE,
																													pickup_detail: response_response_data
																													 };
																													
																													 res.send(JSON.stringify(response));
																													 stop=1;
																												 }
																											  })

																										  })
																										}
																								   });
																								}
																						   });
																					   }
																					})
																				}
																			}
																	   });
																	}
															   });
															}
														});
												}
												else
												{
													   var update_job='UPDATE `shipmentprocess` set `driver_response`=?,`driver_status`=? WHERE `id`=? ';
													   var query=connection.query(update_job,[constants.jobStatus.ASSIGNED,constants.driverJobStatus.ASSIGN,resd[0]['id']], function(errorr, result)
														{
															if(errorr)
															{
																//console.log(error);
																if(stop==0)
																{
																	var response = {
																	"message": constants.responseMessages.ERROR_IN_EXECUTION,
																	"status": constants.responseFlags.ERROR_IN_EXECUTION,
																	"pickup_detail": {}
																	};
																	res.send(JSON.stringify(response));
																	stop=1;
																}
															}
															else
															{
															   var update_status='UPDATE `shipment` SET `status`=? WHERE `id`=?';
															   connection.query(update_status,[constants.jobStatus.ASSIGNED,fl.id],(errs,resd)=>
															   {
																	if(errs)
																	{
																		if(stop==0)
																		{
																			var response = {
																			"message": constants.responseMessages.ERROR_IN_EXECUTION,
																			"status": constants.responseFlags.ERROR_IN_EXECUTION,
																			"pickup_detail": {}
																			};
																			res.send(JSON.stringify(response));
																			stop=1;
																		}
																			
																	}
																	else
																	{
																	   var ride_detail=`SELECT * FROM shipmentprocess WHERE driver_id=? AND driver_response=? AND driver_status=? ORDER BY created_at DESC`;
																	   connection.query(ride_detail, [driver_id,constants.jobStatus.ASSIGNED,constants.driverJobStatus.ASSIGN],function(errosr, ride_result)
																	   {
																		   if(errosr)
																		   {
																				if(stop==0)
																				{
																					var response = {
																					"message": constants.responseMessages.ERROR_IN_EXECUTION,
																					"status": constants.responseFlags.ERROR_IN_EXECUTION,
																					"pickup_detail": {}
																					};
																					res.send(JSON.stringify(response));
																					stop=1;
																				}
																		   }
																		   else
																		   {
																				if(!ride_result ||(ride_result && ride_result.length==0))
																				{
																					if(stop==1)
																					{
																						var response = {
																						"message": constants.responseMessages.ERROR_IN_EXECUTION,
																						"status": constants.responseFlags.ERROR_IN_EXECUTION,
																						"pickup_detail": {}
																						};
																						res.send(JSON.stringify(response));
																						stop=1;
																					}
																				}
																				else
																				{
																					var update_driver='UPDATE `drivers` SET `status`=? WHERE `id`=?';
																					connection.query(update_driver, [constants.driverStatus.BUSY,driver_id],function(errore, result)
																					{
																					   if(errore)
																					   {
																							if(stop==1)
																							{
																								var response = {
																								"message": constants.responseMessages.ERROR_IN_EXECUTION,
																								"status": constants.responseFlags.ERROR_IN_EXECUTION,
																								"pickup_detail": {}
																								};
																								res.send(JSON.stringify(response));
																								return;
																							}
																						}
																					   else
																					   {
																						   var driver_response_data=`SELECT * FROM drivers where id=?`;
																						   connection.query(driver_response_data, [driver_id],function(eror, driver_detail)
																						   {
																								if(eror)
																								{
																									if(stop==0)
																									{
																										var response = {
																										"message": constants.responseMessages.ERROR_IN_EXECUTION,
																										"status": constants.responseFlags.ERROR_IN_EXECUTION,
																										"pickup_detail": {}
																										 };
																										res.send(JSON.stringify(response));
																										stop=1;
																									}
																								}
																								else
																								{
																								   var message_fleet = driver_detail[0]['first_name']+' accepted your order';
																								   var user_response_data=`SELECT * FROM user where id=?`;
																								   connection.query(user_response_data, [fl.user_id], function(error, user_result)
																								   {
																										if(error)
																										{
																										   if(stop==0)
																										   {
																											   var response = {
																											   "message": constants.responseMessages.ERROR_IN_EXECUTION,
																											   "status": constants.responseFlags.ERROR_IN_EXECUTION,
																											   "pickup_detail": {}
																											   };
																											   res.send(JSON.stringify(response));
																											   stop=1;
																										   }
																											
																										}
																										else
																										{
																											var notification_response_data={
																											notification_type:constants.notificationFlags.RIDE_ACCEPT,
																											message:message_fleet,
																											};

																											commFunc.sendNotificationToCustomer(user_result[0]['id'], notification_response_data,message_fleet);
																											//Cancel remaining scheduled jobs
																											autoAssign.cancelJobSchedule(ride_result[0]['id']);
																											commFunc.getDistance(driver_detail[0]['latitude'],driver_detail[0]['longitude'],ride_result[0]['s_lat'],ride_result[0]['s_long'],2,function(error,souredistance)
																											{
																											  commFunc.getDistance(driver_detail[0]['latitude'],driver_detail[0]['longitude'],ride_result[0]['s_lat'],ride_result[0]['s_long'],2,function(error,destinationdistance)
																											  {
																													var response_response_data={
																													  id:ride_result[0]['id'],
																													  refshipmentid:ride_result[0]['refshipmentid'],
																													  driver_id:ride_result[0]['driver_id'],
																													  user_id:user_result[0]['id'],
																													  fromaddress:ride_result[0]['fromaddress'],
																													  toaddress:ride_result[0]['toaddress'],
																													  driver_response:ride_result[0]['driver_response'],
																													  driver_status:ride_result[0]['driver_status'],
																													  s_lat:ride_result[0]['s_lat'],
																													  s_long:ride_result[0]['s_long'],
																													  d_lat:ride_result[0]['d_lat'],
																													  d_long:ride_result[0]['d_long'],
																													  shipmenttype:ride_result[0]['shipmenttype'],
																													  sourcedistance:souredistance,
																													  destinationdistance:destinationdistance
																													};  

																												if(stop==0)
																												{
																												
																													var response = {
																													status_code: constants.responseFlags.ACTION_COMPLETE,
																													message: constants.responseMessages.ACTION_COMPLETE,
																													pickup_detail: response_response_data
																													 };
																													
																													 res.send(JSON.stringify(response));
																													 stop=1;
																												 }
																											  })

																										  })
																										}
																								   });
																								}
																						   });
																					   }
																					})
																				}
																			}
																	   });
																	}
															   });
															}
														});
												}
											}
									   })
	                                   
							        });
							    });
			            	}
			            });
			        }

			    });
		    }
	    }
	});
    
}


//function to show drivers order assign by dispatcher


exports.driverorders=function(data,callback) {
	
	 var session_id = data.sessionId;
	 // console.log(data.sessionId);
    async.waterfall([
        function (cb) {
            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user)=> {
                if (error) {
                	// console.log('hi');
                    cb({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        response_data: {}
                    });

                } else {
                	 
                     cb(null, user);
                }
            });
        },
        function(user,cb)
        {
              if (!user || (user && user.length === 0)) 
	           {


	                    return cb({
	                        message: constants.responseMessages.INVALID_ACCESS,
	                        status: constants.responseFlags.INVALID_ACCESS,
	                        response_data: {}
	                    });
	            }
	            else
	            {

	                var driver_id=user[0]['driver_id'];
	                console.log(driver_id);
	                var driver_update='select onholdorders.id,onholdorders.fromaddress,onholdorders.toaddress,onholdorders.shipmenttype,shipment.trackingorder,shipment.packages,shipment.package_size  from onholdorders left join shipment on onholdorders.refshipmentid=shipment.id   WHERE onholdorders.driver_id=?';
		           connection.query(driver_update, [driver_id], (error, ride)=>{
		                    if(error)
		                    {
	                            cb({
					                message: constants.responseMessages.ERROR_IN_EXECUTION,
					                status: constants.responseFlags.ERROR_IN_EXECUTION,
					                response_data: {}
					            });
		                    }
		                    else
		                    {
				                cb(null,{
									message: constants.responseMessages.ACTION_COMPLETE,
									status: constants.responseFlags.ACTION_COMPLETE,
									response_data: ride
								});
				                
				            }
		                });
		          
	            }
        }
    ], function (error, result) {
        return callback(error, result);
    });
}


//Function For Update Driver Location Api
exports.updateLocation=function(data,callback) {
	//var driver_data=JSON.parse(data);
	 var session_id = data.sessionId;
    var latitude= data.latitude;
    var longitude= data.longitude;
    async.waterfall([
        function (cb) {
            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user)=> {
                if (error) {
                    cb({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        response_data: {}
                    });

                } else {

                     cb(null, user);
                }
            });
        },
        function(user,cb)
        {
              if (!user || (user && user.length === 0)) 
	           {
	                    return cb({
	                        message: constants.responseMessages.INVALID_ACCESS,
	                        status: constants.responseFlags.INVALID_ACCESS,
	                        response_data: {}
	                    });
	            }
	            else
	            {
	                var driver_id=user[0]['driver_id'];
	                var driver_update='UPDATE `drivers` SET `latitude`=?,`longitude`=? WHERE `id`=?';
		           connection.query(driver_update, [latitude,longitude,driver_id], (error, ride)=>{
		                    if(error)
		                    {
	                            cb({
					                message: constants.responseMessages.ERROR_IN_EXECUTION,
					                status: constants.responseFlags.ERROR_IN_EXECUTION,
					                response_data: {}
					            });
		                    }
		                    else
		                    {
				                cb(null,{
									message: constants.responseMessages.ACTION_COMPLETE,
									status: constants.responseFlags.ACTION_COMPLETE,
									response_data: {}
								});
				                
				            }
		                });
		          
	            }
        }
    ], function (error, result) {
        return callback(error, result);
    });
}

//Function For Change Ride Status Api
exports.changeRideStatus=function(req,res)
{
	var session_id=req.body.session_id;
	var ride_id=req.body.ride_id;
	var job_status=req.body.job_status
	async.waterfall([
    function (cb) 
    {
        var sql = `SELECT * FROM app_login WHERE session_id = ?`;
        connection.query(sql, [session_id], (error, user)=> 
        {
	        if (error) 
	        {
	            cb
	            ({
	                message: constants.responseMessages.ERROR_IN_EXECUTION,
	                status: constants.responseFlags.ERROR_IN_EXECUTION,
	                start_ride_response: {}
	            });
	        } else {

	            cb(null, user);
	        }
        });
    },
    function(user,cb)
    {
        if (!user || (user && user.length === 0)) 
	    {
	        return cb
	        ({
	            message: constants.responseMessages.INVALID_ACCESS,
	            status: constants.responseFlags.INVALID_ACCESS,
	            start_ride_response: {}
	        });
	    }
	    else
	    {
	        var driver_id=user[0]['driver_id'];
	        var ride_value=`SELECT * FROM rides WHERE id=? AND  status!=?`;
		    connection.query(ride_value, [ride_id,constants.jobStatus.CANCELLED], (error, ride)=>
		    {
		        if(error)
		        {
	                cb
	                ({
					    message: constants.responseMessages.ERROR_IN_EXECUTION,
					    status: constants.responseFlags.ERROR_IN_EXECUTION,
					    start_ride_response: {}
					});
		        }
		        else
		        {
				    if (!ride || (ride && ride.length === 0)) 
	                {
					    return cb
					    ({
						    message: constants.responseMessages.JOB_NOT_COMPLETED,
						    status: constants.responseFlags.ACTION_COMPLETE_2,
						    start_ride_response: {}
					    });
	                }
	                else
	                {
	                     cb(null,ride);                         
	                }
				                
				}
		    });
		          
	    }
    },
    function(ride,cb)
    {
    	if(job_status==constants.jobStatus.STARTED)
	    {
		    var start_time = moment.utc().format('YYYY-MM-DD HH:mm:ss');
	        var update_status='UPDATE `rides` SET `start_time`=? , `status`=? WHERE `id`=?';
	       var query= connection.query(update_status, [start_time,constants.jobStatus.STARTED,ride_id], (error, result)=>
			{
	            if(error)
			    {
		            cb
		            ({
						message: constants.responseMessages.ERROR_IN_EXECUTION,
						status: constants.responseFlags.ERROR_IN_EXECUTION,
						start_ride_response: {}
					});
			    }
			    else
			    {
			        update_ride=`SELECT * FROM rides WHERE id=? AND driver_id=?`;
			        connection.query(update_ride, [ride_id,ride[0]['driver_id']], (error, updated_ride)=>
			        {
	                    if(error)
						{
					        cb
					        ({
								message: constants.responseMessages.ERROR_IN_EXECUTION,
								status: constants.responseFlags.ERROR_IN_EXECUTION,
								start_ride_response: {}
							});
						}
						else
						{
	                        var driver_info=`SELECT * FROM drivers WHERE id=?`;
	                        connection.query(driver_info,[updated_ride[0]['driver_id']],(error,driver_detail)=>
	                        {
                                if(error)
						        {
							        cb
							        ({
										message: constants.responseMessages.ERROR_IN_EXECUTION,
										status: constants.responseFlags.ERROR_IN_EXECUTION,
										start_ride_response: {}
									});
						        }
						        else
						        {
						        	var message_fleet = "You're on your way "+driver_detail[0]['first_name']+"-"+driver_detail[0]['cab_number'];
                                    var driver_avg_rating = 0;
									var total_rating=driver_detail[0]['totalRating'];
									var total_user=driver_detail[0]['totalUser'];
									if(total_rating > 0)
									{
										driver_avg_rating= Math.ceil(total_rating/total_user);
									}
								
									var notification_response_data=
									{
										ride_id:updated_ride[0]['id'],
										driver_id:driver_detail[0]['id'],
										driver_name:driver_detail[0]['first_name'],
										driver_phone:driver_detail[0]['phone'],
										address:driver_detail[0]['address'],
										driver_latitude:driver_detail[0]['latitude'],
										driver_longitude:driver_detail[0]['longitude'],
										cab_number:driver_detail[0]['cab_number'],
										cab_model:driver_detail[0]['cab_model'],
										cab_color:driver_detail[0]['cab_color'],
										amount:updated_ride[0]['amount'],
										profile_image:driver_detail[0]['profile_image'],
										payment_type:updated_ride[0]['payment_type'],
										distance:updated_ride[0]['distance'],
										duration:updated_ride[0]['duration'],
										language_known:driver_detail[0]['known_lang'],
										driver_rating:driver_avg_rating,
										notification_type:constants.notificationFlags.RIDE_START,
										message:message_fleet
									};
                                    commFunc.sendNotificationToCustomer(updated_ride[0]['user_id'], notification_response_data);
                                    var user_data=
                                    {
                                        user_id:'',
                                        user_name:'',
                                        user_profile_image:'',
                                        latitude:'',
                                        longitude:'',
                                        cab_number:'',
                                        cab_model:'',
                                        cab_color:'',
                                        amount:'',
                                        payment_type:'',
                                        start_time:'',
                                        end_time:'',
                                        source:'',
                                        destination:'',
                                        created_at:'',
                                        map_image:'',
                                        rating:''
								    }
                                    cb
						            ({
										message: constants.responseMessages.ACTION_COMPLETE,
										status: constants.responseFlags.ACTION_COMPLETE,
										start_ride_response: user_data
									});
						        }
	                        });
						}
			        });
			    }
			});
           console.log(query.sql);
        }
        if(job_status==constants.jobStatus.ENDED)
        {
            var end_time= moment.utc().format('YYYY-MM-DD HH:mm:ss');
            var ride_response_data={
	                	ride_id:ride_id
	                };
            commFunc.getThumbnailImage(ride_response_data,function(error,getThumbnailImageResult)
	        {
	            var thumbnail_image=getThumbnailImageResult;
	            var amount=ride[0]['amount'];
	            var admin_amount=parseFloat(amount)*10/100;
	            //console.log(admin_amount);
	            var driver_amount=amount-admin_amount;
	            
	            var update_complete_ride='UPDATE `rides` SET `status`=?, `thumbnail_image`=?,`end_time`=? WHERE id=?';
	            connection.query(update_complete_ride,[constants.jobStatus.ENDED,thumbnail_image,end_time,ride_id],(error,result)=>
	            {
                   if(error)
                   {
                       cb
						({
							message: constants.responseMessages.ERROR_IN_EXECUTION,
							status: constants.responseFlags.ERROR_IN_EXECUTION,
							start_ride_response: {}
						});
                   } 
                   else
                   {
                   	   var driver_update_status='UPDATE `drivers` SET `status`=? WHERE `id`=?';
                   	   connection.query(driver_update_status, [constants.driverStatus.FREE, ride[0]['driver_id']],(error,result)=>
                   	   {
                            if(error)
                            {
                               console.log(error);  
                            }
                            else
                            {
                          	  var created_at= moment.utc().format('YYYY-MM-DD HH:mm:ss');
	                          var datetime=moment.utc().format('YYYY-MM-DD HH:mm:ss');
	                          commFunc.generateIncreasingIntegerRandomNumber(datetime,function(err, getTime)
	                           {
	                                var transaction_id=getTime;
	                                if(ride[0]['payment_type']==constants.paymentType.CASH)
	                                                	{
	                               var description="cash payment done by user";
	                           }
	                           else
	                           {
	                           		var description="online payment done by user";
	                           }
	                                //Payment Table Transaction
	                                var insert_payment='INSERT INTO `transaction`(`transaction_id`,`paymentmode`,`user_id`,`driver_id`,`ride_id`,`credit`,`debit`,`paymentstatus`,`description`,`created_at`,`updated_at`) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
	                                connection.query(insert_payment,[transaction_id,ride[0]['payment_type'],ride[0]['user_id'],ride[0]['driver_id'],ride_id,amount,0,constants.paymentStatus.COMPLETE,description,created_at,created_at],(error,transresult)=>
	                                {
		                             	if(error)
		                             	{
		                             	 	console.log(error);
		                             	}
		                             	else
		                             	{
		                             		var reftransid=transresult.insertId;
		                             		var admindesc="amount get from userride";
		                             		 //Get Admin Transaction Detail
                                             var getadminTransaction=`SELECT * FROM NewAdminTransaction ORDER BY id DESC`;
									    	connection.query(getadminTransaction,(error,adminTrans_data)=>
									    	{
									            if(error)
									            {
									            	console.log(error);
									            }
									            else
									            {
									            	console.log(adminTrans_data);
									            	if(!adminTrans_data || (adminTrans_data && adminTrans_data.length === 0)) 
	                                                {
	                                                	   var admin_price=admin_amount;
	                                                	   //console.log(admin_price);
	                                                	   if(ride[0]['payment_type']==constants.paymentType.CASH)
	                                                	{
	                                                		admindesc="cash amount get from userride";
	                                                       var insert_admin_trans='INSERT INTO `NewAdminTransaction`(`reftransaction_id`,driver_id,`credit`,`debit`,`balance`,`description`,`created_at`,`updated_at`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_admin_trans,[reftransid,ride[0]['driver_id'],admin_price,0,admin_price,admindesc,datetime,datetime],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});
	                                                    }
	                                                    else
	                                                    {
	                                                    	admindesc="online amount get from userride";
	                                                    	var admin_price=parseFloat(amount);
	                                                    	var admin_bal=parseFloat(amount);
	                                                    	 var insert_admin_trans='INSERT INTO `NewAdminTransaction`(`reftransaction_id`,driver_id,`credit`,`debit`,`balance`,`description`,`created_at`,`updated_at`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_admin_trans,[reftransid,ride[0]['driver_id'],admin_price,0,admin_bal,admindesc,datetime,datetime],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});
		                                                		admindesc="amount paid to driver get from userride";
		                                                	var new_admin_bal=parseFloat(admin_bal)-parseFloat(driver_amount);
		                                                	var newinsert_admin_trans='INSERT INTO `NewAdminTransaction`(`reftransaction_id`,driver_id,`credit`,`debit`,`balance`,`description`,`created_at`,`updated_at`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_admin_trans,[reftransid,ride[0]['driver_id'],0,driver_amount,new_admin_bal,admindesc,datetime,datetime],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});


	                                                    }
	                                                	//console.log(query.sql);
	                                                }
	                                                else
	                                                {
	                                                	if(ride[0]['payment_type']==constants.paymentType.CASH)
	                                                	{
	                                                		admindesc="cash amount get from userride";
	                                                	   var admin_price=admin_amount;
	                                                	   var admin_bal=parseFloat(parseFloat(adminTrans_data[0]['balance'])+parseFloat(admin_price)).toFixed(2);
	                                                	    var insert_admin_trans='INSERT INTO `NewAdminTransaction`(`reftransaction_id`,driver_id,`credit`,`debit`,`balance`,`description`,`created_at`,`updated_at`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_admin_trans,[reftransid,ride[0]['driver_id'],admin_price,0,admin_bal,admindesc,datetime,datetime],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});
		                                                }
		                                                else
		                                                {
		                                                	admindesc="online amount get from userride";
		                                                	var admin_price=amount;
	                                                    	var admin_bal=parseFloat(parseFloat(adminTrans_data[0]['balance']).toFixed(2)+parseFloat(amount).toFixed(2)).toFixed(2);
	                                                    	 var insert_admin_trans='INSERT INTO `NewAdminTransaction`(`reftransaction_id`,driver_id,`credit`,`debit`,`balance`,`description`,`created_at`,`updated_at`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_admin_trans,[reftransid,ride[0]['driver_id'],admin_price,0,admin_bal,admindesc,datetime,datetime],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});
		                                                	admindesc="amount paid to driver get from userride";
		                                                	var new_admin_bal=parseFloat(parseFloat(admin_bal)-parseFloat(driver_amount)).toFixed(2);
		                                                	var newinsert_admin_trans='INSERT INTO `NewAdminTransaction`(`reftransaction_id`,driver_id,`credit`,`debit`,`balance`,`description`,`created_at`,`updated_at`) VALUES(?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_admin_trans,[reftransid,ride[0]['driver_id'],0,driver_amount,new_admin_bal,admindesc,datetime,datetime],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});





		                                                }
	                                                }
									            }
									    	});

		                             		//Get Drier Transaction Detail And Insert Data 
		                             	 	var getdriverTransaction=`SELECT * FROM NewDriverTransaction WHERE driver_id=? ORDER BY id DESC`;
									    	connection.query(getdriverTransaction,[ride[0]['driver_id']],(error,driverTrans_data)=>
									    	{
									            if(error)
									            {
									            	console.log(error);
									            }
									            else
									            {
									            	if(!driverTrans_data || (driverTrans_data && driverTrans_data.length === 0)) 
	                                                {
	                                                	if(ride[0]['payment_type']==constants.paymentType.CASH)
	                                                	{
	                                                		var driverdesc="cash amount get from user ride";
	                                                		var driver_amount=amount;
	                                                		 var balance=amount;
		                                                	 var insert_driver_trans='INSERT INTO `NewDriverTransaction`(`reftransaction_id`,`driver_id`,`credit`,`balance`,`description`,`created_at`,`updated_at`,`debit`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	 var query=connection.query(insert_driver_trans,[reftransid,ride[0]['driver_id'],driver_amount,balance,driverdesc,datetime,datetime,0],(error,resu)=>
		                                                	 {
	                                                           if(error){console.log(error)}else{console.log(resu);}
		                                                	 });

		                                                	 var newdriverbal=parseFloat(parseFloat(balance)-parseFloat(admin_amount)).toFixed(2);
		                                                	 driverdesc=" amount paid to admin get from user ride";

		                                                	  var newinsert_driver_trans='INSERT INTO `NewDriverTransaction`(`reftransaction_id`,`driver_id`,`credit`,`balance`,`description`,`created_at`,`updated_at`,`debit`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	 var query=connection.query(insert_driver_trans,[reftransid,ride[0]['driver_id'],0,newdriverbal,driverdesc,datetime,datetime,admin_amount],(error,resu)=>
		                                                	 {
	                                                           if(error){console.log(error)}else{console.log(resu);}
		                                                	 });


	                                                    }else
	                                                    {
	                                                    	var driverdesc="online amount get from user ride";
                                                             var balance=driver_amount;
                                                             var insert_driver_transcr='INSERT INTO `NewDriverTransaction`(`reftransaction_id`,`driver_id`,`credit`,`balance`,`description`,`created_at`,`updated_at`,`debit`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_driver_trans,[reftransid,ride[0]['driver_id'],driver_amount,balance,driverdesc,datetime,datetime,0],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});

		                                                	
	                                                    }
	                                                	//console.log(query.sql);
	                                                }else{
	                                                	if(ride[0]['payment_type']==constants.paymentType.CASH)
	                                                	{
	                                                		
	                                                		var driverdesc="cash amount get from user ride";
	                                                		var driver_amount=amount;
	                                                		 var balance=parseFloat(driverTrans_data[0]['balance'])+parseFloat(amount);
		                                                	 var insert_driver_trans='INSERT INTO `NewDriverTransaction`(`reftransaction_id`,`driver_id`,`credit`,`balance`,`description`,`created_at`,`updated_at`,`debit`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	 var query=connection.query(insert_driver_trans,[reftransid,ride[0]['driver_id'],driver_amount,balance,driverdesc,datetime,datetime,0],(error,resu)=>
		                                                	 {
	                                                           if(error){console.log(error)}else{console.log(resu);}
		                                                	 });

		                                                	 var newdriverbal=parseFloat(balance)-parseFloat(admin_amount).toFixed(2);;
		                                                	 driverdesc=" amount paid to admin get from user ride";

		                                                	  var newinsert_driver_trans='INSERT INTO `NewDriverTransaction`(`reftransaction_id`,`driver_id`,`credit`,`balance`,`description`,`created_at`,`updated_at`,`debit`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	 var query=connection.query(insert_driver_trans,[reftransid,ride[0]['driver_id'],0,newdriverbal,driverdesc,datetime,datetime,admin_amount],(error,resu)=>
		                                                	 {
	                                                           if(error){console.log(error)}else{console.log(resu);}
		                                                	 });
	                                                    }else
	                                                    {
	                                                    	var driverdesc="online amount get from user ride";
                                                             var balance=parseFloat(driverTrans_data[0]['balance'])+driver_amount;
                                                             var insert_driver_trans='INSERT INTO `NewDriverTransaction`(`reftransaction_id`,`driver_id`,`credit`,`balance`,`description`,`created_at`,`updated_at`,`debit`) VALUES(?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_driver_trans,[reftransid,ride[0]['driver_id'],driver_amount,balance,driverdesc,datetime,datetime,0],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});
	                                                    } 
	                                                }
									            }
									    	});


                                             //Get User Transaction Detail And Insert Data
                                             var getuserTransaction=`SELECT * FROM NewUserTransaction WHERE user_id=? ORDER BY id DESC`;
									    	connection.query(getuserTransaction,[ride[0]['user_id']],(error,userTrans_data)=>
									    	{
									            if(error)
									            {
									            	console.log(error);
									            }
									            else
									            {
									            	if(!userTrans_data || (userTrans_data && userTrans_data.length === 0)) 
	                                                {
	                                                	     var userdesc="amount paid to driver by user";
                                                            var insert_user_trans='INSERT INTO `NewUserTransaction`(`reftransaction_id`,`user_id`,`credit`,`debit`,`balance`,description,`created_at`,`updated_at`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_user_trans,[reftransid,ride[0]['user_id'],0,amount,0,userdesc,datetime,datetime],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});
	                                                    
	                                                	//console.log(query.sql);
	                                                }
	                                                else
	                                                {
	                                                		var userdesc="amount paid to driver by user";
	                                                	    var insert_user_trans='INSERT INTO `NewUserTransaction`(`reftransaction_id`,`user_id`,`credit`,`debit`,`balance`,description,`created_at`,`updated_at`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_user_trans,[reftransid,ride[0]['user_id'],0,amount,0,userdesc,datetime,datetime],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});
	                                                }
									            }
									    	});
							// driver balance 
								 var getNewDriverBalance=`SELECT * FROM NewDriverBalance WHERE driver_id=? ORDER BY id DESC`;
								 connection.query(getNewDriverBalance,[ride[0]['driver_id']],(error,driverbalTrans_data)=>
									    	{
									            if(error)
									            {
									            	console.log(error);
									            }
									            else
									            {
									            	if(!driverbalTrans_data || (driverbalTrans_data && driverbalTrans_data.length === 0)) 
	                                                {
	                                                	if(ride[0]['payment_type']==constants.paymentType.CASH)
	                                                	{
	                                                		var driverbaldesc="amount paid to admin";
	                                                		var driver_bal_amount=admin_amount;
	                                                		 var balance='-'+admin_amount;
		                                                	 var insert_driver_trans='INSERT INTO `NewDriverBalance`(`reftransaction_id`,`driver_id`,`credit`,`balance`,`description`,`created_at`,`updated_at`,`debit`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	 var query=connection.query(insert_driver_trans,[reftransid,ride[0]['driver_id'],0,balance,driverbaldesc,datetime,datetime,driver_bal_amount],(error,resu)=>
		                                                	 {
	                                                           if(error){console.log(error)}else{console.log(resu);}
		                                                	 });		                                                	 
	                                                    }else
	                                                    {
	                                                    	var driverdesc="online amount get from admin to driver";
	                                                    	var driver_bal_amount=driver_amount;
                                                             var balance=driver_amount;
                                                             var insert_driver_transcr='INSERT INTO `NewDriverBalance`(`reftransaction_id`,`driver_id`,`credit`,`balance`,`description`,`created_at`,`updated_at`,`debit`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_driver_trans,[reftransid,ride[0]['driver_id'],driver_bal_amount,balance,driverdesc,datetime,datetime,0],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});

		                                                	
	                                                    }
	                                                	//console.log(query.sql);
	                                                }else{
	                                                	if(ride[0]['payment_type']==constants.paymentType.CASH)
	                                                	{
	                                                		
	                                                		var driverbaldesc="amount paid to admin";
	                                                		var driver_bal_amount=admin_amount;
	                                                		 var balance=parseFloat(driverbalTrans_data[0]['balance'])-parseFloat(admin_amount);
	                                                		
		                                                	 var insert_driver_trans='INSERT INTO `NewDriverBalance`(`reftransaction_id`,`driver_id`,`credit`,`balance`,`description`,`created_at`,`updated_at`,`debit`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	 var query=connection.query(insert_driver_trans,[reftransid,ride[0]['driver_id'],0,balance,driverdesc,datetime,datetime,driver_bal_amount],(error,resu)=>
		                                                	 {
	                                                           if(error){console.log(error)}else{console.log(resu);}
		                                                	 });

		                                                	 
	                                                    }else
	                                                    {
	                                                    	
		                                                	var driverdesc="online amount get from admin to driver";
	                                                    	var driver_bal_amount=driver_amount;
                                                             var balance=parseFloat(driverbalTrans_data[0]['balance'])+parseFloat(driver_amount);
                                                             var insert_driver_transcr='INSERT INTO `NewDriverBalance`(`reftransaction_id`,`driver_id`,`credit`,`balance`,`description`,`created_at`,`updated_at`,`debit`) VALUES(?,?,?,?,?,?,?,?)';
		                                                	var query=connection.query(insert_driver_trans,[reftransid,ride[0]['driver_id'],driver_bal_amount,balance,driverdesc,datetime,datetime,0],(error,resu)=>
		                                                	{
	                                                            if(error){console.log(error)}else{console.log(resu);}
		                                                	});

	                                                    } 
	                                                }
									            }
									            });







                                            var driver_info=`SELECT * FROM drivers WHERE id=?`;
						                        connection.query(driver_info,[ride[0]['driver_id']],(error,driver_detail)=>
						                        {
					                                if(error)
											        {
												        cb
												        ({
															message: constants.responseMessages.ERROR_IN_EXECUTION,
															status: constants.responseFlags.ERROR_IN_EXECUTION,
															start_ride_response: {}
														});
											        }
											        else
											        {
											        	var user_info=`SELECT * FROM user WHERE id=?`;
						                                connection.query(user_info,[ride[0]['user_id']],(error,user_detail)=>
						                                {
                                                            if(error)
                                                            {
                                                                 console.log(error);
                                                            }
                                                            else
                                                            {
                                                            	var complete_ride_data=`SELECT * FROM rides where id=? and driver_id=?`;
                                                            	connection.query(complete_ride_data,[ride_id,ride[0]['driver_id']],(error,completeRideData)=>{
                                                            		if(error){ 
                                                            			console.log(error);

                                                            		}else{
                                                                       var message_fleet = "Please pay your driver"+Math.round(ride[0]['amount'])+". Thank you for riding with us'";
								                                    var driver_avg_rating = 0;
																	var total_rating=driver_detail[0]['totalRating'];
																	var total_user=driver_detail[0]['totalUser'];
																	if(total_rating > 0)
																	{
																		driver_avg_rating= Math.ceil(total_rating/total_user);
																	}

																	var user_avg_rating = 0;
																	var total_rating=user_detail[0]['totalRating'];
																	var total_driver=user_detail[0]['totalDriver'];
																	if(total_rating > 0)
																	{
																		user_avg_rating= Math.ceil(total_rating/total_driver);
																	}
																	
																	var notification_response_data=
																	{
																		ride_id:completeRideData[0]['id'],
																		driver_id:driver_detail[0]['id'],
																		driver_name:driver_detail[0]['first_name'],
																		driver_phone:driver_detail[0]['phone'],
																		address:driver_detail[0]['address'],
																		driver_latitude:driver_detail[0]['latitude'],
																		driver_longitude:driver_detail[0]['longitude'],
																		cab_number:driver_detail[0]['cab_number'],
																		cab_model:driver_detail[0]['cab_model'],
																		cab_color:driver_detail[0]['cab_color'],
																		amount:Math.round(completeRideData[0]['amount']),
																		profile_image:driver_detail[0]['profile_image'],
																		payment_type:completeRideData[0]['payment_type'],
																		distance:completeRideData[0]['distance'],
																		duration:completeRideData[0]['duration'],
																		language_known:driver_detail[0]['known_lang'],
																		driver_rating:driver_avg_rating,
																		map_image:completeRideData[0]['thumbnail_image'],
																		notification_type:constants.notificationFlags.RIDE_COMPLETE,
																		message:message_fleet
																	};
								                                    commFunc.sendNotificationToCustomer(ride[0]['user_id'], notification_response_data);
								                                    var start_time='"'+completeRideData[0]['start_time']+'"';
								                                    var end_time='"'+completeRideData[0]['end_time']+'"';
								                                    var created_at='"'+completeRideData[0]['created_at']+'"';
								                                    var user_data=
								                                    {
                                                                        user_id:user_detail[0]['id'],
                                                                        user_name:user_detail[0]['first_name'],
                                                                        user_profile_image:user_detail[0]['profile_image'],
                                                                        latitude:user_detail[0]['latitude'],
                                                                        longitude:user_detail[0]['longitude'],
                                                                        cab_number:driver_detail[0]['cab_number'],
                                                                        cab_model:driver_detail[0]['cab_model'],
                                                                        cab_color:driver_detail[0]['cab_color'],
                                                                        amount:Math.round(completeRideData[0]['amount']),
                                                                        payment_type:completeRideData[0]['payment_type'],
                                                                        start_time:moment(start_time).format("hh:mm A"),
                                                                        end_time:moment(end_time).format('hh:mm A'),
                                                                        source:completeRideData[0]['source'],
                                                                        destination:completeRideData[0]['destination'],
                                                                        created_at:moment(created_at).format('d m Y, hh:mm A'),
                                                                        map_image:completeRideData[0]['thumbnail_image'],
                                                                        rating:user_avg_rating
								                                    }

								                                    var email_response_data=
																	{
																		ride_id:completeRideData[0]['id'],
																		driver_id:driver_detail[0]['id'],
																		driver_name:driver_detail[0]['first_name'],
																		driver_phone:driver_detail[0]['phone'],
																		address:driver_detail[0]['address'],
																		driver_latitude:driver_detail[0]['latitude'],
																		driver_longitude:driver_detail[0]['longitude'],
																		cab_number:driver_detail[0]['cab_number'],
																		cab_model:driver_detail[0]['cab_model'],
																		cab_color:driver_detail[0]['cab_color'],
																		amount:Math.round(completeRideData[0]['amount']),
																		profile_image:driver_detail[0]['profile_image'],
																		payment_type:completeRideData[0]['payment_type'],
																		distance:completeRideData[0]['distance'],
																		duration:completeRideData[0]['duration'],
																		language_known:driver_detail[0]['known_lang'],
																		driver_rating:driver_avg_rating,
																		map_image:completeRideData[0]['thumbnail_image'],
																		created_at:moment(created_at).format('DD:MM:YYYY, hh:mm A'),
																	};
								                                    cb
														            ({
																		message: constants.responseMessages.ACTION_COMPLETE,
																		status: constants.responseFlags.ACTION_COMPLETE,
																		start_ride_response: user_data
																	});
                                                            		}
                                                            	})
                                                            	   
                                                            }
						                                });
											        	
											        }
						                        });
		                             	}
	                                });
	                           });
	                        }
                   	    });
                       
                   }
	            });
	        });        	
        }
    },
    ], function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));

    });
}

//Function For Driver Cancel Ride Api
exports.rejectRide=function(req,res)
{
	var session_id=req.body.session_id;
	var ride_id=req.body.ride_id;
	async.waterfall([
        function (cb) {
            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user)=> {
                if (error) {
                    cb({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        cancel_ride_response: {}
                    });

                } else {

                     cb(null, user);
                }
            });
        },
        function(user,cb)
        {
        	//console.log(user);
              if (!user || (user && user.length === 0)) 
	           {
	           	//console.log('yes');
	                    return cb({
	                        message: constants.responseMessages.INVALID_ACCESS,
	                        status: constants.responseFlags.INVALID_ACCESS,
	                        cancel_ride_response: {}
	                    });
	            }
	            else
	            {
	            	var driver_id=user[0]['driver_id'];
	            	var ride_data='UPDATE  `drivers` SET `status`= ? WHERE `id`= ?';
                        		connection.query(ride_data,[constants.driverStatus.FREE,driver_id],(error,cancel_ride_data)=>
                        		{
                                    if(error)
                                    {
                                        cb
                                        ({
					                        message: constants.responseMessages.ERROR_IN_EXECUTION,
					                        status: constants.responseFlags.ERROR_IN_EXECUTION,
					                        cancel_ride_response: {}
				                        });
                                    }
                                    else
                                    {
                                    	autoAssign.rejectProcess(ride_id);
                                    	 cb
                                        ({
					                        message: constants.responseMessages.ACTION_COMPLETE,
					                        status: constants.responseFlags.ACTION_COMPLETE,
					                        cancel_ride_response: {}
				                        });
                                    }
                        		});
                }
        },
     ], function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));
    });
}

exports.getRideCurrentData=function(req,res)
{
  var session_id=req.body.session_id;
  var ride_id=req.body.ride_id;
  async.waterfall([
            function (cb) {
            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user)=> {
                if (error) {
                    cb({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        response_data: {}
                    });

                } else {

                     cb(null, user);
                }
            });
        },
        function(user,cb)
        {
        	//console.log(user);
              if (!user || (user && user.length === 0)) 
	           {
	           	//console.log('yes');
	                    return cb({
	                        message: constants.responseMessages.INVALID_ACCESS,
	                        status: constants.responseFlags.INVALID_ACCESS,
	                        current_ride_response: {}
	                    });
	            }
	            else
	            {
	            	var job_status=[3,4];
	                var driver_id=user[0]['driver_id'];
	                var get_current_data=`SELECT * FROM rides where id=? and driver_id=? and status NOT IN (3,4)`;
	                connection.query(get_current_data,[ride_id,driver_id],(error,rideDetail)=>{
	                	if(error){console.log(error);}else{cb(null,rideDetail);}
	                })
	                
	          	}
        },
        function (rideDetail,cb)
        {
        	if (!rideDetail || (rideDetail && rideDetail.length === 0)) 
	           {
	           	//console.log('yes');
	                    return cb({
	                        message: constants.responseMessages.DATA_NOT_FOUND,
	                        status: constants.responseFlags.DATA_NOT_FOUND,
	                        current_ride_response: {}
	                    });
	            }
	            else
	            {
		        	 var driver_data=`SELECT * FROM drivers WHERE id=?`;
		        	connection.query(driver_data,[rideDetail[0]['driver_id']],(error,driverData)=>
		        	{
		        	 	if(error){console.log(error);}else{
		        	 		var user_data=`SELECT * FROM user WHERE id=?`;
		        	 		connection.query(user_data,[rideDetail[0]['user_id']],(error,userData)=>{
		        	 			if(error)
		        	 			{
		        	 				console.log(error);
		        	 			}
		        	 			else{
		        	 				var address="'"+rideDetail[0]["destination"]+"'";
						             var options = {
						                  provider: 'google',
						                 
						                  // Optional depending on the providers
						                  httpAdapter: 'https', // Default
						                  apiKey: 'AIzaSyAXS6CYL9gR-egpnNSBj1lFcuABB_GIdSc', // for Mapquest, OpenCage, Google Premier
						                  formatter: null         // 'gpx', 'string', ...
						                };
						                 
						                var geocoder = NodeGeocoder(options);
						                 
						                // Using callback
						                geocoder.geocode(address, function(err, res) {
						                    
						                    var destination_latitude=res[0].latitude;
						                    var destination_longitude= res[0].longitude;
						                    var driver_avg_rating=0;
						                    var total_rating=driverData[0]['totalRating'];
											var total_user=driverData[0]['totalUser'];
											if(total_rating > 0)
											{
												driver_avg_rating= Math.ceil(total_rating/total_user);
											}
											var user_avg_rating = 0;
											var total_rating=userData[0]['totalRating'];
											var total_driver=userData[0]['totalDriver'];
											if(total_rating > 0)
											{
												user_avg_rating= Math.ceil(total_rating/total_driver);
											}
		                      
						                     var response_value=
		        	 				        {
				        	 					ride_id:rideDetail[0]['id'],
				        	 					source:rideDetail[0]['source'],
				        	 					destination:rideDetail[0]['destination'],
				        	 					pickup_latitude:rideDetail[0]['driver_lat'],
				        	 					pickup_longitude:rideDetail[0]['driver_long'],
				        	 					destination_latitude:destination_latitude,
				        	 					destination_longitude:destination_longitude,
				        	 					amount:rideDetail[0]['amount'],
				        	 					distance:rideDetail[0]['distance'],
				        	 					duration:rideDetail[0]['duration'],
				        	 					job_status:rideDetail[0]['status'],
				        	 					user_id:rideDetail[0]['user_id'],
				        	 					user_name:userData[0]['first_name'],
				        	 					user_phone:userData[0]['phone'],
				        	 					user_profile_image:userData[0]['profile_image'],
				        	 					user_rating:user_avg_rating,
				        	 					driver_id:rideDetail[0]['driver_id'],
				        	 					driver_name:driverData[0]['first_name'],
				        	 					driver_phone:driverData[0]['phone'],
				        	 					driver_latitude:driverData[0]['latitude'],
				        	 					driver_longitude:driverData[0]['longitude'],
				        	 					driver_profile_image:driverData[0]['profile_image'],
				        	 					driver_rating:driver_avg_rating,
				        	 					driver_job_status:driverData[0]['status']
		                                    }

		                                    return cb({
						                        message: constants.responseMessages.ACTION_COMPLETE,
						                        status: constants.responseFlags.ACTION_COMPLETE,
						                        current_ride_response : response_value
						                    });

						                });
		        	 				
		        	 			}
		        	 		})
		        	 	}
		        	 })
                }           
        }
    ], function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));
    });
}


exports.getDriverPaymentDetail=function(req,res)
{
  var session_id=req.body.session_id;
  async.waterfall([
            function (cb) {
            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user)=> {
                if (error) {
                    cb({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        response_data: {}
                    });

                } else {

                     cb(null, user);
                }
            });
        },
        function(user,cb)
        {
        	//console.log(user);
              if (!user || (user && user.length === 0)) 
	           {
	           	//console.log('yes');
	                    return cb({
	                        message: constants.responseMessages.INVALID_ACCESS,
	                        status: constants.responseFlags.INVALID_ACCESS,
	                        driver_payment_response: {}
	                    });
	            }
	            else
	            {
	            	var driver_id=user[0]['driver_id'];
	            	var driver_sql=`SELECT * FROM DriverTransaction WHERE DriverTransaction.driver_id = ? ORDER BY id DESC LIMIT 1`;
                    connection.query(driver_sql,[driver_id],(error,driverResult)=>{
                    	if(error)
                    	{
                    		console.log(error);
                    	}else
                    	{
                    		cb(null,driverResult);
                    	}
                    });
	                
	          	}
        },
        function(driverResult,cb)
        {
        	 if (!driverResult || (driverResult && driverResult.length === 0)) 
	           {
	           	//console.log('yes');
	                    return cb({
	                        message: constants.responseMessages.DATA_NOT_FOUND,
	                        status: constants.responseFlags.DATA_NOT_FOUND,
	                        driver_payment_response: {}
	                    });
	            }
	            else
	            {
	            	var payment_data= `SELECT payment.*, ride.source as ride_source, ride.destination as ride_destination, ride.status as ride_status,
                      DriverTransaction.credit as driver_credit FROM payment INNER JOIN DriverTransaction ON DriverTransaction.transaction_id = payment.transaction_id
                      LEFT JOIN rides ride ON ride.id=payment.ride_id  WHERE payment.driver_id = ? AND ride.status=?`;
                       connection.query(payment_data,[driverResult[0]['driver_id'],constants.jobStatus.ENDED],(error,paymentData)=>
                       {
                       	   if(error)
                       	   {
                              console.log(error);
                       	   }else
                       	   {
	                            cb(null,paymentData,driverResult);
                           }  
                       });
	            }
        },
        function(paymentData,driverResult,cb)
        {
        	 if(!paymentData || (paymentData && paymentData.length === 0))
        	 {
                    return cb
                    ({
	                    message: constants.responseMessages.DATA_NOT_FOUND,
	                    status: constants.responseFlags.DATA_NOT_FOUND,
	                    driver_payment_response: {}
	                });
        	 }
        	 else
        	 {
        	 	var payment_info=[]
                   paymentData.forEach(function(payment_detail){
                   	if(payment_detail['ride_status']==3){
                   		var status='Completed';
                   		var start_time='"'+completeRideData[0]['start_time']+'"';
						var end_time='"'+completeRideData[0]['end_time']+'"';
                   		var payment_response={
                        	id:payment_detail['id'],
                        	ride_id:payment_detail['ride_id'],
                        	ride_status:status,
                        	source:payment_detail['ride_source'],
                        	destination:payment_detail['ride_destination'],
                        	amount:'-'+payment_detail['driver_credit'],
                        	start_time:moment(start_time).format("hh:mm A"),
                            end_time:moment(end_time).format('hh:mm A'),
                        };
                   	}
                        
                        payment_info.push(payment_response);
                   });
                         return cb
                    ({
	                    message: constants.responseMessages.ACTION_COMPLETE,
	                    status: constants.responseFlags.ACTION_COMPLETE,
	                    total_balance_of_driver:driverResult[0]['balance'],
	                    driver_payment_response: payment_info
	                });
        	 }
        }
    ], function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));
    });
}

// module.exports = {
// 	 acceptRide:acceptRide,
// 	 changeRideStatus:changeRideStatus,
// 	 driverCancelRide:driverCancelRide,
// 	 getRideCurrentData:getRideCurrentData,
// 	 getDriverPaymentDetail:getDriverPaymentDetail
// }