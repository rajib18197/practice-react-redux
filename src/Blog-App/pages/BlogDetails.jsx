import BlogPostDetails from "../features/blogs/BlogPostDetails";
import RelatedBlogs from "../features/blogs/RelatedBolgs";
import MoveHome from "../ui/MoveHome";

export default function BlogDetails() {
  return (
    <>
      <MoveHome />
      <section className="post-page-container">
        <BlogPostDetails />
        <RelatedBlogs />
      </section>
    </>
  );
}
