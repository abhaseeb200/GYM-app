//dom selector
let addExercise = document.getElementById("add-exercise-name")
let addExerciseSubmit = document.getElementById("add-exercise-submit")
let showUsername = document.getElementById("showUsername")
let logOutButton = document.getElementById("logOut-btn")
let closeExercise = document.getElementById("close-exercise")
let addExerciseNameError = document.getElementById("add-exercise-name-error");
let myModal = document.getElementById('exampleModal')
let myWorkoutLength = 0

//local storage selector
let getDataCurrentlyLogin = JSON.parse(localStorage.getItem("currentlyLogIn"));
let getDataAddExercise = localStorage.getItem("exercise") ? JSON.parse(localStorage.getItem("exercise")) : []
let getUsersData = JSON.parse(localStorage.getItem("users"));

//check if current user is logout
if (!getDataCurrentlyLogin) {
    location.replace("./template/login.html")
} else {
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
    localStorage.removeItem("currentlyLogIn")
    location.replace("./template/login.html");
})


//close excercise modal button
myModal.addEventListener('hidden.bs.modal', function () {
    addExercise.value = ""
});


//add excercise name 
addExerciseSubmit.addEventListener("click", () => {
    //less code execute
    if (addExercise.value === "") {
        addExerciseNameError.innerHTML = "Exercise name is required";
        addExercise.classList.add("border-danger")
        return
    } 
    
    let isLetter = true;
    let isAlreadyInsert = false;

    //check letter
    for (let i = 0; i < addExercise.value.length; i++) {
        let charCode = addExercise.value.charCodeAt(i);
        if (!(charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 || charCode === 32)) {
            isLetter = false;
        }
    }
    
    //check already insert --- extra code execute if they not find letter. (Pending)
    for (let i = 0; i < getDataAddExercise.length; i++) {
        if (getDataAddExercise[i].replace(/\s+/g, '') === addExercise.value.replace(/\s+/g, '').toLowerCase()) {
            isAlreadyInsert = true;
            break
        }
    }

    //add successfully
    if (!isAlreadyInsert && addExercise.value !== "" && isLetter) {
        getDataAddExercise.push(addExercise.value.toLowerCase())
        localStorage.setItem("exercise", JSON.stringify(getDataAddExercise));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Exercise name has been saved',
            showConfirmButton: false,
            timer: 1500
        })
        addExercise.value = ""
    } else if (!isLetter) {
        addExerciseNameError.innerHTML = "Exercise is accept only Letter";
        addExercise.classList.add("border-danger")
    } else if (isAlreadyInsert) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Already available, Please try another name",
        })
    }
    else {
        addExerciseNameError.innerHTML = "";
        addExercise.classList.remove("border-danger")
    }
})

//Exercise Name validtion
addExercise.addEventListener("input", () => {
    //Less code execute
    if (addExercise.value === "") {
        addExerciseNameError.innerHTML = "Exercise name is required";
        addExercise.classList.add("border-danger")
        return
    }
    
    //check letter
    let isLetter = true;
    for (let i = 0; i < addExercise.value.length; i++) {
        let charCode = addExercise.value.charCodeAt(i);
        if (!(charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 || charCode === 32)) {
            isLetter = false;
        }
    }

    if (!isLetter) {
        addExerciseNameError.innerHTML = "Exercise is accept only Letter";
        addExercise.classList.add("border-danger")
    }
    else {
        addExerciseNameError.innerHTML = ""
        addExercise.classList.remove("border-danger")
    }
})

//close excercise modal button
myModal.addEventListener('hidden.bs.modal', function () {
    addExercise.value = ""
    addExerciseNameError.innerHTML = ""
    addExercise.classList.remove("border-danger")
});