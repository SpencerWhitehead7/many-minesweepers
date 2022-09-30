<script lang="ts">
  import type { Board as BoardType } from "../../__shared/game";
  import { SYM } from "../../__shared/game";

  export let board: BoardType;
  export let handleCellExposed: (rI: number, cI: number) => void;
  export let handleCellFlagged: (rI: number, cI: number) => void;
</script>

<table class="board">
  <tbody>
    {#each board as row, rI (rI)}
      <tr>
        {#each row as cell, cI (cI)}
          <td
            class="cell
            {!cell.isHidden ? 'cell--visible' : ''}
            {!cell.isHidden && cell.value === SYM.MINE ? 'cell--mine' : ''}
            {cell.isFlagged ? 'cell--flag' : ''}"
            on:click={() => {
              handleCellExposed(rI, cI);
            }}
            on:contextmenu|preventDefault={() => {
              handleCellFlagged(rI, cI);
            }}
          >
            {#if !cell.isHidden}
              {#if cell.value === SYM.MINE}
                X
              {:else if cell.value !== SYM.EMPT}
                {cell.value}
              {/if}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
