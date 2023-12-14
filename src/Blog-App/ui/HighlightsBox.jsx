import { useState } from "react";
import Modal from "./Modal";

export default function HighlightsBox({ options, tags, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  // const [tags, setTags] = useState([]);

  function handleClick(e) {
    if (!e.target.closest("div")) return;
    const tag = e.target.closest("div").dataset.value;
    console.log(tag);
    tags.includes(tag)
      ? onChange((prev) => prev.filter((t) => t !== tag))
      : onChange((prev) => [...prev, tag]);
  }

  return (
    <div className="relative bg-stone-300 rounded">
      <div
        className="flex relative items-center gap-4"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <input
          type="text"
          id="tags"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="tags"
          required
          autoComplete="false"
          value={tags}
        />
        <button
          className="bg-none"
          onClick={(e) => {
            e.preventDefault();
            onChange([]);
          }}
        >
          &times;
        </button>
        <p className="w-[2px] self-stretch bg-yellow-700"></p>
        <p className="cursor-pointer w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-red-500 border-r-[6px] border-r-transparent"></p>
      </div>

      {isOpen && (
        <div
          className="absolute top-100 left-0 w-full rounded p-2 z-100 bg-stone-200"
          onClick={handleClick}
        >
          {options.map((option) => (
            <div
              key={option.value}
              data-value={option.value}
              className={`p-1 cursor-pointer ${
                tags.includes(option.value) ? "bg-rose-400" : "bg-rose-300"
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
