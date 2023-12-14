import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ModalContext = createContext();

export default function Modal({uiPosition, children }) {
  const [openName, setOpenName] = useState("");
  const [position, setPosition] = useState({});

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider
      value={{ openName, open, close, position, setPosition, uiPosition }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }) {
  const { open, openName, close, setPosition, uiPosition } = useContext(ModalContext);
  console.log(uiPosition);

  function handleClick(e) {
    e.stopPropagation();

    openName === "" || openName !== opens ? open(opens) : close();
    const targetElement = e.target.closest("button").getBoundingClientRect();
    console.log(targetElement);
    setPosition({
      top: targetElement.top + targetElement.height,
      [uiPosition]: uiPosition === 'left' ? targetElement.left : targetElement.y - targetElement.width,
    });
  }

  return cloneElement(children, { onClick: handleClick });
}

function Window({ windowName, children }) {
  const { openName, close, position, uiPosition } = useContext(ModalContext);
  console.log(uiPosition);
  const refEl = useRef();

  useEffect(
    function () {
      function closeWindow(e) {
        if (refEl.current && !refEl.current.contains(e.target)) {
          console.log("click");
          close();
        }
      }

      document.addEventListener("click", closeWindow);

      return () => document.removeEventListener("click", cloneElement);
    },
    [close]
  );

  if (openName !== windowName) return null;

  return (
    <div
      className={`rounded p-4 bg-rose-600 fixed top-[${position.top}px] ${uiPosition}-[${position[uiPosition]}px] w-[190px]`}
      ref={refEl}
    >
      {cloneElement(children, {onClick: close})}
    </div>
  );
}

Modal.Open = Open;
Modal.Window = Window;
