const Joi=require('joi');
const constants = require('../constants');
const _ = require('underscore');

function validate(req,res,next){
	let schema=Joi.object.keys({
		phone:Joi.number().required(),
		password:Joi.string().required()
   });
	Joi.validate(req.query , schema, {},function(err,value){
		if(err)
		{
			resp.json({
				"message":constants.responseMessage.PARAMETER_MISSING,
				"status":constants.responseMessage.PARAMETER_MISSING,
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
  validate
};
