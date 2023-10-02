let exerciseCounterDisplay = document.getElementById("exercise-counter")
console.log(history.length)


let exCountUpdate = 10;
let interval = setInterval(() => {
    exCountUpdate--;
    if (exCountUpdate === 0) {
        clearInterval(interval)
        location.href = "../template/restingTime.html"
    }
    exerciseCounterDisplay.innerHTML = exCountUpdate
}, 1000);




