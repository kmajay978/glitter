const autoload = require('./autoload');
const validate = require('./validate');
const async = require('async');
const constants = require('./../constants');
const autoAssign=require('./auto-assignment');
var moment = require('moment');
const commFunc=require('./commonfunction');
const NodeGeocoder = require('node-geocoder');
var distance=require('google-distance-matrix');
const config=require('config');

exports.getMessage=function(data,user2_id,callback) {
    async.waterfall([
        function (cb) {
            var sql = 'SELECT * FROM `messages` WHERE (`user_from_id`='+data+' AND `user_to_id`='+user2_id+') OR (`user_from_id`='+user2_id+' AND `user_to_id`='+data+')';
            connection.query(sql, (error, user)=> {
                if (error) {
                    cb({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        response_data: {}
                    });

                } else {

                     cb(null, {message_list: user});
                }
            });
        }
    ], function (error, result) {
      //console.log(result);
        return callback(error, result);
    });
}

exports.checkIfChannelExpired=function(channel, callback) {
    async.waterfall([
        function (cb) {
            let startTime = null;
            var sqlGetVideoCallCreateTime = "SELECT * FROM `video_call` where channel_name = ?";
            const query = connection.query(sqlGetVideoCallCreateTime, [channel], function(error, callStartTime) {
                if (error) {
                    console.log("can't get start time of video call...", error)
                }
                else {
                    startTime = callStartTime[0].created_at;
                    console.log("call started at: " + callStartTime[0].created_at)
                    if (startTime !== null) {
                        var start = moment(startTime); //start call date
                        var now = moment(new Date()); // now date
                        var duration = moment.duration(now.diff(start));
                        var hours = duration.asHours();
                        console.log("hours diff in call: "+ hours)
                        cb(null, hours > 24);
                    }
                    else {
                        // start time is nll
                        console.log(startTime, "wrong start time....");
                        cb(null, true)
                    }
                }
            })
        }
    ], function (error, result) {
        //console.log(result);
        return callback(error, result);
    });
}

exports.changeVideoCallStatus=function(status, channel, callback) {
    async.waterfall([
        function (cb) {
        console.log(status, channel, "lklklklklklklklklklklklklklklk")
            var sqlVideoCallStatus = "UPDATE video_call SET call_status = ? WHERE channel_name = ?";
            const query = connection.query(sqlVideoCallStatus, [status, channel], function(error, user) {
                if (error) {
                    console.log("can't change status", error);
                }
                else {
                    console.log("channel status changed", status)
                    cb(null, true)
                }
            })
            console.log(query, "query..")
        }
    ], function (error, result) {
        //console.log(result);
        return callback(error, result);
    });
}

exports.declineAudienceLiveVideoCall=function(user_id, channel, callback) {
    async.waterfall([
        function (cb) {
            var sql = "UPDATE video_live SET call_status = 3,updated_at = ? WHERE channel_name = ? and user_id = ? and call_status = 2";
            const query = connection.query(sql, [new Date().getTime(), channel, user_id], function(error, user) {
                if (error) {
                    console.log("can't change status.. of audience", error);
                }
                else {
                    console.log("channel status changed... audience...")
                    cb(null, true)
                }
            })
        }
    ], function (error, result) {
        //console.log(result);
        return callback(error, result);
    });
}

exports.declineHostLiveVideoCall=function(channel, callback) {
    async.waterfall([
        function (cb) {
            var sql = "UPDATE video_live SET call_status = 3 , updated_at = ? WHERE channel_name = ? and call_status IN (1 , 2)";
            var query=connection.query(sql,[new Date().getTime(),channel], (error, user)=> {

                if (error) {
                    console.log(error);
                    cb(null, false);

                } else {
                    cb(null, true);
                }

            });
        }
    ], function (error, result) {
        //console.log(result);
        return callback(error, result);
    });
}


exports.makeMeLive=function(data, callback) {
    async.waterfall([
        function (cb) {
            var sqlVideoCallStatus = "insert video_live values(null, ?,?,?,1,1,?,null)";
            const query = connection.query(sqlVideoCallStatus, [data.user_id, data.channel_name, data.channel_token, new Date().getTime()], function(error, resp) {
                if (error) {
                    console.log(error);
                    cb(null, false)
                }
                else {
                    cb(null, data)
                }
            })
            console.log(query, "query... baby")
        }
    ], function (error, result) {
        //console.log(result);
        return callback(error, result);
    });
}

