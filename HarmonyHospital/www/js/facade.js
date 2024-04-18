// Function to perform validation and display an alert for adding appointments
function addAppointmentValidation() {
    // Check if the form is valid using the doValidate_frmAddAppointment function
    if (doValidate_frmAddAppointment()) {
        alert("Add appointment is Valid");
    } else {
        alert("Add appointment is not Valid");
    }
}

// Function to perform validation and display an alert for modifying appointments
function modifyAppointmentValidation() {
    // Check if the form is valid using the doValidate_frmModifyAppointment function
    if (doValidate_frmModifyAppointment()) {
        alert("Modify appointment is Valid");
    } else {
        alert("Modify appointment is not Valid");
    }
}

// Function to add an appointment to the database
function addAppointment() {
    // Check if the form is valid using the doValidate_frmAddAppointment function
    if (doValidate_frmAddAppointment()) {
        console.info("Add Appointment form is valid");

        // Retrieve form data
        var fullName = $("#fullname").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var date = $("#appointmentdate").val();
        var department = $("#department1").val();
        var message = $("#message").val();

        // Create an Appointment object
        var objEvent = new Appointment(fullName, email, phone, date, department, message);

        // Insert the appointment into the database
        Operations.insertAppointment(objEvent);

        // Reset the form
        $('#frmAddAppointment')[0].reset();
    } else {
        console.info("Add Appointment form is invalid");
    }
}

// Function to display all appointments
function showAppointments() {
    // Define an array for options
    var options = [];

    // Call the selectAllAppointment function from Operations with a callback function
    Operations.selectAllAppointment(options, callback);

    // Callback function to handle the results of the selectAllAppointment query
    function callback(tx, results) {
        console.info("Success: All Appointment details selected successfully");

        // Build HTML for displaying appointments
        var html = "";

        // Iterate through the results and create HTML for each appointment
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var id = row['id'];
            var fullname = row['fullname'];
            var email = row['email'];
            var phone = row['phone'];
            var appointmentdate = row['appointmentdate'];
            var departmentId = row['departmentId'];
            var message = row['message'];

            // Log appointment details to the console
            console.info(`full name: ${fullname} email: ${email} phone: ${phone} appointment-date: ${appointmentdate} departmentId: ${departmentId}  message: ${message}`);

            // Append HTML for each appointment to the 'html' variable
            html += `
                <li>
                    <a data-role="button" data-row-id=${row['id']} href="#">
                        <h2>Id: ${id}</h2>
                        <h1>Full Name: ${fullname}</h1>
                        <h2>Email: ${email}</h2>
                        <h2>Phone: ${phone}</h2>
                        <h2>Appointment Date: ${appointmentdate}</h2>
                        <h2>Department id: ${departmentId}</h2>
                        <h2>Message: ${message}</h2>
                    </a>
                </li>
            `;
        }

        // Update the listview with the generated HTML
        var list = $("#listviewAppointment");
        list = list.html(html);
        list.listview("refresh");

        // Function to handle click events on appointment items
        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#appointmentUpdate');
        }

        // Attach clickHandler to click events on appointment items
        $("#listviewAppointment a").on("click", clickHandler);
    }
}

// Function to display details of a specific appointment by ID
function showAppointmentById() {
    // Retrieve appointment ID from local storage
    var id = localStorage.getItem("id");

    // Define an array for options containing the appointment ID
    var options = [id];

    // Call the selectAppointmentById function from Operations with a callback function
    Operations.selectAppointmentById(options, callback);

    // Callback function to handle the results of the selectAppointmentById query
    function callback(tx, results) {
        console.info("Success: Appointment details by id selected successfully");

        // Extract appointment details from the results
        var row = results.rows[0];
        var id = row['id'];
        var fullname = row['fullname'];
        var email = row['email'];
        var phone = row['phone'];
        var appointmentdate = row['appointmentdate'];
        var departmentId = row['departmentId'];
        var message = row['message'];

        // Log appointment details to the console
        console.info(`id: ${id} full name: ${fullname} email: ${email} phone: ${phone} appointment-date: ${appointmentdate} departmentId: ${departmentId}  message: ${message}`);

        // Populate form fields with appointment details
        $("#fullname1").val(fullname);
        $("#email1").val(email);
        $("#phone1").val(phone);
        $("#appointmentdate1").val(appointmentdate);
        $("#department2").val(departmentId);
        $("#message1").val(message);
    }
}
// Function to update an appointment in the database
function updateAppointment() {
    // Check if the modification form is valid using doValidate_frmModifyAppointment
    if (doValidate_frmModifyAppointment()) {
        console.info("Modify reservation form is valid");

        // Retrieve the appointment ID from local storage
        var id = localStorage.getItem("id");

        // Retrieve form data
        var fullname = $("#fullname1").val();
        var email = $("#email1").val();
        var phone = $("#phone1").val();
        var appointmentdate = $("#appointmentdate1").val();
        var department = $("#department2").val();
        var message = $("#message1").val();

        // Create an Appointment object with updated information
        var objEvent = new Appointment(fullname, email, phone, appointmentdate, department, message);

        // Call the updateAppointment function from Operations
        Operations.updateAppointment(objEvent, id);
    } else {
        console.info("Modify appointment details form is invalid");
    }
}

// Function to delete an appointment from the database
function deleteAppointment() {
    // Retrieve the appointment ID from local storage
    var id = localStorage.getItem("id");

    // Create an array of options containing the appointment ID
    var options = [id];

    // Call the deleteAppointment function from Operations
    Operations.deleteAppointment(options);
}

// Function to add predefined departments to the database
function addDepartments() {
    // Define an array of department names
    var departments = [
        { name: 'Cardiology' },
        { name: 'Orthopedics' },
        { name: 'Neurology' },
        { name: 'Oncology' },
        { name: 'Gastroenterology' },
        { name: 'Pulmonology' },
        { name: 'Dermatology' },
        { name: 'Urology' },
        { name: 'Ophthalmology' },
        { name: 'Obstetrics & Gynecology' }
    ];

    // Iterate through the array and insert each department into the database
    for (var i = 0; i < departments.length; i++) {
        var record = departments[i];
        // Create a Department object and call the insertDepartment function from Operations
        var objEvent = new Departments(record.name);
        Operations.insertDepartment(objEvent);
    }
}

// Function to cancel the modification and navigate back to the home screen
function cancelModification() {
    $(location).prop('href', '#home');
}