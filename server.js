var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "zackylove4649",
  database: "burgers_db"
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static("/public"));
app.use(express.static(__dirname + '/public'));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

// Initiate MySQL Connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

// Start server 
app.listen(PORT, function () {
  console.log(process.env.NODE_ENV);
  console.log("Server listening on: http://localhost:" + PORT);
});