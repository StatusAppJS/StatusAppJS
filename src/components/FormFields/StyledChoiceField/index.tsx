import React, { createRef, useState } from "react";
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
    childKey: string
}

const StyledChoiceField: FunctionComponent<ChoiceFieldProps> = (props: ChoiceFieldProps) => {

    const [choicePickerOpen, setChoicePickerOpen] = useState([null]);

    function addChoice(){
        props.setChoices([...props.choices, {
            Title: '',
            Color: '#000000',
            Id: uuid()
        } as Choice]);
    }

    function setChoice(e: React.ChangeEvent<HTMLInputElement>, index: number){
        const el = e.target;
        let tempChoices = [...props.choices];
        tempChoices[index].Title = el.value;
        props.setChoices([...tempChoices]);
      }
    
    
    function moveChoicesUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number){
        console.log('moving choice up');
        console.log(`index: ${index}, choice: ${props.choices[index].Title}`)
        if(index === 0) return;
        let tempChoices = [...props.choices];
        const fromIndex = index;
        const toIndex = index - 1;
        tempChoices.splice(toIndex,0,tempChoices.splice(fromIndex,1)[0]);
        
        props.setChoices([...tempChoices])
    }

    function moveChoicesDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number){
        console.log('moving choice down');
        console.log(`index: ${index}, choice: ${props.choices[index].Title}`)
        if(index === props.choices.length - 1) return;
        let tempChoices = [...props.choices];
        const fromIndex = index;
        const toIndex = index + 1;
        tempChoices.splice(toIndex,0,tempChoices.splice(fromIndex,1)[0]);
        
        props.setChoices([...tempChoices])
    }

    function removeChoices(event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number){
        console.log('removing choice');
        console.log(`index: ${index}, choice: ${props.choices[index].Title}`)
        let tempChoices = [...props.choices];
        tempChoices.splice(index,1);
        props.setChoices([...tempChoices]);
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
        const tempChoices = [...props.choices];
        tempChoices[index].Color = color.hex;
        props.setChoices([...tempChoices]);
    }
    function toggleColorSelector(e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number){
        const tempChoicePickerOpen = [...choicePickerOpen];
        if(tempChoicePickerOpen[index] === null) tempChoicePickerOpen[index] = true;
        else if(index > -1){
            tempChoicePickerOpen[index] = !tempChoicePickerOpen[index];
        }
        setChoicePickerOpen([...tempChoicePickerOpen]);
    }
    return (
        
            <Flipper flipKey={props.choices} handleEnterUpdateDelete={simultaneousAnimations} element="div">
                {props.choices.map(({Title, Id, nodeRef}, index) => {
                    if(choicePickerOpen[index] === undefined) setChoicePickerOpen([...choicePickerOpen, null])
                    return (
                        <Flipped key={Id} flipId={Id} onAppear={animateElementIn} onExit={animateElementOut}>
                            <StyledFieldContainer>
                            <StyledChoice>
                                <StyledAddButton onClick={(e) => {index === props.choices.length-1 ? addChoice() : removeChoices(e,index)}}>
                                    {index === props.choices.length-1 ? (<FontAwesomeIcon icon={faPlus} type={`Button`} />): (<FontAwesomeIcon icon={faMinus} type={`Button`} />)}
                                </StyledAddButton>
                                <StyledInput type="text" onChange={(e)=>{setChoice(e, index)}} placeholder="Enter new value" defaultValue={Title} />
                                <StyledButtonGroup>
                                    <StyledButton disabled={index === 0 || props.choices[index].Title.length < 1} onClick={(e) => {(index > 0 && props.choices[index].Title.length > 1) ? moveChoicesUp(e,index): console.log('Cannot go higher than 1')}}>
                                        <FontAwesomeIcon icon={faArrowUp} type={`Button`} />
                                    </StyledButton>
                                    <StyledButton disabled={index === props.choices.length-1 || props.choices[index].Title.length < 1} onClick={(e) => {(index < (props.choices.length-1))? moveChoicesDown(e,index): console.log('Cannot go lower than the bottom')}}>
                                        <FontAwesomeIcon icon={faArrowDown} type={`Button`} />
                                    </StyledButton>
                                    <StyledFlipper flipKey={`${props.childKey + choicePickerOpen[index]}`}>
                                        <StyledButton onClick={(e) => {toggleColorSelector(e,index)}}>
                                            <FontAwesomeIcon icon={faPalette} type={`Button`} style={{color: props.choices[index].Color}} />
                                        </StyledButton>
                                        <StyledBlockPicker color={props.choices[index].Color} onChange={(c) => {setColor(c,index)}} triangle="hide"
                                            className={choicePickerOpen[index] === null ? '' : choicePickerOpen[index] ? 'color-picker-open': 'color-picker-closed'}
                                        />
                                    </StyledFlipper>
                                </StyledButtonGroup>
                            </StyledChoice>
                            </StyledFieldContainer>
                        </Flipped>
                    );}
                )}
            </Flipper>
        
        
    )

}

export default StyledChoiceField;