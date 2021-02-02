/*eslint-disable */
var commonFunc = require('./commonfunction');
var jobs = require('./jobs');
var moment = require('moment');
const constants = require('./../constants');
var async = require('async');
var geolib = require('geolib');
var _ = require('underscore');
var node_schedule = require('node-schedule');
/*----------------------------
 AUTO ASSIGNMENT FUNCTION
 ----------------------------
 */
exports.auto_assign_task = function (data, callback) {
  // console.log(data);
    var update = "UPDATE `shipment` SET `auto_assignment`=? WHERE id = ? LIMIT 1";
    connection.query(update, [constants.autoAssign.YES, data.ride_id], function (err, update_auto_assignment) {
        if (err) {
            callback(null, false);
        } else {
            getAgents(data, function (getAllNearestAvailableAgentsResult) {

                var fleets_length = getAllNearestAvailableAgentsResult.length;
               // console.log(fleets_length);
                if (fleets_length > 0) {
                    var driver_ids = [];
                    getAllNearestAvailableAgentsResult.forEach(function (fl) {

                        driver_ids.push(fl.driver_id);
                    });
                    console.log(driver_ids);

                     var sql = "INSERT INTO `schedules` (`user_id`,`shipment_id`,`drivers`,`enrolled_drivers`,`is_processed`,`expires_in`) VALUES (?,?,?,?,?,?)";
                     connection.query(sql, [data.user_id, data.ride_id, driver_ids.toString(),
                        driver_ids.toString(), 0, data.expires_in], function (err, schedules) {
                         if (err){
                             callback(err);
                         } else {
                             module.exports.processAgentsOneAtATime(data.ride_id);
                             callback(null, true);
                        }
                     });
                } else {
                    console.log('3');
                    //Run after 50 seconds
                    setTimeout(function () {
                disableAutoAssign(data.ride_id)
            }, 20000);
                    // setTimeout(, 50000);
                    // callback(null, true);
                }
            });
        }
    });
}

exports.auto_driver_assign_task = function (data, callback) {
    //console.log(data);
    var update = "UPDATE `rides` SET `auto_assignment`=? WHERE id = ? LIMIT 1";
    connection.query(update, [constants.autoAssign.YES, data.ride_id], function (err, update_auto_assignment) {
        if (err) {
            callback(null, false);
        } else {
             if (data.driver_id) {
                console.log('yee');
                    var sql = "INSERT INTO `schedules` (`user_id`,`ride_id`,`drivers`,`enrolled_drivers`,`is_processed`,`expires_in`) VALUES (?,?,?,?,?,?)";
                     connection.query(sql, [data.user_id, data.ride_id, data.driver_id,
                        data.driver_id, 0, data.expires_in], function (err, schedules) {
                         if (err){
                             callback(err);
                         } else {
                             module.exports.processAgentsOneAtATime(data.ride_id);
                             callback(null, true);
                        }
                     });
                } else {
                    console.log('no');
                    console.log('23');
                    //Run after 50 seconds
                    setTimeout(function () {
                  disableAutoAssign(data.ride_id)
                  }, 20000);
                    // setTimeout(, 50000);
                    // callback(null, true);
                }
            
        }
    });
}


exports.auto_nearest_driver=function(data,callback){
      fetchNearestAgents(data, function (getAllNearestAvailableAgentsResult) {
          return callback(getAllNearestAvailableAgentsResult);
      });
}


function fetchNearestAgents(data, callback) {
    var final_drivers=[];
    commonFunc.getAllNearestAvailableAgents(data, function (err, getAllFleetsResult) {
        //console.log(getAllFleetsResult);
         getAllFleetsResult.forEach(function (fleet) {
            final_drivers.push({
                "driver_id": fleet.id,
                "driver_name": fleet.first_name,
                "driver_lat": fleet.latitude,
                "driver_lng": fleet.longitude
            }); 
        });

         return callback(final_drivers);
    });
}


/*
 FIND ALL NEAREST AVAILABLE AGENTS DEPENDING UPON TASK TIME
 */
function getAgents(data, callback) {
    console.log(data);
    data.job_lat =  data.pickup_latitude;
    data.job_lng =  data.pickup_longitude;
    var driver_ids = [] , final_drivers=[];
    commonFunc.getAllNearestAvailableAgents(data, function (error,getAllFleetsResult) {
         getAllFleetsResult.forEach(function (fleets) {
         	//console.log(fleets);

             var j = data.job_lat + "," + data.job_lng;
             var f = fleets.latitude + "," + fleets.longitude;

            if (data.job_lat && data.job_lng && commonFunc.isValidPoints(j)
                && fleets.latitude && fleets.longitude && commonFunc.isValidPoints(f)) {
                fleets.distance = geolib.getDistance({
                    latitude: parseFloat(data.job_lat),
                    longitude: parseFloat(data.job_lng)
                }, {
                    latitude: parseFloat(fleets.latitude),
                    longitude: parseFloat(fleets.longitude)
                });
                fleets.distance = geolib.convertUnit('km', fleets.distance, 2);

                fleets.sort = Math.round(fleets.distance);
                driver_ids.push(fleets);
            }
        });

        driver_ids = _.sortBy(driver_ids, ['sort'], ['asc']);
        driver_ids.forEach(function (fleet) {
            final_drivers.push({
                "driver_id": fleet.id,
                "driver_name": fleet.first_name,
                "driver_lat": fleet.latitude,
                "driver_lng": fleet.longitude
            });
         });

         return callback(final_drivers);
    });
}