// Gift send image
exports.sendGiftToSql = function (data, callback) { // file, filename,
    console.log('data', data);
    var reciever_id = data.reciever_id;
    var session_id = data.sessionId;
    var datetime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    async.waterfall([
        function (cb) {
            console.log(session_id, "session_id..")
            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user) => {
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
        function (user, cb) {
            if (!user || (user && user.length === 0)) {
                //console.log('yes');
                return cb({
                    message: constants.responseMessages.INVALID_ACCESS,
                    status: constants.responseFlags.INVALID_ACCESS,
                    driver_payment_response: {}
                });
            } else {
                //console.log(user);
                var sender_id = user[0]['user_id'];
                var sql = 'INSERT INTO `messages` (`user_from_id`,`user_to_id`,`message`, `media`,`created_at`,`updated_at`, `message_is_read`) VALUES(?,?,?,?,?,?,?)'
                var query = connection.query(sql, [sender_id, reciever_id, "", data.file, datetime, datetime, 1], (error, user) => {
                    if (error) {
                        console.log(error);
                        cb({
                            message: constants.responseMessages.ERROR_IN_EXECUTION,
                            status: constants.responseFlags.ERROR_IN_EXECUTION,
                            response_data: {}
                        });
                    } else {
                        var message_id = user.insertId;
                        var sql1 = `SELECT * FROM messages where user_from_id = ? AND user_to_id = ? ORDER BY id DESC`;
                        //var sql1=`SELECT * FROM messages where msg_id = ?  ORDER BY id DESC`;
                        connection.query(sql1, [sender_id, reciever_id], (error, message_data) => {
                            if (error) {
                                console.log(error);
                                cb({
                                    message: constants.responseMessages.ERROR_IN_EXECUTION,
                                    status: constants.responseFlags.ERROR_IN_EXECUTION,
                                    response_data: {}
                                });
                            } else {
                                var obj = {};
                                obj['status'] = 200;
                                obj['message'] = message_data[0]['message'];
                                obj['media'] = message_data[0]['media'];
                                obj['user_from_id'] = message_data[0]['user_from_id'];
                                obj['user_to_id'] = message_data[0]['user_to_id'];
                                obj['message_id'] = message_data[0]['id'];
                                obj['created_at'] = message_data[0]['created_at'];
                                obj['updated_at'] = message_data[0]['updated_at'];
                                cb(null, {obj});
                            }
                        })
                    }})
                // console.log(query, "query...")
            }
        }
    ], function (error, result) {
        return callback(error, result);
    })
}
// End gift here

exports.makeMeAudience=function(data, callback) {
    async.waterfall([
        function (cb) {
            var sqlVideoCallStatus = "insert video_live values(null, ?,?,?,2,2,?,null)";
            const query = connection.query(sqlVideoCallStatus, [data.user_id, data.channel_name, data.channel_token, new Date().getTime()], function(error, resp) {
                if (error) {
                    cb(null, false)
                }
                else {
                    cb(null, data)
                }
            })
        }
    ], function (error, result) {
        //console.log(result);
        return callback(error, result);
    });
}

exports.checkIfHostAndAudienceAreFrd=function(channel_name, user_id, callback) {
    async.waterfall([
        function (cb) {
            var sql = "SELECT * FROM `video_live` where channel_name = ? and user_id = ? and call_status = 2";
            const query = connection.query(sql, [channel_name, user_id], function(error, resp) {
                if (error) {
                    console.log(error);
                    cb(null, false)
                }
                else {
                    cb(null, resp)
                }
            })
        }
    ], function (error, result) {
        //console.log(result);
        return callback(error, result);
    });
}

exports.checkIfHostIsLive=function(channel_name, user_id, callback) {
    async.waterfall([
        function (cb) {
            var sql = "SELECT * FROM `video_live` where channel_name = ? and user_id = ? and call_status = 1";
            const query = connection.query(sql, [channel_name, user_id], function(error, resp) {
                if (error) {
                    console.log(error);
                    cb(null, false)
                }
                else {
                    cb(null, resp)
                }
            })
        }
    ], function (error, result) {
        //console.log(result);
        return callback(error, result);
    });
}

exports.getReceiverDetails = function(receiver_id, callback) {
    async.waterfall([
        function (cb) {
            var sqlGetReceiverDetails = "SELECT firstName,lastName,profilePics, occupation, DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(dob, '%Y') - (DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(dob, '00-%m-%d')) AS age  from users where id = ?";
            const query = connection.query(sqlGetReceiverDetails, [receiver_id], function(error, details) {
                if (error) {
                    console.log("can't get receiver id details....", error);
                }
                else {
                    cb(null, {details: details[0]})
                }
            })
        }
    ], function (error, result) {
        //console.log(result);
        return callback(error, result);
    });
}

exports.checkIfCallReceived = function(channel, callback) {
    async.waterfall([
        function (cb) {
            var sqlVideoCallStatus = "SELECT * FROM `video_call` where channel_name = ?";
            const query = connection.query(sqlVideoCallStatus, [channel], function(error, call) {
                if (error) {
                    console.log("can't change status", error);
                }
                else {
                    console.log(query, "hahahahahhahahahahaahaha")
                    cb(null, {status: call[0].call_status})
                }
            })
        }
    ], function (error, result) {
        //console.log(result);
        return callback(error, result);
    });
}

exports.getVideoLiveList = function(callback) {
    async.waterfall([
        function (cb) {
            var sqlVideoLiveList = "SELECT * FROM `video_live` where call_status=1";
            const query = connection.query(sqlVideoLiveList, function(error, list) {
                if (error) {
                    console.log("failed fetching the video live list...", error);
                    cb(null, [])
                }
                else {
                    console.log("video live list fetched....", list)
                    cb(null, list)
                }
            })
        }
    ], function (error, result) {
        //console.log(result);
        return callback(error, result);
    });
}


exports.sendMessage=function(data,callback)
{
    var reciever_id=data.reciever_id;
    var session_id=data.session_id;
    var message=data.message;
     var datetime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
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
              //console.log('yes');
                      return cb({
                          message: constants.responseMessages.INVALID_ACCESS,
                          status: constants.responseFlags.INVALID_ACCESS,
                          driver_payment_response: {}
                      });
              }else
              {
                //console.log(user);
                  var sender_id=user[0]['user_id'];
                  var device_type=user[0]['device_type'];
                  var sql = "INSERT INTO `messages` (`user_from_id`,`user_to_id`,`message`,`created_at`,`updated_at`, `message_is_read`) VALUES(?,?,?,?,?,?)";
                    var query=connection.query(sql,[sender_id,reciever_id,message,datetime,datetime, 1], (error, user)=> {

                        if (error) {
                          console.log(error);
                            cb({
                                message: constants.responseMessages.ERROR_IN_EXECUTION,
                                status: constants.responseFlags.ERROR_IN_EXECUTION,
                                response_data: {}
                            });

                        } else {

                           var message_id=user.insertId;
                           
                           var sql1=`SELECT * FROM messages where user_from_id = ? AND user_to_id = ? ORDER BY id DESC`;
                            //var sql1=`SELECT * FROM messages where msg_id = ?  ORDER BY id DESC`;
                              connection.query(sql1,[sender_id,reciever_id], (error, message_data)=> {
                                if(error)
                                 {
                                        console.log(error);
		                                     cb({
		                                    message: constants.responseMessages.ERROR_IN_EXECUTION,
		                                    status: constants.responseFlags.ERROR_IN_EXECUTION,
		                                    response_data: {}
		                                });
                                 }else
                                 {
                                    var obj = {};
                                  obj['status'] = 200;
                                  obj['message'] = message_data[0]['message'];
                                  obj['user_from_id'] = message_data[0]['user_from_id'];
                                  obj['user_to_id'] = message_data[0]['user_to_id'];
                                  obj['message_id'] = message_data[0]['id'];
                                  obj['created_at'] = message_data[0]['created_at'];
                                  obj['updated_at'] = message_data[0]['updated_at'];
                                     cb(null,{obj});

                                              
                                 }
                              })
                             
                        }

                    });
                }
            
        }
    ], function (error, result) {
        return callback(error, result);
    });
}



