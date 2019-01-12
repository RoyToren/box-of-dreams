const nodemailer = require('nodemailer');

module.exports = (app) => {
  app.get('/usercontact', function(req, res) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'MAIL USER',
        pass: 'MAIL PASSWORD',
      },
    });

    var mailOptions = {
      from: '',
      to: '',
      subject: '',
      text: '',
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.end(JSON.stringify({error: error}));
      } else {
        console.log('Email sent: ' + info.response);
        res.end(JSON.stringify({success: 'Email sent: ' + info.response}));
      }
    });

  });
};
