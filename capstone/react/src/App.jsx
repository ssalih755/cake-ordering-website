import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { CakeContext } from "./context/CakeContext";
import { CartContext } from "./context/CartContext";
import AuthService from "./services/AuthService";
import LoginView from "./views/LoginView/LoginView";
import LogoutView from "./views/LogoutView";
import RegisterView from "./views/RegisterView/RegisterView";
import UserProfileView from "./views/UserProfileView/UserProfileView";
import MainNav from "./components/MainNav/MainNav";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeView from "./views/HomeView/HomeView";
import GlobalFooterView from "./views/GlobalFooterView/GlobalFooterView";
import Checkout from "./components/Checkout/Checkout";
import ProductPageView from "./views/ProductPageView/ProductPageView";
import StandardCakeView from "./views/StandardCakeView/StandardCakeView";
import AddCakeView from "./views/AddCakeView/AddCakeView";
import InProcessOrdersView from "./views/InProcessOrdersView/InProcessOrdersView";
import OrderHistoryView from "./views/OrderHistoryView/OrderHistoryView";
import CustomProductPageView from "./views/CustomPageView/CustomProductPageView";
import AddOptionView from "./views/AddOptionView/AddOptionView";
import CartView from "./views/CartView/CartView";
import { CartProvider } from "./context/CartContext";
import axios from "axios";
export default function App() {
  const [user, setUser] = useState(null);
  function handleLogin(userData) {
    setUser(userData);
  }
  function handleLogout() {
    // Remove auth data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Clear auth token from axios
    delete axios.defaults.headers.common["Authorization"];
    // Clear the auth context
    setUser(null);
  }
  // When a user comes back to the app or refreshes the page, check for user/token in local storage and validate it
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      // Set the token in the axios default headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Make API request to ensure token is still valid
      AuthService.getUserProfile(user.id)
        .then((response) => {
          // Token is still valid, act like user just logged in
          handleLogin(response.data);
        })
        .catch(() => {
          // Token is not valid, act lke user just logged out
          handleLogout();
        });
    }
  }, []);
  return (
    <BrowserRouter>
      <div id="app">
        <UserContext.Provider value={user}>
          <CakeContext.Provider value={{}}>
            <CartProvider>
              <MainNav />
              <main id="main-content">
                <Routes>
                  <Route path="/cakes" element={<StandardCakeView />} />
                  <Route path="/" element={<HomeView />} />
                  <Route
                    path="/login"
                    element={<LoginView onLogin={handleLogin} />}
                  />
                  <Route
                    path="/logout"
                    element={<LogoutView onLogout={handleLogout} />}
                  />
                  <Route path="/register" element={<RegisterView />} />
                  <Route
                    path="/userProfile"
                    element={
                      <ProtectedRoute>
                        <UserProfileView />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/cakes/:id" element={<ProductPageView />} />
                  <Route
                    path="/customcake"
                    element={<CustomProductPageView />}
                  />
                  <Route path="/addcake" element={<AddCakeView />} />
                  <Route path="/addOption" element={<AddOptionView />} />
                  <Route
                    path="/toggleCakeAvailability"
                    element={<AddCakeView />}
                  />
                  <Route
                    path="/inprocessOrders"
                    element={<InProcessOrdersView />}
                  />
                  <Route path="/getMyOrders/${id}" element={<OrderHistoryView />} />
                  <Route path="/CartView" element={<CartView />} />
                </Routes>
                <GlobalFooterView />
              </main>
            </CartProvider>
          </CakeContext.Provider>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}