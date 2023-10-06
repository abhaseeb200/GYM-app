//local storage
let getUserData = JSON.parse(localStorage.getItem("users"))
let getDataCurrentlyLogin = JSON.parse(localStorage.getItem("currentlyLogIn"));

//DOM selector
let exerciseCounterDisplay = document.getElementById("exercise-counter")
let workoutHeading = document.getElementById("workout-heading")
let excerciseHeading = document.getElementById("exercise-heading")
let exerciseImage = document.getElementById("exercise-image")
let timeCountHeading = document.getElementById("time-count-text")
let showUsername = document.getElementById("showUsername")
let myModal = new bootstrap.Modal(document.getElementById('exampleModal'),{
    keyboard: false
})
let getStartWorkout = ""

//get workout data
for (let i = 0; i < getUserData?.length; i++) {
    if (getUserData[i].username === getDataCurrentlyLogin.username) {
        getStartWorkout = getUserData[i].startWorkout;
    }
}
console.log(getStartWorkout);

//check if their is not workout
if (!getStartWorkout) {
    myModal.show();
} else {
    let i = 0;
    let exCountUpdate = 3
    function startInterval() {
        if (i < getStartWorkout?.excercise?.length) {
            console.log(getStartWorkout.excercise[i], "=====",i);
            workoutHeading.innerHTML = "Workout: " + getStartWorkout.workoutName
            excerciseHeading.innerHTML = getStartWorkout.excercise[i].name
            exerciseImage.src = "../images/man-lifting-barbell.gif"
            timeCountHeading.innerHTML = "Time Count:"
            exerciseCounterDisplay.innerHTML = getStartWorkout.excercise[i].duration 
            exCountUpdate = getStartWorkout.excercise[i].duration;
            let interval = setInterval(() => {
                exCountUpdate--;
                if (exCountUpdate === 0) {
                    clearInterval(interval);
                    //rest
                    if (getStartWorkout.excercise[i].rest > 0) {
                        isRest()
                    } else {
                        i++;
                        startInterval();
                    }
                }
                exerciseCounterDisplay.innerHTML = exCountUpdate;
            }, 1000);
        } else {
            isBackToHome();
        }
    }
    startInterval();

    function isRest() {
        console.log("rest found....")
        workoutHeading.innerHTML = "Resting Time"
        exerciseImage.src = "../images/exhausted-runner.png"
        exCountUpdate = getStartWorkout.excercise[i].rest
        let interval = setInterval(() => {
            exCountUpdate--;
            if (exCountUpdate === 0) {
                clearInterval(interval);
                i++
                startInterval();
            }
            exerciseCounterDisplay.innerHTML = exCountUpdate
        }, 1000)
    }

    function isBackToHome() {
        exCountUpdate = 3
        workoutHeading.innerHTML = "Back To Home"
        excerciseHeading.innerHTML = ""
        exerciseImage.src = ""
        exerciseCounterDisplay.innerHTML = exCountUpdate

        let interval = setInterval(() => {
            exCountUpdate--;
            if (exCountUpdate === 0) {
                location.href = "../index.html"
                clearInterval(interval);
            }
            exerciseCounterDisplay.innerHTML = exCountUpdate
        }, 1000)
    }   
}




