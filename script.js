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
let steelInv = 0;
let efficiency = 0;
efficiency = parseInt(document.getElementById("efficiency").innerText)
steelInv = parseInt(document.getElementById("steelInv").innerText)|| 0;

/* 
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
      // steel: steel,
  }

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
*/

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

  // saveGame();
}

function calculateSteel(iron, coke, limestone) {
  const steelFromIron = iron / 1.5;
  const steelFromCoke = coke / 0.5;
  const steelFromLimestone = limestone / 0.25;

  return Math.floor(Math.min(steelFromIron, steelFromCoke, steelFromLimestone));
  // saveGame();
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
  // saveGame();
}

function calculateAndDisplaySteel() {
  const iron = parseFloat(document.getElementById("iron").innerText);
  const coke = parseFloat(document.getElementById("coke").innerText);
  const limestone = parseFloat(document.getElementById("limestone").innerText);

  const steelAmount = calculateSteel(iron, coke, limestone);

  document.getElementById("steelAmount").innerText = steelAmount;
  // saveGame();
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
    // saveGame();
}

function RefineSteel(){
  const iron = parseFloat(document.getElementById("iron").innerText);
  const coke = parseFloat(document.getElementById("coke").innerText);
  const limestone = parseFloat(document.getElementById("limestone").innerText);

  const steelAmount = calculateSteel(iron, coke, limestone);
  steelInv = (steelInv + steelAmount) * (efficiency/100);
  document.getElementById("steelInv").textContent = steelInv;
  document.getElementById("iron").innerText = "0";
  document.getElementById("coke").innerText = "0";
  document.getElementById("limestone").innerText = "0";
  document.getElementById("steelAmount").innerText = "0";
  // saveGame();
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

  // saveGame();
}, 1000); // Runs every 1 seconds

let currentWeek = 1;

function SellSteel(){
  
  s_income = s_income + (steelInv * 880);
  document.getElementById("s_income").innerText = s_income;

  steelInv = 0;
  document.getElementById("steelInv").innerText = steelInv;
  // currentaccount = forecast;
  // saveGame();
  currentWeek++;
  document.getElementById('weekDisplay').innerText = 'Week ' + currentWeek;
}

function resetGame() {
  localStorage.removeItem("steelRefineryGame");
  location.reload(); // Reload the page to reset to defaults
}

const companyData = {
  usa: {
      name: "US Steel",
      image: "images/usa-company.jpg",
      bgcolor: "#a7a8ec",
      // bgimage: "korea_bg.jpg"
      message: "Founded by John Pierpont Morgan Sr. in 1901, we were once the backbone of America's industrial might. Help us reindustrialize with increased domestic production, providing jobs and protecting national interests."
  },
  china: {
      name: "Baowu Steel Group",
      image: "images/china-company.jpg",
      bgcolor: "#f37070",
      message: "Wholly owned and operated by the State Council of the People's Republic of China, we are the world's single largest steel producer. Let us forge the fruits of socialist labour."
  },
  eu: {
      name: "ArselorMittal",
      bgcolor: "#637ef8",
      image: "images/eu-company.jpg",
      message: "we suck crazy style. i am europe i like da ciggarette and unemployment."
  },
  russia: {
      name: "Magnitogorsk Iron & Steel",
      bgcolor: "#aea1a1",
      image: "images/russia-company.jpg",
      message: "Situated by the great Ural mountains, Magnitogorsk or 'city of the magnetic mountain' was established through Joseph Vissarionovich Stalin's first five-year plans."
  },
  japan: {
      name: "Nippon",
      bgcolor: "#f2c2eb",
      image: "images/japan-company.jpg",
      message: "japan! we are japan! we make steel! japan!"
  },
  india: {
      name: "Tatta Steel",
      bgcolor: "#f9f5a7",
      image: "images/india-company.jpg",
      message: "i really don't know what to put in here."
  },
  korea: {
      name: "POSKO",
      bgcolor: "#c1fef4",
      image: "images/southkorea-company.jpg",
      message: "steel but korean. that is all there is to say."
  }
};

// Get company from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const company = urlParams.get('company') || 'usa'; // Default to USA if no parameter

// Set background color and show dialog
window.onload = function() {
  const data = companyData[company];
  
  // Set background color
  document.getElementById('mainBody').style.backgroundColor = data.bgcolor;
  
  // Set dialog content
  document.getElementById('companyName').innerText = data.name;
  document.getElementById('representativeImage').src = data.image;
  document.getElementById('welcomeMessage').innerText = data.message;
  
  // Show dialog
  document.getElementById('dialogOverlay').style.display = 'block';
  document.getElementById('welcomeDialog').style.display = 'block';
};

function closeDialog() {
  document.getElementById('dialogOverlay').style.display = 'none';
  document.getElementById('welcomeDialog').style.display = 'none';
}