import React, { useState } from "react";
import SimpleTemplate from "../../templates/SimpleTemplate";
import { useDispatch, useSelector } from "react-redux";
import DisplayCartItem from "./DisplayCartItem";
import { Button } from "../../organisms";
import {
  placeOrder,
  removeAllCartItems,
} from "../../../redux/actions/cartActions";

const Order = () => {
  const dispatch = useDispatch();
  const { loggedInUserId, user } = useSelector((state) => state.authReducer);
  // const { users } = useSelector((state) => state.userReducer);
  const { cart, currentOrderId } = useSelector((state) => state.cartReducer);
  // const user = users?.find((u) => u.id === loggedInUserId);
  const totalCount = cart.reduce((sum, product) => sum + product.price, 0);
  const itemsToOrder = cart.reduce(
    (itemNames, product) => itemNames + "\n" + product.name,
    ""
  );
  const [orderDetails, setOrderDetails] = useState({
    deliveryAction: "In Store Pickup",
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);


  const handleOrder = () => {
    setIsOrderPlaced(true);
    setOrderDetails({ ...orderDetails, id: currentOrderId + 1 });
    dispatch(removeAllCartItems());

    const customerOrder = {
      // orderId : currentOrderId + 1,
      userName : user.username,
      orderName : itemsToOrder,
      orderprice : totalCount,
      deliveryAction : orderDetails.deliveryAction,
      orderedDate : new Date(),
      creditCardNo : orderDetails.creditNo,
    };

    // dispatch(
    //   placeOrder({
    //     ...orderDetails,
    //     id: currentOrderId + 1,
    //     userId: user.id,
    //     total: totalCount,
    //     userName: user.username,
    //     orderedDate: new Date(),
    //     items: itemsToOrder,
    //   })
    // );  
    handleCustomerOrder(customerOrder);
    };
  

  const handleCustomerOrder = (customerOrder) => {
    
    fetch('http://localhost:3001/order', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
  
      },
      body: JSON.stringify(customerOrder),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response, e.g., update state or perform other actions
        console.log('Response from server:', data);
      })
      .catch(error => {
        // Handle errors, e.g., display an error message
        console.error('Error making POST request:', error.message);
      });
  };
  //Api call to store customer order details


  return (
    <SimpleTemplate>
      <h2 style={styles.title}>Place Order</h2>
      <div style={styles.divider} />

      {isOrderPlaced ? (
        <>
          <h2 style={styles.title}>Your Order is placed</h2>
          <p style={{ paddingLeft: 40 }}>
            Your Order is on its way, you will receive it
            in 3 days of time
          </p>
        </>
      ) : (
        <>
          <div style={styles.form}>
            <div style={styles.formItem}>
              <label htmlFor="username" style={styles.label}>
                Username:
              </label>
              <input
                style={styles.input(true)}
                type="text"
                value={user.username}
                readOnly
              />
            </div>
            <p style={{ margin: 0, marginBottom: 10 }}>Products Purchased: </p>
            {cart.map((item) => (
              <DisplayCartItem
                item={item}
                containerStyles={styles.itemContainer}
              />
            ))}
            <div style={styles.formItem}>
              <label htmlFor="total" style={styles.label}>
                Total Order Count:
              </label>
              <input
                style={styles.input(true)}
                type="text"
                value={totalCount}
                readOnly
              />
            </div>
            <div style={styles.formItem}>
              <label htmlFor="creditNo" style={styles.label}>
                Credit Card / Account Number:{" "}
              </label>
              <input
                type="text"
                value={orderDetails?.creditNo}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, creditNo: e.target.value })
                }
                required
              />
            </div>
            <div style={styles.formItem}>
              <label htmlFor="delivery-action" style={styles.label}>
                Delivery Action:{" "}
              </label>
              <select
                id="type"
                value={orderDetails?.deliveryAction}
                onChange={(e) =>
                  setOrderDetails({
                    ...orderDetails,
                    deliveryAction: e.target.value,
                  })
                }
                required
              >
                <option value="in-store-pickup">In Store Pickup</option>
                <option value="home-delivery">Home Delivery</option>
              </select>
            </div>
            <p style={{ margin: 0, marginBottom: 10 }}>
              Customer Address: [Address not required for In Store Pickup]
            </p>
            <div style={styles.formItem}>
              <label htmlFor="delivery-action" style={styles.label}>
                ZipCode:{" "}
              </label>
              <select
                id="type"
                value={orderDetails?.address?.zipcode}
                onChange={(e) =>
                  setOrderDetails({
                    ...orderDetails,
                    address: {
                      ...orderDetails?.address,
                      zipcode: e.target.value,
                    },
                  })
                }
                required
              >
                <option value="24356">24356</option>
                <option value="45678">45678</option>
                <option value="78908">78908</option>
                <option value="56789">56789</option>
              </select>
            </div>
            <div style={styles.formItem}>
              <label htmlFor="street" style={styles.label}>
                Street:{" "}
              </label>
              <input
                type="text"
                value={orderDetails?.address?.street}
                onChange={(e) =>
                  setOrderDetails({
                    ...orderDetails,
                    address: {
                      ...orderDetails?.address,
                      street: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div style={styles.formItem}>
              <label htmlFor="city" style={styles.label}>
                City:{" "}
              </label>
              <input
                type="text"
                value={orderDetails?.address?.city}
                onChange={(e) =>
                  setOrderDetails({
                    ...orderDetails,
                    address: { ...orderDetails?.address, city: e.target.value },
                  })
                }
              />
            </div>
            <div style={styles.formItem}>
              <label htmlFor="state" style={styles.label}>
                State:{" "}
              </label>
              <input
                type="text"
                value={orderDetails?.address?.state}
                onChange={(e) =>
                  setOrderDetails({
                    ...orderDetails,
                    address: {
                      ...orderDetails?.address,
                      state: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div style={{ textAlign: "-webkit-center" }}>
            <Button
              buttonName="Place Order"
              buttonStyles={styles.buttonStyle}
              onClick={handleOrder}
            />
          </div>
        </>
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
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    width: "20%",
  },
  input: (isFixed) => ({
    ...(isFixed
      ? {
          borderWidth: 0,
          paddingTop: 20,
          fontSize: 16,
          marginLeft: 10,
        }
      : {
          paddingTop: 20,
        }),
  }),
  itemContainer: {
    margin: 2,
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
};

export default Order;
