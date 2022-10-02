import styles from "./AutoComplete.module.css";
import { EntryProps } from "./AutoComplete.types";

function Entry({ value, input, selectInput }: EntryProps): JSX.Element {
  let match = "";
  for (let i = 0; i < input.length; i++) {
    if (value[i].toLowerCase() !== input[i].toLowerCase()) break;
    match = `${match}${value[i]}`;
  }

  return (
    <li
      className={styles.entry}
      onClick={() => {
        selectInput(value);
      }}
      role="button"
    >
      <b>{value.substring(0, match.length)}</b>
      {value.substring(match.length)}
    </li>
  );
}

export default Entry;
