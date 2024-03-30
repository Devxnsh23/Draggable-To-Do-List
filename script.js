const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  console.log("dragOver");
}

function dragEnter() {
  
  console.log("dragEnter");
}

function dragLeave() {
  
  console.log("dragLeave");
}

function dragDrop() {
  
  this.appendChild(draggableTodo);
  console.log("dropped");
}

/* modal */
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");


btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
   
    console.log("1")
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");   
    console.log("2")
  });
});



/* create todo  */
const todo_submit = document.getElementById("todo_submit");

todo_submit.addEventListener("click", createTodo);

function createTodo() {
  const todo_div = document.createElement("div");
  const input_val = document.getElementById("todo_input").value;
  const txt = document.createTextNode(input_val);

  todo_div.appendChild(txt);
  todo_div.classList.add("todo");
  todo_div.setAttribute("draggable", "true");

  /* create span */
  const span = document.createElement("span");
  const span_txt = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(span_txt);

  todo_div.appendChild(span);

  no_status.appendChild(todo_div);

  span.addEventListener("click", () => {
    span.parentElement.style.display = "none";
  });
  //   console.log(todo_div);

  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);

  document.getElementById("todo_input").value = "";
  todo_form.classList.remove("active");
  overlay.classList.remove("active");
}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});


var timerInterval;
var timeInSeconds = 0; // Variable to store remaining time
var initialTime = 0; // Variable to store initial time
var isTimerRunning = false; // Flag to track timer state

// Function to start or resume the timer
function startTimer() {
    if (!isTimerRunning) {
        var timerInput = document.getElementById("timer").value;
        var countdownDisplay = document.getElementById("countdown");
        
        // Convert minutes to seconds
        timeInSeconds = timerInput * 60;

        timerInterval = setInterval(function() {
            var minutes = Math.floor(timeInSeconds / 60);
            var seconds = timeInSeconds % 60;
            countdownDisplay.innerHTML = minutes + "m " + seconds + "s";
            timeInSeconds--;

            if (timeInSeconds < 0) {
                clearInterval(timerInterval);
                countdownDisplay.innerHTML = "Time's up!";
                isTimerRunning = false; // Update timer state
            }
        }, 1000);

        isTimerRunning = true; // Update timer state
        initialTime = timeInSeconds; // Store initial time
    }
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById("countdown").innerHTML = "";
    timeInSeconds = 0; // Reset remaining time
    isTimerRunning = false; // Update timer state
}

// Add event listeners to buttons
document.getElementById("startTimerBtn").addEventListener("click", startTimer);
document.getElementById("resetTimerBtn").addEventListener("click", resetTimer);
