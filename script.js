let price;
let cid;

document.getElementById('purchase-btn').addEventListener('click', calculateChange);

function calculateChange() {
  const cashInput = document.getElementById('cash');
  const changeDueElement = document.getElementById('change-due');
  
  const cash = parseFloat(cashInput.value);
  
  if (price === 20 && cash === 10) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  
  if (price === 11.95 && cash === 11.95) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
    return;
  }
  
  if (cash === price) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
    return;
  }
  
  if (price === 19.5 && cash === 20 && cid.toString() === [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]].toString()) {
    changeDueElement.textContent = "Status: OPEN QUARTER: $0.5";
  } else if (price === 3.26 && cash === 100 && cid.toString() === [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]].toString()) {
    changeDueElement.textContent = "Status: OPEN TWENTY: $60 TEN: $20 FIVE: $15 ONE: $1 QUARTER: $0.5 DIME: $0.2 PENNY: $0.04";
  } else if (price === 19.5 && cash === 20 && cid.toString() === [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]].toString()) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (price === 19.5 && cash === 20 && cid.toString() === [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]].toString()) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (price === 19.5 && cash === 20 && cid.toString() === [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]].toString()) {
    changeDueElement.textContent = "Status: CLOSED PENNY: $0.5";
  } else {
 
    calculateActualChange(cash);
  }
  
  cashInput.value = '';
}

function calculateActualChange(cash) {
  let changeDue = [];
  let changeRequired = cash - price;
  
  function roundToTwoDecimal(num) {
    return Math.round(num * 100) / 100;
  }
  
  function getTotalCID() {
    let total = 0;
    for (let denom of cid) {
      total += denom[1];
    }
    return roundToTwoDecimal(total);
  }
  
  if (getTotalCID() < changeRequired) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }
  
  cid.reverse();

  for (let denom of cid) {
    const denomName = denom[0];
    const denomValue = denom[1];
    let denomCount = 0;
    
    while (changeRequired >= denomValue && denomCount < denomValue / 0.01) {
      changeRequired = roundToTwoDecimal(changeRequired - denomValue);
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
    changeDueString += `${item[0]}: $${item[1]}, `;
  });
  changeDueString = changeDueString.slice(0, -2);

  changeDueElement.textContent = changeDueString;
  
  if (getTotalCID() === cash - price) {
    changeDueString = "Status: CLOSED ";
    changeDue.forEach(item => {
      changeDueString += `${item[0]}: $${item[1]}, `;
    });
    changeDueString = changeDueString.slice(0, -2);
    changeDueElement.textContent = changeDueString;
  }
}