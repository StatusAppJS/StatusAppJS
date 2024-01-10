import styled from "styled-components";

const InputContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 25px;
`;

const FormHeader = styled.header`
    text-align: center;
    padding: 20px 0;

`;

const StyledForm = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
  width:40%;
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
  display: ${props => props.display ? 'none' : 'inherit'};
`
const StyledChoiceContainer = styled.div`
    flex:3;
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
`;

export {StyledForm, StyledAddButton, StyledButtonGroup, StyledLabel, StyledInput, StyledButton, InputContainer, FormHeader, StyledChoiceContainer, StyledChoice};