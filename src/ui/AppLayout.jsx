import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { getState } from "../features/books/booksSlice";
import { createPortal } from "react-dom";
import Toast from "./Toast";

export default function AppLayout() {
  const { toast } = useSelector(getState);
  console.log(toast);

  return (
    <>
      <Navbar />
      <Outlet />
      {toast.status === "success" &&
        createPortal(
          <Toast>
            <Toast.Message message={toast.message} />
            <Toast.Button>&times;</Toast.Button>
          </Toast>,
          document.body
        )}
    </>
  );
}
