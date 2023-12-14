import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./styles.css";
import AppLayout from "./ui/AppLayout";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: '/',
        element: <Navigate to={"products"} />,
      },
      {
        path: "products",
        element: <Products />,
      },

      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
