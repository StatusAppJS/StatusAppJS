const simultaneousAnimations = ({
    hideEnteringElements,
    animateEnteringElements,
    animateExitingElements,
    animateFlippedElements
}: {
    hideEnteringElements: () => void,
    animateExitingElements: () => Promise<void>,
    animateFlippedElements: () => Promise<void> | void,
    animateEnteringElements: () => void,
}) => {
    hideEnteringElements();
    animateExitingElements();
    animateFlippedElements();
    animateEnteringElements();
};

export default simultaneousAnimations;