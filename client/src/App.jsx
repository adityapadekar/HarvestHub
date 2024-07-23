import React from "react";
import Home from "./pages/Home";
import Fruits from "./pages/Fruits";
import Vegetables from "./pages/Vegetables";
import Markets from "./pages/Markets";
import Recomended from "./pages/Recomended";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashBoard from "./pages/Dashboards/AdminDashBoard";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/common/Footer";
import PasswordTemplate from "./components/PasswordTemplate";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import AdminDashboardModerator from "./components/dashboard/AdminDashboard/AdminDashboardModerator";
import AdminDashboardMarket from "./components/dashboard/AdminDashboard/AdminDashboardMarket";
import AdminDashboardProduct from "./components/dashboard/AdminDashboard/AdminDashboardProduct";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailPage from "./pages/DetailPage";
import AddProduct from "./pages/AddProduct";
import AddModerator from "./pages/AddModerator";
import AddMarket from "./pages/AddMarket";
function App() {
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Navbar></Navbar>
                <div className="flex w-full items-center justify-center">
                    <div className="w-full lg:w-[1250px]">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<Login />} />

                            <Route path="/signup" element={<Signup />} />
                            <Route
                                path="/verify-email/:token"
                                element={<VerifyEmailPage />}
                            ></Route>
                            <Route
                                path="/forgot-password"
                                element={<PasswordTemplate />}
                            />
                            <Route
                                path="/reset-password/:token"
                                element={<PasswordTemplate />}
                            />

                            <Route
                                path="/home"
                                element={
                                    <PrivateRoute>
                                        <Home></Home>
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute>
                                        <Profile />
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/admin-dashboard/moderators"
                                element={
                                    <PrivateRoute>
                                        <AdminDashBoard>
                                            <AdminDashboardModerator />
                                        </AdminDashBoard>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/addProduct"
                                element={<AddProduct />}
                            />
                            <Route
                                path="/addModerator"
                                element={<AddModerator />}
                            />
                            <Route
                                path="/addMarket"
                                element={<AddMarket />}
                            />

                            <Route
                                path="/admin-dashboard/markets"
                                element={
                                    <PrivateRoute>
                                        <AdminDashBoard>
                                            <AdminDashboardMarket />
                                        </AdminDashBoard>
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/admin-dashboard/products"
                                element={
                                    <PrivateRoute>
                                        <AdminDashBoard>
                                            <AdminDashboardProduct />
                                        </AdminDashBoard>
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/user-dashboard"
                                element={<PrivateRoute></PrivateRoute>}
                            />

                            <Route
                                path="/moderator-dashboard"
                                element={<PrivateRoute>
                                    
                                </PrivateRoute>}
                            />

                            {/* pages */}
                            <Route
                                path="/vegetables"
                                element={<Vegetables />}
                            />
                            <Route path="/fruits" element={<Fruits />} />
                            <Route path="/markets" element={<Markets />} />
                            <Route
                                path="/recomended"
                                element={<Recomended />}
                            />
                            <Route
                                path="/detail/:id"
                                element={<DetailPage />}
                            />
                        </Routes>
                    </div>
                </div>
                <Footer></Footer>
                <ToastContainer
                    autoClose={3000}
                    position="top-right"
                    closeOnClick
                    pauseOnHover
                    transition:Bounce
                />
            </div>
        </>
    );
}

export default App;
