import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { EshopSpotContext } from "../../App";
import { Button } from "react-bootstrap";
import Header from "../Header";
import axios from "axios";

function Accessories() {
  let { id } = useParams();
  let context = useContext(EshopSpotContext);
  const [isLoading, setIsLoading] = useState(true);

  // images
  let [image, setImage] = useState([]);
  let [seletedProducts, setSeletedtProducts] = useState();

  let productData = async () => {
    let res = await axios.get(
      "https://eshop-spot75.herokuapp.com/users/getProductKeyName/" + id
    );
    if (res) {
      setSeletedtProducts(res.data.products);
      setImage(res?.data?.products[0]?.variant[0]?.images);
      setChangeImg(res?.data?.products[0]?.variant[0]?.images[0]);
      setIsLoading(false);
    }
  };

  let [changeimg, setChangeImg] = useState();
  let hendleChangeImg = (i) => {
    setChangeImg(i);
  };

  useEffect(() => {
    productData();
  }, []);

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
          <div className="container" style={{ marginTop: "90px" }}>
            {seletedProducts?.map((e, i) => {
              return (
                <div key={i} className="bg-light products">
                  <div className="d-flex flex-row justify-content-around align-items-center ">
                    <div className="float-left">
                      {image.map((img, i) => {
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
                          // width="300px"
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
                          if (print === -1) {
                            e["qty"] = 1;
                            context.cart.push(e);
                            context.setCartValue(context.cart.length);
                          } else {
                            context.cart[print]["qty"] += 1;
                          }
                        }}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-center align-items-center  mt-4 ml-3 p-4 textarea">
                    <div>
                      <h2 className="headingarea">{e.name}</h2>
                      <p className="h5 p-2">&#8377;{e?.pricesing[0]?.price}</p>
                      <p>
                        Rating&nbsp;:&nbsp;
                        <span className="text-success pt-1 pb-1 pr-1 pl-2 border border-success rounded">
                          {e.rating}
                          <StarIcon className="pb-1" />
                        </span>
                      </p>
                      <div className="mt-3">
                        <h3>Specifications</h3>
                        <ul
                          style={{
                            listStyleType: "square",
                            fontSize: "22px",
                          }}
                        >
                          {e.description.brand ? (
                            <li>Brand : {e.description.brand}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.type ? (
                            <li>Type : {e.description.type}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.cabletype ? (
                            <li>Cable Type: {e.description.cabletype}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.color ? (
                            <li>Color : {e.description.color}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.suitablefor ? (
                            <li>Suitablefor : {e.description.suitablefor}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.cablelength ? (
                            <li>Cable Length: {e.description.cablelength}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.material ? (
                            <li>Material : {e.description.material}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.compatiblewith ? (
                            <li>
                              Compatible With : {e.description.compatiblewith}
                            </li>
                          ) : (
                            <></>
                          )}
                          {e.description.width ? (
                            <li>Width : {e.description.width}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.height ? (
                            <li>Height : {e.description.height}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.weight ? (
                            <li>Weight : {e.description.weight}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.modelnumber ? (
                            <li>Model Number : {e.description.modelnumber}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.modelname ? (
                            <li>Model Name: {e.description.modelname}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.powerinput ? (
                            <li>Power Input : {e.description.powerinput}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.poweroutput ? (
                            <li>Power Output : {e.description.poweroutput}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.powerrequirement ? (
                            <li>
                              Power Requirement :{" "}
                              {e.description.powerrequirement}
                            </li>
                          ) : (
                            <></>
                          )}
                          {e.description.outputcurrent ? (
                            <li>
                              Output Current : {e.description.outputcurrent}
                            </li>
                          ) : (
                            <></>
                          )}
                          {e.description.outputwattage ? (
                            <li>
                              Output Wattage: {e.description.outputwattage}
                            </li>
                          ) : (
                            <></>
                          )}
                          {e.description.designedfor ? (
                            <li>Designed For : {e.description.designedfor}</li>
                          ) : (
                            <></>
                          )}
                          {e.description.powersource ? (
                            <li>Power Source: {e.description.powersource}</li>
                          ) : (
                            <></>
                          )}
                        </ul>
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

export default Accessories;
