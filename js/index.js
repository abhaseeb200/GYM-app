//dom selector
let addExercise = document.getElementById("add-exercise-name")
let addExerciseSubmit = document.getElementById("add-exercise-submit")
let showUsername = document.getElementById("showUsername")
let logOutButton = document.getElementById("logOut-btn")
let closeExercise = document.getElementById("close-exercise")
let myModal = document.getElementById('exampleModal')
let myWorkoutLength = 0

//local storage selector
let getDataCurrentlyLogin = JSON.parse(localStorage.getItem("currentlyLogIn"));
let getDataAddExercise = localStorage.getItem("exercise") ? JSON.parse(localStorage.getItem("exercise")) : []
let getUsersData = JSON.parse(localStorage.getItem("users"));
console.log(getUsersData)

//check if current user is logout
if (!getDataCurrentlyLogin) {
    location.replace("./template/login.html")
} else {
    console.log(getDataCurrentlyLogin.username)
    showUsername.innerHTML += getDataCurrentlyLogin?.username
}

//show-username click to profile
showUsername.addEventListener("click", () => {
    location.href = "./template/myworkout.html"
})

//Get the workout length
for (let i = 0; i < getUsersData.length; i++) {
    if (getUsersData[i]?.username === getDataCurrentlyLogin?.username) {
        myWorkoutLength = getUsersData[i]?.myWorkout?.length
        break
    }    
}
if (myWorkoutLength) {
    showUsername.innerHTML += ` (${myWorkoutLength})`    
}

// logOut button
logOutButton.addEventListener("click", () => {
    console.log("Logout...");
    localStorage.removeItem("currentlyLogIn")
    location.replace("./template/login.html");
})


//close excercise modal button
myModal.addEventListener('hidden.bs.modal', function () {
    addExercise.value = ""
});


//add excercise name 
console.log(getDataAddExercise);
addExerciseSubmit.addEventListener("click", () => {
    let isAlreadyInsert = false;
    let isEmpty = false;
    if (addExercise.value === "") {
        isEmpty = true;
    }
    for (let i = 0; i < getDataAddExercise.length; i++) {
        if (getDataAddExercise[i] === addExercise.value.toLowerCase()) {
            isAlreadyInsert = true;
            break
        }
    }
    //add successfully
    if (!isAlreadyInsert && !isEmpty) {
        getDataAddExercise.push(addExercise.value.toLowerCase())
        localStorage.setItem("exercise", JSON.stringify(getDataAddExercise));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Exercise name has been saved',
            showConfirmButton: false,
            timer: 1500
        })
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

