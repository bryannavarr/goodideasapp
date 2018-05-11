const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongo = require("./app/mongodb");
const routes = require("./app/routes");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("withCredentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cookie, x-access-token"
  );
  next();
});

app.use(routes);

app.listen(3050);

mongo
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`${port} Is Good To Go`);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
