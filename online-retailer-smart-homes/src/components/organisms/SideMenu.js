import React from "react";
import { categories } from "../../constants";

const SideMenu = ({ handleNavigation = () => {} }) => {
  return (
    <div style={styles.container}>
      {categories?.map((category) => (
        <div
          key={category.id}
          onClick={() => handleNavigation(category)}
          style={styles.categoryContainer}
        >
          <p>{category.label}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: "15%",
    alignSelf: "center",
  },
  categoryContainer: {
    backgroundColor: "#99CCFF",
    textAlign: "center",
    borderRadius: 12,
    padding: 5,
    margin: 20,
  },
};

export default SideMenu;
