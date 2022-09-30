<script lang="ts">
  import type { Board, DifficultyItem } from "../../__shared/game";
  import { DIFFICULTY_MAP, generateBoard } from "../../__shared/game";

  export let board: Board;
  export let difficulty: DifficultyItem;

  const onSubmit = (
    evt: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    }
  ) => {
    const { difficultyLevel } = Object.fromEntries(
      new FormData(evt.currentTarget)
    ) as { difficultyLevel: keyof typeof DIFFICULTY_MAP };

    difficulty = DIFFICULTY_MAP[difficultyLevel];
    board = generateBoard(difficulty);
  };
</script>

<form class="difficultyForm" on:submit|preventDefault={onSubmit}>
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
  <button type="submit" class="difficultyForm__submitBtn">Reset</button>
</form>
