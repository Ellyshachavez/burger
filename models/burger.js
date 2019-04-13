var orm = require("../config/orm.js");

var burger = {
    selectAll: function(cb) {
      orm.selectAll("burgers", function(res) {
        cb(res);
      });
    },
    // The variables cols and vals are arrays.
    insertOne: function(colName, burgerName, cb) {
      orm.insertOne("burgers", colName, burgerName, function(res) {
        cb(res);
      });
    },
    updateOne: function(colName, devouredStatus, burgerID, cb) {
      orm.updateOne("burgers", colName, devouredStatus, burgerID, function(res) {
        cb(res);
      });
    }
  };
  
  // Export the database functions for the controller (burgers_Controller.js).
  module.exports = burger;