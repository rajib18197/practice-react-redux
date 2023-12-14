import { Link } from "react-router-dom";

export default function BlogItem({ blog }) {
  const { id, title, description, image, tags, likes, isSaved, createdAt } =
    blog;
  return (
    <div className="lws-card">
      <Link to={`${id}`}>
        <img src={image} className="lws-card-image" alt={title} />
      </Link>
      <div className="p-4">
        <div className="lws-card-header">
          <p className="lws-publishedDate">{createdAt}</p>
          <p className="lws-likeCount">
            <i className="fa-regular fa-thumbs-up"></i>
            {likes}
          </p>
        </div>
        <Link to={id} className="lws-postTitle">
          {title}
        </Link>
        <div className="lws-tags">
          {tags.map((tag) => (
            <span key={tag}>#${tag}</span>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <span className="lws-badge"> {isSaved ? "saved" : "save"} </span>
        </div>
      </div>
    </div>
  );
}
