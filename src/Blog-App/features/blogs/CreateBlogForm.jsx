import { useState } from "react";
import HighlightsBox from "../../ui/HighlightsBox";
import { useDispatch } from "react-redux";
import { createBlog } from "./blogsSlice";

const tagOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "nodejs", label: "Node JS" },
  { value: "reactjs", label: "React JS" },
  { value: "dsa", label: "Data Structures" },
  { value: "devops", label: "DevOps" },
  { value: "machine-learning", label: "Machine Learning" },
];

export default function CreateBlogForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      createBlog({
        title,
        image,
        description,
        tags,
        likes: 0,
        isSaved: true,
        createdAt: new Date(),
      })
    );
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="false">
      <div class="mb-6">
        <label
          htmlFor="title"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Blog Title
        </label>
        <input
          type="text"
          id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="blog title here"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div class="mb-6">
        <label
          htmlFor="image"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Blog Image
        </label>
        <input
          type="text"
          id="image"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="image"
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div class="mb-6">
        <label
          htmlFor="tags"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Blog Tags
        </label>
        <HighlightsBox options={tagOptions} tags={tags} onChange={setTags} />
      </div>
      <div>
        <label
          htmlFor="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
