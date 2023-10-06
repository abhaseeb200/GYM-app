
//local Storage
let getCurrently = localStorage.getItem("currentlyLogIn")
let getUsers = localStorage.getItem("users");
let users = getUsers ? JSON.parse(getUsers) : [];
console.log(JSON.parse(getUsers));


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

// Check if the user is Login
if (JSON.parse(getCurrently)) {
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


//Email...
email.addEventListener("input", ()=> {
    handleEmail();
})

function handleEmail() {
    if (email.value === "") {
        emailError.innerHTML = "Email can't be empty";
        email.classList.add("error");
    } else if (email.value.charAt(0) === "@") {
        emailError.innerHTML = "@ isn't used in first";
        email.classList.add("error");
    } else if (email.value.charAt(email.value.length - 4) === "@") {
        emailError.innerHTML = "@ isn't used in last 4 charactor";
        email.classList.add("error");
    } else {
        emailError.innerHTML = "";
        email.classList.remove("error");
        emailValidationPassed = true;
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

//match password
conformPassword.addEventListener("input",()=>{
    handleConformPassword();
})

function handleConformPassword() {
    if (conformPassword.value === "") {
        conformPasswordError.innerHTML = "Password can't be empty";
        conformPassword.classList.add("error");
    } else if (conformPassword.value !== password.value) {
        conformPasswordError.innerHTML = "Password does't match";
        conformPassword.classList.add("error");
    } else {
        conformPasswordError.innerHTML = "";
        conformPassword.classList.remove("error");
        conformPasswordValidationPassed = true;
    }
}

//Gender
maleRadio.addEventListener("change",()=>{
    handleGender();
})

femaleRadio.addEventListener("change",()=>{
    handleGender();
})

function handleGender() {
    if (!maleRadio.checked && !femaleRadio.checked) {
        genderError.innerHTML = "Gender should be checked";
    } else {
        genderError.innerHTML = "";
        genderValidationPassed = true;
    }
    for (let i = 0; i < genderValue.length; i++) {
        if (genderValue[i].checked) {
            console.log(genderValue[i].value);
            genderCheckedValue = genderValue[i].value;
        }
    }
}

function handleInput() {
    handleUsername()
    handleEmail()
    handlePassword()
    handleConformPassword()
    handleGender()

    //All Validation Passed, Now store in local storage
    if (usernameValidationPassed && emailValidationPassed && passwordValidationPassed && conformPasswordValidationPassed && genderValidationPassed) {
        console.log("All validation Passed");
        const newUser = {
            username: username.value.toLowerCase(),
            email: email.value.toLowerCase(),
            password: password.value,
            gender: genderCheckedValue,
        }

        //check username or email is already in used...
        let getData = JSON.parse(getUsers)
        let isUsernameAlreadyUsed = false;
        let isEmailAlreadyUsed = false;
        for (let i = 0; i < getData?.length; i++) {
            if (getData[i].username === username.value.toLowerCase()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username already in used',
                })                  
                isUsernameAlreadyUsed = true;
                //next code will not excute if they found same username
            } else if (getData[i].email === email.value.toLowerCase()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email already registered',
                })  
                isEmailAlreadyUsed = true;
            }
        }

        if(!isUsernameAlreadyUsed && !isEmailAlreadyUsed) {
            users.push(newUser)
            localStorage.setItem("users",JSON.stringify(users));
            const newLogin = {
                username: username.value.toLowerCase(),
            }
            localStorage.setItem("currentlyLogIn",JSON.stringify(newLogin))
            // location.href = "../index.html"
            location.replace("../index.html")
        }
    }
}
