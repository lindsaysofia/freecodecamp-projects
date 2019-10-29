/*
Cash Register

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (DOLLAR)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return an object.

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.

Keep in mind next time: 
- check if there is still money of this type in the drawer and while the denomination is less than than the change remaining. i.e. check if there are still quarters and that that the value of a quarter (25 cents) is less than the change remaining
*/
let currencyValue = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.10,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100,
};
function checkCashRegister(price, cash, cid) {
  let change = parseFloat((cash - price).toFixed(2));
  let cidTotal = getCidTotal(cid);
  if (cidTotal < change) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if (cidTotal === change) {
    return {status: 'CLOSED', change: cid};
  }
  let changeToGive = [];
  for (let cidIndex = cid.length - 1; cidIndex >= 0; cidIndex--) {
    let currencyName = cid[cidIndex][0];
    let currencyValueInDrawer = cid[cidIndex][1];
    let currencyNameValue = currencyValue[currencyName];
    if (currencyValueInDrawer <= change && currencyValueInDrawer !== 0) {
      change = parseFloat((change - currencyValueInDrawer).toFixed(2));
      changeToGive.push(cid[cidIndex]);
    } else if (currencyNameValue < change && currencyValueInDrawer !== 0) {
      let amountOfCurrencyNeeded = parseFloat((Math.floor(change / currencyNameValue) * currencyNameValue).toFixed(2));
      change = parseFloat((change - amountOfCurrencyNeeded).toFixed(2));
      changeToGive.push([currencyName, amountOfCurrencyNeeded]);
    }
    if (change === 0) break;
  }
  return (change === 0) ? {status: 'OPEN', change: changeToGive} : {status: "INSUFFICIENT_FUNDS", change: []};
}

function getCidTotal(cid) {
  let total = cid.reduce((accumulator, current) => {
    return accumulator + current[1];
  }, 0).toFixed(2);
  return parseFloat(total);
}