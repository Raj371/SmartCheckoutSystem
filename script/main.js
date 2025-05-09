const numCheckouts = 3;
const checkouts = Array.from({ length: numCheckouts }, () => []);

function updateUI() {
  const checkoutSection = document.getElementById("checkoutSection");
  checkoutSection.innerHTML = "";

  checkouts.forEach((queue, index) => {
    const total = queue.reduce((sum, val) => sum + val, 0);
    const checkoutDiv = document.createElement("div");
    checkoutDiv.className = "checkout";
    checkoutDiv.innerHTML = `<h2>Checkout ${
      index + 1
    } <br>(Total: ${total})</h2>`;

    const ul = document.createElement("ul");
    ul.className = "queue";

    queue.forEach((item, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `🧍‍♂️ ${item} item(s) <button onclick="removeCustomer(${index}, ${idx})">X</button>`;
      ul.appendChild(li);
    });

    checkoutDiv.appendChild(ul);
    checkoutSection.appendChild(checkoutDiv);
  });
}

function addCustomer() {
  const input = document.getElementById("itemsInput");
  const items = parseInt(input.value);

  if (isNaN(items) || items <= 0) {
    alert("Please enter a valid number of items.");
    return;
  }

  let minTotal = Infinity;
  let selected = 0;

  checkouts.forEach((queue, index) => {
    const total = queue.reduce((sum, val) => sum + val, 0);
    if (total < minTotal) {
      minTotal = total;
      selected = index;
    }
  });

  checkouts[selected].push(items);
  input.value = "";
  updateUI();
}

function removeCustomer(checkoutIndex, itemIndex) {
  checkouts[checkoutIndex].splice(itemIndex, 1);
  updateUI();
}

updateUI();
