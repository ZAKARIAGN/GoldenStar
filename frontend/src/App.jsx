import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./Context/ContextProvider";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./Layout/adminLayout";
// import Dashboard from "./Pages/admin/DashboardAdmin/Dashboard";
// import Products from "./Pages/admin/ProductsAdmin/Products";
// import Reservations from "./Pages/admin/ReservationAdmin/Reservations";
// import Orders from "./Pages/admin/OrdersAmdin/Orders";
// import Home from "./Pages/user/Home/Home";
// import Menu from "./Pages/user/Menu/Menu";
// import About from "./Pages/user/About/About";
// import Reservation from "./Pages/user/Reservations/Reservation";
// import Contact from "./Pages/user/Contact/Contact";
// import UserLayout from "./Layout/UserLayout";
// import ReservationHestory from "./Pages/user/Reservations/ReservationHestory";
// import ShowDish from "./Pages/user/Menu/showDish";
// import Order from "./Pages/user/Orders/Order";
// import MyOrders from "./Pages/user/Orders/MyOrders";
import Authentification from "./Authentification/Pages/Authentification";
import Dashboard from "./admin/Dashboard/Dashboard";
import Menu from "./admin/Menu/Pages/Menu";
import AddToMenuForm from "./admin/Menu/Pages/AddToMenuForm";
import FullMenu from "./admin/Menu/Pages/FullMenu";
import UpdateMenuForm from "./admin/Menu/Pages/UpdateMenuForm";
import Combos from "./admin/Combos/Pages/Combos";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ContextProvider>
          <ToastContainer />
          <Routes>
            <Route path="/auth" element={<Authentification />} />
            <Route path="/" element={<Navigate to="/auth" />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/add-item" element={<AddToMenuForm />} />
              <Route path="menu/update-item/:id" element={<UpdateMenuForm/>}/>
              <Route path="menu/full-menu" element={<FullMenu/>}/>
              <Route path="combos" element={<Combos />} />
            {/*   <Route path="orders" element={<Orders />} />

              <Route path="reservations" element={<Reservations />} /> */}
            </Route>
{/* 
            <Route path="/user" element={<UserLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="showDish/:id" element={<ShowDish />} />
              <Route path="about" element={<About />} />
              <Route path="reservation" element={<Reservation />} />
              <Route path="contact" element={<Contact />} />
              <Route
                path="reservation-history"
                element={<ReservationHestory />}
              />
              <Route path="placeOrder" element={<Order />} />
              <Route path="my-orders" element={<MyOrders />} />
            </Route> */}
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
