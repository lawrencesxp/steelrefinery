let iron = 0;
let coke = 0;
let limestone = 0;
let b_iron = 0;
let b_coke = 0;
let b_limestone = 0;

function updateOrder(){
  iron = parseInt(document.getElementById("iron").innerText)|| 0;
  coke = parseInt(document.getElementById("coke").innerText)|| 0;
  limestone = parseInt(document.getElementById("limestone").innerText)|| 0;
  b_iron = parseInt(document.getElementById("b_iron").value)|| 0;
  b_coke = parseInt(document.getElementById("b_coke").value)|| 0;
  b_limestone = parseInt(document.getElementById("b_limestone").value)|| 0;

  iron = iron + b_iron;
  coke = coke + b_coke;
  limestone = limestone + b_limestone;

  document.getElementById("iron").innerText = iron;
  document.getElementById("coke").innerText = coke;
  document.getElementById("limestone").innerText = limestone;

  // Reset the input fields to 0
  document.getElementById("b_iron").value = "";
  document.getElementById("b_coke").value = "";
  document.getElementById("b_limestone").value = "";
}

function calculateSteel(iron, coke, limestone) {
  const steelFromIron = iron / 1.5;
  const steelFromCoke = coke / 0.5;
  const steelFromLimestone = limestone / 0.25;

  return Math.floor(Math.min(steelFromIron, steelFromCoke, steelFromLimestone));
}

function calculateAndDisplaySteel() {
  const iron = parseFloat(document.getElementById("iron").innerText);
  const coke = parseFloat(document.getElementById("coke").innerText);
  const limestone = parseFloat(document.getElementById("limestone").innerText);

  const steelAmount = calculateSteel(iron, coke, limestone);

  document.getElementById("steelAmount").textContent = steelAmount;
}

  function updateTalentPool() {
    // Get the current number of workers
    let workers = parseInt(document.getElementById("workers").innerText);

    // Get the number of workers to hire and fire from the input fields
    let hireCount = parseInt(document.getElementById("hireWorkers").value) || 0;
    let fireCount = parseInt(document.getElementById("fireWorkers").value) || 0;
    workers = workers + hireCount - fireCount;
    // Ensure the number of workers doesn't go below 0
    if (workers < 0) {
        workers = 0;
        alert("Cannot fire more workers than you have!");
    }
    // Update the display
    document.getElementById("workers").innerText = workers;
    // Reset the input fields to 0
    document.getElementById("hireWorkers").value = "";
    document.getElementById("fireWorkers").value = "";
}

// Initialize variables by reading from the webpage
let currentaccount = parseInt(document.getElementById("currentaccount").innerText);
let expenses = parseInt(document.getElementById("expenses").innerText);
let forecast = 0; // Initialize to 0 since the span is empty
let efficiency = 0;

setInterval(function() {
    forecast = currentaccount - expenses;
    document.getElementById("forecast").innerText = forecast;
    document.getElementById("currentaccount").innerText = currentaccount;
    document.getElementById("expenses").innerText = expenses;
    let workers = parseInt(document.getElementById("workers").innerText);
    efficiency = (workers/20) * 100;
    document.getElementById("efficiency").innerText = efficiency;
}, 3000); // Runs every 3 seconds