exports.rejectProcess=function(ride_id)
{
   var select_query = "SELECT * FROM `schedules` " +
        "WHERE `shipment_id`=? AND `is_processed` = 0 ORDER BY `id` DESC";
        connection.query(select_query,[ride_id], function (err, schedules) {
        if (err) {
            console.log(err);
        }
        //console.log(schedules);
        if (schedules && schedules.length > 0) {
            console.log("schedules ", schedules);
            schedules.forEach(function (sch) {
                var schedule_id=sch.id;
                var drivers = [];
                drivers = sch.drivers.split(',');
                //console.log(drivers);
                if (drivers.length > 0) {
                    sendPush(sch, drivers[0]);
                   // var update_driver='UPDATE `drivers` SET `status`=? WHERE `id`=?';
                // connection.query(update_driver,[constants.driverStatus.BUSY,drivers[0]],function(error,result)
                   // {
                         drivers.shift();
                    if (drivers.length > 0) {
                        var update_query = "UPDATE `schedules` " +
                            "SET `drivers`=? " +
                            "WHERE `id` = ?";
                        connection.query(update_query, [drivers.toString(), schedule_id], function (err, schedules) {
                            if (err) {
                                console.log(err);
                            }
                            var date = new Date();
                            var new_time = commonFunc.addSeconds(date, sch.expires_in);
                                var inp = {
                                ride_id: ride_id,
                                expires_in: sch.expires_in
                            };
                            sendPush(inp,drivers[0]);
                            var my_job = node_schedule.scheduleJob["schedule_auto_assign_" + ride_id.toString() + "_" + drivers[0].toString()];
                            my_job.cancel();
                            return;
                        });
                    } else {
                        var update_query = "UPDATE `schedules` " +
                            "SET `drivers`=?,`is_processed` = 1 " +
                            "WHERE `id` = ?";
                        connection.query(update_query, [null, schedule_id], function (err, schedules) {
                            if (err) {
                                console.log(err);
                            }
                            console.log('4');
                            //Run after 50 seconds
                            setTimeout(function () {
                            disableAutoAssign(sch.shipment_id)
                          }, 20000);

                        });
                    }
                  
                    
                }
            })
        }
    })
}



exports.processAgentsOneAtATime = function (ride_id) {
    var select_query = "SELECT * FROM `schedules` " +
        "WHERE `shipment_id`=? AND `is_processed` = 0 ORDER BY `id` DESC";
    connection.query(select_query,[ride_id], function (err, schedules) {
        if (err) {
            console.log(err);
        }
        //console.log(schedules);
        if (schedules && schedules.length > 0) {
            console.log("schedules ", schedules);
            schedules.forEach(function (sch) {
                var schedule_id=sch.id;
                var drivers = [];
                drivers = sch.drivers.split(',');
               
                if (drivers.length > 0) {
                     console.log(drivers[0]);
                    sendPush(sch, drivers[0]);
                    drivers.shift();
                    if (drivers.length > 0) {
                        var update_query = "UPDATE `schedules` " +
                            "SET `drivers`=? " +
                            "WHERE `id` = ?";
                        connection.query(update_query, [drivers.toString(), schedule_id], function (err, schedules) {
                            if (err) {
                                console.log(err);
                            }
                            var date = new Date();
                            var new_time = commonFunc.addSeconds(date, sch.expires_in);
                            //console.log(new_time);
                            scheduleNextAgent(drivers[0], drivers, sch.shipment_id, new_time, sch.expires_in);
                            return;
                        });
                    } else {
                        var update_query = "UPDATE `schedules` " +
                            "SET `drivers`=?,`is_processed` = 1 " +
                            "WHERE `id` = ?";
                        connection.query(update_query, [null, schedule_id], function (err, schedules) {
                            if (err) {
                                console.log(err);
                            }
                           // console.log('1');
                            //Run after 50 seconds
                            setTimeout(function () {
                            disableAutoAssign(sch.shipment_id)
                          }, 20000);

                        });
                    }
                }
            })
        }
    })
}

