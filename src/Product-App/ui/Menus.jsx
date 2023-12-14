import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openName, setOpenName] = useState("");
  const [position, setPosition] = useState({});

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <MenusContext.Provider
      value={{ openName, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return (
    <div className="bg-stone-200 p-[.5rem] rounded hover:bg-stone-300">
      {children}
    </div>
  );
}

function Toggle({ opens }) {
  const { openName, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    // open(prev => prev === '' ? opens : '')
    const target = e.target.closest("div");
    const element = target.getBoundingClientRect();
    // console.log(target);
    // console.log(element);

    setPosition({ top: element.top + element.height, left: element.left });
    openName === "" || openName !== opens ? open(opens) : close();
  }

  return (
    <span role="button" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
    </span>
  );
}

function List({ windowName, children}) {
  const { openName, close, position } = useContext(MenusContext);
  const refEl = useRef();

  useEffect(
    function () {
      function callback(e) {
        // console.log(refEl);
        if (refEl.current && !refEl.current.contains(e.target)) {
          //   console.log("click");
          close();
        }
      }

      document.addEventListener("click", callback);
      //   console.log(1);
      return () => {
        // console.log(2);
        document.removeEventListener("click", callback);
      };
    },
    [close]
  );

  if (windowName !== openName) return null;
  //   console.log(3);
  return (
    <ul
      className={`p-2 w-36 bg-stone-900 text-stone-100 rounded flex flex-col gap-2 fixed top-[${position.top}px] left-[${position.left}px]`}
      ref={refEl}
    >
      {children}
    </ul>
  );
}

function Button({ onClick, children }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    console.log(11);
    onClick?.();
    close();
  }

  return (
    <button
      className="px-4 py-2 w-full bg-blue-600 text-stone-100 rounded"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
