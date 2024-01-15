import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../services/user.api";
import logout from "../../asset/svg/logout.svg"
import { useState, useEffect, useRef } from "react";
import logo from "../../asset/image/LogoBgWhite.png"
import bookIcon from "../../asset/svg/bookIcon.svg"
import users from "../../asset/svg/users.svg"
import shoppingCart from "../../asset/svg/shopping.svg"
import sideBarIcon from "../../asset/svg/side_bar.svg"
import chartIcon from "../../asset/svg/chart.svg"
import restore from "../../asset/svg/getDataBack.svg"


function SideBar({ handleUser }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLogOut = async () => {
        const response = await logOut();
        if (response) {
            handleUser()
            navigate("/");
        }
    };

    return (
        <>
            <button
                onClick={handleToggle}
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg
        sm:hidden"
            >
                <span className="sr-only">Toggle sidebar</span>
                <img src={sideBarIcon} alt="sideBarIcon" className="w-5" />
            </button>

            <aside
                ref={sidebarRef}
                className={`fixed md:sticky h-screen top-0 left-0 z-20 w-40 md:w-64 transition-transform text-xs md:text-lg ${isOpen ? "md:block" : "hidden md:block"
                    }`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#283d50]">
                    <div className="flex justify-center md:py-5">
                        <Link to="/">
                            <img src={logo} alt="logo" className="w-[50px] md:w-[100px]" />
                        </Link>
                    </div>

                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <img src={chartIcon} alt="chartIcon" className="w-5 h-5" />
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/books"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <img src={bookIcon} alt="bookIcon" className="w-5 h-5" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Books</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/users"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <img src={users} alt="bookIcon" className="w-5 h-5" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/orders"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <img src={shoppingCart} alt="bookIcon" className="w-5 h-5" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/backUpData"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <img src={restore} alt="RestoreIcon" className="w-5 h-5" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Back Up Data</span>
                            </Link>
                        </li>
                        <button
                            onClick={handleLogOut}
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                            <img src={logout} alt="logOut" className="h-5 w-5" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                        </button>
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
