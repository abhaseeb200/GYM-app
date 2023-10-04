//dom selector
let selectWorkout = document.getElementById("select-workout");
let selectWorkoutList = document.getElementById("select-workout-list");
let childElements = selectWorkoutList.getElementsByClassName("myList");
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
let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
let selectWorkoutListCount = 0;
let workoutData = []


//local storage
let getDataCurrentlyLogin = JSON.parse(localStorage.getItem("currentlyLogIn"));
let getExerciseData = JSON.parse(localStorage.getItem("exercise"))
let getUserData = JSON.parse(localStorage.getItem("users"))


//add workout exercise
console.log(getExerciseData);
for (let i = 0; i < getExerciseData.length; i++) {
    let option = document.createElement("option");
    option.value = getExerciseData[i]
    option.innerHTML = getExerciseData[i]
    selectWorkout.appendChild(option);
}
selectWorkout.addEventListener("change", () => {
    myModal.show();
    for (let i = 0; i < childElements.length; i++) {
        console.log(i + ": " + childElements[i].textContent)   
    }
    // console.log(Array.from(selectWorkoutList.children).indexOf(selectWorkoutList.children[2]))
    // console.log(selectWorkout.value ,"=======", selectWorkout.selectedIndex)
    // selectWorkoutListCount = selectWorkout.selectedIndex
})
checkedForRest.addEventListener("click",()=> {
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
modalForm.addEventListener("submit",(event) => {
    let selectedOption = selectWorkout.options[selectWorkout.selectedIndex];
    event.preventDefault();
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
    exerciseRest.value === ""
    spanRest.innerHTML =  "Rest: " + exerciseRest.value + "s";
    // spanCount.innerHTML = "1"
    elementDiv.classList.add("myList")
    spanCount.classList.add("m-0","pe-2")
    removeBtn.classList.add("btn-close")
    selectWorkout.remove(selectWorkout.selectedIndex)
    let i = 0;
    for (i = 0; i < childElements.length; i++) {
        console.log(i + ": " + childElements[i].textContent)   
    }
    let temp = {
        "name":selectedOption.innerHTML,
        "duration": exerciseDuration.value,
        "rest": exerciseRest.value,
    }
    workoutData.push(temp)
    removeBtn.onclick = () => {
        let newOption = document.createElement("option");
        newOption.value = selectedOption.innerHTML;
        newOption.innerHTML = selectedOption.innerHTML;
        console.log(selectedOption.innerHTML);
        selectWorkout.appendChild(newOption);
        elementDiv.parentNode.removeChild(elementDiv);
    }
    selectedOption.value = ""
    exerciseDuration.value = ""
    exerciseRest.value = ""
    myModal.hide();
})


//save workout excercise
submitWorkout.addEventListener("click",()=> {
    console.log("workout name: ",addWorkout.value)
    console.log("workout Data",workoutData)
})


// currently Login user
console.log(getDataCurrentlyLogin);
if (getDataCurrentlyLogin?.username) {
    console.log("login already")
    showUsername.innerHTML = getDataCurrentlyLogin?.username
} else {
    console.log("noo accont found")
    location.replace("../template/login.html")
}


// logOut button
logOutButton.addEventListener("click", () => {
    console.log("Logout...");
    localStorage.removeItem("currentlyLogIn")
    location.replace("./template/login.html");
})

