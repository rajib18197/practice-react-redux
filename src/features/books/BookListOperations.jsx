import Filters from "../../ui/Filters";

export default function BookListOperations() {
  return (
    <Filters
      options={[
        { value: "all", label: "All" },
        { value: "featured", label: "Featured" },
      ]}
    />
  );
}
