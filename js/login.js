//local Storage
let getItem = localStorage.getItem("currentlyLogIn")
let getCurrentlyLogin = getItem ? JSON.parse(getItem) : {};
let getUsers = localStorage.getItem("users");

// Check if the user is Login
if (JSON.parse(getItem)) {
    location.replace("../index.html")
}

//Dom elements
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementById("logInForm");
let usernameError = document.getElementById("usernameError");
let passwordError = document.getElementById("passwordError");
let usernameValidationPassed = false;
let passwordValidationPassed = false;


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

function handleInput() {
    let usernameIsEmpty = false;
    let passwordIsEmpty = false;
    if (username.value === "") {
        usernameError.innerHTML = "Username can't be empty";
        username.classList.add("error");
        usernameIsEmpty = true
    }
    if (password.value === "") {
        passwordError.innerHTML = "Password can't be empty";
        password.classList.add("error");
        passwordIsEmpty = true;
    }
    //less code execute
    if (usernameIsEmpty || passwordIsEmpty) {
        return
    }

    let getData = JSON.parse(getUsers);
    let isUsernameCorrect = false;
    let isPasswordCorrect = false;
    if (usernameValidationPassed && passwordValidationPassed) {
        //check username and password
        for (let i = 0; i < getData?.length; i++) {
            if (getData[i].username === username.value.toLowerCase().trim()) {
                isUsernameCorrect = true;
            }
            if (getData[i].password === password.value) {
                isPasswordCorrect = true;
                break
            }
        }
        //change sweet alert text if username or password are incorrect
        if (!isUsernameCorrect) {
            alertTextError = "Username is not found"
        } else if (!isPasswordCorrect) {
            alertTextError = "Password is incorrect"
        }

        //Login if both are correct
        if (isUsernameCorrect && isPasswordCorrect) {
            const newCurrentLogin = {
                username: username.value.trim().toLowerCase(),
            }
            localStorage.setItem("currentlyLogIn", JSON.stringify(newCurrentLogin))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'LogIn account successful',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(function () {
                location.replace("../index.html")
            }, 1500);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: alertTextError,
            })
        }
    }
}
