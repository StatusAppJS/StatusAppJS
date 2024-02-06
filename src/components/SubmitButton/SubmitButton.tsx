import React, { FunctionComponent, MutableRefObject } from "react";
import { StyledSubmitButton, StyledDisableButton } from '../StyledComponents/InitializeApplicationForm';

type SubmitButtonProps = {
    validate: MutableRefObject<boolean>;
    callback: React.MouseEventHandler<HTMLDivElement>;
    children: React.ReactNode;
}

const SubmitButton: FunctionComponent<SubmitButtonProps> = ({validate, callback, children}: SubmitButtonProps) => {
    
    const render = (
            <StyledSubmitButton onClick={callback}>
                {children}
            </StyledSubmitButton>
    )

    const disabled = (
        <StyledDisableButton disabled>
            {children}
        </StyledDisableButton>
    )

    return validate.current ? render : disabled
}


export default SubmitButton;