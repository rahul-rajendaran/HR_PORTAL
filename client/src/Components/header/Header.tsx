import React from "react";
import "../Navbars/navbar.css";

const Header = () => {
  return (
    <>
      <div className="unique-hr">
        <div className="welcome-first-div">
          <div className="welcome-second-div">
            <h1
              className="welcome"
              style={{
                display: "flex; justify-content: center; align-items: center;",
              }}
            >
              Welcome to HR-PORTAL <span className="nav_brand_span">.</span>{" "}
            </h1>
          </div>
          <div className="" style={{ width: "40%" }}>
            <img src="pngwing.com.png" width="auto" height="300px"  alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
