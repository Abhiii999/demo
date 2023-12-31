import React, { useEffect } from "react";
import HomeDashboard from "./components/pages/HomeDashboard/HomeDashboard";
import Cart from "./components/pages/Cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./components/pages/Account/Account";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./lib/helpers";
import Login from "./components/pages/Login/Login";
import Order from "./components/pages/Cart/Order";
import { setProducts } from "./redux/actions/cartActions";




//Reading data from API
const App = () => {
  const { loggedInUserId } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      fetch(`http://localhost:3001/products`)
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        dispatch(setProducts(data));
      })
      .catch(error => {
        // Handle errors, e.g., display an error message
        console.error('Error making POST request:', error.message);
      });

    } catch (error) {
      // Handle the error if needed
    }
  };

  useEffect(() => {
    fetchProducts();

  }, []);


  const renderAuthorizedRouters = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<HomeDashboard />} />
      </Routes>
    </BrowserRouter>
  );

  const renderPublicRouter = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<HomeDashboard />} />
      </Routes>
    </BrowserRouter>
  );

  if (!isEmpty(loggedInUserId)) {
    return renderAuthorizedRouters();
  }

  return renderPublicRouter();
};

export default App;
