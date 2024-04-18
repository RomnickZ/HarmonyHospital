// Execute the following code when the document is ready
$(document).ready(function () {
    // Call the initialization functions when the document is ready
    init(); // Initialize UI event handlers
    initDB(); // Initialize the database
});

// Event handler for the "Add Appointment" button click
function btnAddAppointment_click() {
    // Perform validation and add appointment if valid
    addAppointmentValidation();
    addAppointment();
}

// Event handler for the "Update Appointment" button click
function btnUpdateAppointment_click() {
    // Perform validation and update appointment if valid
    modifyAppointmentValidation();
    updateAppointment();
}

// Event handler for the "Delete Appointment" button click
function btnDeleteAppointment_click() {
    // Delete the selected appointment
    deleteAppointment();
}

// Event handler for the page displaying individual appointment details
function pageAppointmentById_show() {
    // Show details of a specific appointment
    showAppointmentById();
}

// Event handler for the page displaying a list of appointments
function pageAppointment_show() {
    // Show a list of appointments
    showAppointments();
}

// Event handler for the "Cancel" button click
function btnCancel_click() {
    // Cancel the modification and navigate back to the home screen
    cancelModification();
}

function btnShow_click() {
    getPosition();
}

// Initialization function to set up event handlers
function init() {
    // Assign event handlers to UI elements
    $("#btnAddAppointment").on("click", btnAddAppointment_click);
    $("#btnUpdate").on("click", btnUpdateAppointment_click);
    $("#btnDelete").on("click", btnDeleteAppointment_click);
    $("#viewAppointment").on("click", pageAppointment_show);
    $("#appointmentUpdate").on("click", pageAppointmentById_show);
    $("#btnCancel").on("click", btnCancel_click);
    $("#btnShow").on("click", btnShow_click);
}

// Database initialization function
function initDB() {
    try {
        // Create and initialize the database
        DB.createDatabase();
        // Check if the database is successfully created
        if (db) {
            console.info("Creating Tables ...");
            // Drop existing tables and create new ones
            DB.dropTables();
            DB.createTables();
            // Add predefined departments to the database
            addDepartments();
        } else {
            console.error("Error: Cannot create tables: Database does not exist");
        }
    } catch (e) {
        console.error("Error (Fatal): Error in initDB. Cannot proceed");
    }
}