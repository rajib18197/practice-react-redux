import Filters from "../../ui/Filters";
import SortBy from "../../ui/SortBy";

export default function BlogOperations() {
  return (
    <aside>
      <div className="sidebar-items">
        <SortBy
          options={[
            { value: "default", label: "Default" },
            { value: "most_liked-asc", label: "Most Liked (low first)" },
            { value: "most_liked-desc", label: "Most Liked (high first)" },
            { value: "newest-asc", label: "Newest (low first)" },
            { value: "newest-desc", label: "Newest (high first)" },
          ]}
        />
        <Filters
          filterFields={"filter"}
          options={[
            { value: "all", label: "All" },
            { value: "saved", label: "Saved" },
            { value: "not-saved", label: "Not Saved" },
          ]}
        />
      </div>
    </aside>
  );
}
