import { Index, Show, Switch, Match } from 'solid-js'

import { Board as BoardType, SYM } from '../../__shared/game'

type Props = {
  board: BoardType
  handleCellExposed: (rI: number, cI: number) => void
  handleCellFlagged: (rI: number, cI: number) => void
}

export const Board = (ps: Props) => (
  <table class="board">
    <tbody>
      <Index each={ps.board}>
        {(row, rI) => (
          <tr>
            <Index each={row()}>
              {(cell, cI) => (
                <td
                  classList={{
                    cell: true,
                    "cell--visible": !cell().isHidden,
                    "cell--mine": !cell().isHidden && cell().value === SYM.MINE,
                    "cell--flag": cell().isFlagged
                  }}
                  onClick={(evt) => {
                    ps.handleCellExposed(rI, cI)
                  }}
                  onContextMenu={(evt) => {
                    evt.preventDefault()
                    ps.handleCellFlagged(rI, cI)
                  }}
                >
                  <Show when={!cell().isHidden}>
                    <Switch>
                      <Match when={cell().value === SYM.MINE}>
                        X
                      </Match>
                      <Match when={cell().value !== SYM.EMPT}>
                        {cell().value}
                      </Match>
                    </Switch>
                  </Show>
                </td>
              )}
            </Index>
          </tr>
        )}
      </Index>
    </tbody>
  </table>
)
