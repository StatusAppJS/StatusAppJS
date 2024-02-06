import { BlockPicker } from 'react-color'
import { Flipper } from 'react-flip-toolkit';
import styled, { keyframes } from "styled-components";

const InputContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 25px;
    align-items: center;
    position: relative;
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

    color: ${props => props.disabled ? '#000' : 'inherit'};
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

const StyledDisableButton = styled(StyledButton)`
    background-color: #bbb;
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

const StyledBlockPicker = styled(BlockPicker)<{display?:boolean}>`
    position: absolute !important;
    z-index: 100;
    top: 100%;
    left: 100%;
    opacity: ${props => props.display ? '1' : '0'};
    transform: ${props => props.display ? 'scale(1)' : 'scale(0)'};
    transform-origin: top left;
    transition: all ${props => props.display === null ? '0s' : '0.5s'} ${props => props.display ? 'ease-out' : 'ease-in'};
`;

const StyledFlipper = styled.div`
    position:relative;
`;

export {StyledForm, StyledSubmitButton, StyledDisableButton, StyledFlipper, StyledBlockPicker, StyledAddButton, StyledButtonGroup, StyledLabel, StyledInput, StyledButton, InputContainer, FormHeader, StyledFieldContainer, StyledChoice};