import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx"
import ScrolltoTop from "../ScrolltoTop.jsx";
export default function AppLayoutUser() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ScrolltoTop />
    </>
  );
}
