const async = require('async');
const constants = require('./../constants');
const config=require('config');
const md5=require('MD5');
var serverkey=config.get('fcmnodeCredential.serverKey')
var FCM = require('fcm-node');
var fcm = new FCM(serverkey);
exports.pickOrder=(req,res,next)=>{
    async.waterfall([
        function (cb) {
          var sql = `select user_id from shipment where trackingorder=?`;
            connection.query(sql, [req.body.trackingorder], (error, user)=> {
                if(error){
                    console.log("error",error);
                    cb({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        data: {}
                    });
                }
                else{
                    console.log("result",user);
                    if(user.length>0){
                        var sql=`select device_token from app_login where user_id=? ORDER BY user_id desc LIMIT 1`;
                        connection.query(sql,[user[0].user_id],(error,user)=>{
                            if(error){
                                console.log("error",error);
                                cb({
                                    message: constants.responseMessages.ERROR_IN_EXECUTION,
                                    status: constants.responseFlags.ERROR_IN_EXECUTION,
                                    data: {}
                                });
                            }
                            else{
                                console.log("result",user);
                                if(user[0].device_token==null){
                                    cb({
                                        message: constants.responseMessages.NULLDEVICETOKEN,
                                        status: constants.responseFlags.NULLDEVICETOKEN,
                                        data: {}
                                    });
                                }
                                else{
                                    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                        to: user[0].device_token,                      
                                        notification: {
                                            title: 'Pick up order', 
                                            body: 'you pick up the order from '+req.body.source+' to '+ req.body.destination
                                        },
                                        /* data: {  //you can send only notification or only data(or include both)
                                            my_key: 'my value',
                                            my_another_key: 'my another value'
                                        }*/
                                    };
                                    fcm.send(message, function(err, response){
                                        if (err) {
                                            cb({
                                                message: constants.responseMessages.SERVERDOESNOTSUPPORT,
                                                status: constants.responseFlags.SERVERDOESNOTSUPPORT,
                                                data: {}
                                            });
                                        } else {
                                            console.log("result",response);
                                            cb({
                                                message: constants.responseMessages.CANCELNOTIFICATION,
                                                status: constants.responseFlags.NOTIFICATIONSEND                                               
                                            });
                                       }
                                    });
                              }
                            }
                        })
                    }
                    else{
                        cb({
                            message: constants.responseMessages.TRACKING_ORDER_NOT_FOUND,
                            status: constants.responseFlags.INVALID_TRACKINGORDER,
                            data: user[0]
                        });
                    }
                }             
            });
        }
    ], function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));

    });
   
}
exports.cancelOrder=(req,res,next)=>{
    async.waterfall([
        function (cb) {
          var sql = `select user_id from shipment where trackingorder=?`;
            connection.query(sql, [req.body.trackingorder], (error, user)=> {
                if(error){
                    console.log("error",error);
                    cb({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        data: {}
                    });
                }
                else{
                    console.log("result",user);
                    if(user.length>0){
                        var sql=`select device_token from app_login where user_id=? ORDER BY user_id desc LIMIT 1`;
                        connection.query(sql,[user[0].user_id],(error,user)=>{
                            if(error){
                                console.log("error",error);
                                cb({
                                    message: constants.responseMessages.ERROR_IN_EXECUTION,
                                    status: constants.responseFlags.ERROR_IN_EXECUTION,
                                    data: {}
                                });
                            }
                            else{
                                console.log("result",user);
                                if(user[0].device_token==null){
                                    cb({
                                        message: constants.responseMessages.NULLDEVICETOKEN,
                                        status: constants.responseFlags.NULLDEVICETOKEN,
                                        data: {}
                                    });
                                }
                                else{
                                    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                        to: user[0].device_token,                      
                                        notification: {
                                            title: 'Cancel order', 
                                            body: 'cancel the order from '+req.body.source+' to '+ req.body.destination
                                        },
                                        /* data: {  //you can send only notification or only data(or include both)
                                            my_key: 'my value',
                                            my_another_key: 'my another value'
                                        }*/
                                    };
                                    fcm.send(message, function(err, response){
                                        if (err) {
                                            cb({
                                                message: constants.responseMessages.SERVERDOESNOTSUPPORT,
                                                status: constants.responseFlags.SERVERDOESNOTSUPPORT,
                                                data: {}
                                            });
                                        } else {
                                            console.log("result",response);
                                            cb({
                                                                                              
                                            });
                                       }
                                    });
                              }
                            }
                        })
                    }
                    else{
                        cb({
                            message: constants.responseMessages.TRACKING_ORDER_NOT_FOUND,
                            status: constants.responseFlags.INVALID_TRACKINGORDER,
                            data: user[0]
                        });
                    }
                }             
            });
        }
    ], function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));

    });

}