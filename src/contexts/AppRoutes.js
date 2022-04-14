import React from "react";
import { AuthProvider } from "./AuthContext";
import Signup from "../components/authentication/SignUp";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import App from "../App";
import LogIn from "../components/authentication/LogIn";
import { PrivateRoute, PublicRoute } from "./PrivateRoute";
import ForgotPassword from "../components/authentication/ForgotPassword";
import ResetProfile from "../components/authentication/ResetProfile";
// import Modules from "../components/payments/Modules";
// import Stripe from "../components/payments/Stripe";
// import ContactUs from "../components/payments/ContactUs";

const AppRoutes = () => {
  //! DISABLE RIGHT CLICK
  // window.addEventListener("contextmenu", e => e.preventDefault());

  return (
    <div
      className="d-flex align-items-center justify-content-center user-select-none"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<App />} />
              </Route>
              <Route path="/signup" element={<PublicRoute />}>
                <Route path="/signup" element={<Signup />} />
              </Route>
              {/* <Route path="/module" element={<PrivateRoute />}>
                <Route path="/module" element={<Modules />} />
              </Route>
              <Route path="/contact-us" element={<PrivateRoute />}>
                <Route path="/contact-us" element={<ContactUs />} />
              </Route>
              <Route path="/payment" element={<PrivateRoute />}>
                <Route path="/payment" element={<Stripe />} />
              </Route>

              <Route path="/stripe" element={<PrivateRoute />}>
                <Route path="/stripe" element={<Stripe />} />
              </Route> */}

              <Route path="/login" element={<PublicRoute />}>
                <Route path="/login" element={<LogIn />} />
              </Route>
              <Route path="/forgot-password" element={<PublicRoute />}>
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
              <Route path="/reset-profile" element={<PublicRoute />}>
                <Route path="/reset-profile" element={<ResetProfile />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
};

export default AppRoutes;
