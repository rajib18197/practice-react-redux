import { useState } from "react";
import {
  useGetTaskByNameQuery,
  useGetTasksQuery,
} from "../features/tasks/tasksApi";
import { useDispatch } from "react-redux";
import { addQuery } from "../features/tasks/tasksSlice";

export default function Search() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      console.log(args);
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  function doSearch(args) {
    console.log(args);
    setQuery(args);
    dispatch(addQuery(args));
  }

  const handleSearch = debounce(doSearch, 500);

  return (
    <div class="flex-1 max-w-xs search-field group">
      <i class="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
      <input
        type="text"
        placeholder="Search Task"
        className="search-input text-stone-900"
        id="lws-searchTask"
        // value={query}
        onChange={(e) => {
          console.log(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}
