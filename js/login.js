//local Storage
let getItem = localStorage.getItem("currentlyLogIn")
let getCurrentlyLogin = getItem ? JSON.parse(getItem) : {};
console.log(JSON.parse(getItem));

let getUsers = localStorage.getItem("users");
console.log(JSON.parse(getUsers));

//Dom elements
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementById("logInForm");
let usernameError = document.getElementById("usernameError");
let passwordError = document.getElementById("passwordError");
let usernameValidationPassed = false;
let passwordValidationPassed = false;

// Check if the user is Login
if (JSON.parse(getItem)) {
    console.log("login...")
    location.replace("../index.html")
} else {
    console.log("NOT")
}

// Event listener to submit form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleInput();
});

//Username
username.addEventListener("input",()=>{
    handleUsername()
})
function handleUsername(){
    if (username.value === "") {
        usernameError.innerHTML = "Username can't be empty";
        username.classList.add("error");
    } else if (username.value.length <= 3) {
        usernameError.innerHTML = "Username should be greater than 3";
        username.classList.add("error");
    } else {
        usernameError.innerHTML = "";
        username.classList.remove("error");
        usernameValidationPassed = true;
    }
}

//password
password.addEventListener("input",()=>{
    handlePassword();
})
function handlePassword() {
    let isSpecialChar = false;
    let isNumber = false;
    let isAlphabets = false;
    for (let i = 0; i < password.value.length; i++) {
        let charCode = password.value.charCodeAt(i);
        if (charCode >= 33 && charCode <= 47 || charCode >=58 && charCode <= 64) {
            isSpecialChar = true;
        } else if (charCode >= 48 && charCode <= 57) {
            isNumber = true;
        } else if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
            isAlphabets = true;
        }
    }
    if (password.value === "") {
        passwordError.innerHTML = "Password can't be empty";
        password.classList.add("error");
    } else if (password.value.length < 6) {
        passwordError.innerHTML = "Password should be greater than 6";
        password.classList.add("error");
    } else if (!isSpecialChar || !isNumber || !isAlphabets) {
        passwordError.innerHTML = "Password combination of ALPHABATS, NUMBERS, SPECIAL CHARACTERS";
        console.log("special:",isSpecialChar, "number:",isNumber,"alphabets:",isAlphabets)
        password.classList.add("error");
    } else {
        passwordError.innerHTML = "";
        password.classList.remove("error");
        console.log("special:",isSpecialChar, "number:",isNumber,"alphabets:",isAlphabets)
        passwordValidationPassed = true;
    }
}

function handleInput() {
    let getData = JSON.parse(getUsers);
    let isUsernameCorrect = false;
    let isPasswordCorrect = false;
    handleUsername();
    handlePassword()
    if (usernameValidationPassed && passwordValidationPassed) {
        //check username and password
        for (let i = 0; i < getData?.length; i++) {
            if (getData[i].username === username.value.toLowerCase()) {
                isUsernameCorrect = true;
            } else if (getData[i].password === password.value) {
                isPasswordCorrect = true;
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
            console.log("Successfully login...")
            const newCurrentLogin = {
                username: username.value.toLowerCase(),
            }
            localStorage.setItem("currentlyLogIn",JSON.stringify(newCurrentLogin))
            // window.location.href = "../index.html";
            location.replace("../index.html")
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: alertTextError,
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }
}
