import { useSearchParams } from "react-router-dom";
import { useGetUrl } from "../hooks/useUrl";

export default function Filters({ filterFields, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  //   const currentFilter = searchParams.get(filterFields) || options.at(0);
  const currentFilter = useGetUrl(filterFields) || options.at(0).value;
  console.log(currentFilter);

  function handleClick(value) {
    searchParams.set(filterFields, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="sidebar-content">
      <h4>Filter</h4>
      <div className="radio-group">
        {options.map((option) => (
          <div
            key={option.value}
            className={`${
              option.value === currentFilter ? "bg-rose-600 rounded" : ""
            }`}
            disabled={option.value === currentFilter}
          >
            <input
              type="radio"
              name="filter"
              id={`lws-${option.value}`}
              {...(option.value === currentFilter && { checked: true })}
              onClick={() => handleClick(option.value)}
              className="radio"
            />
            <label for={`lws-${option.value}`}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
