import { Outlet } from "react-router-dom";
import Container from "./Container";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