exports.getOrderData=function(response_data,callback){
  var session_id=response_data.sessionId;
  var order_id=response_data.orderId;
  async.waterfall([
        function (cb) 
        {
            //Vendor Login

            var sql = "SELECT * FROM app_login WHERE session_id = ?";
            connection.query(sql, [session_id], function(error, user) {
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
                    var user_id=user[0]['user_id'];
                    var sql1= "SELECT * FROM shipment WHERE user_id = ? AND id=?";
                    connection.query(sql1, [user_id,order_id], function(error, order)
                    {
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
                            if (!order || (order && order.length === 0))
                            {
                                return cb({
                                message: constants.responseMessages.DATA_NOT_FOUND,
                                status: constants.responseFlags.DATA_NOT_FOUND,
                                response_data: {}
                                });
                            }
                            else
                            {   
                                if(order[0].status==0)
                                {
                                    getLatLong(order[0].fromaddress,function(err,from_lat,from_long){
                                     var from_latitude=from_lat;
                                      var from_longitude=from_long;
                                        getLatLong(order[0].toaddress,function(err,to_lat,to_long){
                                            var to_latitude=to_lat;
                                            var to_longitude=to_long;
                                            auto_nearest_driver_result={
                                                order_id:order[0].id,
                                                source_address:order[0].fromaddress,
                                                source_latitude:from_latitude,
                                                source_longitude:from_longitude,
                                                destination_address:order[0].toaddress,
                                                destination_latitude:to_latitude,
                                                destination_longitude:to_longitude,
                                                order_status:order[0].status
                                            };

                                            cb(null, {order_list: auto_nearest_driver_result});
                                        })
                                    }); 
                                }
                                else
                                {
                                    var sql2 = "SELECT * FROM shipmentprocess WHERE refshipmentid = ?";
                                    connection.query(sql2, [order_id], function(error, order_data)
                                    {
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
         
                                             if (!order_data || (order_data && order_data.length === 0)) 
                                                {
                                                    return cb({
                                                                message: constants.responseMessages.DATA_NOT_FOUND,
                                                                status: constants.responseFlags.DATA_NOT_FOUND,
                                                                response_data: {}
                                                                });
                                                }
                                                else
                                                {
                                                    var sql4 = "SELECT * FROM drivers WHERE id = ?";
                                                    connection.query(sql4,[order_data[0].driver_id],function(error,driver)
                                                    {
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
                                                            auto_nearest_driver_result={
                                                            order_id:order_data[0].id,
                                                            source_address:order_data[0].fromaddress,
                                                            source_latitude:order_data[0].s_lat,
                                                            source_longitude:order_data[0].s_long,
                                                            destination_address:order_data[0].toaddress,
                                                            destination_latitude:order_data[0].d_lat,
                                                            destination_longitude:order_data[0].d_long,
                                                            driver_latitude:driver[0].latitude,
                                                            driver_longitude:driver[0].longitude,
                                                            order_status:order[0].status
                                                                            };

                                                                            cb(null, {order_list: auto_nearest_driver_result});
                                                        }
                                                    });
                                                }
        
                                        }
                                    });
                                }
                                 
                            } 
                           
                        }
                    });
                }
        }
    
    ], function (error, result) {
        return callback(error, result);
       // res.send(JSON.stringify(response));

    });
}

