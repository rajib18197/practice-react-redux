import { useDispatch, useSelector } from "react-redux";
import { filterBook } from "../features/books/booksActions";
import { getState } from "../features/books/booksSlice";

export default function Filters({ options }) {
  const { filterValue: currentFilter } = useSelector(getState);
  const dispatch = useDispatch();

  function handleClick(value) {
    dispatch(filterBook(value));
  }

  return (
    <div className="flex items-center space-x-4">
      {options.map((option) => (
        <button
          className={`filter-btn ${
            option.value === currentFilter ? "active-filter" : ""
          }`}
          key={option.value}
          onClick={() => handleClick(option.value)}
          id={option.id}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
