const LoginFields = {
    email: document.getElementById("login-email"),
    password: document.getElementById("login-password"),
    emailError: document.getElementById("login-email-error"),
    passwordError: document.getElementById("login-password-error")
}

// For login
// email events
LoginFields.email.onkeydown = (e) => {
    if (!/[a-z@\.]/.test(e.key)) {
        e.preventDefault();
    }
};

LoginFields.email.onkeyup = (e) => {
    validateEmail();
};

LoginFields.email.onblur = (e) => {
    validateEmail();
};

// password events
LoginFields.password.onkeyup = (e) => {
    validatePassword();
};

LoginFields.password.onblur = (e) => {
    validatePassword();
}

//form events
document.getElementById("login-form").onsubmit = (e) => {
    const validEmail = validateEmail(), validPassword = validatePassword();

    if (validEmail && validPassword) {
        document.getElementById("login-form").classList.add("hide");
        setTimeout(() => {
            document.getElementById("login-form").style.display = "none";
            document.getElementById("feedback-form").style.display = "flex";
            document.getElementById("feedback-form").classList.add("show");
        }, 1000);
    }

    return false;
}

function validateEmail() {
    const val = LoginFields.email.value;

    if (val.length === 0) {
        showError(LoginFields.emailError, "Field cannot be empty.");
    } 
    else {
        const pattern = /^\w+\.\w+@\w+\.christuniversity\.in$/;

        if (pattern.test(val)) {
            hideError(LoginFields.emailError);
            return true;
        }
        else {
            showError(LoginFields.emailError, "Must use official CHIRST email only.");
        }
    }

    return false;
}

function validatePassword() {
    let val = LoginFields.password.value;

    if (val.length === 0) {
        showError(LoginFields.passwordError, "Field cannot be empty.");
    }
    else {
        var errors = "";
        
        if (val.length < 8 || val.length > 30)
            errors += "Password cannot be less than 8 or more than 30 characters.";
        else {
            if (val.search(/[a-z]/) < 0)
                errors = "Password must contain one lowercase letter.<br/>";
            if (val.search(/[A-Z]/) < 0)
                errors += "Password must contain one uppercase letter.<br/>";
            if (val.search(/[0-9]/) < 0)
                errors += "Password must contain at least one digit.<br/>";
            if (val.search(/[^\w\s]/) < 0)
                errors += "Password must contain at least one special character.<br/>";
            
            val = val.substring(1, val.length - 1);

            if (!/^(?=.*\d)(?=.*[A-Z])(?=.*[^\w\s]).+$/.test(val)) {
                errors += ("At least 1 upper case, numeric, and special character must be EMBEDDED " 
                    + "somewhere in the middle of the password, and not just be the first or the last character "
                    + "of the password string.");
            }
        }
        
        if (errors.length === 0) {
            hideError(LoginFields.passwordError)
            return true;
        }
        
        showError(LoginFields.passwordError, errors, true);
    }

    return false;
}