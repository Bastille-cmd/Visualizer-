const COLORS = {
  normal: "#AEC8A4",
  active: "#8A784E",
  sorted: "#4CAF50",
};

let boxes = [];

function renderArray(array) {
  const container = document.getElementById("visualizer");
  container.innerHTML = "";
  boxes = [];

  array.forEach((num) => {
    const box = document.createElement("div");
    box.className = "visual-box";
    box.innerText = num;
    container.appendChild(box);
    boxes.push(box);
  });
}

async function swap(i, j) {
  boxes[i].style.backgroundColor = COLORS.active;
  boxes[j].style.backgroundColor = COLORS.active;

  await new Promise((res) => setTimeout(res, 300));

  const temp = boxes[i].innerText;
  boxes[i].innerText = boxes[j].innerText;
  boxes[j].innerText = temp;

  await new Promise((res) => setTimeout(res, 300));

  boxes[i].style.backgroundColor = COLORS.normal;
  boxes[j].style.backgroundColor = COLORS.normal;
}

function generateRandomArray() {
  const array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90 + 10));
  document.getElementById("arrayInput").value = array.join(", ");
  renderArray(array);
}

async function startSorting() {
  const input = document.getElementById("arrayInput").value;
  const algo = document.getElementById("algorithm").value;
  if (!input) return alert("Enter numbers");

  const array = input.split(",").map((x) => parseInt(x.trim()));
  renderArray(array);

  switch (algo) {
    case "bubble": await bubbleSort(array); break;
    case "selection": await selectionSort(array); break;
    case "insertion": await insertionSort(array); break;
    case "merge": await mergeSort(array, 0, array.length - 1); break;
    case "quick": await quickSort(array, 0, array.length - 1); break;
    case "heap": await heapSort(array); break;
  }

  boxes.forEach((box) => (box.style.backgroundColor = COLORS.sorted));
}

// Sorting Algorithms (same as before, ask if you'd like me to paste them again)


// ----- Sorting Algorithms -----

async function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n - i - 1; ++j) {
      if (arr[j] > arr[j + 1]) {
        await swap(j, j + 1);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

async function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; ++i) {
    let min = i;
    for (let j = i + 1; j < n; ++j) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) {
      await swap(i, min);
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
}

async function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      await swap(j + 1, j);
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}

async function mergeSort(arr, l, r) {
  if (l >= r) return;

  const mid = Math.floor((l + r) / 2);
  await mergeSort(arr, l, mid);
  await mergeSort(arr, mid + 1, r);
  await merge(arr, l, mid, r);
}

async function merge(arr, l, mid, r) {
  const left = arr.slice(l, mid + 1);
  const right = arr.slice(mid + 1, r + 1);
  let i = 0,
    j = 0,
    k = l;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      bars[k].style.height = `${(left[i] / Math.max(...arr)) * 100}%`;
      bars[k].style.backgroundColor = COLORS.active;
      await delay(150);
      bars[k].style.backgroundColor = COLORS.normal;
      i++;
    } else {
      arr[k] = right[j];
      bars[k].style.height = `${(right[j] / Math.max(...arr)) * 100}%`;
      bars[k].style.backgroundColor = COLORS.active;
      await delay(150);
      bars[k].style.backgroundColor = COLORS.normal;
      j++;
    }
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = `${(left[i] / Math.max(...arr)) * 100}%`;
    bars[k].style.backgroundColor = COLORS.active;
    await delay(150);
    bars[k].style.backgroundColor = COLORS.normal;
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = `${(right[j] / Math.max(...arr)) * 100}%`;
    bars[k].style.backgroundColor = COLORS.active;
    await delay(150);
    bars[k].style.backgroundColor = COLORS.normal;
    j++;
    k++;
  }
}

async function quickSort(arr, low, high) {
  if (low < high) {
    const pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}

async function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      await swap(i, j);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  await swap(i + 1, high);
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

async function heapSort(arr) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    await swap(0, i);
    [arr[0], arr[i]] = [arr[i], arr[0]];
    await heapify(arr, i, 0);
  }
}

async function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;

  if (largest !== i) {
    await swap(i, largest);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    await heapify(arr, n, largest);
  }
}
