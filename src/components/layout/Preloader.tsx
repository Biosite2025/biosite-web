import React from "react";

const Preloader = () => (
  <div className="preloader">
    <div className="loader" style={{ top: '50%', transform: 'translate(-50%, -50%)', left: '50%' }}>
      <div className="loader-outter"></div>
      <div className="loader-inner"></div>
      <div className="indicator" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <svg width="32" height="32" viewBox="0 0 16 16" style={{ display: 'block', margin: 'auto' }}>
          <polyline id="back" points="1 8 4 8 6 13 10 3 12 8 15 8" />
          <polyline id="front" points="1 8 4 8 6 13 10 3 12 8 15 8" />
        </svg>
      </div>
    </div>
  </div>
);

export default Preloader;
