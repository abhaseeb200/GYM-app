//dom selector
let addExercise = document.getElementById("add-exercise-name")
let addExerciseSubmit = document.getElementById("add-exercise-submit")
let showUsername = document.getElementById("showUsername")
let logOutButton = document.getElementById("logOut-btn")
let startWorking = document.getElementById("start-working")

//local storage selector
let getDataCurrentlyLogin = JSON.parse(localStorage.getItem("currentlyLogIn"));
let getDataAddExercise = localStorage.getItem("exercise") ? JSON.parse(localStorage.getItem("exercise")) : []

// currently Login user
console.log(getDataCurrentlyLogin);
console.log(history.length,"History length")
if (getDataCurrentlyLogin?.username) {
    console.log("login already")
    showUsername.innerHTML = getDataCurrentlyLogin?.username
} else {
    console.log("nott")
    // location.replace("./template/login.html")
}


// logOut button
logOutButton.addEventListener("click", () => {
    console.log("Logout...");
    localStorage.removeItem("currentlyLogIn")
    location.replace("./template/login.html");
})

//start working button
startWorking.addEventListener("click", () => {
    location.href = "./template/exerciseStart.html"
})

//add excercise name 
console.log(getDataAddExercise);
addExerciseSubmit.addEventListener("click",()=> {
    let isAlreadyInsert = false;
    let isEmpty = false;
    for (let i = 0; i < getDataAddExercise.length; i++) {    
        if (getDataAddExercise[i] === addExercise.value.toLowerCase()) {
            isAlreadyInsert = true;
        }
        if (addExercise.value === "") {
            isEmpty = true;
        }
    }
    if (!isAlreadyInsert && !isEmpty) {
        getDataAddExercise.push(addExercise.value.toLowerCase())
        localStorage.setItem("exercise",JSON.stringify(getDataAddExercise));
        console.log(getDataAddExercise);
        addExercise.value = ""
    } else if (isAlreadyInsert) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Already available",
        })
    } else if (isEmpty) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Empty is not allow",
        })
    }
})

