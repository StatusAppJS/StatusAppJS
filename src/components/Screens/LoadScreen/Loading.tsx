import { Player } from '@lottiefiles/react-lottie-player';
import * as lottie from "./LoadingImage.json";

export default function Loading(){
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