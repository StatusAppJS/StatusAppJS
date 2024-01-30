import anime from "animejs";
import { AnimeTarget } from "../../types/Anime";

const animateElementIn = (el:AnimeTarget, i: number) => {
    anime({
        targets: el,
        opacity: 1,
        delay: i * 10,
        easing: "easeOutSine"
    });
}

export default animateElementIn;