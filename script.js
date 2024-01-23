// declares new variables that will be constant (unchanged) for elements in the html file
const focusButton = document.getElementById("focus");
const buttons = document.querySelectorAll("btn");
const shortBreakButton = document.getElementById("shortbreak");
const longBreakButton = document.getElementById("longbreak");
const startBtn = document.getElementById("btn-start");
const pause = document.getElementById("btn-pause");
const reset = document.getElementById("btn-reset");
const time = document.getElementById("time");
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const historyBtn = document.getElementById("historyBtn");
const closeBtn = document.getElementById("closeBtn");
const sortBtn = document.getElementById("sortBtn");

// declares variables for the timer countdown
let interval; // stores interval ID
let timeLeft = 1500; // initial value when website loads
let orgTimeLeft = 1500; // orgTimeLeft allows us to reset the timeLeft variable to the orginal time left
let timePassed = 0; // stores the amount of time passed for the session until the pages reloads
let previousTime = 0; // initializes previousTime variable for history of time
let previousTimeStr = ''; // used to convert localstorage item "Time" from string to integer 
let historyTotal = 0; // initializes historyTotal for time 

// saveTime function saves the historyTotal (timePassed plus the previousTime) to localStorage as a string
function saveTime(historyTotal) {
    localStorage.setItem("Time", historyTotal);
}
// loadTime function recovers the stored historyTotal from localStorage
function loadTime() {
    previousTimeStr = localStorage.getItem("Time"); //from localStorage as a string to variable previousTimeStr
    previousTime = parseInt(previousTimeStr); // previousTime is converted into integer
    return previousTime; //  returns integer of previousTime
}

previousTime = loadTime(); // // calls loadTime function to ensure that the page loads it recovers the saved previousTime to be used in the timeTotalElapsed() to be added to the historyTotal

//timeElapsed function updates the current session history in the sidebar to let the user know how long they have been studying for
function timeElapsed(timePassed) {
    let timeElapsed = document.getElementById("timeElapsed"); // pulls timeElapsed element from HTML
    let minutesPassed = Math.floor(timePassed/60); // converts the seconds elapsed into minutes
    // if minutesPassed equals 1 then it changes the sentence to say "minute" otherwise it's "minutes"
    if (minutesPassed === 1) {
        formattedTime = `You've spent ` + `${minutesPassed.toString().padStart(2)}` + ` minute studying.`;
    } else {
        formattedTime = `You've spent ` + `${minutesPassed.toString().padStart(2)}` + ` minutes studying.`;
    }
    timeElapsed.innerHTML = formattedTime; // timeElapsed element is now takes the formattedTime string
    timeTotalElapsed(timePassed, previousTime);
}

// timeTotalElapsed function updates the all time history in the sidebar to let the user know their lifetime studying stats
function timeTotalElapsed(timePassed, previousTime) {
    let timeHistory = document.getElementById("timeHistory");
    let historyTotal = previousTime + timePassed; // adds previousTime from loadData() with current session timePassed to get total
    let historyMinutesPassed = Math.floor(historyTotal/60); // converts the seconds elapsed into minutes
    if (historyMinutesPassed === 1) {
        formattedTime = `You've spent ` + `${historyMinutesPassed.toString().padStart(2)}` + ` minute studying.`;
    } else {
        formattedTime = `You've spent ` + `${historyMinutesPassed.toString().padStart(2)}` + ` minutes studying.`;
    }
    timeHistory.innerHTML = formattedTime;
    saveTime(historyTotal); // calls saveTime function to save updated historyTotal
}

