import anime from "animejs";
import { AnimeCallbackFunction, AnimeTarget } from "../../types/Anime";

const animateElementOut = (el:AnimeTarget, i: number, onComplete:AnimeCallbackFunction) => {
    anime({
        targets: el,
        opacity: 0,
        delay: i * 30,
        easing: "easeOutSine",
        complete: onComplete
    });
};

export default animateElementOut;