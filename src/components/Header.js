import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { MyproductsContext } from "../App";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  let context = useContext(MyproductsContext);
  let navigate = useNavigate();

  // logOut
  var token = sessionStorage.getItem("token");
  let logOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navbar fixed="top" expand="lg" variant="dark" className="bg-primary p-2">
        <Navbar.Brand
          className="text-white headingarea text-wrap"
          onClick={() => navigate("/")}
        >
          <h2 className="name">My Products</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link
                className="text-white shadow-none"
                onClick={() => navigate("/cart")}
              >
                <ShoppingBasketIcon style={{ fontSize: "26px" }} />
                {context.cartValue > 0 ? (
                  <>
                    <sup
                      className="badge badge-danger rounded-circle badge-pill"
                      style={{ fontSize: "11px" }}
                    >
                      {context.cartValue}
                    </sup>
                  </>
                ) : null}
              </Nav.Link>
            </Nav.Item>
            {token ? (
              <>
                <Nav.Item className="textarea">
                  <Nav.Link
                    className="text-white shadow-none"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logout&nbsp;
                    <LogoutIcon />
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item href="/login" className="text-white ">
                  <LoginIcon />
                  &nbsp;Login
                </Nav.Item>
                <Nav.Item className="textarea">
                  <Nav.Link
                    onClick={() => navigate("/signup")}
                    className="text-white"
                  >
                    SignUp
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
