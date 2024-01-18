import React, { MutableRefObject, createRef, forwardRef, useRef, useState } from "react";
import { FunctionComponent } from "react";
import { StyledAddButton, StyledFlipper, StyledBlockPicker, StyledButton, StyledInput, StyledButtonGroup, StyledFieldContainer, StyledChoice } from '../../StyledComponents/InitializeApplicationForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from 'uuid';
import anime from 'animejs';
import { Flipper, Flipped } from 'react-flip-toolkit'


// Font Awesome Icons
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
// import generic types
import {Choice} from  '../../../types/ChoiceFieldValue';

type ChoiceFieldProps = {
    choices: Choice[],
    setChoices: Function,
    colorPalletteControl: Function,
    childKey: string
}

const StyledChoiceField = forwardRef(({choices, setChoices, colorPalletteControl, childKey}: ChoiceFieldProps, ref: MutableRefObject<any>) => {

    const [choicePickerOpen, setChoicePickerOpen] = useState([null]);

    const colorPalletteRef = useRef(null);
    
    function addChoice(){
        setChoices([...choices, {
            Title: '',
            Color: '#000000',
            ColorPalletteToggle: false,
            Id: uuid(),
            nodeRef: createRef()
        } as Choice]);
    }

    function setChoice(e: React.ChangeEvent<HTMLInputElement>, index: number){
        const el = e.target;
        let tempChoices = [...choices];
        tempChoices[index].Title = el.value;
        setChoices([...tempChoices]);
      }
    
    function moveChoicesUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number){
        console.log('moving choice up');
        console.log(`index: ${index}, choice: ${choices[index].Title}`)
        if(index === 0) return;
        let tempChoices = [...choices];
        const fromIndex = index;
        const toIndex = index - 1;
        tempChoices.splice(toIndex,0,tempChoices.splice(fromIndex,1)[0]);
        
        setChoices([...tempChoices])
    }

    function moveChoicesDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number){
        console.log('moving choice down');
        console.log(`index: ${index}, choice: ${choices[index].Title}`)
        if(index === choices.length - 1) return;
        let tempChoices = [...choices];
        const fromIndex = index;
        const toIndex = index + 1;
        tempChoices.splice(toIndex,0,tempChoices.splice(fromIndex,1)[0]);
        
        setChoices([...tempChoices])
    }

    function removeChoices(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number){
        console.log('removing choice');
        console.log(`index: ${index}, choice: ${choices[index].Title}`)
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

    function setColor(color: any, index: number){
        const tempChoices = [...choices];
        tempChoices[index].Color = color.hex;
        setChoices([...tempChoices]);
    }
    function toggleColorSelector(id:string){
        const index = choices.findIndex((choice) => choice.Id === id);
        
        if(choices[index].nodeRef === ref.current){
            console.log("ref.current === colorPalletteRef.current");
            colorPalletteControl(null);
            ref.current = null;
        }
        else{
            console.log("ref.current !== colorPalletteRef.current");
            colorPalletteControl(choices[index].nodeRef);
            ref.current = choices[index].nodeRef;
        }
        /*
        let choiceArray = [...choices]
        console.log("id:",id);
        const index = choices.findIndex((choice) => choice.Id === id);
        console.log("index:",index);
        let openIndex = null;
        ref.current !== null ? openIndex = choices.findIndex((choice) => choice.Id === ref.current) : openIndex = null;
        
        if(openIndex === index && choiceArray[index].ColorPalletteToggle){
        //    choiceArray[index].ColorPalletteToggle = false;
            ref.current = null;
        }
        else{
            choiceArray[index].ColorPalletteToggle = true;
            ref.current = choiceArray[index].Id;
        }
        */
/*
        if(openIndex !== null){
            choiceArray[openIndex].ColorPalletteToggle = false;            
        }

  */      
        
        //console.log(`After ref.current: ${ref.current}`)


        //setChoices([...choiceArray]); 
        /*
        const tempChoicePickerOpen = [...choicePickerOpen];
        if(tempChoicePickerOpen[index] === null) tempChoicePickerOpen[index] = true;
        else if(index > -1){
            tempChoicePickerOpen[index] = !tempChoicePickerOpen[index];
        }
        setChoicePickerOpen([...tempChoicePickerOpen]);
        */
    }
    return (
        
            <Flipper flipKey={choices} handleEnterUpdateDelete={simultaneousAnimations} element="div">
                {choices.map(({Title, Id, nodeRef}, index) => {
                    if(choicePickerOpen[index] === undefined) setChoicePickerOpen([...choicePickerOpen, null])
                    return (
                        <Flipped key={Id} flipId={Id} onAppear={animateElementIn} onExit={animateElementOut}>
                            <StyledFieldContainer>
                            <StyledChoice>
                                <StyledAddButton onClick={(e) => {index === choices.length-1 ? addChoice() : removeChoices(e,index)}}>
                                    {index === choices.length-1 ? (<FontAwesomeIcon icon={faPlus} type={`Button`} />): (<FontAwesomeIcon icon={faMinus} type={`Button`} />)}
                                </StyledAddButton>
                                <StyledInput type="text" onChange={(e)=>{setChoice(e, index)}} placeholder="Enter new value" defaultValue={Title} />
                                <StyledButtonGroup>
                                    <StyledButton disabled={index === 0 || choices[index].Title.length < 1} onClick={(e) => {(index > 0 && choices[index].Title.length > 1) ? moveChoicesUp(e,index): console.log('Cannot go higher than 1')}}>
                                        <FontAwesomeIcon icon={faArrowUp} type={`Button`} />
                                    </StyledButton>
                                    <StyledButton disabled={index === choices.length-1 || choices[index].Title.length < 1} onClick={(e) => {(index < (choices.length-1))? moveChoicesDown(e,index): console.log('Cannot go lower than the bottom')}}>
                                        <FontAwesomeIcon icon={faArrowDown} type={`Button`} />
                                    </StyledButton>
                                    <StyledFlipper flipKey={`${ref.current}`}>
                                        <StyledButton onClick={(e) => {toggleColorSelector(choices[index].Id)}}>
                                                <FontAwesomeIcon icon={faPalette} type={`Button`} style={{color: choices[index].Color}} />
                                        </StyledButton>
                                         <Flipped flipId={`${childKey}-Color-${Id}`} onAppear={animateElementIn} onExit={animateElementOut}>
                                            <StyledBlockPicker ref={choices[index].nodeRef} color={choices[index].Color} onChange={(c) => {setColor(c,index)}} triangle="hide" />
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