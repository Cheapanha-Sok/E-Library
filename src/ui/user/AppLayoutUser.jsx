import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer.jsx"
import ScrolltoTop from "../ScrolltoTop.jsx";
import { ToastContainer } from "react-toastify";
export default function AppLayoutUser() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ScrolltoTop />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
