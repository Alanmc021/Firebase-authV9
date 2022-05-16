import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ForgotPassword } from "../pages/ForgotPassword"
import { CreateAccount } from "../pages/CreateAccount"

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/Home" element={<PrivateRoutes />}>
            <Route path="/Home" element={<Home />} />
          </Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
