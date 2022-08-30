const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const playerNameInput = document.querySelector("#playerName");
  const playerScoreInput = document.querySelector("#playerScore");
  const winResultInput = document.querySelector("#winResult");

  const rowData = {
      playerName: playerNameInput.value,
      playerScore: parseInt(playerScoreInput.value),
      winResult: winResultInput.checked,
    },
    body = JSON.stringify({ rowData });

  fetch("/", {
    method: "POST",
    body,
  })
    .then((response) => response.json())
    .then((data) => updateTableWithData(data));

  return false;
};

const updateTableWithData = function (currentData) {
  // Taken from https://stackoverflow.com/a/16270116
  $("#resultsTable:not(:first)").remove();
  const table = document.querySelector("#resultsTable");
  console.log(currentData);
  currentData.forEach((element, index) => {
    const row = table.insertRow(index);
    for (const value of Object.values(element)) {
      const cell = row.insertCell();
      cell.innerHTML = value;
    }
  });
};

window.onload = function () {
  const button = document.querySelector("#submit");
  button.onclick = submit;
};
