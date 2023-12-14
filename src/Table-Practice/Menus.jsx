import { createContext, useContext, useState } from "react";

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({});

  const open = setOpenId;
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div>{children}</div>;
}

function Toggle({ cabin }) {
  const { open, close, openId, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    console.log(openId);
    console.log(cabin);
    openId === "" || openId !== cabin ? open(cabin) : close();

    if (!e.target.closest("button")) return;
    console.log(e.target.closest('button'));

    const buttonCoords = e.target.closest("button").getBoundingClientRect();
    console.log(buttonCoords);
    setPosition({
      top: buttonCoords.top + buttonCoords.height,
    //   right: window.innerWidth - buttonCoords.left - buttonCoords.width,
      left: buttonCoords.left,
    });
  }

  return (
    <button onClick={handleClick} className="btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
    </button>
  );
}

function List({ windowCabin, children }) {
  const { position, openId } = useContext(MenusContext);
  if (openId !== windowCabin) return;

  return (
    <div className="list" style={{ top: `${position.top}px`, right: `${position.right}px` }}>
      {children}
    </div>
  );
}

function Button({ children }) {
  return <button style={{width: '100%', display: 'block' }}>{children}</button>;
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
