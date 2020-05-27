const express = require('express');
const emailRouter = express.Router();
const mailer = require('nodemailer');


emailRouter.post('/',(req, res)=>{
    let transporter = mailer.createTransport({
        service : 'smtp.163.com',
        host: 'smtp.163.com',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            // should be replaced with real sender's account
            user: '13667601677@163.com',
            pass: 'll19971116'
        }
    });
    let mailOptions = {
        // should be replaced with real recipient's account
        from : '"何恩江" <13667601677@163.com>',
        to: '13667601677@163.com',
        subject: req.body.subject,
        body: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(400).json({"success": false, "info": error.toString()});
        }
        else{
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.status(200).json({"success": true});
        }
    });

});

module.exports = emailRouter;
