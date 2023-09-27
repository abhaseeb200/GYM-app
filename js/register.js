
//local Storage
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

// Event listener to submit form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleInput();
});

//Username
username.addEventListener("blur",()=>{
    handleUsername()
})

function handleUsername(){
    if (username.value === "") {
        usernameError.innerHTML = "Username can't be empty";
        username.classList.add("error");
    } else if (username.value.length <= 3) {
        usernameError.innerHTML = "Username should be greater than 3";
        email.classList.add("error");
    } else {
        usernameError.innerHTML = "";
        username.classList.remove("error");
        usernameValidationPassed = true;
    }
}


//Email...
email.addEventListener("blur", ()=> {
    handleEmail();
})

function handleEmail() {
    if (email.value === "") {
        emailError.innerHTML = "Email can't be empty";
        email.classList.add("error");
    } else if (email.value.charAt(email.value.length - 4) === "@") {
        emailError.innerHTML = "Email can't be empty";
        email.classList.add("error");
    } else {
        emailError.innerHTML = "";
        email.classList.remove("error");
        emailValidationPassed = true;
    }
}

//password
password.addEventListener("blur",()=>{
    handlePassword();
})

function handlePassword(params) {
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
        email.classList.add("error");
    } else if (!isSpecialChar || !isNumber || !isAlphabets) {
        passwordError.innerHTML = "Password combination of ALPHABATS, NUMBERS, SPECIAL CHARACTERS";
        console.log("special:",isSpecialChar, "number:",isNumber,"alphabets:",isAlphabets)
        email.classList.add("error");
    } else {
        passwordError.innerHTML = "";
        password.classList.remove("error");
        console.log("special:",isSpecialChar, "number:",isNumber,"alphabets:",isAlphabets)
        passwordValidationPassed = true;
    }
}

//match password
conformPassword.addEventListener("blur",()=>{
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
            username: username.value,
            email: email.value,
            password: password.value,
            gender: genderCheckedValue,
        }
        users.push(newUser)

        //check username is already used...
        let getData = JSON.parse(getUsers)
        let isUsernameAlready = false;
        for (let i = 0; i < getData?.length; i++) {
            if (getData[i].username === username.value) {
                alert("Username already exist...");
                isUsernameAlready = true;
            } else if (getData[i].email === email.value) {
                alert("Email already exist...");
                isUsernameAlready = true;
            }
        }

        if(!isUsernameAlready) {
            localStorage.setItem("users",JSON.stringify(users));
            alert("Register Successfully...")        
            location.reload();
        }
    }
}
