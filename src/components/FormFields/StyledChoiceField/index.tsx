import React, { MutableRefObject, createRef, forwardRef, useState } from "react";
import { StyledAddButton, StyledFlipper, StyledButton, StyledInput, StyledButtonGroup, StyledFieldContainer, StyledChoice } from '../../StyledComponents/InitializeApplicationForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from 'uuid';
import anime from 'animejs';
import { Flipper, Flipped } from 'react-flip-toolkit'
import StylablePreview from '../StylablePreview'

// Font Awesome Icons
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
// import generic types
import {Choice} from  '../../../types/Choice';

type ChoiceFieldProps = {
    choices: Choice[],
    setChoices: Function,
    previewControl: Function,
    childKey: string
}

const StyledChoiceField = forwardRef(({choices, setChoices, previewControl, childKey}: ChoiceFieldProps, ref: MutableRefObject<any>) => {

    const [choicePickerOpen, setChoicePickerOpen] = useState([null]);
    
    function addChoice(){
        closeAllColorToggles();
        setChoices([...choices, {
            Title: '',
            Color: '#000000',
            ColorPalletteToggle: null,
            Icon: 'Success',
            Id: uuid(),
            nodeRef: createRef()
        } as Choice]);
    }

    function setChoice(e: React.ChangeEvent<HTMLInputElement>, index: number){
        let tempChoices = [...choices];
        tempChoices[index].Title = e.target.value;
        setChoices([...tempChoices]);
      }
    
    function moveChoicesUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number){
        if(index === 0) return;
        closeAllColorToggles();
        let tempChoices = [...choices];
        tempChoices.splice((index-1),0,tempChoices.splice(index,1)[0]);
        
        setChoices([...tempChoices])
    }

    function moveChoicesDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number){
        if(index === choices.length - 1) return;
        closeAllColorToggles();
        let tempChoices = [...choices];
        tempChoices.splice((index + 1),0,tempChoices.splice(index,1)[0]);
        
        setChoices([...tempChoices])
    }

    function removeChoices(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number){
        closeAllColorToggles();
        let tempChoices = [...choices];
        tempChoices.splice(index,1);
        setChoices([...tempChoices]);
    }

    type AnimeCallbackFunction = (anim: anime.AnimeInstance) => void;
    type AnimeTarget = string | object | HTMLElement | SVGElement | NodeList | null;

    /* ANIMATION FUNCTIONS */
    const animateElementIn = (el:AnimeTarget, i: number) =>
        anime({
            targets: el,
            opacity: 1,
            delay: i * 10,
            easing: "easeOutSine"
        });

    const animateElementOut = (el:AnimeTarget, i: number, onComplete:AnimeCallbackFunction) => {
        anime({
            targets: el,
            opacity: 0,
            delay: i * 30,
            easing: "easeOutSine",
            complete: onComplete
        });
    };

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

    const closeAllColorToggles = () => {
        ref.current = null;
        previewControl(null);
    }
    const togglePreview = (choice:Choice) => {
        
        const currentRef = choice.nodeRef;
        if(ref.current === currentRef){
            closeAllColorToggles();
        }
        else{
            ref.current = currentRef;
            previewControl(choice.Id);
        }
    }
    
    const updateChoice = (choice: Choice) => {
        const index = choices.findIndex((c) => c.Id === choice.Id);
        const tempChoices = [...choices];
        tempChoices[index] = choice;
        setChoices([...tempChoices]);
    }

    return (
        <Flipper flipKey={choices} handleEnterUpdateDelete={simultaneousAnimations} element="div">
            {choices.map((choice, index) => {
                if(choicePickerOpen[index] === undefined) setChoicePickerOpen([...choicePickerOpen, null])
                return (
                    <Flipped key={choice.Id} flipId={choice.Id} onAppear={animateElementIn} onExit={animateElementOut}>
                        <StyledFieldContainer>
                            <StyledChoice>
                                <StyledAddButton onClick={(e) => {index === choices.length-1 ? addChoice() : removeChoices(e,index)}}>
                                    {index === choices.length-1 ? (<FontAwesomeIcon icon={faPlus} type={`Button`} />): (<FontAwesomeIcon icon={faMinus} type={`Button`} />)}
                                </StyledAddButton>
                                <StyledInput type="text" onChange={(e)=>{setChoice(e, index)}} placeholder="Enter new value" defaultValue={choice.Title} />
                                <StyledButtonGroup>
                                    <StyledButton disabled={index === 0 || choice.Title.length < 1} onClick={(e) => {(index > 0 && choice.Title.length > 1) ? moveChoicesUp(e,index): console.log('Cannot go higher than 1')}}>
                                        <FontAwesomeIcon icon={faArrowUp} type={`Button`} />
                                    </StyledButton>
                                    <StyledButton disabled={index === choices.length-1 || choice.Title.length < 1} onClick={(e) => {(index < (choices.length-1))? moveChoicesDown(e,index): console.log('Cannot go lower than the bottom')}}>
                                        <FontAwesomeIcon icon={faArrowDown} type={`Button`} />
                                    </StyledButton>
                                    <StyledFlipper>
                                        <StyledButton onClick={(e) => {togglePreview(choice)}}>
                                            <FontAwesomeIcon icon={faPalette} type={`Button`} style={{color: choice.Color}} />
                                        </StyledButton>
                                        <Flipped inverseFlipId={`${choice.Id}`} onAppear={animateElementIn} onExit={animateElementOut}>
                                            <StylablePreview ref={choice.nodeRef} choice={choice} setChoice={updateChoice}  visible={choice.ColorPalletteToggle} />
                                        </Flipped>
                                    </StyledFlipper>
                                </StyledButtonGroup>
                            </StyledChoice>
                        </StyledFieldContainer>
                    </Flipped>
                );}
            )}
        </Flipper>
    )
});

export default StyledChoiceField;