// Define an object called 'Operations'
var Operations = {
    // Function to insert a department into the database
    insertDepartment: function (departments) {
        // Start a database transaction
        db.transaction(function (tx) {
            // SQL query to insert a department with a placeholder for the name
            var sql = "INSERT INTO departments(name) VALUES(?);";
            // Prepare the data to be inserted
            var options = [departments.name];

            // Function to be called on a successful transaction
            function successTransaction() {
                console.info("Success: Departments inserted successfully");
            }

            // Execute the SQL query with the provided data and callback functions
            tx.executeSql(sql, options, successTransaction, errorHandler);
        });
    },

    // Function to insert an appointment into the database
    insertAppointment: function (objEvent) {
        // Start a database transaction
        db.transaction(function (tx) {
            // SQL query to insert an appointment with placeholders for various fields
            var sql = "INSERT INTO appointments(fullname, email, phone, appointmentdate, departmentId, message) VALUES(?,?,?,?,?,?);";
            // Prepare the data to be inserted
            var options = [objEvent.fullname, objEvent.email, objEvent.phone, objEvent.appointmentdate, objEvent.departmentId, objEvent.message];

            // Function to be called on a successful transaction
            function successTransaction() {
                console.info("Success: Appointment booked successfully");
            }

            // Execute the SQL query with the provided data and callback functions
            tx.executeSql(sql, options, successTransaction, errorHandler);
        });
    },

    // Function to select all appointments from the database
    selectAllAppointment: function(options, callback) {
        // Start a database transaction
        db.transaction(function (tx) {
            // SQL query to select all appointments
            var sql = "SELECT * FROM appointments;";
            // Execute the SQL query with the provided options and callback function
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    // Function to select an appointment by its ID from the database
    selectAppointmentById: function(id, callback) {
        // Start a database transaction
        db.transaction(function (tx) {
            // SQL query to select an appointment by ID
            var sql = "SELECT * FROM appointments WHERE id=?;";
            // Execute the SQL query with the ID and callback function
            tx.executeSql(sql, [id], callback, errorHandler);
        });
    },

    // Function to delete an appointment from the database
    deleteAppointment: function(options) {
        // Copy the 'options' object to avoid modifying the original
        var option = options;
        // Start a database transaction
        db.transaction(function (tx) {
            // SQL query to delete an appointment by ID
            var sql = "DELETE FROM appointments WHERE id=?;";

            // Function to be called on a successful transaction
            function successTransaction() {
                console.info("Success: Appointment deleted successfully");
            }

            // Execute the SQL query with the provided data and callback functions
            tx.executeSql(sql, option, successTransaction, errorHandler);
        });
    },

    // Function to update an appointment in the database
    updateAppointment: function (objEvent, id) {
        // Start a database transaction
        db.transaction(function (tx) {
            // SQL query to update an appointment by ID with placeholders for various fields
            var sql = "UPDATE appointments SET fullname=?, email=?, phone=?, appointmentdate=?, departmentId=?, message=? WHERE id=?;";
            // Prepare the data to be updated
            var options = [objEvent.fullname, objEvent.email, objEvent.phone, objEvent.appointmentdate, objEvent.departmentId, objEvent.message, id];

            // Function to be called on a successful transaction
            function successTransaction() {
                console.info("Success: Appointment details updated successfully");
            }

            // Execute the SQL query with the provided data and callback functions
            tx.executeSql(sql, options, successTransaction, errorHandler);
        });
    },
};