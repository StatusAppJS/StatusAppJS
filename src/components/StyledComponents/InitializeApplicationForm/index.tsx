import { Transition } from "react-transition-group";
import TransitionGroup from "react-transition-group/TransitionGroup";
import styled from "styled-components";

const InputContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 25px;
    align-items: center
`;

const FormHeader = styled.header`
    text-align: center;
    padding: 20px 0;

`;

const StyledForm = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
  max-width:725px;
  min-width:500px;
  width: 40%;
`

const StyledLabel = styled.label<{invalid?: string;}>`
  flex: 1;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${props => props.invalid ? 'red' : 'black'};
`

const StyledInput = styled.input<{display?: boolean}>`
  flex: 3;
  padding: 10px !important;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 20px;
  display: ${props => props.display ? 'none' : 'inherit'};
`
const StyledChoiceInput = styled(StyledInput)`
    margin: 0 5px;
`;
const StyledFieldContainer = styled.div`
    flex:3;
`;

const StyledChoice = styled.div`
    display:flex;
    padding-bottom: 5px;

    &.choice-enter{
        opacity: 0;
        transform: translateY(20px)
    }

    &.choice-enter-active{
        opacity: 1;
        transform: translateY(0px);
        transition: all 500ms ease-in;
    }

    &.choice-exit{
        opacity: 1;
        transform:translateX(40px);
        transition: all 500ms ease-in;
    }

    &.choice-exit-active{
        opacity: 0;
        transform: transformX(0px)
        
    }
    
`;

const StyledButton = styled.div<{disabled?:boolean}>`
    background-color: ${props => props.disabled ? 'inherit' : '#f0f0f0'};
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin: 0 5px;
    cursor: ${props => props.disabled ? 'no-drop' : 'pointer'};
    &:hover {
        background-color: ${props => props.disabled ? 'inherit' : '#ccc'};
    }

    color: ${props => props.disabled ? '#bbb' : 'inherit'};
`;

const StyledButtonGroup = styled.div`
    display:flex;
    flex-direction: row;
`;

const StyledAddButton = styled(StyledButton)`
    height: fit-content;
    margin: 0 5px;
`;

const StyledSubmitButton = styled(StyledButton)`
    background-color: rgb(136 241 116);
    text-align:center;
    margin-top:25px;
`;

const StyledTransitionGroup = styled(TransitionGroup)`
    flex: 3;
`

export {StyledForm, StyledTransitionGroup, StyledSubmitButton, StyledAddButton, StyledButtonGroup, StyledLabel, StyledInput, StyledButton, InputContainer, FormHeader, StyledFieldContainer, StyledChoice};