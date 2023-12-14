import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../features/books/booksSlice";

const ToastContext = createContext();

export default function Toast({ children, hasOpen = true }) {
  const [isOpen, setIsOpen] = useState(hasOpen);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(removeToast());
    setIsOpen(false);
  };

  useEffect(
    function () {
      const timer = setTimeout(close, 10000);
      return () => clearTimeout(timer);
    },
    [close]
  );

  return (
    isOpen && (
      <ToastContext.Provider value={{ isOpen, close }}>
        <div className="w-max bg-stone-900 p-3 rounded absolute top-4 left-1/2 -translate-x-[1/2] flex items-center text-white gap-10">
          {children}
        </div>
      </ToastContext.Provider>
    )
  );
}

function Message({ message }) {
  return <h3 className="uppercase">{message}</h3>;
}

function Button({ children }) {
  const { close } = useContext(ToastContext);

  return (
    <button className="text-xl" onClick={close}>
      {children}
    </button>
  );
}

Toast.Message = Message;
Toast.Button = Button;
