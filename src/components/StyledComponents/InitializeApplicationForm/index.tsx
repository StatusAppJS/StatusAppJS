import { BlockPicker } from 'react-color'
import { Flipper } from 'react-flip-toolkit';
import styled, { keyframes } from "styled-components";

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
  max-wireadth:725px;
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
    flex: 3;
`;

const StyledChoice = styled.div`
    display:flex;
    padding-bottom: 5px;
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

const showColors = keyframes`
    from {
        top: -100%;
        left: -50%;
        opacity: 0;
        transform: scale(0);
    }
    to {
        top:100%;
        left:100%;
        opacity: 1;
        transform: scale(1);
    }
`;
const hideColors = keyframes`
    from {
        top:100%;
        left:100%;
        opacity: 1;
        transform: scale(1);
    }
    to {
        top: -100%;
        left: -50%;
        opacity: 0;
        transform: scale(0);
    }

`;

const StyledBlockPicker = styled(BlockPicker)`
    position: absolute !important;
    top:100%;
    left:100%;
    transform:scale(0);
    transform-origin: top left;
    opacity: 0;
    transition: all 0.5s ease-in-out;
    &.color-picker-closed{
        top: -100%;
        left: -50%;
        opacity:0;
        animation: ${hideColors} 0.5s ease-in-out;
    }
    &.color-picker-open {
        top:100%;
        left:100%;
        transform:scale(1);
        transform-origin: top left;
        opacity:1;
    }
`;

const StyledFlipper = styled(Flipper)`
    position:relative;
`;

export {StyledForm, StyledSubmitButton, StyledFlipper, StyledBlockPicker, StyledAddButton, StyledButtonGroup, StyledLabel, StyledInput, StyledButton, InputContainer, FormHeader, StyledFieldContainer, StyledChoice};