// clickFocus function updates the timer display to 25 minutes and changes the colour of the focusButton to be highlighted as pink. all other buttons are changed to the colour gray.
function clickFocus(){
    focusButton.classList.add("btn-focus");
    shortBreakButton.classList.remove("btn-focus");
    shortBreakButton.classList.add("btn");
    longBreakButton.classList.remove("btn-focus");
    longBreakButton.classList.add("btn"); // "btn" class indicates that the colour is currently gray
    timeLeft = 1500; // timeLeft on the focus button is 25 minutes or 1500 seconds
    orgTimeLeft = 1500;
    updateTimer(timeLeft); // calls function updateTimer to update the timer to the time left
    pauseTimer(); // pauses the timer if the user switches to a different timer: focus, shortbreak or longbreak
}
// clickShort function updates timer display to 5 minutes and changes the colour of shortBreak to be highlighted. other buttons changed to gray
function clickShort(){
    focusButton.classList.remove("btn-focus");
    focusButton.classList.add("btn");
    shortBreakButton.classList.add("btn-focus");
    longBreakButton.classList.remove("btn-focus");
    longBreakButton.classList.add("btn");
    timeLeft = 300; // timeLeft on the shortBreak is 5 minutes or 300 seconds
    orgTimeLeft = 300; 
    updateTimer(timeLeft); // calls function updateTimer to update time to shortBreak
    pauseTimer();
}
// clickLong function updates timer display to 15 minutes and changes the coloor of the longBreak to be highlighted. other buttons are changed to gray
function clickLong(){
    focusButton.classList.remove("btn-focus");
    focusButton.classList.add("btn");
    shortBreakButton.classList.remove("btn-focus");
    shortBreakButton.classList.add("btn");
    longBreakButton.classList.add("btn-focus");
    timeLeft = 900; // timeLeft on the longBreak is 15 minutes or 900 seconds
    orgTimeLeft = 900;
    updateTimer(timeLeft); // calls function updateTimer to update time to longBreak
    pauseTimer();
}

time.textContent = `${timeLeft/60}:00`; // formats the time left on the timer to display as minutes:seconds

// updateTimer function has the parameter timeLeft to calculate the numbers the timer should display in a minutes:seconds format
function updateTimer(timeLeft){
    let minutes = Math.floor(timeLeft / 60); // takes the integer number when timeleft is divided by 60 to get the minutes left stores in minutes variable
    let seconds = timeLeft % 60; // takes the remainder of timeLeft when divided by 60 to see how many seconds to display stores in seconds variable
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; // ensures that each variable has at least two digits with leading zeros if not
    time.textContent = formattedTime; // ex. display: 25:00
}
// startTimer function starts the countdown
function startTimer(){
    startBtn.classList.add("hide"); // adds "hide" class to indicate that the start button will not be displayed
    startBtn.classList.remove("show"); // removes "show" class
    pause.classList.add("show"); // adds "show" class to pause, reset to display those button
    reset.classList.add("show"); 
    // sets an interval that runs every second
      interval = setInterval(()=>{ 
         timePassed++;
         timeLeft--; // decreases timeLeft variable by 1 
         updateTimer(timeLeft); // calls updateTimer function to update the timer display with the new timeLeft
         timeElapsed(timePassed); // calls timeElapsed function to update the current session history and all time history
       if(timeLeft === 0) { // checks if timeLeft equals 0
         clearInterval(interval); // if it is zero, clears the interval to stop the timer
         alert("Time's up!"); // shows an alert "Time's up!"
         timeLeft = orgTimeLeft; // resets the timeLeft to its original value (orgTimeLeft)
         timeElapsed(timePassed); // calls timeElapsed function to update the current session history and all time history
        }
     }, 1000);
}
// pauseTimer function pauses the timer
function pauseTimer(){
    startBtn.classList.remove("hide"); // removes "hide" class to startBtn
    startBtn.classList.add("show"); // adds "show" class to startBtn
    pause.classList.remove("show"); // removes "show" class from reset, pause variables
    reset.classList.remove("show");
    clearInterval(interval); // clears the interval to pause the timer 
}
// resetTimer function resets timer to orginal time
function resetTimer(){
    startBtn.classList.remove("hide"); // removes "hide" class to startBtn
    startBtn.classList.add("show"); // adds "show" class to startBtn
    pause.classList.remove("show"); // removes "show" class from reset and pause variables
    reset.classList.remove("show");
    clearInterval(interval); // clears the interval to stop the timer
    timeLeft = orgTimeLeft; // resets the timeLeft variable to its original value
    updateTimer(timeLeft); // updates timer display with the new timeLeft
}
// when an element is clicked, its function is called
focusButton.addEventListener("click", clickFocus);
shortBreakButton.addEventListener("click", clickShort);
longBreakButton.addEventListener("click", clickLong);
startBtn.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);
reset.addEventListener("click", resetTimer);   
// addTask function allows user to add a task to the list
function addTask() {
    // if the inputBox is empty alert them to write something in the input
    if(inputBox.value === '') {
        alert("Empty. Write a task!");
    } else { // else it creates an element for the task in the listContainer
        let li = document.createElement("li"); // creates item element
        li.innerHTML = inputBox.value; // item is equal to what the user inputs
        listContainer.appendChild(li); // adds the item to the list of things to do
        let span = document.createElement("span"); // creates span element
        span.innerHTML = "\u00d7"; // sets the HTML content of span to "x"
        li.appendChild(span); // adds span element to the item element
    }
    inputBox.value = ''; // resets the inputBox to be empty, so the user can input more tasks
    saveData(); // calls saveData function to save data to local storage (if reloaded or closed it stores the list of tasks)
}
// when listContainer is clicked, the functions run
listContainer.addEventListener("click", function(e){
    // if the clicked element is a list item it toggles "checked" class on or off. calls savaData function to store the updated data
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); // adds check mark to list circle
        saveData();
    } else if(e.target.tagName === "SPAN") { // else if the click element is a span item it deletes the task from the list. calls savaData function to store the updated data  
        e.target.parentElement.remove();
        saveData();
    }
}, false);
// saveData function stores tasks list to the local storage
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
// loadData function recovers the stored HTML content of the tasks list and sets it as the listContainer
function loadData() {
    listContainer.innerHTML = localStorage.getItem("data");
}

