// Declare a variable 'db' to hold the database connection
var db;

// Define a function 'errorHandler' to handle errors and log messages
function errorHandler(error) {
    console.error("SQL error: " + error.message);
}

// Define an object 'DB' to manage database operations
var DB = {
    // Function to create the database
    createDatabase: function () {
        // Database details
        var shortName = "Hospital Management";
        var version = "1.0";
        var displayName = "DB for Hospital Management app";
        var dbSize = 2 * 1024 * 1024;

        // Function to be called on successful database creation
        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }

        // Open the database connection
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },

    // Function to create tables in the database
    createTables: function () {
        // Use a transaction to execute multiple SQL statements
        db.transaction(function (tx) {
            // SQL statement to create the 'departments' table
            var sqlDept = "CREATE TABLE IF NOT EXISTS departments( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";

            // SQL statement to create the 'appointments' table with a foreign key reference
            var sqlApt = "CREATE TABLE IF NOT EXISTS appointments( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "fullname VARCHAR(30) NOT NULL," +
                "email VARCHAR(20) NOT NULL," +
                "phone INTEGER NOT NULL," +
                "appointmentdate DATE," +
                "departmentId INTEGER NOT NULL," +
                "message VARCHAR(100)," +
                "FOREIGN KEY(departmentId) REFERENCES departments(id));";

            var options = [];

            // Callback function for successful creation of the 'departments' table
            function successCallback1() {
                console.info("Success: Create table: department successful.");
            }

            // Callback function for successful creation of the 'appointments' table
            function successCallback2() {
                console.info("Success: Create table: appointment successful.");
            }

            // Execute SQL statements to create tables and provide callback functions
            tx.executeSql(sqlDept, options, successCallback1, errorHandler);
            tx.executeSql(sqlApt, options, successCallback2, errorHandler);
        });
    },

    // Function to drop tables from the database
    dropTables: function () {
        // Use a transaction to execute multiple SQL statements
        db.transaction(function (tx) {
            // SQL statement to drop the 'departments' table
            var sqlState ="DROP TABLE IF EXISTS departments;";

            // SQL statement to drop the 'appointments' table
            var sqlReview ="DROP TABLE IF EXISTS appointments;";

            var options = [];

            // Callback function for successful dropping of the 'departments' table
            function successCallback5() {
                console.info("Success: Drop table: departments successful.");
            }

            // Callback function for successful dropping of the 'appointments' table
            function successCallback6() {
                console.info("Success: Drop table: appointment successful.");
            }

            // Execute SQL statements to drop tables and provide callback functions
            tx.executeSql(sqlState, options, successCallback5, errorHandler);
            tx.executeSql(sqlReview, options, successCallback6, errorHandler);
        });
    },
};