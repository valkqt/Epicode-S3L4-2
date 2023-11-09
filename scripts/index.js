const extracted = [];
const numberOfTables = parseInt(
  document.getElementById("player-table-number").value
);
const numberOfCells = parseInt(document.getElementById("table-size").value);
let confirmFlag = false;

function generateTable() {
  const container = document.getElementById("table");
  for (i = 1; i <= numberOfCells; i++) {
    const elem = document.createElement("span");
    elem.innerText = i;
    container.appendChild(elem);
  }
}

function activateExtraction() {
  const button = document.getElementById("extractor");
  button.addEventListener("click", () => {
    let flag = true;
    while (flag) {
      let result = Math.round(Math.random() * numberOfCells);
      if (extracted.includes(result)) {
        flag = true;
      } else {
        extracted.push(result);
        highlightCells(result);
        flag = false;
      }
    }
  });
}

function highlightCells(n) {
  const cells = document.querySelectorAll("span");
  for (cell of cells) {
    let cellNumber = parseInt(cell.innerText);
    if (cellNumber === n) {
      cell.classList.add("highlighted");
    }
  }
}

function generatePlayerTable() {
  const wrapper = document.getElementById("player-wrapper");
  const table = document.createElement("div");
  table.classList.add("player-table");

  for (i = 1; i <= 15; i++) {
    const elem = document.createElement("span");

    const alreadyOut = [];
    let flag = true;
    while (flag) {
      if (alreadyOut.includes(Math.round(Math.random() * numberOfCells))) {
        flag = true;
      } else {
        elem.innerText = Math.round(Math.random() * numberOfCells);
        flag = false;
      }
    }
    wrapper.appendChild(table);
    table.appendChild(elem);
  }
  console.log("pepe");
}

function createTables(n) {
  for (a = 0; a < n; a++) {
    generatePlayerTable();
  }
}

function activateConfirm() {
  const confirm = document.getElementById("player-confirm");
  const readTables = function () {
    if (confirmFlag) {
      return;
    }
    createTables(numberOfTables);
    confirmFlag = true;
  };

  const readCells = function () {
    if (confirmFlag) {
      return;
    }
    generateTable();
  };
  confirm.addEventListener('click', readCells)
  confirm.addEventListener("click", readTables);
}

activateConfirm();
activateExtraction();