function getLatLong(location,callback){
    var address="'"+location+"'";
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
                    var latitude=res[0].latitude;
                    var longitude= res[0].longitude;
                    return callback(null,latitude,longitude);
                    });
}

function getDistance(req,res)
{
    var origin=req.body.origin;
    var destination=req.body.destination;
    var origins=['"'+origin+'"'];
    var destinations=['"'+destination+'"'];
    distance.key('AIzaSyBMNL3jX4ScHjFtIYFqXUCUF9FX5gN9s9I ');
    //ssssdistance.apiKey = ' ';
  distance.matrix(origins, destinations, function (err, distances) {
    // console.log(distances);
    if (err) {
        return console.log(err);
    }
    if(!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                    var distance = distances.rows[i].elements[j].distance.text;
                    var distance =distance.replace('km','');
                    var duration=distances.rows[i].elements[j].duration.text;
                    console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                     console.log('Duration from ' + origin + ' to ' + destination + ' is ' + duration);
                } else {
                    console.log(destination + ' is not reachable by land from ' + origin);
                }
            }
        }
    }
});
}

exports.sendVoiceToSql = function (data, callback) {
    console.log('data', data);
    var reciever_id = data.reciever_id;
    var session_id = data.sessionId;
    var datetime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    async.waterfall([
        function (cb) {
            console.log(session_id, "session_id..")
            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user) => {
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
        function (user, cb) {
            if (!user || (user && user.length === 0)) {
                //console.log('yes');
                return cb({
                    message: constants.responseMessages.INVALID_ACCESS,
                    status: constants.responseFlags.INVALID_ACCESS,
                    driver_payment_response: {}
                });
            } else {
                //console.log(user);
                var sender_id = user[0]['user_id'];
                var sql = 'INSERT INTO `messages` (`user_from_id`,`user_to_id`,`message`, `media`, `audio`, `created_at`,`updated_at`, `message_is_read`) VALUES(?,?,?,?,?,?,?,?)'
                var query = connection.query(sql, [sender_id, reciever_id, "", "", data.blob, datetime, datetime, 1], (error, user) => {
                    if (error) {
                        console.log(error);
                        cb({
                            message: constants.responseMessages.ERROR_IN_EXECUTION,
                            status: constants.responseFlags.ERROR_IN_EXECUTION,
                            response_data: {}
                        });

                    } else {

                        var message_id = user.insertId;

                        var sql1 = `SELECT * FROM messages where user_from_id = ? AND user_to_id = ? ORDER BY id DESC`;
                        //var sql1=`SELECT * FROM messages where msg_id = ?  ORDER BY id DESC`;
                        connection.query(sql1, [sender_id, reciever_id], (error, message_data) => {
                            if (error) {
                                console.log(error);
                                cb({
                                    message: constants.responseMessages.ERROR_IN_EXECUTION,
                                    status: constants.responseFlags.ERROR_IN_EXECUTION,
                                    response_data: {}
                                });
                            } else {
                                var obj = {};
                                obj['status'] = 200;
                                obj['message'] = message_data[0]['message'];
                                obj['media'] = message_data[0]['media'];
                                obj['audio'] = message_data[0]['audio'];
                                obj['user_from_id'] = message_data[0]['user_from_id'];
                                obj['user_to_id'] = message_data[0]['user_to_id'];
                                obj['message_id'] = message_data[0]['id'];
                                obj['created_at'] = message_data[0]['created_at'];
                                obj['updated_at'] = message_data[0]['updated_at'];
                                cb(null, {obj});


                            }
                        })
                    }})

                // console.log(query, "query...")
            }
        }
    ], function (error, result) {
        return callback(error, result);
    })
}
exports.sendImageToSql = function (data, callback) { // file, filename,
    console.log('data', data);
    var reciever_id = data.reciever_id;
    var session_id = data.sessionId;
    var datetime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    async.waterfall([
        function (cb) {
        console.log(session_id, "session_id..")
            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user) => {
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
        function (user, cb) {
            if (!user || (user && user.length === 0)) {
                //console.log('yes');
                return cb({
                    message: constants.responseMessages.INVALID_ACCESS,
                    status: constants.responseFlags.INVALID_ACCESS,
                    driver_payment_response: {}
                });
            } else {
                //console.log(user);
                var sender_id = user[0]['user_id'];
                var sql = 'INSERT INTO `messages` (`user_from_id`,`user_to_id`,`message`, `media`,`created_at`,`updated_at`, `message_is_read`) VALUES(?,?,?,?,?,?,?)'
                var query = connection.query(sql, [sender_id, reciever_id, "", data.file, datetime, datetime, 1], (error, user) => {
                    if (error) {
                        console.log(error);
                        cb({
                            message: constants.responseMessages.ERROR_IN_EXECUTION,
                            status: constants.responseFlags.ERROR_IN_EXECUTION,
                            response_data: {}
                        });

                    } else {

                        var message_id = user.insertId;

                        var sql1 = `SELECT * FROM messages where user_from_id = ? AND user_to_id = ? ORDER BY id DESC`;
                        //var sql1=`SELECT * FROM messages where msg_id = ?  ORDER BY id DESC`;
                        connection.query(sql1, [sender_id, reciever_id], (error, message_data) => {
                            if (error) {
                                console.log(error);
                                cb({
                                    message: constants.responseMessages.ERROR_IN_EXECUTION,
                                    status: constants.responseFlags.ERROR_IN_EXECUTION,
                                    response_data: {}
                                });
                            } else {
                                var obj = {};
                                obj['status'] = 200;
                                obj['message'] = message_data[0]['message'];
                                obj['media'] = message_data[0]['media'];
                                obj['user_from_id'] = message_data[0]['user_from_id'];
                                obj['user_to_id'] = message_data[0]['user_to_id'];
                                obj['message_id'] = message_data[0]['id'];
                                obj['created_at'] = message_data[0]['created_at'];
                                obj['updated_at'] = message_data[0]['updated_at'];
                                cb(null, {obj});


                            }
                        })
                    }})

                // console.log(query, "query...")
            }
        }
    ], function (error, result) {
        return callback(error, result);
    })
}
function getThumbnail(req,res)
{
     var ride_id=req.body.ride_id;
    var ride_response_data={
        ride_id:ride_id
    };
   commFunc.getThumbnailImage(ride_response_data,function(error,getThumbResult){
    console.log(getThumbResult)
   })
}

//Function For User Ride Status
function userRideStatus(req,res)
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
                    var user_id=user[0]['user_id'];
                    var driver_sql=`SELECT ride.*, CONCAT_WS(' ', user.first_name, user.last_name) as customer_name,
        CONCAT_WS(' ', driver.first_name, driver.last_name) as driver_name, driver.email as driver_email, driver.phone as driver_phone,
        driver.latitude as driver_latitude, driver.longitude as driver_longitude
        FROM rides ride
        INNER JOIN user ON user.id = ride.user_id
        LEFT JOIN drivers driver ON driver.id=ride.driver_id
        WHERE ride.user_id = ? AND ride.status IN(1,2,3,4) ORDER BY id DESC LIMIT 1`;
                    connection.query(driver_sql,[user_id],(error,driverResult)=>{
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

function order(req, res) {
    var session_id = req.body.session_id;
    var packages = req.body.packages;
    var package_size = req.body.package_size;
    var fromaddress=req.body.fromaddress;
    var toaddress=req.body.toaddress;
    var deliveryon=req.body.deliveryon;
    var shipment_type=req.body.shipment_type;
    var amount=req.body.amount;
    var permilerate=req.body.per_mile_rate?req.body.per_mile_rate:"";
    var fromzipcode=req.body.fromzipcode;
    var tozipcode=req.body.tozipcode;
    var pickup_latitude=req.body.pickup_latitude;
    var pickup_longitude=req.body.pickup_longitude;
    var destination_latitude=req.body.destination_latitude;
    var destination_longitude=req.body.destination_longitude;
    var source_company_name=req.body.source_company_name;
    var source_address2=(req.body.source_address2?req.body.source_address2:'') || '';
    var source_city=req.body.source_city;
    var source_state=req.body.source_state;
    var desti_company_name=req.body.desti_company_name;
    var desti_address2=(req.body.desti_address2?req.body.desti_address2:'')  || '';
    var desti_city=req.body.desti_city;
    var desti_state=req.body.desti_state;
    var total_distance=req.body.total_distance;
    async.waterfall([
        function (cb) {
            //Vendor Login

            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user)=> {
                if (error) {
                    cb({
                        status_code: constants.responseFlags.ERROR_IN_EXECUTION,
                        error:"",
                        error_message: constants.responseMessages.ERROR_IN_EXECUTION,
                        
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
                        status_code: constants.responseFlags.INVALID_ACCESS,
                        error:true,
                        error_message: constants.responseMessages.INVALID_ACCESS,
                     });
            }
            else
            {
                var user_id=user[0]['user_id'];
                var additional_sql=`SELECT * FROM additional_info`;
                connection.query(additional_sql, (error, addnl_info)=> 
                {
                    if(error)
                    {
                        cb({
                          status_code: constants.responseFlags.ERROR_IN_EXECUTION,
                          error:true,
                          error_message: constants.responseMessages.ERROR_IN_EXECUTION,
                         });
                    }
                    else
                    {
                        var admin_amount=Math.round(((10*parseFloat(amount))/100),2);
                        var shipment_amount=Math.round(parseFloat(amount)-parseFloat(admin_amount),2);
                        var datetime=moment.utc().format('YYYY-MM-DD HH:mm:ss');
                        commFunc.generateIncreasingIntegerRandomNumber(datetime,function(err, getTime)
                        {
                            var trackingorder=getTime;

                            var sql_data='INSERT INTO `shipment` (`user_id`,`trackingorder`,`packages`,`package_size`,`fromaddress`,`toaddress`,`fromzipcode`,`tozipcode`,`deliveryon`,`shipment_type`,`amount`,`admin_amount`,`shipment_amount`,`per_mile_rate`,`total_distance`,`status`,`pickup_latitude`,`pickup_longitude`,`destination_latitude`,`destination_longitude`,`created_at`,`updated_at`,`source_company_name`,`source_address2`,`source_city`,`source_state`,`desti_company_name`,`desti_address2`,`desti_city`,`desti_state`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                            var query=connection.query(sql_data,[user_id,trackingorder,packages,package_size,fromaddress,toaddress,fromzipcode,tozipcode,deliveryon,shipment_type,amount,admin_amount,shipment_amount,permilerate,total_distance,constants.jobStatus.UNASSIGNED,pickup_latitude,pickup_longitude,destination_latitude,destination_longitude,datetime,datetime,source_company_name,source_address2,source_city,source_state,desti_company_name,desti_address2,desti_city,desti_state],(error,insert_data)=>
                            {
                                 console.log(error);
                                if(error)
                                {
                                    cb
                                    ({
                                        status_code: constants.responseFlags.ERROR_IN_EXECUTION,
                                        error:true,
                                       error_message: constants.responseMessages.ERROR_IN_EXECUTION,
                                    });
                                }
                                else
                                {
                                    var auto_assignment_response_data = 
                                                    {
                                                        ride_id:insert_data.insertId,
                                                        user_id:user_id,
                                                        pickup_latitude:destination_latitude,
                                                        pickup_longitude:destination_longitude,
                                                        expires_in:addnl_info[0]['expires_in']
                                                    };

                                                autoAssign.auto_assign_task(auto_assignment_response_data, function (auto_assign_task_result) 
                                                {
                                                    console.log(auto_assign_task_result);
                                                });
                                             
                                    

                                    cb
                                    ({
                                        status_code: constants.responseFlags.ACTION_COMPLETE,
                                        error:false,
                                        error_message:"",
                                        message: constants.responseMessages.ACTION_COMPLETE1,
                                        trackingorder: trackingorder
                                    });
                                }
                                   
                            });
                            console.log(query.sql);
                        });
                                
                    }
                        
                
                });
            }
        }
    
    ], function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));

    });
}

