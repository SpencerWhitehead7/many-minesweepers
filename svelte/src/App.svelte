<script lang="ts">
  import Board from "./Board.svelte";
  import Settings from "./Settings.svelte";

  import {
    DEFAULT_DIFFICULTY,
    generateBoard,
    getFlagCount,
    getOutcome,
    OUTCOME,
    updateBoardCellExposed,
    updateBoardCellFlagged,
  } from "../../__shared/game";

  let difficulty = DEFAULT_DIFFICULTY;
  let board = generateBoard(difficulty);

  $: outcome = getOutcome(board);
  $: flagCount = getFlagCount(board);

  const handleCellExposed = (rI: number, cI: number) => {
    if (outcome !== OUTCOME.U || board[rI][cI].isFlagged) return;

    board = updateBoardCellExposed(board, rI, cI);
  };

  const handleCellFlagged = (rI: number, cI: number) => {
    if (outcome !== OUTCOME.U || !board[rI][cI].isHidden) return;

    board = updateBoardCellFlagged(board, rI, cI);
  };
</script>

<main class="app">
  <h1>Svelte Minesweeper</h1>
  <h4>Left click to expose square, right click to flag/unflag square</h4>
  <h4>{flagCount} / {difficulty.mineCount} mines flagged</h4>
  <Board {board} {handleCellExposed} {handleCellFlagged} />
  {#if outcome === OUTCOME.W}
    <h2>You win!</h2>
  {:else if outcome === OUTCOME.L}
    <h2>You lose!</h2>
  {/if}
  <Settings bind:board bind:difficulty />
</main>
