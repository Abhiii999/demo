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
  const { selectedCategory: category, products } = useSelector(
    (state) => state.cartReducer
  );

  const { loggedInUserId } = useSelector((state) => state.authReducer);

  const handleCart = (itemId) => {
    const item = products?.find((i) => i.id === itemId);
    if (isEmpty(loggedInUserId)) {
      alert("Please Login, to add items to cart");
      return;
    }
    dispatch(addToCart(item));
  };


  return (
    <SimpleTemplate>
      {isEmpty(category) || fromHeader ? (
        <WelcomePage />
      ) : (
        <DisplayItems category={category} handleCart={handleCart} />
      )}
    </SimpleTemplate>
  );
};

export default HomeDashboard;
