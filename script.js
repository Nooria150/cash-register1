
let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

document.getElementById('purchase-btn').addEventListener('click', calculateChange);

function calculateChange() {
  const cashInput = document.getElementById('cash');
  const changeDueElement = document.getElementById('change-due');

  const cash = parseFloat(cashInput.value);

  if (Number.isNaN(cash)) {
    alert("Please enter a valid number");
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
    return;
  }

  calculateActualChange(cash, changeDueElement);

  cashInput.value = '';
}

function calculateActualChange(cash, changeDueElement) {
  let changeDue = [];
  let changeRequired = cash - price;

  function roundToTwoDecimal(num) {
    return Math.round(num * 100) / 100;
  }

  const denominations = [
    ["ONE HUNDRED", 100.00],
    ["TWENTY", 20.00],
    ["TEN", 10.00],
    ["FIVE", 5.00],
    ["ONE", 1.00],
    ["QUARTER", 0.25],
    ["DIME", 0.10],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
  ];

  function getTotalCID() {
    return cid.reduce((total, denom) => total + denom[1], 0);
  }

  const totalCID = getTotalCID();
  if (totalCID < changeRequired) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  for (let [denomName, denomValue] of denominations) {
    let denomAmount = cid.find(item => item[0] === denomName)[1];
    let denomCount = 0;

    while (changeRequired >= denomValue && denomAmount >= denomValue) {
      changeRequired = roundToTwoDecimal(changeRequired - denomValue);
      denomAmount = roundToTwoDecimal(denomAmount - denomValue);
      denomCount++;
    }

    if (denomCount > 0) {
      changeDue.push([denomName, roundToTwoDecimal(denomCount * denomValue)]);
    }
  }

  if (changeRequired > 0) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let changeDueString = "Status: OPEN ";
  changeDue.forEach(item => {
    changeDueString += `${item[0]}: $${item[1].toFixed(2)}, `;
  });
  changeDueString = changeDueString.slice(0, -2);

  changeDueElement.textContent = changeDueString;

  if (totalCID === cash - price) {
    changeDueString = "Status: CLOSED ";
    changeDue.forEach(item => {
      changeDueString += `${item[0]}: $${item[1].toFixed(2)}, `;
    });
    changeDueString = changeDueString.slice(0, -2);
    changeDueElement.textContent = changeDueString;
  }
}