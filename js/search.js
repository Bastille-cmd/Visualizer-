function renderArray(array) {
  const container = document.getElementById("visualizer");
  container.innerHTML = "";

  array.forEach(value => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerText = value;
    container.appendChild(box);
  });
}

function generateRandomArray() {
  const array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90 + 10));
  document.getElementById("arrayInput").value = array.join(", ");
  renderArray(array);
}

function getInputArray() {
  const input = document.getElementById("arrayInput").value;
  if (!input) return [];
  return input.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n));
}

async function startLinearSearch() {
  const array = getInputArray();
  const target = parseInt(document.getElementById("targetInput").value);
  if (isNaN(target)) {
    alert("Enter a valid target number.");
    return;
  }

  renderArray(array);
  const boxes = document.querySelectorAll(".box");

  for (let i = 0; i < array.length; i++) {
    boxes[i].style.backgroundColor = "#8A784E";
    await new Promise(res => setTimeout(res, 400));

    if (array[i] === target) {
      showTargetFound(target);
      return;
    }

    boxes[i].style.backgroundColor = "#AEC8A4";
  }

  alert("Target not found.");
}

async function startBinarySearch() {
  let array = getInputArray();
  const target = parseInt(document.getElementById("targetInput").value);
  if (isNaN(target)) {
    alert("Enter a valid target number.");
    return;
  }

  array.sort((a, b) => a - b);
  renderArray(array);
  const boxes = document.querySelectorAll(".box");

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    boxes[mid].style.backgroundColor = "#8A784E";
    await new Promise(res => setTimeout(res, 400));

    if (array[mid] === target) {
      showTargetFound(target);
      return;
    }

    boxes[mid].style.backgroundColor = "#AEC8A4";

    if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  alert("Target not found.");
}

function showTargetFound(value) {
  const container = document.getElementById("visualizer");
  container.innerHTML = "";

  const box = document.createElement("div");
  box.className = "box";
  box.innerText = value;
  box.style.backgroundColor = "#4CAF50";
  box.style.transform = "scale(1.5)";
  box.style.margin = "auto";

  const message = document.createElement("div");
  message.className = "text-2xl font-semibold text-center mt-4";
  message.innerText = `Target ${value} found!`;

  container.appendChild(box);
  container.appendChild(message);
}
