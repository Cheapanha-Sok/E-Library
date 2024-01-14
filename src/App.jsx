import {
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./index.css";
import { Suspense, lazy, useEffect, useState } from "react";
import Spinner from "./ui/Spinner.jsx";
import { auth, db } from "./firebase.config.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { BookStoreProvider } from "./contexts/Books/BookStoreContext.jsx";
import { OrderProvider } from "./contexts/Order/OrderContext.jsx";
import { UserProvider } from "./contexts/user/UserContext.jsx";
import AppLayoutUser from "./ui/user/AppLayoutUser.jsx"
import AppLayoutAdmin from "./ui/admin/AppLayoutAdmin.jsx"
import { BackUpDataProvider } from "./contexts/BackUpData/BackUpDataContext.jsx";
import BackUpDataList from "./pages/admin/BackUpData/BackUpDataList.jsx";
const Authentication = lazy(() => import("./pages/user/auth/Authentication.jsx"))
const Homepage = lazy(() => import("./pages/user/home/Homepage.jsx"))
const PrivateRoute = lazy(() => import("./pages/user/auth/PrivateRoute.jsx"))
const Cart = lazy(() => import("./pages/user/cart/Cart.jsx"))
const BookUser = lazy(() => import("./pages/user/BookUser/BookUser.jsx"))
const Book = lazy(() => import("./pages/user/book/Book.jsx"))
const Order = lazy(() => import("./pages/user/order/Order.jsx"))
const BookCategories = lazy(() => import("./pages/user/bookCategories/BookCategories.jsx"))
const NotFound = lazy(() => import("./ui/NotFound.jsx"))
const UserProfile = lazy(() => import("./pages/user/user/UserProfile.jsx"))
const ReadBook = lazy(() => import("./pages/user/ReadBook/ReadBook.jsx"))
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"))
const UserList = lazy(() => import("./pages/admin/User/UserList.jsx"))
const BookList = lazy(() => import("./pages/admin/Book/BookList.jsx"))
const OrderList = lazy(() => import("./pages/admin/Order/OrderList.jsx"))

const App = () => {
    const [role, setRole] = useState(null);
    const [name, setName] = useState(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const data = await getDoc(userRef);
                const userData = data.data();
                setRole(userData.role);
                setName(userData.username)
            }
        });
        return () => unsubscribe();
    }, []);
    const handleUser = () => {
        setRole(null);
    };
    return (
        <BookStoreProvider>
            <UserProvider>
                <OrderProvider>
                    <BackUpDataProvider>
                    <Router>
                        <Suspense fallback={<Spinner type="full" />}>
                            <Routes>
                                {role === "admin" || role === "author" ? <Route element={<AppLayoutAdmin handleUser={handleUser} />}>
                                    <Route index element={<Dashboard />} />
                                    <Route path="/books" element={<BookList role={role} name={name} />} />
                                    <Route path="/users" element={<UserList role={role} />} />
                                    <Route path="/orders" element={<OrderList />} />
                                        <Route path="/backUpData" element={<BackUpDataList role={role} name={name} />} />
                                    <Route path="/*" element={<NotFound />} />
                                </Route> : (
                                    <Route element={<AppLayoutUser />}>
                                        <Route index element={<Homepage />} />
                                        <Route path="/authentication" element={<Authentication />} />
                                        <Route path="/account" element={
                                            <PrivateRoute>
                                                <UserProfile />
                                            </PrivateRoute>

                                        } />
                                        <Route path="/cart" element={
                                            <PrivateRoute>
                                                <Cart />
                                            </PrivateRoute>

                                        } />
                                        <Route path="/order" element={
                                            <PrivateRoute>
                                                <Order />
                                            </PrivateRoute>

                                        } />
                                        <Route path="/book/:categories/:id" element={
                                            <Book />

                                        } />
                                        <Route path="/bookCategories" element={
                                            <BookCategories />

                                        } />
                                        <Route path="/userBooks" element={
                                            <PrivateRoute>
                                                <BookUser />
                                            </PrivateRoute>

                                        } />
                                        <Route path="/readBook/:id" element={
                                            <PrivateRoute>
                                                <ReadBook />
                                            </PrivateRoute>

                                        } />
                                        <Route path="/*" element={
                                            <NotFound />
                                        } />
                                    </Route>
                                )
                                }
                            </Routes>
                        </Suspense>
                    </Router>
                    </BackUpDataProvider>
                </OrderProvider>
            </UserProvider>
        </BookStoreProvider>
    );
};
export default App;
