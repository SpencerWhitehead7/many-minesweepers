export const SYM = {
  EMPT: 0,
  MINE: 9,
}

export const OUTCOME = {
  U: "",
  W: "W",
  L: "L",
}

export const DIFFICULTY_MAP = {
  E: { rowCount: 8, colCount: 8, mineCount: 10 },
  M: { rowCount: 16, colCount: 16, mineCount: 40 },
  H: { rowCount: 16, colCount: 30, mineCount: 99 },
}

export const DEFAULT_DIFFICULTY = DIFFICULTY_MAP.E

export const generateBoard = ({ rowCount, colCount, mineCount }) => {
  const board = new Array(rowCount)
    .fill()
    .map(_ => new Array(colCount)
      .fill()
      .map(_ => ({ isHidden: true, isFlagged: false, value: SYM.EMPT })))

  // add mines
  const mineLocations = []
  for (let i = 0; i < mineCount; i++) {
    let row = Math.floor(Math.random() * rowCount)
    let col = Math.floor(Math.random() * colCount)
    while (board[row][col].value === SYM.MINE) {
      row = Math.floor(Math.random() * rowCount)
      col = Math.floor(Math.random() * colCount)
    }
    board[row][col].value = SYM.MINE
    mineLocations.push([row, col])
  }

  // add mine proximity counts
  mineLocations.forEach(mineCell => {
    getNeighbors(board, mineCell)
      .filter(([row, col]) => board[row][col].value !== SYM.MINE)
      .forEach(([row, col]) => {
        board[row][col].value++
      })
  })

  return board
}

export const updateBoardCellExposed = (board, rI, cI) => {
  const updatedBoard = cloneBoard(board)

  if (board[rI][cI].value === SYM.MINE) {
    updatedBoard.forEach((row) => {
      row.forEach((cell) => {
        cell.isHidden = false
      })
    })
  } else {
    const stack = [[rI, cI]]
    while (stack.length) {
      const currCell = stack.pop()
      const [currRi, currCi] = currCell
      updatedBoard[currRi][currCi].isHidden = false
      if (updatedBoard[currRi][currCi].value === SYM.EMPT) {
        stack.push(
          ...getNeighbors(updatedBoard, currCell)
            .filter(([nRI, nCI]) => updatedBoard[nRI][nCI].isHidden)
        )
      }
    }
  }

  return updatedBoard
}

export const updateBoardCellFlagged = (board, rI, cI) => {
  const updatedBoard = cloneBoard(board)

  updatedBoard[rI][cI].isFlagged = !updatedBoard[rI][cI].isFlagged

  return updatedBoard
}

export const getFlagCount = (board) => board
  .flat()
  .filter((cell) => cell.isFlagged)
  .length

export const getOutcome = (board) => board.every((row) => (
  row.every((cell) => (
    cell.value === SYM.MINE
      ? cell.isHidden && cell.isFlagged
      : !cell.isHidden && !cell.isFlagged
  ))
))
  ? OUTCOME.W
  : board.some((row) =>
    row.some((cell) => (
      cell.value === SYM.MINE && !cell.isHidden
    ))
  )
    ? OUTCOME.L
    : OUTCOME.U

const getNeighbors = (board, [currRI, currCI]) => {
  const prevRI = currRI - 1
  const prevCI = currCI - 1
  const nextRI = currRI + 1
  const nextCI = currCI + 1

  return [
    board?.[prevRI]?.[prevCI] && [prevRI, prevCI],
    board?.[prevRI]?.[currCI] && [prevRI, currCI],
    board?.[prevRI]?.[nextCI] && [prevRI, nextCI],
    board?.[currRI]?.[prevCI] && [currRI, prevCI],
    board?.[currRI]?.[nextCI] && [currRI, nextCI],
    board?.[nextRI]?.[prevCI] && [nextRI, prevCI],
    board?.[nextRI]?.[currCI] && [nextRI, currCI],
    board?.[nextRI]?.[nextCI] && [nextRI, nextCI],
  ].filter(Boolean)
}

const cloneBoard = (board) => board.map((row) => row.map((cell) => ({ ...cell })))
