import React from "react";
import BmiLoader from "../ui/BmiLoader";

const Preloader = () => (
  <div className="preloader">
    <div className="loader" style={{ top: '50%', transform: 'translate(-50%, -50%)', left: '50%' }}>
      <div className="indicator">
        <BmiLoader />
      </div>
    </div>
  </div>
);

export default Preloader;
