  function calculateSteel(iron, coke, limestone) {
    const steelFromIron = iron / 1.5;
    const steelFromCoke = coke / 0.5;
    const steelFromLimestone = limestone / 0.25;
  
    return Math.floor(Math.min(steelFromIron, steelFromCoke, steelFromLimestone));
  }
  
  function calculateAndDisplaySteel() {
    const iron = parseFloat(document.getElementById("iron").value);
    const coke = parseFloat(document.getElementById("coke").value);
    const limestone = parseFloat(document.getElementById("limestone").value);
  
    const steelAmount = calculateSteel(iron, coke, limestone);
  
    document.getElementById("steelAmount").textContent = steelAmount;
  }
  function updateTalentPool() {
    // Get the current number of workers
    let workers = parseInt(document.getElementById("workers").innerText);

    // Get the number of workers to hire and fire from the input fields
    let hireCount = parseInt(document.getElementById("hireWorkers").value) || 0;
    let fireCount = parseInt(document.getElementById("fireWorkers").value) || 0;

    // Update the number of workers
    workers = workers + hireCount - fireCount;

    // Ensure the number of workers doesn't go below 0
    if (workers < 0) {
        workers = 0;
        alert("Cannot fire more workers than you have!");
    }

    // Update the display
    document.getElementById("workers").innerText = workers;

    // Reset the input fields to 0
    document.getElementById("hireWorkers").value = "0";
    document.getElementById("fireWorkers").value = "0";
}