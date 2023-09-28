function logout() {
    console.log("Logout...");
    localStorage.removeItem("currentlyLogIn")
    location.href = "./template/login.html";
}

let getItem = localStorage.getItem("currentlyLogIn");
let getData = JSON.parse(getItem);
console.log(getData);

if (getData?.username) {
    console.log("login already..")
} else {
    console.log("nott")
    location.replace("./template/login.html")
}
