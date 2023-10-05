//local storage
let getUserData = JSON.parse(localStorage.getItem("users"))
let getDataCurrentlyLogin = JSON.parse(localStorage.getItem("currentlyLogIn"));

//DOM selector
let exerciseCounterDisplay = document.getElementById("exercise-counter")
let workoutHeading = document.getElementById("workout-heading")
let excerciseHeading = document.getElementById("exercise-heading")
let exerciseImage = document.getElementById("exercise-image")
let getStartWorkout = ""

//get workout data
for (let i = 0; i < getUserData?.length; i++) {
    if (getUserData[i].username === getDataCurrentlyLogin.username) {
        getStartWorkout = getUserData[i].startWorkout;
    }
}
console.log(getStartWorkout);
let currentDuration = ""
let currentRest = ""
let currentId = getStartWorkout.excercise[0].id
let currentExercise = "";

//change DOM
console.log("current: ", currentExercise, currentDuration, currentRest)

console.log(getUserData)

let i = 0;
function startInterval() {
    if (i < getStartWorkout.excercise.length) {
        console.log(getStartWorkout.excercise[i], "=====");
        workoutHeading.innerHTML = "Workout: " + getStartWorkout.workoutName
        excerciseHeading.innerHTML = getStartWorkout.excercise[i].name
        exerciseImage.src = "../images/man-lifting-barbell.gif"
        let exCountUpdate = getStartWorkout.excercise[i].duration;
        let interval = setInterval(() => {
            exCountUpdate--;
            if (exCountUpdate === 0) {
                clearInterval(interval);
                //rest
                if (getStartWorkout.excercise[i].rest > 0) {
                    isRest()
                } else {
                    i++;
                    console.log(i,"==========")
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
    let exCountUpdate = getStartWorkout.excercise[i].rest
    let interval = setInterval(() => {
        exCountUpdate--;
        if (exCountUpdate === 0) {
            // location.href = "../template/backToHome.html"
            clearInterval(interval);
            i++
            startInterval();
        }
        exerciseCounterDisplay.innerHTML = exCountUpdate
    }, 1000)
}

function isBackToHome() {
    console.log("redirecting to hime...")
    workoutHeading.innerHTML = "Back To Home"
    excerciseHeading.innerHTML = ""
    exerciseImage.src = ""

    let exCountUpdate = 3
    let interval = setInterval(() => {
        exCountUpdate--;
        if (exCountUpdate === 0) {
            // location.href = "../template/backToHome.html"
            clearInterval(interval);
        }
        exerciseCounterDisplay.innerHTML = exCountUpdate
    }, 1000)
}

// for (let i = 0; i < getStartWorkout.excercise.length; i++) {
//     console.log(getStartWorkout.excercise[i])
// }

// let exCountUpdate = currentDuration;
// let interval = setInterval(() => {
//     exCountUpdate--;
//     if (exCountUpdate === 0) {
//         clearInterval(interval)
//         //redirect to rest if has
//         if (currentRest > 0) {
//             console.log("redirection start...")
//             location.href = "../template/restingTime.html"
//         } else {
//             //remove current excercise if they are complete
//             console.log("rest not found")
//             getStartWorkout = getStartWorkout.excercise.filter(item => item.id !== currentId)
//             for (let i = 0; i < getUserData.length; i++) {
//                 if (getUserData[i].username === getDataCurrentlyLogin.username) {
//                     if (getUserData[i].startWorkout.excercise === undefined || getUserData[i].startWorkout.excercise === null) {
//                         console.log("excersie is not found")
//                     }
//                     getUserData[i].startWorkout.excercise = getStartWorkout
//                 }
//             }
//             localStorage.setItem("users", JSON.stringify(getUserData))
//             console.log(getUserData)
//             console.log(getStartWorkout);
//             // location.reload();

//         }
//     }
//     exerciseCounterDisplay.innerHTML = exCountUpdate
// }, 100);





