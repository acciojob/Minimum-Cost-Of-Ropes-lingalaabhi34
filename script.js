// Function to calculate the minimum cost of connecting ropes
function calculateMinCost() {
  // Get the input string of comma-separated rope lengths
  const inputElement = document.getElementById("rope-lengths");
  const inputString = inputElement.value;

  // Parse the input string into an array of rope lengths
  const ropeLengths = inputString.split(",").map((length) => parseInt(length));

  // Ensure there are at least two ropes to connect
  if (ropeLengths.length < 2) {
    document.getElementById("result").textContent = "Please enter at least two rope lengths.";
    return;
  }

  // Function to calculate the minimum cost
  function findMinimumCost(ropes) {
    // Initialize the total cost and the min-heap (priority queue)
    let totalCost = 0;
    const minHeap = new MinHeap();

    // Add all the rope lengths to the min-heap
    ropes.forEach((length) => minHeap.insert(length));

    // Continue connecting ropes until there is only one rope left
    while (minHeap.size() > 1) {
      // Remove the two shortest ropes from the min-heap
      const rope1 = minHeap.extractMin();
      const rope2 = minHeap.extractMin();

      // Calculate the cost of connecting the two ropes and add it to the total cost
      const cost = rope1 + rope2;
      totalCost += cost;

      // Insert the combined rope back into the min-heap
      minHeap.insert(cost);
    }

    return totalCost;
  }

  // Calculate the minimum cost
  const minimumCost = findMinimumCost(ropeLengths);

  // Display the result in the HTML element
  document.getElementById("result").textContent = "Minimum cost: " + minimumCost;
}

// MinHeap class for priority queue
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] < this.heap[parentIndex]) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  extractMin() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);

    return minValue;
  }

  sinkDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallest = index;

    if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallest]) {
      smallest = leftChildIndex;
    }

    if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallest]) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.sinkDown(smallest);
    }
  }
}