exports.nearestDriver=function(response_data,callback){
    var job_response_data=JSON.parse(response_data)
  var session_id=job_response_data.identifier;
  var latitude=job_response_data.latitude;
  var longitude=job_response_data.longitude;
  async.waterfall([
        function (cb) {
            //Vendor Login

            var sql = "SELECT * FROM app_login WHERE session_id = ?";
            connection.query(sql, [session_id], function(error, user) {
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
                    var user_id=user[0]['user_id'];
                    var driver_response_data={
                        pickup_latitude:latitude,
                        pickup_longitude:longitude
                        };
                      autoAssign.auto_nearest_driver(driver_response_data, function(auto_nearest_driver_result){
                         cb(null, {driver_list: auto_nearest_driver_result});
                      })
                    
                        
            }
        }
    
    ], function (error, result) {
        return callback(error, result);
       // res.send(JSON.stringify(response));

    });
}

//Function For User Cancel Ride Api
function userCancelRide(req,res)
{
    var session_id=req.body.session_id;
    var ride_id=req.body.ride_id;
    async.waterfall([
        function (cb) {
            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user) => {
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
                            response_data: {}
                        });
                }
                else
                {
                    var ride_detail=`SELECT * FROM rides WHERE id=? and status=?`;
                    connection.query(ride_detail,[ride_id,constants.jobStatus.ASSIGNED],(error,rideData)=>{
                        if(error)
                        {
                            console.log(error);
                        }else{
                            if(!rideData || (rideData && rideData.length === 0))
                            {
                                      return cb({
                                        message: constants.responseMessages.DATA_NOT_FOUND,
                                        status: constants.responseFlags.ACTION_COMPLETE_2,
                                        response_data: {}
                                    });
                            }
                            else
                            {
                                            //console.log('no');
                                var user_id=user[0]['user_id'];
                                var ride_response_data={
                                    ride_id:ride_id
                                };
                                
                               var customer_cancellation_time=moment.utc().format('YYYY-MM-DD HH:mm:ss');
                                commFunc.getThumbnailImage(ride_response_data,function(error,getThumbnailImageResult)
                                {
                                    var thumbnail_image=getThumbnailImageResult || null;
                                    var cancel_ride='UPDATE `rides` SET `status`=? , `customer_cancellation_time`=?,`thumbnail_image`=? WHERE `id`=?';
                                    var query=connection.query(cancel_ride,[constants.jobStatus.CANCELLED,customer_cancellation_time,thumbnail_image,ride_id],(error,result)=>
                                    {
                                       // console.log("update query ", cancel_ride);
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
                                            var ride_data=`SELECT * FROM rides WHERE id=? AND user_id=?`;
                                            var query = connection.query(ride_data,[ride_id,user_id],(error,cancel_ride_data)=>
                                            {
                                              //  console.log("cancel_ride_data ", cancel_ride_data);
                                               // console.log("11111 ",ride_data, " ", ride_id, " ", user_id);
                                                if(error)
                                                {
                                                    cb
                                                    ({
                                                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                                                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                                                        response_data: {}
                                                    });
                                                }
                                                else
                                                {
                                                    var update_cancel_driver='UPDATE `drivers` SET `status`=?  WHERE `id`=?';
                                                    var query=connection.query(update_cancel_driver,[constants.driverStatus.FREE,cancel_ride_data[0]['driver_id']],(error,result)=>
                                                    {
                                                          if(error){
                                                            console.log(error);
                                                        }else{ 
                                                            cb(null,cancel_ride_data); 
                                                        }
                                                    });
                                                }
                                            });
                                            
                                        }
                                       
                                    });
                                 
                                });
                            }

                        }
                    })

                    
                    
                }
        },
        function(cancel_ride_data,cb)
        {
            var message_fleet = 'Canceled your ride by rider';
             var userInfo=`SELECT * FROM user WHERE id=?`;
             connection.query(userInfo,[cancel_ride_data[0]['user_id']],(error,userDetail)=>
             {
                if(error)
                {
                    cb
                    ({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        response_data: {}
                    });
                }
                else
                {
                    var user_avg_rating = 0;
                    var total_rating=userDetail[0]['totalRating'];
                    var total_user=userDetail[0]['totalDriver'];
                    if(total_rating > 0)
                    {
                        user_avg_rating= Math.ceil(total_rating/total_user);
                    }
                    var notification_response_data={
                        user_id:userDetail[0]['id'],
                        user_name:userDetail[0]['first_name'],
                        user_phone:userDetail[0]['phone'],
                        user_rating:user_avg_rating,
                        message:message_fleet,
                        notification_type:constants.notificationFlags.RIDE_CANCEL
                        };
                    commFunc.sendNotificationToDriver(cancel_ride_data[0]['driver_id'], notification_response_data);
                    cb
                    (null, {
                        message: constants.responseMessages.ACTION_COMPLETE,
                        status: constants.responseFlags.ACTION_COMPLETE,
                        response_data: {}
                    });
                }
             });
        }
    ], function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));
    });
}

