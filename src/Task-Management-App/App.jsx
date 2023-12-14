import './styles/styles.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import AddTaskForm from "./pages/AddTaskForm";
import UpdateTaskForm from "./pages/UpdateTaskForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="add-task" element={<AddTaskForm />} />
          <Route path="update-task/:id" element={<UpdateTaskForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
