let plivo = require('plivo');
const nodemailer = require('nodemailer');
let client = new plivo.Client('MAMMNKODEXOTY4MGI0ZJ', 'ZjA5Y2JiYWFkZjhmY2I5OGM0YzRlZjdhNmU3Mzcw');
let sms_video_call_link = "http://192.168.0.154:3000/tyvQrOTInuRSvfisxBKf6sAmg3EmVKoI/video-chat";
let mail_video_call_link = "<a href='http://192.168.0.154:3000/tyvQrOTInuRSvfisxBKf6sAmg3EmVKoI/video-chat'>Click Here for video call</a>";
let text_message = "Start your video call by click on this link"+sms_video_call_link+"for Glitter.";
let mail_text_message = "Start your video call by click on this link"+mail_video_call_link+"for Glitter.";

let phone_number = +918968611259;
client.messages.create('14587774196',phone_number,text_message
  ).then(function(message_created) {
    console.log(message_created)
  });

//   Plivo SMS code above && Email code Below
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "81dcd6bb9c9d59",
      pass: "f7cd34bade7e0d"
    }
  });
  
const message = {
    from: 'yifexi3639@tibui.com', // Sender address
    to: 'ajay.k@richestsoft.in',         // List of recipients
    subject: 'Glitter video call from username', // Subject line
    html: mail_text_message
};
transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
      console.log("Please check the given Email");
    } else {
      console.log(info);
      console.log("Yes mail send successfully");
    }
});