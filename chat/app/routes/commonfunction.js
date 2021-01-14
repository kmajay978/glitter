/*eslint-disable */
const request = require('request');
const constants = require('./../constants');
const commonFunc = require('./commonfunction');
const async = require('async');
const md5 = require('MD5');
const FCM = require('fcm-node');
const autoAssign = require('./auto-assignment');
const jobs = require('./jobs');
const socketJs = require('./socket');
const _ =require('underscore');
const NodeGeocoder = require('node-geocoder');
const urlencode=require('urlencode');
var d_status=[];
d_status.push(constants.driverStatus.FREE);
d_status.push(constants.driverStatus.BUSY);

exports.getAllNearestAvailableAgents = function (data, callback) {
    var pickup_latitude=data.pickup_latitude;
    var pickup_longitude=data.pickup_longitude;
    var sql='SELECT d.* ,(6373 *  acos (cos ( radians('+pickup_latitude+') ) * cos( radians( d.latitude ) ) * cos(radians( d.longitude ) - radians('+pickup_longitude+') ) + sin ( radians('+pickup_latitude+') )* sin( radians( d.latitude ) ) ) ) AS distance '+
    'FROM drivers d '+
    'WHERE d.on_duty=? AND d.enabled=? AND d.status IN (?)'+
    'having distance < 50 ORDER BY distance limit 10';
    
        var query=connection.query(sql,[constants.driverOnlineStatus.ONLINE,constants.driverLoginStatus.ENABLED,d_status], function (error,result) {
            if (result && result.length > 0) {
              console.log(result);
                return callback(null, result);
            } else {
                return callback(null, []);
            }
        });console.log(query.sql);
};


exports.getThumbnailImage=function(data,callback){
   // console.log(data);
     var ride_id=data.ride_id;
     var ride_data='SELECT * FROM rides WHERE id=?';
    connection.query(ride_data,[ride_id], function(error,ride_result) {
        //console.log(ride_result);
        if(!ride_result || (ride_result && ride_result.length === 0))
        {
             return callback(null,[]);
        }
        else
        {
            
             var address="'"+ride_result[0]["destination"]+"'";
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
                    var origin_latitude=ride_result[0]['driver_lat'];
                    var origin_longitude=ride_result[0]['driver_long'];
                    var destination_latitude=res[0].latitude;
                    var destination_longitude= res[0].longitude;

                     var origin = origin_latitude+','+origin_longitude;
                     var destination = destination_latitude+','+destination_longitude;
                     getStaticGmapURLForDirection(origin,destination, function(getImage){
                        console.log(getImage);
                        return callback(null,getImage);
                    });
                 });
        }
    });
}



var getStaticGmapURLForDirection=function(origin,destination,callback,size = "700x300")
{
    //console.log(origin);
     var markers = [];
    var waypoints_labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
    var waypoints_label_iter = 0;

    markers.push("markers=color:green"+urlencode("|")+"label:"+urlencode(waypoints_labels[waypoints_label_iter++]+'|'+origin));
    
    markers.push("markers=color:green" +urlencode("|")+"label:"+urlencode(waypoints_labels[waypoints_label_iter]+'|'+destination));

    var url = "https://maps.googleapis.com/maps/api/directions/json?origin="+origin+"&destination="+destination+"&key=AIzaSyBMNL3jX4ScHjFtIYFqXUCUF9FX5gN9s9I";
    request(url, function (error, response, body) 
    {
                var data_value=JSON.parse(body)
                //console.log("data",data_value)
                if(data_value.status=='OK')
                {
                    console.log('1');
                    var polyline=data_value.routes[0].overview_polyline.points;
                    //console.log(overview_polyline);
                    var main_url="https://maps.googleapis.com/maps/api/staticmap?size="+size+"&maptype=roadmap&path=enc:"+polyline+"&"+markers;
                     // console.log(main_url);                
                      callback(main_url);
                }
                else
                {
                    console.log('2');
                      var main_url="http://18.218.112.191:81/uploads/map/staticmap.png";
                      callback(main_url);
                }
    });

              
}

exports.getShipmentType=function(zipcode1,zipcode2,callback)
{
   console.log(zipcode1);
   var zipcode_1=zipcode1.replace(' ', '')
   var zipcode_2=zipcode2.replace(' ', '');
   console.log(zipcode_2);
   var shiptype=[];
  var sql_data=`SELECT * FROM zipcodes WHERE zipcode = ?`;
  var query=connection.query(sql_data,[zipcode_1],function(error,result_data){
    
       if(error)
       {
           console.log(error);
       }
       else
       {
           var sql_data1=`SELECT * FROM zipcodes WHERE zipcode = ?`;
           connection.query(sql_data1,[zipcode_2],function(err,res){
              if(error)
              {
                  console.log(error);
              }
              else
              {
                 if(res[0]['depot_id']==result_data[0]['depot_id'])
                 {
                    var type='destination';
                 }
                 else
                 {
                    var type='depot';
                 }
              
                 shiptype.push(type);

              }

               return callback(null,type);   
           });
           

          
       }

  }); //console.log(query.sql);


}
exports.getDistance = function (lat1, lon1, lat2, lon2, decimals,callback) {
    decimals = decimals || 2;
    var earthRadius = 3959; // km
    lat1 = parseFloat(lat1);
    lat2 = parseFloat(lat2);
    lon1 = parseFloat(lon1);
    lon2 = parseFloat(lon2);

    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = earthRadius * c;
    var distance=Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
    //console.log(distance)
    return callback(null,distance);
};