function getUserRideCurrentData(req,res)
{
    //console.log('hello world');
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
                //console.log('yesyyy');
                        return cb({
                            message: constants.responseMessages.INVALID_ACCESS,
                            status: constants.responseFlags.INVALID_ACCESS,
                            current_ride_response: {}
                        });
                }
                else
                {
                    //console.log('yesyyydadd');
                    var job_status=[3,4];
                    var user_id=user[0]['user_id'];
                   // console.log(user_id);
                    var get_current_data=`SELECT * FROM rides where id=? and user_id=? and status NOT IN (3,4)`;
                    var query=connection.query(get_current_data,[ride_id,user_id],(error,rideDetail)=>{
                        if(error){console.log(error);}else{ cb(null,rideDetail);}
                    })
                    console.log(query.sql);
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
                                                driver_job_status:driverData[0]['status'],
                                                cab_number:driverData[0]['cab_number'],
                                                cab_model:driverData[0]['cab_model'],
                                                cab_color:driverData[0]['cab_color'],
                                                payment_type:rideDetail[0]['payment_type']

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

module.exports = {
	 order:order,
     userCancelRide:userCancelRide,
     getUserRideCurrentData:getUserRideCurrentData,
     userRideStatus:userRideStatus,
     getDistance:getDistance,
     getThumbnail:getThumbnail
}
