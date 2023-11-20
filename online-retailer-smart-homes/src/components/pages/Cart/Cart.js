import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SimpleTemplate from "../../templates/SimpleTemplate";
import { Button } from "../../organisms";
import { removeFromCart } from "../../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import DisplayCartItem from "./DisplayCartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cartReducer);
  
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
    alert(`Removed Item from cart ${itemId}`);
  };

  const handleCheckout = () => {
    navigate("/order");
  };

  return (
    <SimpleTemplate>
      <h2 style={styles.title}>Cart</h2>
      <div style={styles.divider} />
      {cart?.length ? (
        <div>
          {cart.map((item) => (
            <DisplayCartItem
              item={item}
              handleRemoveItem={handleRemoveItem}
              showRemoveButton
            />
          ))}
          <div style={{ textAlign: "-webkit-center" }}>
            <Button
              buttonName="Checkout"
              buttonStyles={styles.buttonStyle}
              onClick={handleCheckout}
            />
          </div>
        </div>
      ) : (
        <h2 style={styles.title}>No items in cart</h2>
      )}
    </SimpleTemplate>
  );
};

const styles = {
  title: {
    color: "#002B80",
    paddingLeft: 40,
  },
  divider: {
    backgroundColor: "black",
    height: 2,
  },
  buttonStyle: {
    backgroundColor: "#002B80",
    marginBottom: 20,
  },
};

export default Cart;
