import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateDiaryName } from "../features/diary/diarySlice";

export default function InputBox({ onClick }) {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();

  function debounce(fn, delay) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  function updateName(value) {
    console.log(value);
    setValue(value);
    dispatch(updateDiaryName(value));
  }

  const handleChange = debounce(updateName, 0);

  useEffect(function () {
    inputRef.current.focus();
  }, []);

  return (
    <div className="w-100">
      <input
        type="text"
        ref={inputRef}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onKeyUp={(e) => (e.key === "Enter" ? onClick() : "")}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </div>
  );
}

// React and the community, libraries, and patterns that surround it are very much a reaction (pun intended) to some of the most frustrating and prevalent issues that plague JavaScript applications as they grow in size and complexity. JavaScript was not designed for creating large applications; it was designed, famously, in just 10 days as a scripting language to add a modicum of interactivity to lifeless web pages.

// Chief among these concerns is the unpredictability that comes with shared mutable state. Historically, passing around JavaScript objects that represent the application's state to different views and controllers has been common practice. The ease with which those objects can be mutated by a rogue view, wisdom notwithstanding, can lead to hard-to-diagnose bugs, especially as applications and teams grow.

// The foundational building block in a React application is the component, which is a declarative description of some visual feature on the page, such as a form or a menu. The declarative nature of components promotes predictability: given some set of external inputs (properties), the output is well defined and deterministic.

// React also aims to combat one of the hurdles to writing efficient applications: the Document Object Model (DOM) is notoriously slow. If changes to the DOM are relatively infrequent, this may not be a problem, but in a complex application the time it takes to alter and redraw the DOM can add up. This is especially true for applications that take a declarative approach as React does, which necessitates re-rendering whenever the application's state changes.

// The solution proposed by the React framework is to keep a representation of the DOM in memory, called a virtual DOM, and make all alterations there. Once the alterations have been made in memory, React can apply the minimum number of changes necessary to reconcile the real DOM with the virtual DOM. This also can allow quickly successive changes to be batched for greater efficiency. Taking this approach can lead to great gains in performance that can be noticed by end users.

// In addition to solving some of the common problems faced when creating JavaScript applications, React components are modular and emphasize composition over inheritance, which makes code immensely reusable and testable. Additionally, a React component often has rendering logic, markup declaration, and even styles in the same file, which promotes the portability of code and the ability to write shared libraries of components.

// Perhaps the most compelling reason to use React and React Native is the astounding amount of community adoption that has taken place in the last two years. People are excited about this technology, and rightly so; it is a novel approach to developing frontend applications that is, by most accounts, accelerating the development time on teams that choose to adopt it. With React Native, the idealistic promise of learn once, write anywhere is becoming more and more viable