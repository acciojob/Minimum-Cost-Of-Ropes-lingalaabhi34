function calculateMinCost() {
  const input = document.getElementById("rope-lengths").value;
  const ropeLengths = input.split(",").map(Number);
  if (ropeLengths.length < 2) {
    document.getElementById("result").innerText =
      "Please enter at least two rope lengths.";
    return;
  }

  function minCostOfRopes(ropes) {
    let totalCost = 0;
    while (ropes.length > 1) {
      ropes.sort((a, b) => a - b);
      const combinedLength = ropes[0] + ropes[1];
      totalCost += combinedLength;
      ropes = [combinedLength, ...ropes.slice(2)];
    }
    return totalCost;
  }

  const minCost = minCostOfRopes(ropeLengths);

  document.getElementById(
    "result"
  ).innerText = `Minimum cost of connecting ropes: ${minCost}`;
}