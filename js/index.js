let showUsername = document.getElementById("showUsername")
let getItem = localStorage.getItem("currentlyLogIn");
let getData = JSON.parse(getItem);
console.log(getData);
console.log(history.length)

if (getData?.username) {
    console.log("login already")
    showUsername.innerHTML = getData?.username
    
} else {
    console.log("nott")
    // location.replace("./template/login.html")
}


let logOutButton = document.getElementById("logOut-btn")
let startWorking = document.getElementById("start-working")

logOutButton.addEventListener("click", () => {
    console.log("Logout...");
    localStorage.removeItem("currentlyLogIn")
    location.replace("./template/login.html");
})

startWorking.addEventListener("click", () => {
    // location.replace("")
    location.href = "./template/exerciseStart.html"
})





