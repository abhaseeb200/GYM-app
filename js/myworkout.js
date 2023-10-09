//dom selector
let showMyWorkoutTable = document.getElementById("showMyWorkoutTable")
let showWorkoutName = document.getElementById("workoutName")
let logOutButton = document.getElementById("logOut-btn")
let startWorkout = document.getElementById("start-workout")
let showUsername = document.getElementById("showUsername")
let myWorkoutLength = 0

//local storage
let getUserData = JSON.parse(localStorage.getItem("users"))
let getDataCurrentlyLogin = JSON.parse(localStorage.getItem("currentlyLogIn"));
let myWorkout = ""
let currentlyUserData = "";

for (let i = 0; i < getUserData?.length; i++) {
    if (getUserData[i]?.username === getDataCurrentlyLogin?.username) {
        myWorkout = getUserData[i].myWorkout;
        myWorkoutLength = myWorkout?.length
        currentlyUserData = getUserData[i];
    }
}


//check if current user is logout
if (!getDataCurrentlyLogin) {
    location.replace("../template/login.html")
} else {
    showUsername.innerHTML = getDataCurrentlyLogin?.username
}

//Get the workout length
if (myWorkoutLength) {
    showUsername.innerHTML += ` (${myWorkoutLength})`    
}

//craete table elements
for (let i = 0; i < myWorkout?.length; i++) {
    let startWorkoutData = {};
    let startExcerciseData = [];
    let durationTotalTime = 0
    let restTotalTime = 0
    let table = document.createElement("table")
    let thead = document.createElement("thead")
    let body = document.createElement("tbody")
    let trHead1 = document.createElement("tr")
    let trHead2 = document.createElement("tr")
    let thHead1 = document.createElement("th")
    let thHead2Select = document.createElement("th")
    let thHead2Excercise = document.createElement("th")
    let thHead2Duration = document.createElement("th")
    let thHead2Rest = document.createElement("th")
    let trBodySummary = document.createElement("tr")
    let btnStartWorkout = document.createElement("button")

    thHead1.innerHTML = myWorkout[i].workoutName;
    thHead2Select.innerHTML = "Select";
    thHead2Excercise.innerHTML = "Excercise";
    thHead2Duration.innerHTML = "Duration";
    thHead2Rest.innerHTML = "Rest";
    btnStartWorkout.innerHTML = "Start Workout"

    table.classList.add("table", "table-striped", "table-bordered")
    thHead1.classList.add("workout-names")
    btnStartWorkout.classList.add("btn", "btn-success" ,"mb-5")

    let att = document.createAttribute("colspan")
    att.value = "4"
    thHead1.setAttributeNode(att)

    //create table body element
    for (let j = 0; j < myWorkout[i].excerciseData.length; j++) {
        let trBody = document.createElement("tr")
        let checkboxInput = document.createElement("input");
        checkboxInput.setAttribute("class", "form-check-input");
        checkboxInput.setAttribute("type", "checkbox");

        trBody.innerHTML = `
            <td></td>
            <td>${myWorkout[i].excerciseData[j].name}</td>
            <td>${myWorkout[i].excerciseData[j].duration}</td>
            <td>${myWorkout[i].excerciseData[j].rest}</td>
        `
        trBody.children[0].appendChild(checkboxInput);

        durationTotalTime += parseInt(myWorkout[i].excerciseData[j].duration)
        restTotalTime += parseInt(myWorkout[i].excerciseData[j].rest)
        
        //checkBox push data & remove 
        checkboxInput.onchange = () => {
         if (checkboxInput.checked === true) {
            let temp = {
                "id":myWorkout[i].excerciseData[j].id,
                "name":myWorkout[i].excerciseData[j].name,
                "duration":myWorkout[i].excerciseData[j].duration,
                "rest":myWorkout[i].excerciseData[j].rest,
                "isComplete": false,
            }
            startExcerciseData.push(temp)
         } else {
            startExcerciseData = startExcerciseData.filter(item => item.id !== myWorkout[i].excerciseData[j].id)
         }
        }

        //start workout submit button
        btnStartWorkout.onclick = () => {
            //validation 
            if (startExcerciseData.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "please select atleast one excercise",
                })
            } else {
                startWorkoutData = {
                    "workoutName":myWorkout[i].workoutName,
                    "excercise":startExcerciseData,
                }
                getDataCurrentlyLogin.startWorkout = startWorkoutData //create a new key name myWorkout
                localStorage.setItem("currentlyLogIn", JSON.stringify(getDataCurrentlyLogin))
                //empty field if successfully submit
                let checkboxes = document.querySelectorAll('.form-check-input');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
                startExcerciseData = [];
                //redirect to excercise page
                location.href = "../template/exerciseStart.html"
            }
        }

        body.appendChild(trBody)
    }
    
    //convert time into mint
    function secondsToMinutes(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return `${minutes} min ${remainingSeconds}`;
    }
    
    if (durationTotalTime > 60) {
        durationTotalTime = secondsToMinutes(durationTotalTime)
    }

    if (restTotalTime > 60) {
        restTotalTime = secondsToMinutes(restTotalTime)
    }

    trBodySummary.innerHTML = `
        <td>Summary</td>
        <td></td>
        <td>${durationTotalTime +" sec"}</td>
        <td>${restTotalTime +" sec"}</td>
    `

    showMyWorkoutTable.prepend(btnStartWorkout)
    showMyWorkoutTable.prepend(table)
    table.appendChild(thead)
    table.appendChild(body)
    thead.appendChild(trHead1)
    thead.appendChild(trHead2)
    trHead1.appendChild(thHead1)
    trHead2.appendChild(thHead2Select)
    trHead2.appendChild(thHead2Excercise)
    trHead2.appendChild(thHead2Duration)
    trHead2.appendChild(thHead2Rest)
    body.appendChild(trBodySummary)
}



// logOut button
logOutButton.addEventListener("click", () => {
    localStorage.removeItem("currentlyLogIn")
    location.replace("./login.html");
})

