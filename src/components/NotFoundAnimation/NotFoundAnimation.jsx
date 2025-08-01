import React from "react";
import Lottie from "lottie-react";
import animationData from "../../animations/404.json";

const NotFoundAnimation = () => {
  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default NotFoundAnimation;
