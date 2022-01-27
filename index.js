const LoginFields = {
    email: document.getElementById("login-email"),
    password: document.getElementById("login-password"),
    emailError: document.getElementById("login-email-error"),
    passwordError: document.getElementById("login-password-error")
}

const FeedbackFields = {
    name: document.getElementById("name"),
    nameError: document.getElementById("name-error"),
    address: document.getElementById("address"),
    addressError: document.getElementById("address-error"),
    email: document.getElementById("email"),
    emailError: document.getElementById("email-error"),
    likedStudents: document.getElementById("liked-students"),
    likedLocation: document.getElementById("liked-location"),
    likedCampus: document.getElementById("liked-campus"),
    likedAtmosphere: document.getElementById("liked-atmosphere"),
    likedDorms: document.getElementById("liked-dorms"),
    likedSports: document.getElementById("liked-sports"),
    interest: document.getElementsByName("interest"),
    additionalComments: document.getElementById("comments")
};

const DisplayFields = {
    recordedName: document.getElementById("recorded-name"),
    recordedEmail: document.getElementById("recorded-email"),
    recordedAddress: document.getElementById("recorded-address"),
    recordedLikes: document.getElementById("recorded-likes"),
    recordedInterest: document.getElementById("recorded-interest"),
    recordedComments: document.getElementById("recorded-comments")
}

// For login
// email events
LoginFields.email.onkeydown = (e) => {
    if (!/[a-z@\.]/.test(e.key)) {
        e.preventDefault();
    }
};

LoginFields.email.onkeyup = (e) => {
    validateEmail(LoginFields);
};

LoginFields.email.onblur = (e) => {
    validateEmail(LoginFields);
};

// password events
LoginFields.password.onkeyup = (e) => {
    validatePassword();
};

LoginFields.password.onblur = (e) => {
    validatePassword();
}

// form events
document.getElementById("login-form").onsubmit = (e) => {
    const validEmail = validateEmail(LoginFields), validPassword = validatePassword();

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

document.getElementById("feedback-form").onsubmit = (e) => {
    const validName = validateName(), validAddress = (FeedbackFields.address.value.trim().length !== 0), validEmail = validateEmail(FeedbackFields);

    if (!validAddress) {
        showError(FeedbackFields.addressError, "Field cannot be empty.");
    }

    if (validName && validEmail && validAddress) {
        const name = FeedbackFields.name.value, address = FeedbackFields.address.value, email = FeedbackFields.email.value;
        var likes = [];

        if (FeedbackFields.likedAtmosphere.checked)
            likes.push(FeedbackFields.likedAtmosphere.value);
        if (FeedbackFields.likedCampus.checked)
            likes.push(FeedbackFields.likedCampus.value);
        if (FeedbackFields.likedDorms.checked)
            likes.push(FeedbackFields.likedDorms.value);
        if (FeedbackFields.likedLocation.checked)
            likes.push(FeedbackFields.likedLocation.value);
        if (FeedbackFields.likedSports.checked)
            likes.push(FeedbackFields.likedSports.value);
        if (FeedbackFields.likedStudents.checked)
            likes.push(FeedbackFields.likedStudents.value);
        
        var interested = null;

        for (let i = 0; i < FeedbackFields.interest.length; i++) {
            if (FeedbackFields.interest[i].checked) {
                interested = FeedbackFields.interest[i].value;
                break;
            }
        }

        const additionalComments = FeedbackFields.additionalComments.value;

        document.getElementById("feedback-form").classList.remove("show");
        setTimeout(() => {
            document.getElementById("feedback-form").style.display = "none";

            DisplayFields.recordedAddress.innerText = address;
            DisplayFields.recordedComments.innerText = additionalComments;
            DisplayFields.recordedEmail.innerText = email;
            DisplayFields.recordedInterest.innerText = interested;
            DisplayFields.recordedName.innerText = name;

            var likesFormatted = "";

            for (let i = 0; i < likes.length; i++) {
                if (i + 1 === likes.length)
                    likesFormatted += likes[i];
                else
                    likesFormatted += likes[i] + ", ";
            }

            DisplayFields.recordedLikes.innerText = likesFormatted;

            document.getElementById("show-info").style.display = "flex";
            document.getElementById("show-info").classList.add("show");
        }, 1000);
    }
    
    return false;
}

// For feedback form
// name events
FeedbackFields.name.onkeydown = (e) => {
    if (!/[a-zA-Z]/.test(e.key) && e.key !== "Backspace" && e.key !== " "
        && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
        e.preventDefault();
    }
    else {
        if (FeedbackFields.name.value.length === 0) {
            if (e.key === " ")
                e.preventDefault();
        }
    }
};

FeedbackFields.name.onkeyup = (e) => {
    if (FeedbackFields.name.value.trim().length === 0) {
        showError(FeedbackFields.nameError, "Field cannot be empty.");
    }
    else {
        validateName();
    }
};

FeedbackFields.name.onblur = (e) => {
    if (FeedbackFields.name.value.trim().length === 0) {
        showError(FeedbackFields.nameError, "Field cannot be empty.");
    }
    else {
        validateName();
    }
};

// address events
FeedbackFields.address.onkeyup = (e) => {
    if (FeedbackFields.address.value.trim().length === 0) {
        showError(FeedbackFields.addressError, "Field cannot be empty.");
    }
    else {
        hideError(FeedbackFields.addressError);
    }
};

FeedbackFields.address.onblur = () => {
    if (FeedbackFields.address.value.trim().length === 0) {
        showError(FeedbackFields.addressError, "Field cannot be empty.");
    }
    else {
        hideError(FeedbackFields.addressError);
    }
}

// email events
FeedbackFields.email.onkeydown = (e) => {
    if (!/[a-z@\.]/.test(e.key)) {
        e.preventDefault();
    }
};

FeedbackFields.email.onkeyup = (e) => {
    validateEmail(FeedbackFields);
};

FeedbackFields.email.onblur = (e) => {
    validateEmail(FeedbackFields);
};

// reset button
document.getElementById("reset").onclick = () => {
    FeedbackFields.name.value = "";
    FeedbackFields.address.value = "";
    FeedbackFields.email.value = "";

    FeedbackFields.likedStudents.checked = false;
    FeedbackFields.likedLocation.checked = false;
    FeedbackFields.likedCampus.checked = false;
    FeedbackFields.likedAtmosphere.checked = false;
    FeedbackFields.likedDorms.checked = false;
    FeedbackFields.likedSports.checked = false;

    FeedbackFields.interest[0].checked = true;

    FeedbackFields.additionalComments.value = "";
};

function validateEmail(field) {
    const val = field.email.value;

    if (val.length === 0) {
        showError(field.emailError, "Field cannot be empty.");
    } 
    else {
        const pattern = /^\w+\.\w+@\w+\.christuniversity\.in$/;

        if (pattern.test(val)) {
            hideError(field.emailError);
            return true;
        }
        else {
            showError(field.emailError, "Must use official CHIRST email only.");
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

function validateName() {
    const name = FeedbackFields.name.value;
        
    if (/^[a-zA-Z]+\s[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(name)) {
        hideError(FeedbackFields.nameError);
        return true;
    }
    else {
        showError(FeedbackFields.nameError, "Must follow pattern: FName [MName] LName");
        return false;
    }
}