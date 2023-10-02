let exerciseCounterDisplay = document.getElementById("exercise-counter")
console.log(history.length)

let exCountUpdate = 3
let interval = setInterval(() => {
    exCountUpdate--;
    if (exCountUpdate === 0) {
        clearInterval(interval);
        location.href = "../index.html"
    }
    exerciseCounterDisplay.innerHTML = exCountUpdate

}, 1000)