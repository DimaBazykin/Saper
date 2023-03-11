function gamem(WIDHT, HEGHT, BOMB) {
  const board = document.querySelector("#board");

  board.getAttribute("style");
  board.style.gridTemplateColumns = "repeat(" + WIDHT + ", 1fr)";
  board.style.gridTemplateRows = "repeat(" + HEGHT + ", 1fr)";

  const SQUARES_NAMBER = HEGHT * WIDHT;

  for (let i = 0; i < SQUARES_NAMBER; i++) {
    const square = document.createElement("button");
    square.classList.add("square");

    board.append(square);
  }

  const cells = [...board.children];

  let closeCount = SQUARES_NAMBER;

  let boombs = [];

  board.addEventListener("click", (event) => {
    const index = cells.indexOf(event.target);
    const column = index % WIDHT;
    const row = Math.floor(index / WIDHT);
    if (boombs.length === 0) {
      startGame(row, column)
    } else {
      if (event.target.tagName !== "BUTTON") {
        return;
      }
      open(row, column);
    }
  });

  function startGame(row, column) {
    const index = row * WIDHT + column;
    const cell = cells[index];
    cell.disabled = true;

    let indexs = [...Array(SQUARES_NAMBER).keys()];
    indexs.splice(index, 1)
    boombs = indexs
    .sort(() => Math.random() - 0.5)
    .slice(0, BOMB);

    const count = getCount(row, column);

    if (count !== 0) {
      cell.innerHTML = count;
      if ((SQUARES_NAMBER - 1) == BOMB) {
        alert("ТЫ ПОБЕДИЛ");
      }
      return
    }
  }

  function isValid(row, column) {
    return row >= 0 && row < HEGHT && column >= 0 && column < WIDHT;
  }

  function getCount(row, column) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (isBomb(row + i, column + j)) {
          count++;
        }
      }
    }
    return count;
  }

  function open(row, column) {
    if (!isValid(row, column)) {
      return;
    }

    const index = row * WIDHT + column;
    const cell = cells[index];

    if (cell.disabled === true) {
      return;
    }
    cell.disabled = true;
    if (isBomb(row, column)) {
      cell.innerHTML = "X";
      boombs.forEach((element) => {
        cells[element].innerHTML = "X";
        cells[element].disabled = true;
      });
      alert("YOU LOSE");
      return;
    }

    closeCount--;
    if (closeCount <= BOMB) {
      alert("ТЫ ПОБЕДИЛ");
    }

    const count = getCount(row, column);
    if (count !== 0) {
      cell.innerHTML = count;
      return;
    }

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        open(row + j, column + i);
      }
    }
  }

  function isBomb(row, column) {
    if (!isValid(row, column)) {
      return false;
    }
    const index = row * WIDHT + column;

    return boombs.includes(index);
  }
}

const INPUT_WITH = document.querySelector(".width");
const INPUT_HEGHT = document.querySelector(".hegth");
const INPUT_BOMBS = document.querySelector(".bombs");
const START = document.querySelector(".start");

START.addEventListener("click", (event) => {
  const board = document.querySelector("#board");
  const boardClone = board.cloneNode();
  board.after(boardClone);
  board.remove();

  gamem(INPUT_WITH.value, INPUT_HEGHT.value, INPUT_BOMBS.value);
});
