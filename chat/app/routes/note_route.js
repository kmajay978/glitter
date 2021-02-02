// routes/note_routes.js
const md5=require('MD5');
module.exports = function(app, db) {
  app.post('/notes', validateUser,(req, res) => {
  	var phone=req.body.phone;
  	var password=md5(req.body.password);
  	///console.log(password);
    var sql="select * from user where phone=? and password=?";
    connection.query(sql,[phone,password],function(err,result){
    	res.send(result);
    });
  });

  function validateUser (req, res, next) {
  next();
}
};