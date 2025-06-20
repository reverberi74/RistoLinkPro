import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { setTableNumber, setTableNotification } from "./store/slices/tableClientSlice";
import { toast } from "react-toastify"; // se usi react-toastify
import Private from "./layout/Private";
import Public from "./layout/Public";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/private/Home";
import Categories from "./pages/private/Categories";
import Products from "./pages/private/Products";
import Payments from "./pages/private/Payments";
import ConfirmPayment from "./pages/private/ConfirmPayment";
import OrderList from "./pages/private/OrderList";


import Cart from "./pages/private/Cart";
import PublicBusiness from "./layout/PublicBusiness";
import PrivateBusiness from "./layout/PrivateBusiness";
import Reviews from "./pages/dashboard/Reviews";
import LoginBusiness from "./pages/dashboard/LoginBusiness";
import Tables from "./pages/dashboard/Tables";
import Dashboard from "./pages/dashboard/Dashboard";
import OrderCart from "./pages/private/OrderCart";
import CartEmpty from "./pages/private/CartEmpty";

import MenuBusiness from "./pages/dashboard/MenuBusiness";
import PersonalProfile from "./pages/private/PersonalProfile"
import OrderDashboard from "./pages/dashboard/OrderDashboard";


const ProtectRoute = ({ children, role = "user" }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token || !user || role !== user.role)
    return <Navigate to={role === "user" ? "/" : "/business/login"} />;

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const tableNumber = useSelector((state) => state.tableClient.tableNumber);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const table = urlParams.get("table");

    if (table && table !== tableNumber) {
      dispatch(setTableNumber(Number(table)));
      localStorage.setItem("tableNumber", Number(table));
      dispatch(setTableNotification(`Tavolo ${table} selezionato`));

      if (isAuthenticated) {
        toast.success(`Tavolo ${table} impostato correttamente!`);
        navigate("/private/categories");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, dispatch, isAuthenticated, navigate, tableNumber]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Public />}>
          <Route path="" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route
          path="/private"
          element={
            <ProtectRoute>
              <Private />
            </ProtectRoute>
          }
        >
          <Route path="" element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products/:category_id" element={<Products />} />
          <Route path="payments" element={<Payments />} />
          <Route path="cartempty" element={<CartEmpty />} />
          <Route path="confirm-payment" element={<ConfirmPayment />} />
          <Route path="order-cart" element={<OrderCart />} />
          <Route path="cart" element={<Cart />} /> {/* Rotta cart */}
          <Route path="personalprofile" element={<PersonalProfile />} />
          <Route path="orderlist" element={<OrderList />} />

        </Route>
        {/* login per business */}
        <Route path="/business" element={<PublicBusiness />}>
          <Route path="login" element={<LoginBusiness />} />

        </Route>
        {/* Business loggato */}
        <Route
          path="/dashboard"
          element={
            <ProtectRoute role="business">
              <PrivateBusiness />
            </ProtectRoute>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="tables" element={<Tables />} />
          <Route path="orders" element={<OrderDashboard />} />
          <Route path="menu" element={<MenuBusiness />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
