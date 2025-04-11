let iron = 0;
let coke = 0;
let limestone = 0;
let b_iron = 0;
let b_coke = 0;
let b_limestone = 0;
let eaflvl = 1;
let lflvl = 1;
let eafmax = 500;
let lfmax = 500;
let s_income = 0;

document.getElementById("s_income").innerText = s_income;
document.getElementById("eaflvl").innerText = eaflvl;
document.getElementById("lflvl").innerText = lflvl;
document.getElementById("eafmax").innerText = eafmax;
document.getElementById("lfmax").innerText = lfmax;

// Initialize variables by reading from the webpage
let currentaccount = parseInt(document.getElementById("currentaccount").innerText);
let expenses = parseInt(document.getElementById("expenses").innerText);
let forecast = 0; // Initialize to 0 since the span is empty
let RefinedSteel = 0;
let efficiency = 0;
efficiency = parseInt(document.getElementById("efficiency").innerText)
RefinedSteel = parseInt(document.getElementById("RefinedSteel").innerText)|| 0;

// Function to save the game state to localStorage
function saveGame() {
  // Create an object with all game state variables
  const gameState = {
      iron: iron,
      coke: coke,
      limestone: limestone,
      currentaccount: currentaccount,
      expenses: expenses,
      forecast: forecast,
      workers: workers,
      steel: steel,
      ironPrice: ironPrice,
      cokePrice: cokePrice,
      limestonePrice: limestonePrice,
      steelPrice: steelPrice
  };

  // Convert the object to a JSON string and save it to localStorage
  localStorage.setItem("steelRefineryGame", JSON.stringify(gameState));
}

// Function to load the game state from localStorage
function loadGame() {
  // Get the saved game state from localStorage
  const savedState = localStorage.getItem("steelRefineryGame");

  // If there’s saved data, parse it and update the game variables
  if (savedState) {
      const gameState = JSON.parse(savedState);

      // Update global variables with saved values
      iron = gameState.iron || 0;
      coke = gameState.coke || 0;
      limestone = gameState.limestone || 0;
      currentaccount = gameState.currentaccount || 100000; // Default if not saved
      expenses = gameState.expenses || 85000; // Default if not saved
      forecast = gameState.forecast || 0;
      workers = gameState.workers || 20; // Default if not saved
      steel = gameState.steel || 0;
      ironPrice = gameState.ironPrice || 115; // Default if not saved
      cokePrice = gameState.cokePrice || 275; // Default if not saved
      limestonePrice = gameState.limestonePrice || 35; // Default if not saved
      steelPrice = gameState.steelPrice || 880; // Default if not saved

      // Update the DOM with the loaded values
      document.getElementById("iron").innerText = iron;
      document.getElementById("coke").innerText = coke;
      document.getElementById("limestone").innerText = limestone;
      document.getElementById("currentaccount").innerText = currentaccount;
      document.getElementById("expenses").innerText = expenses;
      document.getElementById("forecast").innerText = forecast;
      document.getElementById("workers").innerText = workers;
      document.getElementById("steel").innerText = steel;
      document.getElementById("ironPrice").innerText = ironPrice;
      document.getElementById("cokePrice").innerText = cokePrice;
      document.getElementById("limestonePrice").innerText = limestonePrice;
      document.getElementById("steelPrice").innerText = steelPrice;
  }
}

// Load the game state when the page loads
window.onload = function() {
  loadGame(); // Load saved progress
}

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

  saveGame();
}

function calculateSteel(iron, coke, limestone) {
  const steelFromIron = iron / 1.5;
  const steelFromCoke = coke / 0.5;
  const steelFromLimestone = limestone / 0.25;

  return Math.floor(Math.min(steelFromIron, steelFromCoke, steelFromLimestone));
  saveGame();
}

function rawprices(){
  b_iron = parseInt(document.getElementById("b_iron").value)|| 0;
  b_coke = parseInt(document.getElementById("b_coke").value)|| 0;
  b_limestone = parseInt(document.getElementById("b_limestone").value)|| 0;
  c_procure = (b_iron * 115) + (b_coke * 275) + (b_limestone * 35);
  expenses = expenses + c_procure
  document.getElementById("c_procure").innerText = c_procure;
  document.getElementById("expenses").innerText = expenses;

  // Reset the input fields to 0
  document.getElementById("b_iron").value = "";
  document.getElementById("b_coke").value = "";
  document.getElementById("b_limestone").value = "";
  saveGame();
}

function calculateAndDisplaySteel() {
  const iron = parseFloat(document.getElementById("iron").innerText);
  const coke = parseFloat(document.getElementById("coke").innerText);
  const limestone = parseFloat(document.getElementById("limestone").innerText);

  const steelAmount = calculateSteel(iron, coke, limestone);

  document.getElementById("steelAmount").innerText = steelAmount;
  saveGame();
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
    saveGame();
}

function RefineSteel(){
  const iron = parseFloat(document.getElementById("iron").innerText);
  const coke = parseFloat(document.getElementById("coke").innerText);
  const limestone = parseFloat(document.getElementById("limestone").innerText);

  const steelAmount = calculateSteel(iron, coke, limestone);
  RefinedSteel = (RefinedSteel + steelAmount) * (efficiency/100);
  document.getElementById("RefinedSteel").textContent = RefinedSteel;
  document.getElementById("iron").innerText = "0";
  document.getElementById("coke").innerText = "0";
  document.getElementById("limestone").innerText = "0";
  document.getElementById("steelAmount").innerText = "0";
  saveGame();
}

setInterval(function() {
  b_iron = parseInt(document.getElementById("b_iron").value)|| 0;
  b_coke = parseInt(document.getElementById("b_coke").value)|| 0;
  b_limestone = parseInt(document.getElementById("b_limestone").value)|| 0;
  c_procure = (b_iron * 115) + (b_coke * 275) + (b_limestone * 35);
  forecast = currentaccount + s_income - expenses;
  document.getElementById("forecast").innerText = forecast;
  document.getElementById("currentaccount").innerText = currentaccount;
  document.getElementById("expenses").innerText = expenses;
  let workers = parseInt(document.getElementById("workers").innerText);
  efficiency = (workers/20) * 100;
  document.getElementById("efficiency").innerText = efficiency;
  saveGame();
}, 1000); // Runs every 1 seconds

function SellSteel(){
  
  s_income = s_income + (RefinedSteel * 880);
  document.getElementById("s_income").innerText = s_income;

  RefinedSteel = 0;
  document.getElementById("RefinedSteel").innerText = RefinedSteel;
  // currentaccount = forecast;
  saveGame();
}

function resetGame() {
  localStorage.removeItem("steelRefineryGame");
  location.reload(); // Reload the page to reset to defaults
}
