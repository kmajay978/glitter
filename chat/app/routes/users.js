const autoload = require('./autoload');
const validate = require('./validate');
const async = require('async');
const constants = require('./../constants');
const md5=require('MD5');


exports.getMessage=function(data,callback) {
    console.log(data)
    async.waterfall([
        function (cb) {
            var sql = `SELECT * FROM messages WHERE msg_id = ?`;
            connection.query(sql, [data], (error, user)=> {
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




exports.sendMessage=function(data,callback)
{
    //var data_value=JSON.parse(data);
    var reciever_id=data.reciver_id;
    var session_id=data.session_id;
    var message=data.message;
  console.log(reciever_id);
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
                
                  var sender_id=user[0]['user_id'];
                  var uniqueid=user[0]['user_id']+'_msg_'+reciever_id;
                
                
                    var sql = "INSERT INTO `messages` (`user_from_id`,`user_to_id`,`msg_id`,`message`,`status`,`created_at`,`updated_at`) VALUES(?,?,?,?,?,?,?,?)";
                    var query=connection.query(sql,[sender_id,reciever_id,uniqueid,message,0,datetime,datetime], (error, user)=> {
                        if (error) {
                          console.log(error);
                            cb({
                                message: constants.responseMessages.ERROR_IN_EXECUTION,
                                status: constants.responseFlags.ERROR_IN_EXECUTION,
                                response_data: {}
                            });

                        } else {

                           var message_id=user.insertId;
                           console.log(uniqueid);
                          // var sql1=`SELECT * FROM messages where user_from_id = ? AND user_to_id = ? ORDER BY id DESC`;
                            var sql1=`SELECT * FROM messages where msg_id = ?  ORDER BY id DESC`;
                              connection.query(sql1,[uniqueid], (error, message_data)=> {
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
                                   cb(null,{
                          message: constants.responseMessages.ACTION_COMPLETE,
                        status: constants.responseFlags.ACTION_COMPLETE,
                        message:message_data[0]['message'],
                        user_from_id:message_data[0]['user_from_id'], 
                        user_to_id:message_data[0]['user_to_id'],
                        message_id:message_data[0]['id'],
                        created_at:message_data[0]['created_at'],
                        updated_at:message_data[0]['updated_at'],
                        
                      });
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


function login(req, res) {
    var phone = req.body.phone;
    var password = md5(req.body.password);

    async.waterfall([
        function (cb) {
            //Vendor Login

            var sql = `SELECT * FROM user WHERE phone = ? AND password = ?`;
            connection.query(sql, [phone, password], (error, user)=> {
                if (error) {
                    cb({
                        message: constants.responseMessages.ERROR_IN_EXECUTION,
                        status: constants.responseFlags.ERROR_IN_EXECUTION,
                        data: {}
                    });

                } else {
                    cb({
                        message: constants.responseMessages.ACTION_COMPLETE,
                        status: constants.responseFlags.ACTION_COMPLETE,
                        data: user[0]
                    });
                }
            });
        }

    ], function (error, result) {
        const response = error || result;
        res.send(JSON.stringify(response));

    });
}

module.exports = {
	login: login,
}
