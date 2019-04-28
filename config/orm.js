//Include connection.js file
var connection = require("./connection");;

// Helper function for SQL syntax.
// =============================================================
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert the objects key/value pairs into SQL syntax
// =============================================================
function objToSql(ob) {
    var arr = [];

    //Loops through the keys & pushes the key/value pairs as a string into an array
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // If the burger name has spaces, add quotations (Summer Thyme Burger => 'Summer Thyme Burger')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

// =============================================================
var orm = {
    selectAll: function (table, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, table, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    //Insert Row into target table
	insertOne: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
		});
	},

    //Update table
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