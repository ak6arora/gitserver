var http = require("http"); // http server core module
var express = require("express"); // web framework external module
var port = process.env.PORT || 5000
  // Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var nodemailer = require('nodemailer');
var httpApp = express();

// Start Express http server on port 5000 for HerokuApp
var webServer = http.createServer(httpApp).listen(port, function() {
  console.log('Dev server is up on 5000');
});

httpApp.use(express.static('public'));
httpApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
httpApp.get('/', function(req, res) {
  res.write('Hello');
  res.end();
});

httpApp.post('/sendQuery', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  req.on('data',function(data){


  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: "ak6arora@gmail.com",
      pass: "Akshay@1992"
    }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
    to: 'akshay9892@outlook.com', // list of receivers
    subject: 'Email from ak6arora.github.io', // Subject line
    text: 'Name:'+ JSON.parse(data.toString())['name'] +'\nEmail:'+JSON.parse(data.toString())['email']+'\nMessage:'+JSON.parse(data.toString())['message'], // plaintext body
    html: '<div>Name:'+ JSON.parse(data.toString())['name'] +'<br/>Email:'+JSON.parse(data.toString())['email']+'<br/>Message:'+JSON.parse(data.toString())['message']+'</div>' // html body
  };
  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent');
  });
  res.writeHead(200);
  res.write('success')
  res.end();
    })
})
