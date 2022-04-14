import React from "react";
import Logo from "../../assets/logo.svg";

const PoweredBy = () => {
  return (
    <div
      className="position-absolute"
      style={{ right: "1rem", bottom: "1rem" }}
    >
      <img src={Logo} alt="Day-One" className="pe-none p-1" />
      <p
        className="font-weight-light text-center w-100 text-light mb-0"
        style={{ fontSize: "0.5rem" }}
      >
        powered by
      </p>
    </div>
  );
};

export default PoweredBy;
