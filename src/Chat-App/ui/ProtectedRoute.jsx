import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  console.log(user, isLoading);

  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) {
        navigate("/login");
      }
    },
    [navigate, isAuthenticated, isLoading]
  );

  if (isLoading) return <h2>checking Authentication </h2>;

  if (isAuthenticated) return children;
}
