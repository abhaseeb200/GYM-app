//dom selector
let selectWorkout = document.getElementById("select-workout");
let selectWorkoutList = document.getElementById("select-workout-list");
let childElement = selectWorkoutList.getElementsByClassName("myList");
let showUsername = document.getElementById("showUsername")
let logOutButton = document.getElementById("logOut-btn")
let exerciseSubmit = document.getElementById("exercise-submit")
let exerciseDuration = document.getElementById("exercise-duration")
let checkedForRest = document.getElementById("flexCheckDefault")
let exerciseRestDiv = document.getElementById("exercise-rest-div")
let exerciseRest = document.getElementById("exercise-rest")
let modalForm = document.getElementById("modalForm")
let submitWorkout = document.getElementById("submit-workout")
let addWorkout = document.getElementById("add-workout")
let errorAddWorkout = document.getElementById("error-add-workout")
let exampleModal = document.getElementById('exampleModal')
let myModal = new bootstrap.Modal(exampleModal)
let selectWorkoutListCount = 0;
let excerciseData = []
let currentUserWorkout = ""


//local storage
let getDataCurrentlyLogin = JSON.parse(localStorage.getItem("currentlyLogIn"));
let getExerciseData = JSON.parse(localStorage.getItem("exercise"))
let getUserData = JSON.parse(localStorage.getItem("users"))
for (let i = 0; i < getUserData?.length; i++) {
    if (getUserData[i].username === getDataCurrentlyLogin.username) {
        currentUserWorkout = getUserData[i].myWorkout
    }
}
let newWorkout = currentUserWorkout ? currentUserWorkout : []
console.log(newWorkout, "=====", "Excercise data")


// currently Login user
console.log(getDataCurrentlyLogin);
if (getDataCurrentlyLogin?.username) {
    console.log("login already")
    showUsername.innerHTML = getDataCurrentlyLogin?.username
} else {
    console.log("noo accont found")
    location.replace("../template/login.html")
}

//Get the workout length
for (let i = 0; i < getUserData.length; i++) {
    if (getUserData[i]?.username === getDataCurrentlyLogin?.username) {
        myWorkoutLength = getUserData[i]?.myWorkout?.length
        break
    }
}
if (myWorkoutLength) {
    showUsername.innerHTML += ` (${myWorkoutLength})`
}

//show-username click to profile
showUsername.addEventListener("click", () => {
    location.href = "./myworkout.html"
})


//add workout exercise
for (let i = 0; i < getExerciseData?.length; i++) {
    let option = document.createElement("option");
    option.value = getExerciseData[i]
    option.innerHTML = getExerciseData[i]
    selectWorkout.appendChild(option);
}
selectWorkout.addEventListener("change", () => {
    myModal.show();
})
checkedForRest.addEventListener("click", () => {
    if (checkedForRest.checked === true) {
        exerciseRestDiv.style.display = "block"
        let att = document.createAttribute("required")
        exerciseRest.setAttributeNode(att);
    } else {
        exerciseRestDiv.style.display = "none"
        exerciseRest.value = ""
        exerciseRest.removeAttribute("required");
    }
})
modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let selectedOption = selectWorkout.options[selectWorkout.selectedIndex];
    let elementDiv = document.createElement("div");
    let spanName = document.createElement("span");
    let spanCount = document.createElement("p");
    let spanDuration = document.createElement("span");
    let spanRest = document.createElement("span");
    let removeBtn = document.createElement("button")
    selectWorkoutList.appendChild(elementDiv);
    elementDiv.appendChild(spanCount)
    elementDiv.appendChild(spanName);
    elementDiv.appendChild(spanDuration);
    elementDiv.appendChild(spanRest);
    elementDiv.appendChild(removeBtn);
    spanName.innerHTML = "Name: " + selectedOption.value;
    spanDuration.innerHTML = "Duration: " + exerciseDuration.value + "s";
    if (exerciseRest.value === "") {
        exerciseRest.value = 0;
    }
    // exerciseRest.value === ""
    spanRest.innerHTML = "Rest: " + exerciseRest.value + "s";
    // spanCount.innerHTML = "1"
    elementDiv.classList.add("myList")
    spanCount.classList.add("m-0", "pe-2")
    removeBtn.classList.add("btn-close")
    selectWorkout.remove(selectWorkout.selectedIndex)
    let id = Math.floor(Math.random() * 9999999)
    let temp = {
        "id": id,
        "name": selectedOption.innerHTML,
        "duration": exerciseDuration.value,
        "rest": exerciseRest.value,
    }
    excerciseData.push(temp)
    console.log(excerciseData)
    removeBtn.onclick = () => {
        let newOption = document.createElement("option");
        newOption.value = selectedOption.innerHTML;
        newOption.innerHTML = selectedOption.innerHTML;
        selectWorkout.appendChild(newOption);
        elementDiv.parentNode.removeChild(elementDiv);
        // console.log(selectedOption.innerHTML, "======", id);
        excerciseData = excerciseData.filter(item => item.id !== id)
        // console.log(excerciseData, "updated...")
    }
    selectedOption.value = ""
    exerciseDuration.value = ""
    exerciseRest.value = ""
    exerciseRestDiv.style.display = "none"
    checkedForRest.checked = false
    exerciseRest.removeAttribute("required");
    myModal.hide();
})


