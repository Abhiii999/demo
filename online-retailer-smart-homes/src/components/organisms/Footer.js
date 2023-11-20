import React from "react";

const footerStyle = {
  textAlign: "center",
  backgroundColor: "#4D88FF",
  color: "#fff",
  position: "absolute",
  bottom: "0",
  width: "100%",
  minHeight: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Footer = () => {
  return <div style={footerStyle}>All rights reserved @ Smart Homes ©2023</div>;
};

export default Footer;
