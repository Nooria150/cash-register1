const price = 19.5;
const cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
];

function calculateChange() {
  const cashInput = document.getElementById('cash');
  const changeDueElement = document.getElementById('change-due');

  const cash = parseFloat(cashInput.value);

  if (Number.isNaN(cash)) {
    changeDueElement.textContent = 'Please enter a valid number';
    return;
  }

  if (cash < price) {
    changeDueElement.textContent = 'Customer does not have enough money to purchase the item';
    return;
  }

  if (cash === price) {
    changeDueElement.textContent = 'No change due - customer paid with exact cash';
    return;
  }

  calculateActualChange(cash, changeDueElement);

  cashInput.value = '';
}

function calculateActualChange(cash, changeDueElement) {
  const roundToTwoDecimal = (num) => Math.round(num * 100) / 100;

  const denominations = [
    ['ONE HUNDRED', 100.0],
    ['TWENTY', 20.0],
    ['TEN', 10.0],
    ['FIVE', 5.0],
    ['ONE', 1.0],
    ['QUARTER', 0.25],
    ['DIME', 0.1],
    ['NICKEL', 0.05],
    ['PENNY', 0.01],
  ];

  const getTotalCID = () => cid.reduce((total, denom) => total + denom[1], 0);

  const totalCID = getTotalCID();
  if (totalCID < cash - price) {
    changeDueElement.textContent = 'Status: INSUFFICIENT_FUNDS';
    return;
  }

  const changeDue = [];
  let changeRequired = cash - price;

  for (const [denomName, denomValue] of denominations) {
    let denomAmount = cid.find((item) => item[0] === denomName)[1];
    let denomCount = 0;

    while (changeRequired >= denomValue && denomAmount >= denomValue) {
      changeRequired = roundToTwoDecimal(changeRequired - denomValue);
      denomAmount = roundToTwoDecimal(denomAmount - denomValue);
      denomCount += 1;
    }

    if (denomCount > 0) {
      changeDue.push([denomName, roundToTwoDecimal(denomCount * denomValue)]);
    }
  }

  if (changeRequired > 0) {
    changeDueElement.textContent = 'Status: INSUFFICIENT_FUNDS';
    return;
  }

  let changeDueString = 'Status: OPEN ';
  changeDue.forEach((item) => {
    changeDueString += `${item[0]}: $${item[1].toFixed(2)}, `;
  });
  changeDueString = changeDueString.slice(0, -2);

  changeDueElement.textContent = changeDueString;

  if (totalCID === cash - price) {
    changeDueString = 'Status: CLOSED ';
    changeDue.forEach((item) => {
      changeDueString += `${item[0]}: $${item[1].toFixed(2)}, `;
    });
    changeDueString = changeDueString.slice(0, -2);
    changeDueElement.textContent = changeDueString;
  }
}

document.getElementById('purchase-btn').addEventListener('click', calculateChange);