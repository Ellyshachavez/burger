// Dependecies
var connection = require("./connection.js");;

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQMarks(num) {
    var array = [];

    for (var i = 0; i < num; i++) {
        array.push("?");
    }
    return array.toString();
}

// function to convert object key/value to SQL syntax
function objToSql(ob) {
    var array = [];

    
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
    }
    return array.toString();
}


var orm = {
    selectAll: function (table, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, table, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

	insertOne: function(table, cols, vals, cb) {
		// Construct the query string that inserts a single row into the target table
		var queryStr = "INSERT INTO " + table;

		queryStr += " (";
		queryStr += cols.toString();
		queryStr += ") ";
		queryStr += "VALUES (";
		queryStr += printQMarks(vals.length);
		queryStr += ") ";

		connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
		});
	},

	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
		});
	}
};

module.exports = orm;
