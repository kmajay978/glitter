/*eslint-disable */
/**
 * Created by cl-macmini-152 on 27/04/17.
 */


var nodeMailerModule = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var Handlebars = require('handlebars');
var async = require('async');
const fs = require('fs');
const config=require('config');

var nodeMailerSettings = {
    host: config.get('emailCredentials.host'),
    port: config.get('emailCredentials.port'),
    auth: {
        user: config.get('emailCredentials.senderEmail'),
        pass: config.get('emailCredentials.senderPassword')
    }
};
var transporter = nodeMailerModule.createTransport(smtpTransport(nodeMailerSettings));



/*
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @ sendEmail Function which is exported to be called from anywhere in the application
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

function sendEmailViaTemplate(templateId, receiverDetails, variableDetails, externalCB) {
    var templateId = templateId || null;
    var variableDetails = variableDetails || {};

    var mailOptions = {
        from: null,
        to: null,
        subject: null,
        html: null
    };

    if (receiverDetails.name) {
        mailOptions.to = receiverDetails.name + ' <' + receiverDetails.email + '>';
    } else {
        mailOptions.to = receiverDetails.email;
    }
    async.series([
        function (internalCallback) {
            getEmailTemplateDataFromSQL(templateId, function (err, templateData) {
                mailOptions.from = config.get('emailCredentials.senderEmail');
                mailOptions.headers = { "Reply-To": mailOptions.from };
                
                // template_name = subject
                mailOptions.subject = renderMessageFromTemplateAndVariables(templateData.template_subject, variableDetails);

                // getting template file
                fs.readFile(templateData.template_body, (err, data) => {
                if (err) {
                        internalCallback({
                            message: constants.responseMessages.ERROR_IN_EXECUTION,
                            status: constants.responseFlags.ERROR_IN_EXECUTION,
                            data: {},
                        });
                    } else {
                        mailOptions.html = renderMessageFromTemplateAndVariables(data.toString('utf8'), variableDetails);
                        internalCallback(err, null);
                    }
                });
            })
        }, function (internalCallback) {
            sendMailViaTransporter(mailOptions, function (err, res) {
                internalCallback(err, res);
            })
        }
    ], function (err, responses) {
        if (err) {
            externalCB({
                "message": constants.responseMessages.ERROR_IN_EXECUTION,
                "status": constants.responseFlags.ERROR_IN_EXECUTION,
                "data": {}
            });
        } else {
            externalCB(null, {
                "message": constants.responseMessages.ACTION_COMPLETE,
                "status": constants.responseFlags.ACTION_COMPLETE,
                "data": {}
            });
        }
    });
}

/*
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @ getEmailTemplateDataFromSQL Function
 @ This function will fetch the email template details
 @ Requires following parameters
 @ templateName // example : 'PB_Registration_Email'
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
function getEmailTemplateDataFromSQL(templateId, cb) {
    var sql = "SELECT `template_name`,`template_subject`,`template_body` FROM `tb_role_email_template` WHERE `email_template_id`=? LIMIT 1";
    console.log(sql);
    connection.query(sql, [templateId], function (err, emailTemplateData) {
        console.log(err);
        if (err) {
            cb(err);
        }
        else if (emailTemplateData.length == 0) {
            cb("No template id found.")
        }
        else {
            cb(null, emailTemplateData[0]);
        }
    });
}

/*
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @ sendMailViaTransporter Function
 @ This function will initiate sending email as per the mailOptions are set
 @ Requires following parameters in mailOptions
 @ from:  // sender address
 @ to:  // list of receivers
 @ subject:  // Subject line
 @ html: html body
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
function sendMailViaTransporter(mailOptions, cb) {
    console.log(mailOptions)
    transporter.sendMail(mailOptions, function (error, info) {
        console.log('Mail Sent Callback Error:', error);
        console.log(info);
    });
    cb(null, null) // Callback is outside as mail sending confirmation can get delayed by a lot of time
}


/**
 * Async function to send email
 * @return {Promise}
 */
function sendNewAsync({ to, subject, html }, variables) {
    return new Promise((res, rej) => {
        let mailOptions = {
            from: config.get('emailCredentials.senderEmail'),
            to: to,
            subject: renderMessageFromTemplateAndVariables(subject, variables),
            html: renderMessageFromTemplateAndVariables(html, variables),
            headers: {
                "Reply-To": config.get('emailCredentials.senderEmail')
            }
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                reject(err);
            else
                resolve(info);
        });
    });
}

/**
 * Async function to send email, but returns without a 
 * confirmation
 */
function sendNewAsyncWithoutResponse({ to, subject, html }, variables) {
    let mailOptions = {
        from: config.get('emailCredentials.senderEmail'),
        to: to,
        subject: renderMessageFromTemplateAndVariables(subject, variables),
        html: renderMessageFromTemplateAndVariables(html, variables),
        headers: {
            "Reply-To": config.get('emailCredentials.senderEmail')
        }        
    };
    sendMailViaTransporter(mailOptions,() => {});
}

/*
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @ renderMessageFromTemplateAndVariables Helper Function
 @ This function will compile the email template stored in the DB with the data provided and return the output.
 @ Requires following parameters in mailOptions
 @ templateData:  // template data or text to render which will be having variables
 @ variablesData:  // variables values in key-value pair which will replace the variables in templateData
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
function renderMessageFromTemplateAndVariables(templateData, variablesData) {
    return Handlebars.compile(templateData)(variablesData);
}

/**
 * Send email
 * @param  {Object}         options Options email
 * @param  {String}         template Template name
 * @param  {Object}         data Information that will be attached to email template
 * @return {Promise}        Status from email server
 */
function sendEmail(options, template, data) {
    return new Promise((resolve, reject) => {
        fs.readFile(template, (err, file) => {
            if (!err && file) {
                const html = renderMessageFromTemplateAndVariables(file.toString(), data);
                options.from = config.get('emailCredentials.senderEmail');
                options.html = html;
                if(options.headers){
                    options.headers["Reply-To"] =  options.headers["Reply-To"] ? options.headers["Reply-To"] : options.from ;
                }else {
                    options.headers = { "Reply-To": options.from };
                }
                
                //send email
                sendMailViaTransporter(options, function (err, res) {
                    resolve(res);
                });
            }
            else {
                console.log("errr",err);
                reject(err);
            }
        });
    });
}

module.exports = {
    sendEmailViaTemplate: sendEmailViaTemplate,
    sendNewAsync: sendNewAsync,
    sendNewAsyncWithoutResponse: sendNewAsyncWithoutResponse,
    sendEmail: sendEmail,
    renderMessageFromTemplateAndVariables: renderMessageFromTemplateAndVariables,
	sendMailViaTransporter:sendMailViaTransporter
};





