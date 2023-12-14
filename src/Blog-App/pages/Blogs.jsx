import AddBlog from "../features/blogs/AddBlog";
import BlogList from "../features/blogs/BlogList";
import BlogOperations from "../features/blogs/BlogOperations";

export default function Blogs() {
  return (
    <div className="flex flex-col gap-8">
      <AddBlog />
      <section className="wrapper">
        <BlogOperations />
        <BlogList />
      </section>
    </div>
  );
}
