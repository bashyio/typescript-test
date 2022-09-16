import { useState, useCallback, useEffect } from "react";
import styles from "./AutoComplete.module.css";
import Entry from "./Entry";
import { Post, ClearSearch, SelectInput } from "./AutoComplete.types";
import { debounce } from "../../global/utils/debounce";

const updateValue = debounce(
  (
    value: string,
    updateState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    updateState(value);
  },
  200,
);

function AutoComplete(): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [toSearch, setToSearch] = useState<string>("");
  const [searched, setSearched] = useState<string>("");
  const [searchList, setSearchList] = useState<Post[]>([]);
  const [makeRequest, setMakeRequest] = useState<boolean>(true);

  const clearSearch: ClearSearch = () => {
    setInput("");
    setToSearch("");
    setSearched("");
    setSearchList([]);
    setMakeRequest(true);
  };

  const selectInput: SelectInput = (value) => {
    setSearched(value);
    setInput(value);
    setSearchList([]);
  };

  const debounceSearchInput = useCallback((value: string) => {
    updateValue(value, setToSearch);
  }, []);

  useEffect(() => {
    if (toSearch.length > 0 && makeRequest) {
      fetch(
        `https://jsonplaceholder.typicode.com/posts?title_like=^${encodeURIComponent(
          toSearch.toLowerCase(),
        )}&limit=10`,
        {
          method: "GET",
          cache: "force-cache",
          headers: {
            "Cache-Control": "max-age=600",
            Accept: "application/json",
          },
        },
      )
        .then(async (response) => await response.json())
        .then((data) => {
          setSearched(toSearch);
          setSearchList(data);
        })
        .catch(() => {});
    }
  }, [toSearch, makeRequest]);

  useEffect(() => {
    if (
      searchList.length === 0 &&
      toSearch.length > 0 &&
      toSearch.length >= searched.length &&
      toSearch.substring(0, searched.length).toLowerCase() ===
        searched.toLowerCase()
    ) {
      return setMakeRequest(false);
    }

    return setMakeRequest(true);
  }, [searched, searchList, toSearch]);

  return (
    <div className={styles.autoCompleteHolder}>
      <div className={styles.inputHolder}>
        <input
          title="Search Posts Here"
          placeholder="Search Posts Here..."
          type="text"
          className={styles.autoCompleteInput}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            debounceSearchInput(e.target.value);
          }}
        />
        <button
          type="button"
          title="Clear Input"
          className={styles.clearInput}
          disabled={input.length < 1}
          onClick={clearSearch}
        >
          x
        </button>
      </div>
      {input.length > 0 && searchList.length > 0 && (
        <ul className={styles.entryGroup} role="list">
          {searchList.map((post) => (
            <Entry
              key={post.id}
              value={post.title}
              searched={searched}
              selectInput={selectInput}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete;
