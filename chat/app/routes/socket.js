/*eslint-disable */
var constants = require('./../constants');
var user = require('./users');
var job = require('./jobs');
var socket_id = null;
var usersConnected = {};
var array=[];
var reciever_id;

exports.socketInitialize = function (httpServer) {
    console.log("INNN");

    var socketIO = require('socket.io').listen(httpServer);
   
    socketIO.on('connection', function (socket) {
        console.log("socket id ", socket.id);
        socket_id = socket.id;

        console.log("Connected users ", usersConnected);

        /*
        * Authenticate user just after socket connection
        * params required session_id
        * */
        socket.on('authenticate', function (data) {
            console.log("authenticate ", data);
            //var data=JSON.parse(data);
             //console.log(data.user2_id);
            var sql = "SELECT * FROM app_login WHERE session_id = ? LIMIT 1";
            connection.query(sql, [data.session_id], function(error, user) {
                if(error) 
                {
                    console.log("Unauthorized err ", error);
                    socketIO.to(socket_id).emit("unauthorized", "You are not authorized to connect");
                    socket.conn.close();
                }else if(user && user.length > 0) {
                    console.log(1111111)
                    if(user[0].user_id > 0) {
                        reciever_id = data.reciever_id
                        if(usersConnected.hasOwnProperty("customer"+user[0].session_id))
                        {
                            usersConnected["customer"+user[0].session_id]['socket_id'] = socket.id;
                        } 
                        else 
                        {
                            usersConnected["customer"+user[0].session_id] = {
                                user_id: user[0].session_id,
                                socket_id: socket.id
                            };
                        }
                           var msg_id=user[0].user_id;
                           job.getMessage(msg_id, data.reciever_id,function(err,message_data){
                              //console.log('message data',message_data);
                              if(socketIO.to(socket.id).emit("getMessage",message_data))
                              {
                                 console.log('emit data',message_data);
                              }
                              else
                              {
                                 console.log('data not emit',message_data);
                              }
                           })

                        socketIO.to(socket_id).emit("authorized", "You are authorized and connected");
                    } 
                    else {
                        console.log("Unauthorized");
                        socketIO.to(socket_id).emit("unauthorized", "You are not authorized to connect");
                        socket.conn.close();
                    }

                    console.log('after user connected',usersConnected);
                }
                else 
                {
                    console.log(user, 2222)
                    console.log("Unauthorized");
                    socketIO.to(socket_id).emit("unauthorized", "You are not authorized to connect");
                    socket.conn.close();
                }
            });
        });

        // receiving base64 file from client...
        socket.on('media_file', function (data) {
            data.reciever_id = reciever_id;
            job.sendImageToSql(data, function(err, getData) {
                if (err) {
                    console.log("error 111111", err)
                }
                else {
                    console.log(getData, "getData....")
                }
                socketIO.to(socket_id).emit('media_file',  getData)
            })
        });

        socket.on('send_message',function(data){
           var sql_data=`SELECT * FROM app_login WHERE session_id=?`;
           connection.query(sql_data,[data.session_id],function(error,appdetail){
            //console.log(appdetail);
             if(appdetail && appdetail.length>0)
             {
                if(appdetail[0]['device_type']==2)
                { 
                    var user_data=`SELECT * FROM app_login WHERE user_id=?`;
                    connection.query(user_data,[data.user_to_id],(error,res)=>{
                    	if(res && res.length>0)
                    	{
                            if(res[0]['device_type']==2)
                            {
                                if(res[0]['session_id'] && usersConnected["customer"+res[0]['session_id']])
                                {
                                    console.log(usersConnected["customer"+res[0]['session_id']]['socket_id']);
                                    job.sendMessage(data,function(err, getData)
                                    {
                                        if(socketIO.to(usersConnected["customer"+res[0]['session_id']]['socket_id']).emit("message_data", getData))
                                        {
                                            socketIO.to(usersConnected["customer"+res[0]['session_id']]['socket_id']).emit("message_data", getData)
                                            console.log('emit data',getData); 
                                        }
                                        else
                                        {
                                            console.log('emit not data',getData);
                                        }
                                    })
                                }
                                else
                                {
                                    console.log('data not emit',data)
                                } 
                            }
                            else
                            {
                                job.sendMessage(data,function(err, getData)
                                {
                                    if(socket.broadcast.emit("message_data",getData))
                                    {
                                        socketIO.to(usersConnected["customer"+res[0]['session_id']]['socket_id']).emit("message_data", getData)
                                      
                                    }
                                    else
                                    {
                                        console.log('emit not data',getData);
                                    }
                                });
                            }
                    		
                    	}
                    })
                    
                }
                else
                {
                    //console.log('android');
                    job.sendMessage(data,function(err, getData)
                    {
	                    console.log('message val',getData);
	                    if(socket.broadcast.emit("message_data",getData))
	                    {
                            socketIO.to(usersConnected["customer"+appdetail[0]['session_id']]['socket_id']).emit("message_data", getData)
	                        console.log('emit data',getData);
	                    }
	                    else
	                    {
	                        console.log('emit not data',getData);
	                    }
                    });
                }

             }
           })
                            
        })

    
     socket.on('UserSendMessage', function (data) {
       job.getOrderData(data,function(err,result){
        console.log('Get Dtaa',result);
         socketIO.to(socket_id).emit('order_data', result);
       });
     });

     socket.on('disconnect', function (data) {
            console.log("disconnect socket",data);
            usersConnected={};
           socket.conn.close();
        });

        socket.on('disconnect_user', function (data) {
        	            usersConnected={};
            console.log("disconnect_user",data);
            socket.conn.close();
        });

        socket.on('error', function (err) {
            console.log("Socket error ", err);
        });
    });
    
}
