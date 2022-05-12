import React, { Fragment, useState, useEffect } from "react";
import { Button, Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function Home() {
  let navigate = useNavigate();
  // Loader
  const [isLoading, setIsLoading] = useState(true);

  // Phone api limit(4)
  let [mobile, setMobile] = useState();
  let [smartMobileBrandName, setSmartMobileBrandName] = useState();
  let mobileData = async () => {
    let res = await axios.get(
      "https://my-products75.herokuapp.com/users/getsmartmobile"
    );
    setMobile(res.data.products);
    setSmartMobileBrandName(res.data.products[0].brandname);
    setIsLoading(false);
  };
  // TV api limit(4)
  let [tv, setTv] = useState();
  let [tvBrandName, setTvBrandName] = useState();
  let tvData = async () => {
    let res = await axios.get(
      "https://my-products75.herokuapp.com/users/getsmarttv"
    );
    setTv(res.data.products);
    setTvBrandName(res.data.products[0].brandname);
    setIsLoading(false);
  };
  // TWS api limit(4)
  let [tws, setTws] = useState();
  let [twsBrandName, setTwsBrandName] = useState();
  let twsData = async () => {
    let res = await axios.get(
      "https://my-products75.herokuapp.com/users/gettws"
    );
    setTws(res.data.products);
    setTwsBrandName(res?.data?.products[0]?.brandname);
    setIsLoading(false);
  };
  // Watch api limit(4)
  let [watch, setWatch] = useState();
  let [watchBrand, setWatchBrandName] = useState();
  let smartWatchData = async () => {
    let res = await axios.get(
      "https://my-products75.herokuapp.com/users/getwatch"
    );
    setWatch(res.data.products);
    setWatchBrandName(res?.data?.products[0]?.brandname);
    setIsLoading(false);
  };
  // Accessories api limit(4)
  let [accessories, setAccessories] = useState();
  let [acBrandName, setAcBrandName] = useState();
  let accessoriesData = async () => {
    let res = await axios.get(
      "https://my-products75.herokuapp.com/users/getaccessories"
    );
    setAccessories(res.data.products);
    setAcBrandName(res?.data?.products[0]?.brandname);
    setIsLoading(false);
  };



  // check token or not (authentication)
  let chackAuth = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let config = {
        headers: {
          token: token,
        },
      };
      let res = await axios.post(
        "https://my-products75.herokuapp.com/users/auth",
        { purpose: "vaildate access" },
        config
      );
      if (res.data.statusCode !== 200) {
        sessionStorage.clear();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    mobileData();
    tvData();
    twsData();
    smartWatchData();
    accessoriesData();
    chackAuth();
  }, []);

  

  return (
    <>
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
          <div className="myproducts container mb-5 ">
            <Carousel fade className="text-center">
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://assets1.ignimgs.com/2020/03/20/smart-watches-1584721162702_160w.jpg?width=1680"
                  alt="smart watches"
                  width="100%"
                  height="500px"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/VD-Banner_1_2048x.jpg?v=1644481220"
                  alt="Accessories"
                  width="100%"
                  height="500px"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://www.91-cdn.com/hub/wp-content/uploads/2021/07/top_upcoming_phones_august_featured.jpg"
                  alt="TV"
                  width="100%"
                  height="500px"
                />
              </Carousel.Item>
            </Carousel>
            <div className="textarea">
              {/* smart Phone */}
              <div className="mt-5 bg-light">
                <div className="p-3">
                  <Link
                    to={
                      `/products/` +
                      smartMobileBrandName?.replace(/ /g, "")?.toLowerCase()
                    }
                    className="text-decoration-none text-dark d-flex flex-row"
                  >
                    <h3 className="headingarea">{smartMobileBrandName}</h3>
                    <div className="ml-auto">
                      <Button className="btn btn-primary viewall">
                        View All
                      </Button>
                    </div>
                  </Link>
                  <hr />
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center row">
                  {mobile?.map((e, i) => {
                    return (
                      <Fragment key={i}>
                        <div className="p-4 col d-flex flex-row justify-content-center align-items-center">
                          <div className=" p-4 text-center">
                            <Link
                              to={
                                "/" +
                                e.keybrandname +
                                "/" +
                                e.name.replace(/ /g, "").toLowerCase()
                              }
                              className="text-decoration-none"
                            >
                              <div>
                                <img
                                  src={e.image}
                                  alt={e.name}
                                  height="230px"
                                />
                                <h5 className="mt-4 text-dark">{e.name}</h5>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
              {/* Tv */}
              <div className="mt-5 bg-light">
                <div className="p-3">
                  <Link
                    to={
                      `/products/` +
                      tvBrandName?.replace(/ /g, "")?.toLowerCase()
                    }
                    className="text-decoration-none text-dark d-flex flex-row"
                  >
                    <h3 className="headingarea">{tvBrandName}</h3>
                    <div className="ml-auto">
                      <Button className="btn btn-primary viewall">
                        View All
                      </Button>
                    </div>
                  </Link>
                  <hr />
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center row">
                  {tv?.map((e, i) => {
                    return (
                      <Fragment key={i}>
                        <div className="p-4 col d-flex flex-row justify-content-center align-items-center">
                          <div className=" p-4 text-center">
                            <Link
                              to={
                                "/" +
                                e.keybrandname +
                                "/" +
                                e.name.replace(/ /g, "").toLowerCase()
                              }
                              className="text-decoration-none"
                            >
                              <div>
                                <img
                                  src={e.image}
                                  alt={e.name}
                                  height="230px"
                                />
                                <h5 className="mt-4 text-dark">{e.name}</h5>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
              {/* tws */}
              <div className="mt-5  bg-light">
                <div className="p-3">
                  <Link
                    to={
                      `/products/` +
                      twsBrandName?.replace(/ /g, "")?.toLowerCase()
                    }
                    className="text-decoration-none text-dark d-flex flex-row"
                  >
                    <h3 className="headingarea">{twsBrandName}</h3>
                    <div className="ml-auto">
                      <Button className="btn btn-primary viewall">
                        View All
                      </Button>
                    </div>
                  </Link>
                  <hr />
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center row">
                  {tws?.map((e, i) => {
                    return (
                      <Fragment key={i}>
                        <div className="p-4 col d-flex flex-row justify-content-center align-items-center">
                          <div className=" p-4 text-center">
                            <Link
                              to={
                                "/" +
                                e.keybrandname +
                                "/" +
                                e.name.replace(/ /g, "").toLowerCase()
                              }
                              className="text-decoration-none"
                            >
                              <div>
                                <img
                                  src={e.image}
                                  alt={e.name}
                                  height="230px"
                                />
                                <h5 className="mt-4 text-dark">{e.name}</h5>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
              {/* watch */}
              <div className="mt-5 bg-light">
                <div className="p-3">
                  <Link
                    to={
                      `/products/` +
                      watchBrand?.replace(/ /g, "")?.toLowerCase()
                    }
                    className="text-decoration-none text-dark d-flex flex-row"
                  >
                    <h3 className="headingarea">{watchBrand}</h3>
                    <div className="ml-auto">
                      <Button className="btn btn-primary viewall">
                        View All
                      </Button>
                    </div>
                  </Link>
                  <hr />
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center row">
                  {watch?.map((e, i) => {
                    return (
                      <Fragment key={i}>
                        <div className="p-4 col d-flex flex-row justify-content-center align-items-center">
                          <div className="text-center p-4">
                            <Link
                              to={
                                "/" +
                                e.keybrandname +
                                "/" +
                                e.name.replace(/ /g, "").toLowerCase()
                              }
                              className="text-decoration-none"
                            >
                              <div>
                                <img
                                  className="text-center"
                                  src={e.image}
                                  alt={e.name}
                                  height="230px"
                                />
                                <h5 className="mt-4 text-dark  text-wrap">
                                  {e.name}
                                </h5>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
              {/* accessories  */}
              <div className="mt-5 bg-light">
                <div className="p-3">
                  <Link
                    to={
                      `/products/` +
                      acBrandName?.replace(/ /g, "")?.toLowerCase()
                    }
                    className="text-decoration-none text-dark d-flex flex-row"
                  >
                    <h3 className="headingarea">{acBrandName}</h3>
                    <div className="ml-auto">
                      <Button className="btn btn-primary viewall">
                        View All
                      </Button>
                    </div>
                  </Link>
                  <hr />
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center row">
                  {accessories?.map((e, i) => {
                    return (
                      <Fragment key={i}>
                        <div className="p-4 col d-flex flex-row justify-content-center align-items-center">
                          <div className=" p-4 text-center">
                            <Link
                              to={
                                "/" +
                                e.keybrandname +
                                "/" +
                                e.name.replace(/ /g, "").toLowerCase()
                              }
                              className="text-decoration-none"
                            >
                              <div>
                                <img
                                  src={e.image}
                                  alt={e.name}
                                  height="230px"
                                />
                                <h5 className="mt-4 text-dark">{e.name}</h5>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Header></Header>
    </>
  );
}
export default Home;
