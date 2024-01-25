import React, { FunctionComponent, useEffect, useState } from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import * as lottie from "./InstallingImage.json";

function Installing<FunctionComponent>() {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (<Player autoplay loop src={lottie} style={{width: '400px', height:'400px'}} />);
}

export default Installing;