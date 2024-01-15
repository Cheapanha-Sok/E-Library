import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function AppLayoutAdmin({ handleUser }) {
  return (
    <div className="flex flex-col md:flex-row">
      <SideBar handleUser={handleUser} />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
