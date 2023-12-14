import RelatedBlogItem from "./RelatedBlogItem";

export default function RelatedBlogs() {
  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
        Related Posts
      </h4>
      <div className="space-y-4 related-post-container">
        <RelatedBlogItem />
      </div>
    </aside>
  );
}
