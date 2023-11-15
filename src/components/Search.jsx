import { useRef } from "react";
import { useKey } from "../custom-hooks/useKey";

const Search = ({ query, setQuery, onCloseBooksAndDetails }) => {
  const inputEl = useRef(null);

  useKey("Backspace", function () {
    if (document.activeElement !== inputEl.current) {
      onCloseBooksAndDetails();
      inputEl.current.focus();
    }
  });

  return (
    <input
      ref={inputEl}
      value={query}
      onChange={e => {
        onCloseBooksAndDetails();
        setQuery(e.target.value);
      }}
      type="text"
      placeholder="Search for a book..."
      className="w-96 py-2 pl-2 rounded-lg focus:placeholder:text-amber-900 outline-none focus:ring-1 focus:ring-stone-600 focus:shadow-lg"
    />
  );
};

export default Search;
