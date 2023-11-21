import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import { useNavigate } from "react-router-dom";
import {
  LoginOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import Button from "./Button";
import { isEmpty } from "../../lib/helpers";
import { logout } from "../../redux/actions/authActions";
import Login from "../pages/Login/Login";
import { removeAllCartItems } from "../../redux/actions/cartActions";

const headerStyle = {
  backgroundColor: "#002B80",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
};

const welcomeText = {
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 22,
  marginRight: 10,
};
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUserId, user } = useSelector((state) => state.authReducer);
  // const { users } = useSelector((state) => state.userReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  // const user = users?.find((u) => u.id === loggedInUserId);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLoginModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    dispatch(removeAllCartItems());
    dispatch(logout());
    navigate("/");
  };

  const handleNavigation = (page) => {
    if (!isEmpty(loggedInUserId)) {
      navigate(`/${page}`, {
        state: { fromHeader: true },
      });
      return;
    }
    handleLoginModal();
  };

  const items = [
    {
      id: "db1",
      name: "Remo Doorbell"
    },
    {
      id: "db2",
      name: "Remo Doorbell Mini"
    },
    {
      id: "db3",
      name: "Blink Doorbell"
    },
    {
      id: "db4",
      name: "Blink Doorbell Mini"
    },
    {
      id: "db5",
      name: "Ring Doorbell"
    },
    {
      id: "db6",
      name: "Ring Doorbell Mini"
    },
    {
      id: "dl1",
      name: "Door Lock 1"
    },
    {
      id: "dl2",
      name: "Door Lock 2"
    },
    {
      id: "dl3",
      name: "Door Lock 3"
    },
    {
      id: "dl4",
    name: "Door Lock 4"
    },
    {
      id: "dl5",
      name: "Door Lock 5"
    },
    {
      id: "s1",
      name: "Echo Speaker"
    },
    {
      id: "s2",
      name: "Echo nextgen"
    },
    {
      id: "s3",
      name: "Homepod"
    },
    {
      id: "s4",
      name: "Homepod Mini"
    },
    {
      id: "s5",
      name: "nest"
    },
    {
      id: "l1",
    name: "Smart Light"
    },
    {
      id: "l2",
    name: "Smart Light nextgen"
    },
    {
      id: "l3",
    name: "Smart Light Mini"
    },
    {
      id: "l4",
    name: "Smart Light Mini 2"
    },
    {
      id: "t1",
    name: "EchoBees Thermostat"
    },
    {
      id: "t2",
    name: "Nest Thermostat"
    },
    {
      id: "t3",
    name: "Nest Thermostat Mini"
    },
    {
      id: "t4",
    name: "Honeywell Thermostat"
    }
  ]


  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <div style={headerStyle}>
      {!isEmpty(loggedInUserId) ? (
        <>
          <p style={welcomeText}>Hello {user.username}</p>
          <Button
            buttonName="Home"
            onClick={() => handleNavigation("")}
            renderIcon={() => (
              <HomeOutlined style={{ color: "white", paddingRight: 6 }} />
            )}
          />
          <Button
            buttonName="Account"
            onClick={() => handleNavigation("account")}
            renderIcon={() => (
              <UserOutlined style={{ color: "white", paddingRight: 6 }} />
            )}
          />
          <Button
            buttonName="Logout"
            onClick={handleLogout}
            renderIcon={() => (
              <LogoutOutlined style={{ color: "white", paddingRight: 6 }} />
            )}
          />
        </>
      ) : (
        <Button
          buttonName="Login"
          onClick={handleLoginModal}
          renderIcon={() => (
            <LoginOutlined style={{ color: "white", paddingRight: 6 }} />
          )}
        />
      )}
      <div style={{width:400}}>
      <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
          </div>
      <Button
        buttonName={`Cart (${cart?.length})`}
        onClick={() => handleNavigation("cart")}
        renderIcon={() => (
          <ShoppingCartOutlined style={{ color: "white", paddingRight: 6 }} />
        )}
      />
      <Login isOpen={isModalOpen} onClose={handleLoginModal} />
    </div>
  );
};

export default Header;
