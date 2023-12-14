import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "./Button";
import { createPortal } from "react-dom";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ windowName, children }) {
  const { openName, open, close } = useContext(ModalContext);
  const refEl = useRef();

  useEffect(
    function () {
      function callBack(e) {
        if (refEl.current && !refEl.current.contains(e.target)) {
          close();
        }
      }
      document.addEventListener("click", callBack, true);
      return () => {
        document.removeEventListener("click", callBack, true);
      };
    },
    [close]
  );
  if (windowName !== openName) return null;
  console.log(openName);

  return createPortal(
    <div className="fixed top-0 left-0 bg-stone-900 w-100 h-100 z-50">
      <div
        className="fixed top-1/2 left-1/2 p-3 transform -translate-x-1/2 -translate-y-1/2 rounded bg-stone-800 z-50"
        ref={refEl}
      >
        <button
          className="absolute top-2 right-2 px-4 py-2 w-max bg-blue-600 text-stone-100 rounded"
          onClick={close}
        >
          &times;
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
