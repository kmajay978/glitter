const autoload = require('./autoload');
const validate = require('./validate');
const async = require('async');
const constants = require('./../constants');
const autoAssign=require('./auto-assignment');
const commFunc=require('./commonfunction');
var moment = require('moment');
const NodeGeocoder = require('node-geocoder');
const emailModule = require('./emailModule');


exports.pickOrder=function(req,res)
{
    var session_id=req.body.session_id;
    var order_id=req.body.order_id;
    async.waterfall([
         function (cb) {
            var sql = `SELECT * FROM app_login WHERE session_id = ?`;
            connection.query(sql, [session_id], (error, user)=> {
                if (error) 
                {
                    cb({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        response_data: {}
                    });

                } 
                else 
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
                            
                        });
                }
                else
                {
                    var driver_id=user[0]['driver_id'];
                    var ids=[];
                    var order_ids=order_id.split(',');
                    order_ids.forEach(function(id){
                        ids.push(id);
                    })
                    console.log(ids);
                    var driver_sql=`SELECT * FROM shipmentprocess WHERE id =?`;
                    connection.query(driver_sql,[order_id],(error,shipResult)=>
                    {
                        if(error)
                        {
                            cb
                            ({
                                message: constants.responseMessages.ERROR_IN_EXECUTION,
                                status: constants.responseFlags.ERROR_IN_EXECUTION,
                                
                            });
                        }
                        else
                        {
                            if (!shipResult || (shipResult && shipResult.length === 0)) 
                            {
                                cb
                                ({
                                    message: constants.responseMessages.response_data_NOT_FOUND,
                                    status: constants.responseFlags.response_data_NOT_FOUND,
                                    
                                });
                            }
                            else
                            {
                               // shipResult.forEach(function(ship_data)
                                //{
                                     var update_status='UPDATE `shipmentprocess` SET `driver_status`=? WHERE `id`=?';
                                     connection.query(update_status,[constants.driverJobStatus.PICKUP,shipResult[0]['id']],(error,update_data)=>
                                    {
                                        if(error)
                                        {
                                            cb
                                            ({
                                                message: constants.responseMessages.ERROR_IN_EXECUTION,
                                                status: constants.responseFlags.ERROR_IN_EXECUTION,
                                                    
                                            });
                                        }
                                        else
                                        {
                                            var update_ship_status='UPDATE `shipment` SET `status`=? WHERE `id`=?';
                                            connection.query(update_ship_status,[constants.jobStatus.STARTED,shipResult[0]['refshipmentid']],(err,ship_update)=>
                                            {
                                                if(error)
                                                {
                                                    cb
                                                    ({
                                                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                                                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                                                    });
                                                }
                                                else
                                                {

                                                    var ship_data=`SELECT * FROM shipment WHERE id=?`;
                                                    connection.query(ship_data,[shipResult[0]['refshipmentid']],(errs,res_data)=>
                                                    {
                                                        if(errs)
                                                        {
                                                            cb
                                                            ({
                                                                message: constants.responseMessages.ERROR_IN_EXECUTION,
                                                                status: constants.responseFlags.ERROR_IN_EXECUTION,
                                                            });
                                                        }
                                                        else
                                                        {

                                                            var message_fleet = 'Your order is picked successfully';

                                                                var notification_response_data={
                                                                notification_type:constants.notificationFlags.RIDE_COMPLETE,
                                                                message:message_fleet,
                                                                
                                                               };

                                                         commFunc.sendNotificationToCustomer(res_data[0]['user_id'], notification_response_data,message_fleet);
  
                                                            cb
                                                            ({
                                                                status_code: constants.responseFlags.ACTION_COMPLETE,
                                                                message: constants.responseMessages.PACKAGE_PICK,
                                                                user_id:res_data[0]['user_id']
                                                            });
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    });
                            }
                        }
                    });
                    
                }
        },
        ],function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));

    });
}


exports.dropOrder=function(req,res)
{
    var session_id=req.body.session_id;
    var order_id=req.body.order_id;
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

                } 
                else 
                {
                    cb(null, user);
                }
            });
        },
         function(user,cb)
        {
           // console.log(user);
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
                    //console.log(user_id);
                    var sql_data='SELECT * FROM `messages` WHERE `user_from_id`='+user_id+' OR `user_to_id`='+user_id;
                    connection.query(sql_data,(err,resul)=>{
                        if(err)
                                 {
                                  console.log(err);
                                     cb({
                                    message: constants.responseMessages.ERROR_IN_EXECUTION,
                                    status: constants.responseFlags.ERROR_IN_EXECUTION,
                                    response_data: {}
                                });
                                 }else
                                 {
                                   cb(null,{
                          message: constants.responseMessages.ACTION_COMPLETE,
                        status: constants.responseFlags.ACTION_COMPLETE,
                        message:resul[0]['message'],
                        user_from_id:resul[0]['user_from_id'], 
                        user_to_id:resul[0]['user_to_id'],
                        message_id:resul[0]['id'],
                        created_at:resul[0]['created_at'],
                        updated_at:resul[0]['updated_at'],
                        
                      });
                                 }
                    })
                    
                }
        },
        ],function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));

    });
}

exports.completeOrder=function(data,callback)
{
    console.log(data);
    var session_id=data.session_id;
    var order_id=data.order_id;
    var user_id=data.user_id;
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

                } 
                else 
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
                    //var user_id=user[0]['user_id'];
                    var driver_sql=`SELECT * FROM shipment where user_id=? AND id=? ORDER BY created_at DESC`;
                    connection.query(driver_sql,[user_id,order_id],(error,shipResult)=>{
                        if(error)
                        {
                            cb
                            ({
                                message: constants.responseMessages.ERROR_IN_EXECUTION,
                                status: constants.responseFlags.ERROR_IN_EXECUTION,
                                driver_payment_response: {}
                            })
                        }
                        else
                        {
                            if (!shipResult || (shipResult && shipResult.length === 0)) 
                            {
                                cb
                                ({
                                    message: constants.responseMessages.response_data_NOT_FOUND,
                                    status: constants.responseFlags.response_data_NOT_FOUND,
                                    driver_payment_response: {}
                                });
                            }
                            else
                            {
                                 //console.log(shipResult);
                                 var order_data={
                                    order_status:shipResult[0]['status'],
                                    message:'order completed'
                                 }
                                cb(null,{order_detail:order_data});

                            }
                        }
                    });
                    
                }
        },
        ],function (error, result) {
       // const response = error || result;
        return callback(error, result);

    });

}