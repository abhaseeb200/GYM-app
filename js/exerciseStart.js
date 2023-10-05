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
let currentExercise = getStartWorkout.excercise[0]?.name
let currentDuration = getStartWorkout.excercise[0]?.duration
let currentRest = getStartWorkout.excercise[0]?.rest
let currentId = getStartWorkout.excercise[0]?.id

//change DOM
console.log("current: ",currentExercise,currentDuration,currentRest)    
workoutHeading.innerHTML = "Workout: " + getStartWorkout.workoutName
excerciseHeading.innerHTML = currentExercise
console.log(getUserData)

let exCountUpdate = currentDuration;
let interval = setInterval(() => {
    exCountUpdate--;
    if (exCountUpdate === 0) {
        clearInterval(interval)
        //redirect to rest if has
        if (currentRest > 0) {
            console.log("redirection start...")
            location.href = "../template/restingTime.html"
        } else {
            //remove current excercise if they are complete
            console.log("rest not found")
            getStartWorkout = getStartWorkout.excercise.filter(item => item.id !== currentId)
            for (let i = 0; i < getUserData.length; i++) {
                if (getUserData[i].username === getDataCurrentlyLogin.username) {
                    if (getUserData[i].startWorkout.excercise === undefined || getUserData[i].startWorkout.excercise === null) {
                        console.log("excersie is not found")
                    }
                    getUserData[i].startWorkout.excercise = getStartWorkout
                }
            }
            localStorage.setItem("users", JSON.stringify(getUserData))
            console.log(getUserData)
            console.log(getStartWorkout);
            // location.reload();

        }
    }
    exerciseCounterDisplay.innerHTML = exCountUpdate
}, 100);





