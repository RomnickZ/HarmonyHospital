// Constructor function for creating an Appointment object
// @returns {Appointment} - An Appointment object with specified properties
var Appointment = function(fullname, email, phone, appointmentdate, departmentId, message) {
    // Initialize properties of the Appointment object
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
    this.appointmentdate = appointmentdate;
    this.departmentId = departmentId;
    this.message = message;
};

// Constructor function for creating a Departments object
var Departments = function(name) {
    // Initialize the 'name' property of the Departments object
    this.name = name;
};