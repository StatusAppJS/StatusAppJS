import Lottie from "react-lottie";
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
  return (<Lottie options={defaultOptions} height={400} width={400} />);
}