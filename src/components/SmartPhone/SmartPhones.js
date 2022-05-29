import React, { useContext, useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { EshopSpotContext } from "../../App";
import { useParams } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { Button } from "react-bootstrap";

function SmartPhones() {
  let { id } = useParams();
  let context = useContext(EshopSpotContext);

  let [seletedProducts, setSeletedtProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let productData = async () => {
    let res = await axios.get(
      "https://my-products75.herokuapp.com/users/getProductKeyName/" + id
    );
    if (res) {
      setSeletedtProducts(res.data.products);
      setImages(res?.data?.products[0]?.variant[0]?.images);
      setRam(res?.data?.products[0]?.pricesing[0]?.price);
      setChangeImg(res?.data?.products[0]?.variant[0]?.images[0]);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    productData();
  }, []);

  //  changing price and ram
  let [ram, setRam] = useState();
  let PriceAndRam = (p) => {
    setRam(p.price);
  };

  // changes color and images

  let [changeimg, setChangeImg] = useState();
  let [images, setImages] = useState([]);
  // main images
  let hendleChangeImg = (c) => {
    setChangeImg(c);
  };
  // side images
  let sideImgChange = (img) => {
    setImages(img.images);
    setChangeImg(img.images[0]);
  };

  let [price, setPrice] = useState();
  let [color, setColor] = useState();

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
          <div className="container mb-5" style={{ marginTop: "90px" }}>
            {seletedProducts?.map((e, i) => {
              return (
                <div key={i} className="bg-light products">
                  <div className="d-flex flex-row justify-content-around  textarea">
                    <div className="float-left">
                      {images.map((img, i) => {
                        return (
                          <div
                            key={i}
                            className="bg-white text-center p-3 m-2"
                            onClick={() => {
                              hendleChangeImg(img);
                            }}
                          >
                            <img
                              className="side-images"
                              src={img}
                              width="30px"
                              height="60px"
                              alt={e.name}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <div className="mt-5 text-center">
                        <img
                          className="main-image"
                          src={changeimg}
                          height="450px"
                          alt={e.name}
                        />
                      </div>
                      <Button
                        className="btn btn-primary shadow-none mt-2 add-cart-btn"
                        style={{ width: "500px" }}
                        onClick={() => {
                          let print = context.cart.findIndex(
                            (c) => c.name === e.name
                          );
                          if (price && color) {
                            if (print === -1) {
                              e["qty"] = 1;
                              e["price"] = price;
                              e["color"] = color;
                              context.cart.push(e);
                              context.setCartValue(context.cart.length);
                            } else {
                              context.cart[print]["qty"] += 1;
                            }
                          } else {
                            alert("Please select a ram and moblie color");
                          }
                        }}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-center align-items-center mt-4 ml-3 p-4 textarea">
                    <div>
                      <h2 className="headingarea">{e.name}</h2>
                      <p className="h5 p-3">&#8377; {ram}</p>
                      <p>
                        Rating&nbsp;:&nbsp;
                        <span className="text-success pt-1 pb-1 pr-1 pl-2 border border-success rounded">
                          {e.rating}
                          <StarIcon className="pb-1" />
                        </span>
                      </p>
                      <div>
                        <div className="mb-4">
                          <h3>Variant</h3>
                        </div>
                        <div>
                          <div className="products-tv-variant-div  ">
                            {e.variant.map((v, i) => {
                              return (
                                <div key={i}>
                                  <div
                                    className="side-img bg-white  text-center"
                                    onClick={() => {
                                      sideImgChange(v);
                                      setColor(v);
                                    }}
                                  >
                                    <img
                                      src={v.images[0]}
                                      width="40px"
                                      height="60px"
                                      alt={v.color}
                                    />
                                  </div>
                                  <p>{v.color}</p>
                                </div>
                              );
                            })}
                          </div>
                          <div>
                            <h3>Ram & Rom</h3>
                          </div>
                          <div className="products-tv-pricesing-div">
                            {e.pricesing.map((p, i) => {
                              return (
                                <div key={i}>
                                  {p.ram ? (
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      className="mt-3 p-1 shadow-none"
                                      onClick={() => {
                                        PriceAndRam(p);
                                        setPrice(p);
                                      }}
                                    >
                                      {p.ram} {p.rom}
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      className="mt-3 p-1 shadow-none"
                                      onClick={() => {
                                        PriceAndRam(p);
                                        setPrice(p);
                                      }}
                                    >
                                      {p.rom}
                                    </Button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="mt-3">
                          <h3>Specifications</h3>
                          <ul
                            style={{
                              listStyleType: "square",
                              fontSize: "22px",
                            }}
                          >
                            <li>Inch&nbsp;:&nbsp;{e.description.inch}</li>
                            <li>Display&nbsp;:&nbsp;{e.description.display}</li>
                            <li>Camera&nbsp;:&nbsp;{e.description.camera}</li>
                            <li>Battery&nbsp;:&nbsp;{e.description.battery}</li>
                            <li>
                              Processor&nbsp;:&nbsp;{e.description.processor}
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

export default SmartPhones;
