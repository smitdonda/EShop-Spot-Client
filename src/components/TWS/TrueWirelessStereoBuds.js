import React, { useContext, useState, useEffect } from "react";
import { EshopSpotContext } from "../../App";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Header from "../Header";
import axios from "axios";

function TrueWirelessStereoBuds() {
  let { id } = useParams();
  let context = useContext(EshopSpotContext);

  let [seletedProducts, setSeletedtProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let productData = async () => {
    let res = await axios.get(
      "https://my-products75.herokuapp.com/users/getProductKeyName/" + id
    );
    setSeletedtProducts(res?.data?.products);
    setImages(res?.data?.products[0]?.variant[0]?.images);
    setChangeImg(res?.data?.products[0]?.variant[0]?.images[0]);
    setIsLoading(false);
  };
  useEffect(() => {
    productData();
  },[]);

  let [images, setImages] = useState([]);
  let [changeimg, setChangeImg] = useState();
  // main images
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
                  className="row bg-light d-flex flex-row justify-content-center"
                >
                  <div className="col d-flex flex-row">
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
                              className="side-images-buds"
                              src={img}
                              width="30px"
                              height="30px"
                              alt={e.name}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-5 text-center">
                      <img
                        className="main-image-buds"
                        src={changeimg}
                        width="450px"
                        alt={e.name}
                      />
                      <br />
                      <button
                        className="btn btn-primary mt-2 add-cart-btn-buds"
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
                            alert(
                              "Please select a True Wireless Stereo Buds color"
                            );
                          }
                        }}
                      >
                        Add to Card
                      </button>
                    </div>
                  </div>
                  <div className="col mt-4 ml-3 d-flex flex-row justify-content-center align-items-center textarea p-2">
                    <div>
                      <h2 className="headingarea">{e.name}</h2>
                      <p className="h5 p-3">&#8377; {e?.pricesing[0]?.price}</p>
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
                        <div className="row m-4">
                          {e?.variant?.map((v, i) => {
                            return (
                              <div key={i} className="col">
                                <div
                                  onClick={() => {
                                    sideImgChange(v);
                                    setColor(v);
                                  }}
                                >
                                  <div className="side-img bg-white text-center">
                                    <img
                                      src={v?.images[0]}
                                      width="50px"
                                      height="60px"
                                      alt={v.color}
                                    />
                                  </div>
                                  <div>
                                    <p>{v.color}</p>
                                  </div>
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
                            <li>
                              Bluetooth Version&nbsp;:&nbsp;
                              {e.description.bluetoothversion}
                            </li>
                            <li>
                              Bttery Life&nbsp;:&nbsp;
                              {e.description.btterylife}
                            </li>
                            <li>
                              Charging Time&nbsp;:&nbsp;
                              {e.description.chargingtime}
                            </li>
                            <li>
                              Headphone Type&nbsp;:&nbsp;
                              {e.description.headphonetype}
                            </li>
                            {e.description.asapcharge ? (
                              <li>
                                Asap Charge&nbsp;:&nbsp;
                                {e.description.asapcharge}
                              </li>
                            ) : (
                              <></>
                            )}
                            {e.description.salespackage ? (
                              <li>
                                Sales Package&nbsp;:&nbsp;
                                {e.description.salespackage}
                              </li>
                            ) : (
                              <></>
                            )}
                            {e.description.batterytype ? (
                              <li>
                                Battery Type&nbsp;:&nbsp;
                                {e.description.batterytype}
                              </li>
                            ) : (
                              <></>
                            )}
                            {e.description.batterycapacity ? (
                              <li>
                                Battery Capacity&nbsp;:&nbsp;
                                {e.description.batterycapacity}
                              </li>
                            ) : (
                              <></>
                            )}
                            {e.description.weight ? (
                              <li>Weight&nbsp;:&nbsp;{e.description.weight}</li>
                            ) : (
                              <></>
                            )}
                            {e.description.wirelessrange ? (
                              <li>
                                Wireless Range&nbsp;:&nbsp;
                                {e.description.wirelessrange}
                              </li>
                            ) : (
                              <></>
                            )}
                            {e.description.ipx7 ? (
                              <li>Ipx7&nbsp;:&nbsp;{e.description.ipx7}</li>
                            ) : (
                              <></>
                            )}
                            {e.description.extrabass ? (
                              <li>
                                Extra Bbass&nbsp;:&nbsp;
                                {e.description.extrabass}
                              </li>
                            ) : (
                              <></>
                            )}
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

export default TrueWirelessStereoBuds;
