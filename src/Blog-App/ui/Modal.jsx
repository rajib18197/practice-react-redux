import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "./Button";

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
  const { openName, close } = useContext(ModalContext);
  const ref = useRef();

  useEffect(function () {
    function callback(e) {
      if (!ref.current.contains(e.target)) {
        close();
      }
    }

    document.documentElement.addEventListener("click", callback, {
      capture: true,
    });
    return () =>
      document.documentElement.removeEventListener("click", callback, {
        capture: true,
      });
  }, [close]);

  if (openName !== windowName) return;

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-screen bg-stone-100 opacity-100">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 w-[80rem] p-8 rounded"
        ref={ref}
      >
        <Button
          className="absolute top-2 right-2 px-2 py-0 bg-transparent text-xl"
          onClick={close}
        >
          &times;
        </Button>
        <div>{children}</div>
      </div>
    </div>
  );
}

Modal.Open = Open;
Modal.Window = Window;
