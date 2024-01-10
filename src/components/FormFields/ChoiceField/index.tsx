import React from "react";
import { FunctionComponent } from "react";
import { StyledAddButton, StyledButton, StyledInput, StyledButtonGroup, StyledChoiceContainer, StyledChoice } from '../../StyledComponents/InitializeApplicationForm';
import { FadeIn } from '../../Animations/FadeIn';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from 'uuid';

// Font Awesome Icons
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

// import generic types
import {Choice} from  '../../../types/ChoiceFieldValue';

type ChoiceFieldProps = {
    choices: Array<Choice>,
    setChoices: Function,
}

const ChoiceField: FunctionComponent<ChoiceFieldProps> = (props: ChoiceFieldProps) => {

    function setChoice(e: React.ChangeEvent<HTMLInputElement>, index: number){
        const el = e.target;
        let tempChoices = [...props.choices];
        tempChoices[index].Title = el.value;
        props.setChoices([...tempChoices]);
      }
        function addChoice(){
            props.setChoices([...props.choices, {
                Title: '',
                Id: uuid()
            } as Choice]);
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

    return (
        <>
        <StyledChoiceContainer>
        {props.choices.map((choice, index) => {
            return (
                <>
                <FadeIn key={choice.Id}>
                <StyledChoice>
                    <StyledAddButton onClick={(e) => {index === props.choices.length-1 ? addChoice(): removeChoices(e,index)}}>
                        {index === props.choices.length-1 ? (<FontAwesomeIcon icon={faPlus} type={`Button`} />): (<FontAwesomeIcon icon={faMinus} type={`Button`} />)}
                    </StyledAddButton>
                    <StyledInput type="text" onChange={(e)=>{setChoice(e, index)}} placeholder="Enter new value" defaultValue={choice.Title} />
                    <StyledButtonGroup>
                        <StyledButton disabled={index === 0 || props.choices[index].Title.length < 1} onClick={(e) => {(index > 0 && props.choices[index].Title.length > 1) ? moveChoicesUp(e,index): console.log('Cannot go higher than 1')}}>
                            <FontAwesomeIcon icon={faArrowUp} type={`Button`} />
                        </StyledButton>
                        <StyledButton disabled={index === props.choices.length-1 || props.choices[index].Title.length < 1} onClick={(e) => {(index < (props.choices.length-1))? moveChoicesDown(e,index): console.log('Cannot go lower than the bottom')}}>
                            <FontAwesomeIcon icon={faArrowDown} type={`Button`} />
                        </StyledButton>
                    </StyledButtonGroup>
                </StyledChoice>
                </FadeIn>
                </>
            )
            })
        }
        </StyledChoiceContainer>
        </>
    )

}

export default ChoiceField;