import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Books from "./pages/books";
import CreateBook from "./pages/CreateBook";
import UpdateBook from "./pages/UpdateBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to={"books"} />} />
          <Route path="books" element={<Books />} />
          <Route path="books/new" element={<CreateBook />} />
          <Route path="books/update/:id" element={<UpdateBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
