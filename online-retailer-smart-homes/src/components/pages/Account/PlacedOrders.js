

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOrders } from "../../../redux/actions/cartActions";
import apiService from "../../../constants/apiService";

const PlacedOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await apiService.fetchOrders();
        dispatch(setOrders(orders));
      } catch (error) {
        // Handle the error if needed
      }
    };

    // Call the fetch function when the component mounts
    fetchData();
  }, [dispatch]);

  // Your component JSX and the rest of your application code

  return (
    <div>
      {/* Your application content */}
    </div>
  );
};

export default PlacedOrders;