//save workout excercise
submitWorkout.addEventListener("click", () => {
    //validation
    if (addWorkout.value === "") {
        addWorkout.style.borderColor = "red";
        errorAddWorkout.innerHTML = "Please required workout name"
    } else if (excerciseData.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Please select atleast one excercise",
        })
    } else {
        //when validation has passed
        let newTemp = {
            "workoutName": addWorkout.value,
            "excerciseData": excerciseData,
        }
        newWorkout.push(newTemp)
        for (let i = 0; i < getUserData.length; i++) {
            if (getUserData[i].username === getDataCurrentlyLogin.username) {
                getUserData[i].myWorkout = newWorkout //create a new key name myWorkout
            }
        }
        localStorage.setItem("users", JSON.stringify(getUserData))
        console.log(newWorkout, "--- new")

        //update the length with username
        for (let i = 0; i < getUserData.length; i++) {
            if (getUserData[i]?.username === getDataCurrentlyLogin?.username) {
                myWorkoutLength = getUserData[i]?.myWorkout?.length
                break
            }
        }
        if (myWorkoutLength) {
            showUsername.innerHTML = `${getDataCurrentlyLogin?.username} (${myWorkoutLength})`
        }

        //sweath alert for successful saved
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Workout has been saved',
            showConfirmButton: false,
            timer: 1500
        })

        //empty fields after submit successfully
        for (let i = 0; i < excerciseData.length; i++) {
            console.log(excerciseData[i].name)
            let newOption = document.createElement("option");
            newOption.value = excerciseData[i].name;
            newOption.innerHTML = excerciseData[i].name;
            selectWorkout.appendChild(newOption);
        }
        addWorkout.value = ""
        excerciseData = []
        let childElements = Array.from(childElement)
        childElements.forEach(item => {
            item.remove();
        });
    }
})

//close excercise modal button
exampleModal.addEventListener('hidden.bs.modal', function () {
    // let selectedOption = selectWorkout.options[selectWorkout.selectedIndex];
    selectWorkout.selectedIndex = 0
    exerciseDuration.value = ""
    exerciseRest.value = ""
    exerciseRestDiv.style.display = "none"
    checkedForRest.checked = false
    exerciseRest.removeAttribute("required");
});

//workout name error validation
addWorkout.addEventListener("input", () => {
    if (addWorkout.value === "") {
        addWorkout.style.borderColor = "red";
        errorAddWorkout.innerHTML = "Please required workout name"
    } else {
        addWorkout.style.removeProperty("border-color");
        errorAddWorkout.innerHTML = ""
    }
})


// logOut button
logOutButton.addEventListener("click", () => {
    console.log("Logout...");
    localStorage.removeItem("currentlyLogIn")
    location.replace("./login.html");
})

