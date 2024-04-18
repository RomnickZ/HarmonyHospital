// Function to validate the "Add Appointment" form using the jQuery Validation Plugin
// Returns: Boolean - true if the form is valid, false otherwise
function doValidate_frmAddAppointment() {
    // Select the form with the ID "frmAddAppointment"
    var form = $("#frmAddAppointment");

    // Configure validation rules and messages for form fields
    form.validate({
        rules: {
            fullname: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            email: {
                required: true,
                emailAddress: true
            },
            phone: {
                required: true,
                tenDigitPhoneNumber: true
            },
            appointmentdate: {
                required: true,
                checkdate: true
            },
            message: {
                required: true,
                minlength: 5,
                maxlength: 50
            }
        },
        messages: {
            fullname: {
                required: "Full name of patient is required",
                minlength: "Minimum letters required are 2",
                maxlength: "Maximum letters allowed are 20"
            },
            email: {
                required: "Patient email is required",
                emailAddress: "Patient email must be a valid email address"
            },
            phone: {
                required: "Patient phone number is required",
                tenDigitPhoneNumber: "Phone number should be only 10 digits long"
            },
            appointmentdate: {
                required: "Appointment date is required",
                checkdate: "Appointment date cannot be in the past."
            },
            message: {
                required: "Reason for appointment is required",
                minlength: "Minimum letters required are 5",
                maxlength: "Maximum letters allowed are 50"
            }
        }
    });

    // Return whether the form is valid or not
    return form.valid();
}

// Function to validate the "Modify Appointment" form using the jQuery Validation Plugin
// Returns: Boolean - true if the form is valid, false otherwise
function doValidate_frmModifyAppointment() {
    // Select the form with the ID "frmModifyAppointment"
    var form = $("#frmModifyAppointment");

    // Configure validation rules and messages for form fields
    form.validate({
        rules: {
            fullname1: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            email1: {
                required: true,
                emailAddress: true
            },
            phone1: {
                required: true,
                tenDigitPhoneNumber: true
            },
            message1: {
                required: true,
                minlength: 5,
                maxlength: 50
            }
        },
        messages: {
            fullname1: {
                required: "Full name of patient is required",
                minlength: "Minimum letters required are 2",
                maxlength: "Maximum letters allowed are 20"
            },
            email1: {
                required: "Patient email is required",
                emailAddress: "Patient email must be a valid email address"
            },
            phone1: {
                required: "Patient phone number is required",
                tenDigitPhoneNumber: "Phone number should be only 10 digits long"
            },
            message1: {
                required: "Reason for appointment is required",
                minlength: "Minimum letters required are 5",
                maxlength: "Maximum letters allowed are 50"
            }
        }
    });

    // Return whether the form is valid or not
    return form.valid();
}

// Custom validation method to check if the appointment date is in the future
$.validator.addMethod("checkdate", function(value, element) {
    // Get the current date
    var currentDate = new Date();

    // Check if the selected date is in the future
    if (new Date($("#appointmentdate").val()) > currentDate) {
        return true;
    } else {
        return false;
    }
});

// Custom validation method to check if the input is a valid email address
$.validator.addMethod("emailAddress", function(value) {
    // Use a regular expression to validate the email address format
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
});

// Custom validation method to check if the phone number is 10 digits long
$.validator.addMethod("tenDigitPhoneNumber", function(value, element) {
    // Use a regular expression to validate the phone number format
    return this.optional(element) || /^\d{10}$/.test(value);
});