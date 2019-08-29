// server.js
// where your node app starts

// init project
let express = require("express");
let app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
let moment = require("moment");
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204
//enable bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date?", function(req, res) {
  let dateString = req.params.date;
  let isInteger = new RegExp("^[0-9]*[0-9][0-9]*$");

  console.log("using the date string ${datestring}");
  if (dateString === "") {
    let date = moment();
    res.send({
      unix: date.format("x"),
      utc: date.utc().format("YYYY-MM-DD HH:mm")
    });
  } else if (isInteger.test(dateString)) {
    let date = moment(parseInt(dateString));
    date.isValid()
      ? res.send({
          unix: date.format("x"),
          utc: date.utc().format("YYYY-MM-DD HH:mm")
        })
      : res.send({ unix: "null", utc: "Invalid Date" });
  } else {
    let date = moment(dateString);
    date.isValid()
      ? res.send({
          unix: date.format("x"),
          utc: date.utc().format("YYYY-MM-DD HH:mm")
        })
      : res.send({ unix: "null", utc: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});