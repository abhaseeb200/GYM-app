let exerciseCounterDisplay = document.getElementById("exercise-counter")
console.log(history.length)


let exCountUpdate = 5
let interval = setInterval(() => {
    exCountUpdate--;
    if (exCountUpdate === 0) {
        location.href = "../template/backToHome.html"
        
        clearInterval(interval);
        // exerciseCounterDisplay.addEventListener("customEvent",()=> {

        // })
    }
    exerciseCounterDisplay.innerHTML = exCountUpdate
}, 1000);
