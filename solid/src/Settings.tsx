import { Setter } from "solid-js"

import { Board, DifficultyItem, DIFFICULTY_MAP, generateBoard } from "../../__shared/game"

type Props = {
  setBoard: Setter<Board>
  setDifficulty: Setter<DifficultyItem>,
}

export const Settings = (ps: Props) => (
  <form
    class="difficultyForm"
    onSubmit={(evt) => {
      evt.preventDefault()
      const { difficultyLevel } = Object.fromEntries(new FormData(evt.currentTarget)) as
        { difficultyLevel: keyof typeof DIFFICULTY_MAP }

      const difficulty = DIFFICULTY_MAP[difficultyLevel]
      ps.setDifficulty(difficulty)
      ps.setBoard(generateBoard(difficulty))
    }}
  >
    <fieldset class="difficultyForm__selection">
      <legend>Difficulty:</legend>
      <label>
        <input type="radio" name="difficultyLevel" value={"E"} checked />
        Easy
      </label>

      <label>
        <input type="radio" name="difficultyLevel" value={"M"} />
        Medium
      </label>

      <label>
        <input type="radio" name="difficultyLevel" value={"H"} />
        Hard
      </label>
    </fieldset>
    <button type="submit" class="difficultyForm__submitBtn">
      Reset
    </button>
  </form>
)
