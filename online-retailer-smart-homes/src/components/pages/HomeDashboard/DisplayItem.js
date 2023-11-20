import React from "react";
import { Button } from "../../organisms";

const DisplayItem = ({ item, onClick }) => {
  return (
    <div style={styles.container}>
      {item.name}
      <img src={item?.image} alt={item.name} style={styles.image} />
      <Button
        buttonName="Add to Cart"
        buttonStyles={styles.buttonStyle}
        onClick={() => onClick(item?.id)}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  buttonStyle: {
    backgroundColor: "#002B80",
    paddingTop: 0,
    paddingBottom: 0,
  },
};

export default DisplayItem;
