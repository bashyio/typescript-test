import styles from "./AutoComplete.module.css";
import { EntryProps } from "./AutoComplete.types";

function Entry({ value, searched, selectInput }: EntryProps): JSX.Element {
  return (
    <li
      className={styles.entry}
      onClick={() => {
        selectInput(value);
      }}
      role="button"
    >
      <b>{value.substring(0, searched.length)}</b>
      {value.substring(searched.length)}
    </li>
  );
}

export default Entry;
