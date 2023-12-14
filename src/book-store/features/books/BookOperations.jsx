import Filters from "../../ui/Filters";
import Heading from "../../ui/Heading";

export default function BookOpeartions() {
  return (
    <div className="flex items-center justify-between mb-12">
      <Heading as="h4" className="mt-2 text-xl font-bold">
        Book List
      </Heading>

      <Filters
        options={[
          { value: "all", label: "All", id: "lws-filterAll" },
          { value: "with-featured", label: "With Featured", id: "lws-filterFeatured" },
          { value: "without-featured", label: "Without Featured", id: "lws-filterWithoutFeatured" },
        ]}
      />
    </div>
  );
}
