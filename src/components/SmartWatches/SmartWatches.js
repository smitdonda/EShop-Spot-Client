import React, { useContext, useState, useEffect } from "react";
import { EshopSpotContext } from "../../App";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Header from "../Header";
import axios from "axios";

function SmartWatches() {
  let { id } = useParams();
  let context = useContext(EshopSpotContext);
  const [isLoading, setIsLoading] = useState(true);

  let [seletedProducts, setSeletedtProducts] = useState();
  let [images, setImages] = useState([]);

  let productData = async () => {
    let res = await axios.get(
      "https://e-shop-spot.vercel.app/users/getProductKeyName/" + id
    );
    setSeletedtProducts(res.data.products);
    setImages(res?.data?.products[0]?.variant[0]?.images);
    setChangeImg(res?.data?.products[0]?.variant[0]?.images[0]);
    setIsLoading(false);
  };
  useEffect(() => {
    productData();
  }, []);

  // main images
  let [changeimg, setChangeImg] = useState();
  let hendleChangeImg = (c) => {
    setChangeImg(c);
  };
  // side images
  let sideImgChange = (img) => {
    setImages(img.images);
    setChangeImg(img.images[0]);
  };

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
          <div className="myproducts container">
            {seletedProducts?.map((e, i) => {
              return (
                <div
                  key={i}
                  className="bg-light products d-flex flex-row justify-content-center align-items-center"
                >
                  <div className="d-flex flex-row textarea">
                    <div className="float-left">
                      {images.map((img, i) => {
                        return (
                          <div key={i}>
                            <div
                              className="bg-white text-center p-3 m-2"
                              onClick={() => {
                                hendleChangeImg(img);
                              }}
                            >
                              <img
                                src={img}
                                width="30px"
                                height="35px"
                                className="side-images-watch"
                                alt={e.name}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-center">
                      <img
                        className="main-image-watch"
                        src={changeimg}
                        width="400px"
                        height="350px"
                        alt={e.name}
                      />
                      <br />
                      <button
                        className="btn btn-primary mt-4 add-cart-btn-watch"
                        style={{ width: "500px" }}
                        onClick={() => {
                          let print = context.cart.findIndex(
                            (c) => c.name === e.name
                          );
                          if (color) {
                            if (print === -1) {
                              e["qty"] = 1;
                              e["color"] = color;
                              context.cart.push(e);
                              context.setCartValue(context.cart.length);
                            } else {
                              context.cart[print]["qty"] += 1;
                            }
                          } else {
                            alert("Please Select a Watch color");
                          }
                        }}
                      >
                        Add to Card
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-center align-items-center mt-4 ml-3 p-3 textarea">
                    <div>
                      <h2 className="text-capitalize headingarea">{e.name}</h2>
                      <p className="h5 p-3">&#8377; {e?.pricesing[0]?.price}</p>
                      <p>
                        Rating :&nbsp;
                        <span className="text-success pt-1 pb-1 pr-1 pl-2 border border-success rounded">
                          {e.rating}
                          <StarIcon className="pb-1" />
                        </span>
                      </p>
                      <div>
                        <div className="row m-4">
                          {e?.variant?.map((v, i) => {
                            return (
                              <div key={i} className="col">
                                <div
                                  className="side-img bg-white text-center"
                                  onClick={() => {
                                    sideImgChange(v);
                                    setColor(v);
                                  }}
                                >
                                  <img
                                    src={v.images[0]}
                                    width="50px"
                                    height="60px"
                                    alt={e.name}
                                  />
                                </div>
                                <div>
                                  <p>{v.color}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          <h3>Specifications</h3>
                          <ul
                            style={{
                              listStyleType: "square",
                              fontSize: "22px",
                            }}
                          >
                            <li>Display&nbsp;:&nbsp;{e.description.display}</li>
                            <li>
                              Bttery Run Time&nbsp;:&nbsp;
                              {e.description.batteryruntime}
                            </li>
                            <li>
                              Monitoring&nbsp;:&nbsp;{e.description.monitor}
                            </li>
                            <li>
                              Dispaly Size&nbsp;:&nbsp;
                              {e.description.displaysize}
                            </li>
                            <li>Details&nbsp;:&nbsp;{e.description.details}</li>
                            <li>
                              Sales Package&nbsp;:&nbsp;
                              {e.description.salespackage}
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

export default SmartWatches;
