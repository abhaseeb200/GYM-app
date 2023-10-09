
//local storage
let getUserData = JSON.parse(localStorage.getItem("users"))
let getDataCurrentlyLogin = JSON.parse(localStorage.getItem("currentlyLogIn"));

//check if current user is logout
if (!getDataCurrentlyLogin) {
    location.replace("../template/login.html")
}

//DOM selector
let exerciseCounterDisplay = document.getElementById("exercise-counter")
let workoutHeading = document.getElementById("workout-heading")
let excerciseHeading = document.getElementById("exercise-heading")
let exerciseImage = document.getElementById("exercise-image")
let timeCountHeading = document.getElementById("time-count-text")
let showUsername = document.getElementById("showUsername")
let histroyBack = document.getElementById("histroy-back")
let myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false
})
let getStartWorkout = ""

//get workout data
getStartWorkout = getDataCurrentlyLogin.startWorkout

//check if their is not workout
if (!getStartWorkout) {
    myModal.show();
    histroyBack.addEventListener("click", () => {
        history.back()
    })
} else {
    let i = 0;
    let exCountUpdate = 3
    function startInterval() {
        if (i < getStartWorkout?.excercise?.length) {
            if (!getStartWorkout.excercise[i].isComplete) {
                //DOM change
                workoutHeading.innerHTML = "Workout: " + getStartWorkout.workoutName
                excerciseHeading.innerHTML = getStartWorkout.excercise[i].name
                exerciseImage.src = "../images/man-lifting-barbell.gif"
                timeCountHeading.innerHTML = "Time Count:"
                exerciseCounterDisplay.innerHTML = getStartWorkout.excercise[i].duration
                exCountUpdate = getStartWorkout.excercise[i].duration;
                
                //Interval time
                let interval = setInterval(() => {
                    exCountUpdate--;
                    if (exCountUpdate === 0) {
                        clearInterval(interval);
                        
                        //check if has Rest
                        if (getStartWorkout.excercise[i].rest > 0) {
                            isRest()
                        } else {
                            getStartWorkout.excercise[i].isComplete = true
                            localStorage.setItem("currentlyLogIn", JSON.stringify(getDataCurrentlyLogin))
                            i++;
                            startInterval();
                        }
                    }
                    exerciseCounterDisplay.innerHTML = exCountUpdate;
                }, 1000);
            } else {
                //isComplete is True...
                i++
                startInterval();
            }
        } else {
            //All exercise is done.
            isBackToHome();
        }
    }
    startInterval();

    function isRest() {
        workoutHeading.innerHTML = "Resting Time"
        exerciseImage.src = "../images/exhausted-runner.png"
        timeCountHeading.innerHTML = "Time Count:"
        exCountUpdate = getStartWorkout.excercise[i].rest
        let interval = setInterval(() => {
            exCountUpdate--;
            if (exCountUpdate === 0) {
                clearInterval(interval);
                getStartWorkout.excercise[i].isComplete = true
                localStorage.setItem("currentlyLogIn",JSON.stringify(getDataCurrentlyLogin))
                i++
                startInterval();
            }
            exerciseCounterDisplay.innerHTML = exCountUpdate
        }, 1000)
    }

    function isBackToHome() {
        exCountUpdate = 3
        workoutHeading.innerHTML = "Back To Home"
        excerciseHeading.innerHTML = "All exercise is done"
        timeCountHeading.innerHTML = "Time Count:"
        exerciseImage.src = ""
        exerciseCounterDisplay.innerHTML = exCountUpdate

        let interval = setInterval(() => {
            exCountUpdate--;
            if (exCountUpdate === 0) {
                location.replace("../index.html")   
                clearInterval(interval);
            }
            exerciseCounterDisplay.innerHTML = exCountUpdate
        }, 1000)
    }
}




