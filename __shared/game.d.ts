type Cell = {
  isHidden: boolean,
  isFlagged: boolean,
  value: number,
}

type Board = Cell[][]

export const SYM: {
  EMPT: number
  MINE: number
}

export const OUTCOME: {
  U: string
  W: string,
  L: string,
}

export type DifficultyItem = {
  rowCount: number
  colCount: number
  mineCount: number
}

export const DIFFICULTY_MAP: {
  E: DifficultyItem
  M: DifficultyItem
  H: DifficultyItem
}

export const DEFAULT_DIFFICULTY: DifficultyItem

export function generateBoard(difficulty: DifficultyItem): Board
export function updateBoardCellExposed(board: Board, rI: number, cI: number): Board
export function updateBoardCellFlagged(board: Board, rI: number, cI: number): Board
export function getFlagCount(board: Board): number
export function getOutcome(board: Board): keyof typeof OUTCOME
