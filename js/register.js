
//local Storage
let getCurrently = localStorage.getItem("currentlyLogIn")
let getUsers = localStorage.getItem("users");
let users = getUsers ? JSON.parse(getUsers) : [];

// Check if the user is Login
if (JSON.parse(getCurrently)) {
    location.replace("../index.html")
}

//Dom elements
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let conformPassword = document.getElementById("conformPassword");
let maleRadio = document.getElementById("male")
let femaleRadio = document.getElementById("female")
let genderValue = document.getElementsByName("gender");
let form = document.getElementById("registerForm");
let usernameError = document.getElementById("usernameError");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let conformPasswordError = document.getElementById("conformPasswordError");
let genderError = document.getElementById("genderError");
let genderCheckedValue = ""

//validation Passed
let usernameValidationPassed = false;
let emailValidationPassed = false;
let passwordValidationPassed = false;
let conformPasswordValidationPassed = false;
let genderValidationPassed = false;

// Event listener to submit form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleInput();
});

//Username
username.addEventListener("input", () => {
    handleUsername()
})

function handleUsername() {
    if (username.value === "") {
        usernameError.innerHTML = "Username can't be empty";
        username.classList.add("error");
        usernameValidationPassed = false
        return
    }

    let isCaptialLetter = false
    for (let i = 0; i < username.value.length; i++) {
        let charCode = username.value.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            isCaptialLetter = true;
        }
    }
    if (isCaptialLetter) {
        usernameError.innerHTML = "Username must be lowercase letters";
        username.classList.add("error");
        usernameValidationPassed = false
    } else if (username.value.length <= 3) {
        usernameError.innerHTML = "Username should be greater than 3";
        username.classList.add("error");
        usernameValidationPassed = false
    } else {
        usernameError.innerHTML = "";
        username.classList.remove("error");
        usernameValidationPassed = true;
    }
}


//Email...
email.addEventListener("input", () => {
    handleEmail();
})

function handleEmail() {
    let charCode = email.value.charCodeAt(0);
    if (email.value === "") {
        emailError.innerHTML = "Email can't be empty";
        email.classList.add("error");
        emailValidationPassed = false;
    } else if (!(charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122)) {
        emailError.innerHTML = "Email must start with a letter";
        email.classList.add("error");
        emailValidationPassed = false;
    } else if (email.value.charAt(0) === "@") {
        emailError.innerHTML = "@ isn't used in first";
        email.classList.add("error");
        emailValidationPassed = false;
    } else if (email.value.charAt(email.value.length - 4) === "@") {
        emailError.innerHTML = "@ isn't used in last 4 charactor";
        email.classList.add("error");
        emailValidationPassed = false;
    } else {
        emailError.innerHTML = "";
        email.classList.remove("error");
        emailValidationPassed = true;
    }
}

//password
password.addEventListener("input", () => {
    handlePassword();
})
function handlePassword() {
    if (password.value === "") {
        passwordError.innerHTML = "Password can't be empty";
        password.classList.add("error");
        return
    } else if (password.value.length < 6) {
        passwordError.innerHTML = "Password should be greater than 6";
        password.classList.add("error");
        return
    }
    let isSpecialChar = false;
    let isNumber = false;
    let isAlphabets = false;
    for (let i = 0; i < password.value.length; i++) {
        let charCode = password.value.charCodeAt(i);
        if (charCode >= 33 && charCode <= 47 || charCode >= 58 && charCode <= 64) {
            isSpecialChar = true;
        } else if (charCode >= 48 && charCode <= 57) {
            isNumber = true;
        } else if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
            isAlphabets = true;
        }
    }
    if (!isAlphabets) {
        passwordError.innerHTML = "Password required Alphabats";
        password.classList.add("error");
        passwordValidationPassed = false;
    } else if (!isNumber) {
        passwordError.innerHTML = "Password required Numbers"
        password.classList.add("error");
        passwordValidationPassed = false;
    } else if (!isSpecialChar) {
        passwordError.innerHTML = "Password required Special Character";
        password.classList.add("error");
        passwordValidationPassed = false;
    } else {
        passwordError.innerHTML = "";
        password.classList.remove("error");
        passwordValidationPassed = true;
    }
}

//match password
conformPassword.addEventListener("input", () => {
    handleConformPassword();
})

function handleConformPassword() {
    if (conformPassword.value === "") {
        conformPasswordError.innerHTML = "Password can't be empty";
        conformPassword.classList.add("error");
        conformPasswordValidationPassed = false;
    } else if (conformPassword.value !== password.value) {
        conformPasswordError.innerHTML = "Password does't match";
        conformPassword.classList.add("error");
        conformPasswordValidationPassed = false;
    } else {
        conformPasswordError.innerHTML = "";
        conformPassword.classList.remove("error");
        conformPasswordValidationPassed = true;
    }
}

//Gender
maleRadio.addEventListener("change", () => {
    handleGender();
})

femaleRadio.addEventListener("change", () => {
    handleGender();
})

function handleGender() {
    if (!maleRadio.checked && !femaleRadio.checked) {
        genderError.innerHTML = "Gender should be checked";
        genderValidationPassed = false;
        return
    } else {
        genderError.innerHTML = "";
        genderValidationPassed = true;
    }
    for (let i = 0; i < genderValue.length; i++) {
        if (genderValue[i].checked) {
            genderCheckedValue = genderValue[i].value;
        }
    }
}

function handleInput() {
    if (username.value === "") {
        usernameError.innerHTML = "Username can't be empty";
        username.classList.add("error");
    }
    if (email.value === "") {
        emailError.innerHTML = "Email can't be empty";
        email.classList.add("error");
    }
    if (password.value === "") {
        passwordError.innerHTML = "Password can't be empty";
        password.classList.add("error");
    }
    if (conformPassword.value === "") {
        conformPasswordError.innerHTML = "Confirm Password can't be empty";
        conformPassword.classList.add("error");
    }
    if (!maleRadio.checked && !femaleRadio.checked) {
        genderError.innerHTML = "Gender should be checked";
    }


    //All Validation Passed, Now store in local storage
    if (usernameValidationPassed && emailValidationPassed && passwordValidationPassed && conformPasswordValidationPassed && genderValidationPassed) {
        //check username or email is already in used...
        let getData = JSON.parse(getUsers)
        let isUsernameAlreadyUsed = false;
        let isEmailAlreadyUsed = false;
        for (let i = 0; i < getData?.length; i++) {
            if (getData[i].username === username.value.toLowerCase().trim()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username already in used',
                })
                isUsernameAlreadyUsed = true;
                break //next code will not excute if they found same username
            } else if (getData[i].email === email.value.toLowerCase().trim()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email already registered',
                })
                isEmailAlreadyUsed = true;
                break //next code will not excute if they found same email
            }
        }

        if (!isUsernameAlreadyUsed && !isEmailAlreadyUsed) {
            const newUser = {
                username: username.value.toLowerCase().trim(),
                email: email.value.toLowerCase().trim(),
                password: password.value,
                gender: genderCheckedValue,
            }
            users.push(newUser)
            localStorage.setItem("users", JSON.stringify(users));
            const newLogin = {
                username: username.value.toLowerCase(),
            }
            localStorage.setItem("currentlyLogIn", JSON.stringify(newLogin))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Register account successful',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(function () {
                location.replace("../index.html")
            }, 1500);
        }
    }
}
