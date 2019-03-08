const nodemailer = require("nodemailer");
var mailDetails = require("./mailDetails.json");

module.exports = app => {
  app.post("/usercontact", sendMail);

  function sendMail(req, res) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailDetails.mail,
        pass: mailDetails.password
      }
    });

    var mailOptions = {
      from: mailDetails.mail,
      to: mailDetails.mail,
      subject: "פנייה חדשה מעת: " + req.body.name,
      text: formatRequestToMail(req.body)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.end(JSON.stringify({ error: error }));
      } else {
        console.log("Email sent: " + info.response);
        res.end(JSON.stringify({ success: "Email sent: " + info.response }));
      }
    });
  }

  function formatRequestToMail(requestBody) {
    var message = "שם הפונה: " + requestBody.name;
    message += "\n";
    message += "טלפון: " + requestBody.phone;
    message += "\n";
    message += "מייל: " + requestBody.mail;
    message += "\n";
    message += "\n";
    message += "הודעה מהפונה: ";
    message += "\n";
    message += requestBody.messageContent;
    message += "\n";
    if (requestBody.dreamName !== undefined) {
      message += "\n";
      message += "נשלח בהקשר לחלום:";
      message += "\n";
      message += requestBody.dreamName;
      message += "\n";
      message += "\n";
      message += requestBody.dreamDescription;
    }

    return message;
  }
};
