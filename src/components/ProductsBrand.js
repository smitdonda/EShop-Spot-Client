import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

function ProductsBrand() {
  let { id } = useParams();
  let [categoryName, setCategoryName] = useState();
  let [brandName, setBrandName] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let brandNameData = async () => {
    let res = await axios.get(
      "https://e-shop-spot.vercel.app/users/getProductkeybrand/" + id
    );
    setCategoryName(res.data.products);
    setBrandName(res?.data?.products[0]?.brandname);
    setIsLoading(false);
  };
  useEffect(() => {
    brandNameData();
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
          <div style={{ marginTop: "100px" }} className="container-fluid">
            <h2 className="text-center headingarea">{brandName}</h2>
            <hr />
            {categoryName?.map((e, i) => {
              return (
                <div
                  key={i}
                  className="view-products-warp mt-5 p-3 bg-light textarea "
                >
                  <div className="text-center">
                    <Link to={`/` + e.keybrandname + "/" + e.keyname}>
                      <img
                        src={e.image}
                        height="300"
                        className="view-products-img"
                        alt={e.name}
                      />
                    </Link>
                  </div>
                  <div className="d-flex flex-row justify-content-around align-items-center products-details">
                    <div>
                      <Link
                        to={`/` + e.keybrandname + "/" + e?.keyname}
                        className="text-decoration-none text-dark"
                      >
                        <h4>{e?.name}</h4>
                        <div>
                          {e?.pricesing?.map((p, j) => {
                            if (j === 0) {
                              return (
                                <div key={j}>
                                  <p>&#8377;{p.price}</p>
                                </div>
                              );
                            }
                          })}
                        </div>

                        <p className="mb-4">
                          Rating&nbsp;:&nbsp;
                          <span className="text-success pt-1 pb-1 pr-1 pl-2 border border-success rounded">
                            {e.rating}
                            <StarIcon className=" pb-1" />
                          </span>
                        </p>
                      </Link>
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

export default ProductsBrand;
