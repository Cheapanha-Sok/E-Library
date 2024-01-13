import { ToastContainer } from "react-toastify";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function AppLayoutAdmin({handleUser}) {
  return (
    <>
    <div className="flex flex-col md:flex-row">
      <SideBar handleUser={handleUser} />
      <main className="w-full">
        <Outlet />
      </main>
      
    </div>
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
