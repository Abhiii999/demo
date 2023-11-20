import React, { useEffect, useState } from "react";
import { isEmpty } from "../../../lib/helpers";
import { WelcomePage } from "../../organisms";
import DisplayItems from "./DisplayItems";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/cartActions";
import SimpleTemplate from "../../templates/SimpleTemplate";
import { useLocation } from "react-router-dom";



const HomeDashboard = () => {
  const location = useLocation();
  const { fromHeader = false } = location.state || {};

  const dispatch = useDispatch();
  const { selectedCategory: category } = useSelector(
    (state) => state.cartReducer

  );

  const [products, setProducts] = useState([]);

  const { loggedInUserId } = useSelector((state) => state.authReducer);

  const handleCart = (itemId) => {
    const item = products?.find((i) => i.id === itemId);
    if (isEmpty(loggedInUserId)) {
      alert("Please Login, to add items to cart");
      return;
    }
    dispatch(addToCart(item));
  };

  console.log(category);


const fetchProducts = async () => {
    try {
      fetch(`http://localhost:3001/products?category=${category.id}`)
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        setProducts(data);
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

  }, [category]);

  return (
    <SimpleTemplate>
      {isEmpty(category) || fromHeader ? (
        <WelcomePage />
      ) : (
        <DisplayItems category={category} handleCart={handleCart}  requiredProducts={products}/>
      )}
    </SimpleTemplate>
  );
};

export default HomeDashboard;
