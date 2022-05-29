import React, { useContext, useState } from "react";
import { EshopSpotContext } from "../App";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Header from "./Header";
import { Button } from "react-bootstrap";
import ClearIcon from "@mui/icons-material/Clear";
import PaymentMethod from "./PaymentMethod";

function Cart() {
  let context = useContext(EshopSpotContext);
  let cartPrice = 0;

  let handleDelete = (e) => {
    context.cart.splice(e, 1);
    context.setCartValue(context.cart.length);
  };

  // QTY
  let [value, setValue] = useState(context.cart);
  let [cartQtyValue, setcartQtyValue] = useState();
  let increment = (e) => {
    let index = context.cart.findIndex((c) => c.name === e.name);
    let result = (value[index].qty += 1);
    setcartQtyValue(result);
    context.setCartTotalPrice(cartPrice);
  };

  let decrement = (e) => {
    let index = context.cart.findIndex((c) => c.name === e.name);
    if (value[index].qty > 1) {
      let result = (value[index].qty -= 1);
      setcartQtyValue(result);
      context.setCartTotalPrice(cartPrice);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="myproducts container textarea">
        {context.cart.length > 0 ? (
          <>
            {context.cart.map((e, i) => {
              cartQtyValue
                ? (cartPrice +=
                    Number(e?.price?.price || e?.pricesing[0]?.price) *
                    cartQtyValue)
                : (cartPrice += Number(
                    e?.price?.price || e?.pricesing[0]?.price
                  ));
              return (
                <div
                  key={i}
                  className="row view-products-warp mt-5 p-3 bg-light"
                >
                  <div className="d-flex flex-row justify-content-end ">
                    <Button
                      variant="light"
                      size="lg"
                      className="btn shadow-none"
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      <ClearIcon />
                    </Button>
                  </div>

                  <div className="col d-flex flex-row justify-content-center align-items-center">
                    <Link
                      to={
                        `/smartmobile/` + e.name.replace(/ /g, "").toLowerCase()
                      }
                      className="text-decoration-none text-dark"
                    >
                      <img
                        src={e?.color?.images[0] || e.image}
                        height="300"
                        alt={e.name}
                      />
                    </Link>
                  </div>
                  <div className="col d-flex flex-row justify-content-center align-items-center mt-3">
                    <div>
                      <div>
                        <h4 className="headingarea">
                          {e.name}&nbsp;
                          {e?.color?.color ? e?.color?.color : null}
                        </h4>
                      </div>
                      <div>
                        <p>
                          &#8377;&nbsp;
                          {e?.price?.price || e?.pricesing[0]?.price}
                        </p>
                      </div>

                      <div>
                        {e?.price?.inch ? <p>{e?.price?.inch}</p> : null}
                      </div>
                      <div className="d-flex flex-row ">
                        {e?.price?.ram ? <p>{e?.price.ram}</p> : null}
                        &nbsp;&nbsp;
                        {e?.price?.rom ? <p>{e?.price.rom}</p> : null}
                      </div>

                      <p className="mb-4">
                        Rating&nbsp;:&nbsp;
                        <span className="text-success pt-1 pb-1 pr-1 pl-2 border border-success rounded">
                          {e.rating}
                          <StarIcon className=" pb-1" />
                        </span>
                      </p>
                      <div style={{ display: "flex" }}>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="mr-3 shadow-none"
                          onClick={() => decrement(e)}
                        >
                          <RemoveIcon />
                        </Button>
                        <h5>{e.qty}</h5>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="ml-3 shadow-none"
                          onClick={() => increment(e)}
                        >
                          <AddIcon />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <hr />
            <div className="text-center">
              <div>
                Total Price&nbsp;:&nbsp;
                <span className="title">{cartPrice ? cartPrice : 0}</span>
              </div>
              <PaymentMethod></PaymentMethod>
            </div>
          </>
        ) : (
          <div className="mt-5">
            <div className="text-center ">
              <h3 className="text-danger">Yor Cart is Emty</h3>
              <Link to="/" className="btn btn-primary">
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Cart;
