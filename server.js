// IMPORTS NPM
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const http = require("http");
const https = require("https");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const ip = require("ip");
const fs = require("fs");
const frameguard = require("frameguard");

// IMPORTS CONFIGS
const databaseConnection = require("./config/database");
const config = require("./config")

// PROTECTION MIDDLEWARES
// const csrfProtect = csrf({ cookie: true });
// const parseForm = bodyParser.urlencoded({ extended: false });

console.log("Current ip address :", ip.address());

// EXPRESS INSTANCE
const app = express();

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(function (req, res, next) {
  res.header("X-XSS-Protection", 0); //0-false,1-true
  next();
});

app.use(frameguard({ action: "sameorigin" })); //X-Frame-Options

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/public", express.static("public"));
app.use(express.static(__dirname + "/public"));

app.use(
  cors({
    origin: "*",
  })
);

app.get("/test", (req, res) => {
  res.send("success")
});

if (process.env.SERVER_RUNTIME === "production") {
    // const options = {
    //   key: fs.readFileSync(''),
    //   cert: fs.readFileSync('')
    // };
    // var server = https.createServer(options, app);
  }
  else {
    // var server = http.createServer(app);
  }

  let server = http.createServer(app)


databaseConnection((isConnected) => {
  if (isConnected) {
    server = server.listen(config.PORT, function () {
      console.log(
        "\x1b[34m%s\x1b[0m",
        `server is running on port ${config.PORT}`
      );
    });
  }
});
