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
  