import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { useGetUrl } from "../hooks/useUrl";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortedValue = useGetUrl('sortBy') || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className="sidebar-content">
      <h4>Sort</h4>
      <Select
        options={options}
        value={currentSortedValue}
        onChange={handleChange}
      />
    </div>
  );
}
