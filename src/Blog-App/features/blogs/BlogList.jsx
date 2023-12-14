import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, getBlogsState } from "./blogsSlice";
import { useEffect } from "react";
import BlogItem from "./BlogItem";
import { useGetUrl } from "../../hooks/useUrl";
import Pagination from "../../ui/Pagination";

export default function BlogList() {
  const { blogs, length, isBlogsLoading, isBlogsError, blogsError } =
    useSelector(getBlogsState);
  //   console.log(blogs);
  const dispatch = useDispatch();

  const filterValue = useGetUrl("filter");
  let filter;
  if (!filterValue || filterValue === "all") filter = null;
  if (filterValue === "saved") filter = { field: "isSaved", value: true };
  if (filterValue === "not-saved") filter = { field: "isSaved", value: false };

  const sortByRaw = useGetUrl("sortBy");
  console.log(sortByRaw);
  const [field, direction] = sortByRaw?.split("-") ?? [];
  let sortBy;
  if (field === "most_liked") sortBy = { field: "likes", direction };
  if (field === "newest") sortBy = { field: "createdAt", direction };
  if (field === "default" || !field) sortBy = null;

  const page = Number(useGetUrl("page")) || 1;
  console.log(page);

  //   console.log(sortBy);
  //   console.log(filter);

  useEffect(
    function () {
      dispatch(fetchBlogs({ sortBy, filter, page }));
    },
    [
      dispatch,
      sortBy?.direction,
      sortBy?.field,
      filter?.field,
      filter?.value,
      page,
    ]
  );

  return (
    <main className="flex flex-col gap-6" id="lws-postContainer">
      <div className="post-container">
        {isBlogsLoading && <h2>Loading</h2>}
        {!isBlogsLoading && isBlogsError && (
          <h2>
            {blogsError ||
              "Error occured while fetching blogs. please try again later!"}
          </h2>
        )}
        {!isBlogsLoading && !isBlogsError && blogs.length === 0 && (
          <h2>No Blogs Found at this moment. Please try later!</h2>
        )}

        {!isBlogsLoading &&
          !isBlogsError &&
          blogs.length > 0 &&
          blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)}
      </div>
      <div>
        {!isBlogsLoading && !isBlogsError && blogs.length > 0 && length > 1 && (
          <Pagination count={length} />
        )}
      </div>
    </main>
  );
}
