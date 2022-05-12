import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Header from "../Header";
import axios from "axios";
import { Button } from "react-bootstrap";
import { MyproductsContext } from "../../App";

function SmartTv() {
  let { id } = useParams();
  let context = useContext(MyproductsContext);

  //all images
  let [images, setImages] = useState([]);

  let [seletedProducts, setSeletedtProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let productData = async () => {
    let res = await axios.get(
      "https://my-products75.herokuapp.com/users/getProductKeyName/" + id
    );
    if (res) {
      setSeletedtProducts(res.data.products);
      setImages(res?.data?.products[0]?.variant[0]?.images);
      setChangeImg(res?.data?.products[0]?.variant[0]?.images[0]);
      setInch(res?.data?.products[0]?.pricesing[0]?.price);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    productData();
  }, []);

  // change imag and prices
  let [inch, setInch] = useState();
  let [changeimg, setChangeImg] = useState();
  let InchPrice = (p) => {
    setInch(p.price);
  };

  let hendleChangeImage = (i) => {
    setChangeImg(i);
  };

  let [price, setPrice] = useState();

  return (
    <>
      <Header></Header>
      {isLoading ? (
        <>
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="loader text-primary"></div>
          </div>
        </>
      ) : (
        <>
          <div className="myproducts container">
            {seletedProducts?.map((e, i) => {
              return (
                <div key={i} className="bg-light products">
                  <div className="d-flex flex-row justify-content-around align-items-center">
                    <div className="float-left">
                      {images.map((img, i) => {
                        return (
                          <div
                            key={i}
                            className="bg-white side-img-div text-center p-3 m-1"
                            style={{ width: "50px", height: "50px" }}
                          >
                            <img
                              className="side-images-tv"
                              src={img}
                              onClick={() => {
                                hendleChangeImage(img);
                              }}
                              width="50px"
                              height="30px"
                              alt={e.name}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className=" text-center ">
                      <img
                        className="main-image-tv"
                        src={changeimg}
                        width="500px"
                        height="350px"
                        alt={e.name}
                      />
                      <br />
                      <button
                        className="btn btn-primary mt-4 add-cart-btn-tv"
                        style={{ width: "500px" }}
                        onClick={() => {
                          let print = context.cart.findIndex(
                            (c) => c.name === e.name
                          );
                          if (price) {
                            if (print === -1) {
                              e["qty"] = 1;
                              e["price"] = price;
                              context.cart.push(e);
                              context.setCartValue(context.cart.length);
                            } else {
                              context.cart[print]["qty"] += 1;
                            }
                          } else {
                            alert("Please Select a Inch");
                          }
                        }}
                      >
                        Add to Card
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-center align-items-center mt-4 ml-3 mt-4 ml-3 p-4 textarea">
                    <div>
                      <h2 className="headingarea">
                        {e.name}&nbsp;{e.description.display}
                      </h2>
                      <p className="h5 p-2">&#8377;{inch}</p>
                      <p>
                        Rating&nbsp;:&nbsp;
                        <span className="text-success pt-1 pb-1 pr-1 pl-2 border border-success rounded">
                          {e.rating}
                          <StarIcon className="pb-1" />
                        </span>
                      </p>
                      <div>
                        <div>
                          <h3>Inch</h3>
                        </div>
                        <div className="products-tv-pricesing-div mb-4">
                          {e?.pricesing?.map((p, i) => {
                            return (
                              <div key={i}>
                                <div>
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="mt-3 btn shadow-none"
                                    onClick={() => {
                                      InchPrice(p);
                                      setPrice(p);
                                    }}
                                  >
                                    {p.inch}
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-3">
                          <h3>Specifications</h3>
                          <ul
                            style={{
                              listStyleType: "square",
                              fontSize: "22px",
                            }}
                          >
                            <li>
                              Screen Type&nbsp;:&nbsp;{e.description.screentype}
                            </li>
                            {e.description.display ? (
                              <li>
                                Dispaly&nbsp;:&nbsp;{e.description.display}
                              </li>
                            ) : (
                              <></>
                            )}
                            <li>
                              Resolution&nbsp;:&nbsp;{e.description.resolution}
                            </li>
                            <li>
                              Operating System&nbsp;:&nbsp;
                              {e.description.operatingsystem}
                            </li>
                            <li>
                              Sound Output&nbsp;:&nbsp;
                              {e.description.soundoutput}
                            </li>
                            <li>
                              Refresh Rate&nbsp;:&nbsp;
                              {e.description.refreshrate}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default SmartTv;
