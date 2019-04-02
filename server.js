// Dependencies
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