exports.isValidPoints = function (points) {
    var regex = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/g;
    return (regex.test(points))
}

exports.addSeconds = function (date, seconds) {
    var newDate = new Date(date);
    newDate.setTime(newDate.getTime() + (seconds * 1000)); // add seconds
    return new Date(newDate)
}


exports.generateIncreasingIntegerRandomNumber = function (date1,callback) {
    //console.log(date1);
    var value = (new Date().getTime()).toString();
    if ((date1) && (date1 != '0000-00-00 00:00:00')) {
        value = (new Date(date1).getTime()).toString();
    } 
    value = md5(value + new Date().getTime() + module.exports.generateRandomStringAndNumbers());
   // console.log(value);
    return callback(null,value);
};


exports.generateRandomStringAndNumbers = function () {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

/*
 * ---------------------------
 * GET RIDE DETAILS FROM RIDE ID
 * ---------------------------
 */
exports.getRideDetailsFromRideID = function (rideID, callback) {
    var sql = `SELECT shipment.*, CONCAT_WS(' ', user.first_name, user.last_name) as customer_name
        FROM shipment
        INNER JOIN user ON user.id = shipment.user_id
        WHERE shipment.id = ? `;
    connection.query(sql, [rideID], function (err, result) {
        if (result && result.length > 0) {
            return callback(result);
        } else {
            return callback(0);
        }
    });
};

// Send notification to the driver with the given driver ID
// ASSUMPTION: The payload is same for both the devices
exports.sendNotificationToDriver = function (driver_id, payload,message_fleet) {
    console.log("driver_id ", driver_id);
    var get_user_device_info = `SELECT d.id, al.device_type, al.device_token 
    FROM drivers d
    INNER JOIN app_login al ON d.id = al.driver_id
    WHERE d.id=? AND al.device_token IS NOT NULL ORDER BY al.created_at DESC`;
    connection.query(get_user_device_info, [driver_id], function (err, result_user) {
      //console.log(result_user)
        if (result_user && result_user.length > 0) {
            sendFCMPushNotification(result_user, payload, constants.APP_TYPE.DRIVER,data,message_fleet);
        }
    });
};

// Send notification to the customer with the given customer ID
// ASSUMPTION: The payload is same for both the devices
exports.sendNotificationToCustomer = function (customer_id, payload,message_fleet) {
    var get_user_device_info = `SELECT u.id, al.device_type, al.device_token 
    FROM user u
    INNER JOIN app_login al ON u.id = al.user_id
    WHERE u.id=? AND al.device_token IS NOT NULL ORDER BY al.created_at DESC`;
    connection.query(get_user_device_info, [customer_id], function (err, result_user) {
        if (result_user && result_user.length> 0) {
            
            sendFCMPushNotification(result_user, payload, constants.APP_TYPE.CUSTOMER,message_fleet);
        }
    });
};

// Send FCM notification to the device
var sendFCMPushNotification = function (deviceInfo, pushMessage, appType,message_fleet) {

    try {
        var get_device_type_info = "SELECT * FROM `app_version` WHERE `app_type` = ?";
        connection.query(get_device_type_info, [appType], function (err, deviceAppVersionInfo) {
            if(!deviceAppVersionInfo || !deviceAppVersionInfo.length ){
                return;
            }

            console.log(deviceAppVersionInfo);

            var android_device_token_arr = [];
            var ios_device_token_arr = [];

            _.each(deviceInfo, function(el) { 
                if(el.device_type == constants.DEVICE_TYPE.ANDROID) {
                    console.log(el.device_token);
                    android_device_token_arr.push(el.device_token);
                } else {
                   console.log(el.device_token);
                    ios_device_token_arr.push(el.device_token);
                }
            });

            if(android_device_token_arr.length > 0) {
                //console.log(deviceInfo[0].path);
                var fcm1 = new FCM(deviceAppVersionInfo[0].path);
                var message1 = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                    registration_ids: android_device_token_arr,
                  //   notification: {
                  //     title: 'Odyssea', 
                  //     body: message_fleet
                  // },
                    data: pushMessage
                };

                fcm1.send(message1, function (err, response) {
                    //console.log(err);
                    if (err) {
                        console.log("Something has gone wrong!", err, response);
                    } else {
                        console.log("Successfully sent with response: ", response);
                    }
                });
            } 

            if(ios_device_token_arr.length > 0) {
                var fcm2 = new FCM(deviceAppVersionInfo[0].path); 
                  
                var message2 = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                    registration_ids: ios_device_token_arr,
                     notification: {
                      title: 'Odyssea', 
                      body: message_fleet
                  },
                  
                  data:pushMessage
                  
                      
                };

                fcm2.send(message2, function (err, response) {

                    if (err) {
                        console.log("Something has gone wrong!", err, response);
                        //console.log(err);
                    } else {
                        console.log("Successfully sent with response: ", response);
                    }
                });
            }

            
        })
    } catch (e) {
        console.log("========= Error in sending FCM Android Notification =======", e);
    }
};