loadData(); // calls loadData function to ensure that the page loads it recovers the saved list of tasks
/* openBar function sets width of sideBar to 250px and margin left to 250px, displays the sideBar */
function openBar() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("closeBtn").style.marginLeft = "250px";
    /*hides history button and shows close button when side bar is open*/
    historyBtn.classList.remove("show");
    historyBtn.classList.add("hide");
    closeBtn.classList.remove("hide");
    closeBtn.classList.add("show");
  } 
/* closeBar function sets width back to 0px and margin to 0, closes/hides the sideBar */
function closeBar() {
    document.getElementById("mySidebar").style.width = "0px";
    document.getElementById("historyBtn").style.marginLeft = "0px";
        /*shows history button and hides close button when side bar is closed*/
    historyBtn.classList.remove("hide");
    historyBtn.classList.add("show");
    closeBtn.classList.remove("show");
    closeBtn.classList.add("hide");
  }
// when an element is clicked, its function is called
historyBtn.addEventListener("click", openBar);
closeBtn.addEventListener("click", closeBar);
/*sortList function sorts the items in listContainer alphabetically*/
function sortList() {
    /*declares variables i = counter, swapping controls the while loop, task is the listContainer list, swap indicates if two elements in listContainer should switch  */
    var i, swapping, task, swap;
    swapping = true;
    /*loop will continue until it is sorted*/
    while (swapping) {
        /*swapping is set to false at the beginning, will stop the loop once sorted*/
        swapping = false;
        /*task variable is the LI items in listContainer*/
        task = listContainer.getElementsByTagName("LI");
        /*for every item in the listContainer*/
        for (i = 0; i < (task.length - 1); i++) {
            /*swap is set to false*/
            swap = false;
            /*if the characters in the first task is greater than the other task's characters, swap is set to true and breaks out of the loop*/
            if (task[i].innerHTML.toLowerCase() > task[i+1].innerHTML.toLowerCase()) {
                swap = true;
                break;
            }
        }
        /*if swap is set to true, swaps the task that is greater, [i], (closer to z) with the task that is smaller, [i+1] (closer to a), swapping set to true to continue sorting*/
        if (swap) { 
            task[i].parentNode.insertBefore(task[i+1], task[i]);
            swapping = true;
        }
    }
    saveData();
}
