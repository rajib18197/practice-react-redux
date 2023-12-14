import { useDispatch, useSelector } from "react-redux";
import { getState, setFilterValue } from "../features/books/booksSlice";

export default function Filters({ options }) {
  const { filterValue: currentFilter } = useSelector(getState);
  const dispatch = useDispatch();

  function handleClick(value) {
    dispatch(setFilterValue(value));
  }

  return (
    <div className="flex items-center space-x-4">
      {options.map((option) => (
        <button
          className={`lws-filter-btn ${
            currentFilter === option.value ? "active-filter" : ""
          }`}
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={currentFilter === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
