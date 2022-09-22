import { Switch, Match, createSignal, createMemo } from 'solid-js';

import { Board } from './Board'
import { Settings } from './Settings'

import { OUTCOME, DEFAULT_DIFFICULTY, generateBoard, updateBoardCellExposed, updateBoardCellFlagged, getFlagCount, getOutcome } from '../../__shared/game'

export const App = () => {
  const [difficulty, setDifficulty] = createSignal(DEFAULT_DIFFICULTY)

  const [board, setBoard] = createSignal(generateBoard(difficulty()))
  const outcome = createMemo(() => getOutcome(board()))
  const flagCount = createMemo(() => getFlagCount(board()))

  const handleCellExposed = (rI: number, cI: number) => {
    if (outcome() !== OUTCOME.U || board()[rI][cI].isFlagged) return

    setBoard(updateBoardCellExposed(board(), rI, cI))
  }

  const handleCellFlagged = (rI: number, cI: number) => {
    if (outcome() !== OUTCOME.U || !board()[rI][cI].isHidden) return

    setBoard(updateBoardCellFlagged(board(), rI, cI))
  }

  return (
    <main class="app">
      <h1>SolidJS Minesweeper</h1>
      <h4>Left click to expose square, right click to flag/unflag square</h4>
      <h4>{flagCount()} / {difficulty().mineCount} mines flagged</h4>
      <Board
        board={board()}
        handleCellExposed={handleCellExposed}
        handleCellFlagged={handleCellFlagged}
      />
      <Switch fallback={null}>
        <Match when={outcome() === OUTCOME.W}>
          <h2>You win!</h2>
        </Match>
        <Match when={outcome() === OUTCOME.L}>
          <h2>You lose!</h2>
        </Match>
      </Switch>
      <Settings setBoard={setBoard} setDifficulty={setDifficulty} />
    </main>
  );
}