function scheduleNextAgent(driver_id, drivers, ride_id, new_time, expires_in) {
      console.log(ride_id);
    //Check driver already assigned for ride
    var query = "SELECT * FROM shipmentprocess WHERE refshipmentid = ? AND driver_id IS NOT NULL";
    connection.query(query, [ride_id], function (err, data) {
        if (data && data.length > 0) {
            console.log("Driver already assigned");
            return;
        } else {
            //Schedule job and send push to next driver  
            node_schedule.scheduleJob("schedule_auto_assign_" + ride_id.toString() + "_" + driver_id.toString(), new_time, function () {
                          var inp = {
                    ride_id: ride_id,
                    expires_in: expires_in
                };
              //  console.log(driver_id);
                sendPush(inp, driver_id);
                if (drivers.length > 1) {
                    drivers.shift();
                    var update_query = "UPDATE `schedules` " +
                        "SET `drivers`=? " +
                        "WHERE `shipment_id` = ?";
                    connection.query(update_query, [drivers.toString(), ride_id], function (err, schedules) {
                        if (err) {
                            console.log(err);
                        }
                        var date = new Date();
                        var new_time = commonFunc.addSeconds(date, expires_in);
                        scheduleNextAgent(drivers[0], drivers, ride_id, new_time, expires_in);
                        return;
                    });
                } else {
                    var update_query1 = "UPDATE `schedules` " +
                        "SET `drivers`=?,`is_processed` = 1 " +
                        "WHERE `shipment_id` = ?";
                    connection.query(update_query1, [null, ride_id], function (err, schedules) {
                        if (err) {
                            console.log(err);
                        }
                       // console.log('2');
                            //Run after 50 seconds
                            setTimeout(function () {
                          disableAutoAssign(ride_id)
                          }, 20000);
                        
                    });
                }
            });
        }
    });
}

function sendPush(input, driver_id) {

    console.log('d_id',driver_id)
    var message_fleet = input.name+' send message '+input.message;
            var data = getRideDetailsFromRideIDResult[0];
            var text = "";
                var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 8; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
            var payload_fleet = {
                user_id: input.user_id,
                notification_type:'message',
                message_fleet:message_fleet
            };
            commonFunc.sendNotificationToDriver(driver_id,payload_fleet,message_fleet);
        
    
}

// for stopping the normal auto assignment scenarios and update ride status
function disableAutoAssign(ride_id) {
   // console.log("ride_id ride_id#### ", ride_id);
    var sch = "SELECT * FROM shipment WHERE `id`=?  ORDER BY `id` DESC LIMIT 1";
    connection.query(sch, [ride_id], function (err, job) {
       // console.log(job);
        if (err) {
            console.log(err);
        } else if (job && job.length > 0) {
            if (job[0].status==constants.jobStatus.UNASSIGNED) {
                /* UPDATE rides 2 in auto assignment field*/
                var update = "UPDATE `shipment` SET `auto_assignment`=? WHERE `id` = ?";
                var params = [constants.autoAssign.NO_ONE_ACCEPTED, ride_id];
                var query= connection.query(update, params, function (err, update_auto_assignment)
                {
                    if (err) {
                        console.log("Error in updating 2 in auto assignment field in rides", update_auto_assignment);
                        return;
                    }
                    
                    //send notification to customer (No driver found)
                    var message= "No driver found";
                    var notification_response_data={
                        shipment_id:job[0]['id'],
                        notification_type:constants.notificationFlags.NO_DRIVER_FOUND,
                        message: "No driver found"
                    };
                   

                    commonFunc.sendNotificationToCustomer(job[0]['user_id'], notification_response_data,message);
                });
               // console.log(query.sql);
            }
        }
    });
}

exports.cancelJobSchedule = function (ride_id) {
  //  console.log("ride_id ride_id ", ride_id);
    var sch = "SELECT * FROM schedules WHERE `shipment_id` = ? AND is_processed = 0";
    connection.query(sch, [ride_id], function (err, schedules) {
        if (err) {
            console.log(err);
        } else {
            if (schedules && schedules.length > 0) {
                var fleets = schedules[0].drivers.split(',');
                if(fleets && fleets.length > 0) {
                    fleets.forEach(function (f) {
                        var scheduleIndex = "schedule_auto_assign_" + schedules[0].shipment_id.toString() + "_" + f.toString();
                        console.log("scheduleIndex ", scheduleIndex);
                        console.log("node_schedule.scheduledJobs ", node_schedule.scheduledJobs);
                        console.log("node_schedule.scheduledJobs[scheduleIndex] ", node_schedule.scheduledJobs[scheduleIndex]);
                        if (node_schedule.scheduledJobs[scheduleIndex]) {
                            node_schedule.scheduledJobs[scheduleIndex].cancel();
                            delete node_schedule.scheduledJobs[scheduleIndex];
                        }
                    })


                    var update_query = "UPDATE `schedules` SET `drivers`=?,`is_processed` = 1 WHERE `shipment_id` = ?";
                    connection.query(update_query, [null, ride_id], function (err, schedules) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            }
        }
    });
}


