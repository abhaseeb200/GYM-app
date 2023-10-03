//dom selector
let selectWorkout = document.getElementById("select-workout");
let selectWorkoutList = document.getElementById("select-workout-list");
let showUsername = document.getElementById("showUsername")
let logOutButton = document.getElementById("logOut-btn")
let exerciseSubmit = document.getElementById("exercise-submit")
let exerciseDuration = document.getElementById("exercise-duration")
let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))


//local storage
let getDataCurrentlyLogin = JSON.parse(localStorage.getItem("currentlyLogIn"));
let getExerciseData = JSON.parse(localStorage.getItem("exercise"))


//add workout exercise
console.log(getExerciseData);
for (let i = 0; i < getExerciseData.length; i++) {
    let option = document.createElement("option");
    option.value = getExerciseData[i]
    option.innerHTML = getExerciseData[i]
    selectWorkout.appendChild(option);
}
selectWorkout.addEventListener("change", () => {
    myModal.show();
})
exerciseSubmit.addEventListener("click",() => {
    let isEmpty = false
    if (exerciseDuration.value === "") {
        isEmpty = true;
    }

    if (!isEmpty && exerciseDuration.value >= 0 ) {
        let element = document.createElement("span");
        let elementSpan = document.createElement("span");
        selectWorkoutList.appendChild(element);
        element.innerHTML = selectWorkout.value;
        element.classList.add("bg-dark", "text-white", "px-3", "py-1", "rounded", "d-inline-flex", "align-items-center", "pointer")
        element.appendChild(elementSpan)
        elementSpan.classList.add("badge", "bg-secondary", "rounded-pill" ,"ms-2")
        elementSpan.innerHTML = exerciseDuration.value + "s"
        selectWorkout.remove(selectWorkout.selectedIndex)
        myModal.hide();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Please insert duration of exercise",
            // footer: '<a href="">Why do I have this issue?</a>'
        })
    }
})


// currently Login user
console.log(getDataCurrentlyLogin);
if (getDataCurrentlyLogin?.username) {
    console.log("login already")
    showUsername.innerHTML = getDataCurrentlyLogin?.username
} else {
    console.log("noo accont found")
    location.replace("../template/login.html")
}


// logOut button
logOutButton.addEventListener("click", () => {
    console.log("Logout...");
    localStorage.removeItem("currentlyLogIn")
    location.replace("./template/login.html");
})

