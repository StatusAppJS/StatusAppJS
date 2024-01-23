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
import styled from "styled-components";

const StylablePreview: FunctionComponent = () => {
    
    return (
        <>
            <Card>
                Arrow needs to match the color of the window selected
                <Arrow />
            </Card>
        </>
    );
        
};

const Card = styled.div`
    box-shadow:0 4px 8px 0 rgba(0,0,0,0.2);
    transform-origin: middle left;
    transition: 0.3s;
    position:absolute;
    top:50%;
    left:60px;
    transform: translateY(-50%);
    height:125px;
    width:350px;
    background-color: #ddd;
`;

const Arrow = styled.div`
    position:absolute;
    width: 0;
    height: 0;
    border-top: 62.5px solid transparent;
    border-bottom: 62.5px solid transparent;
    border-right: 20px solid #bbb;
    top:50%;
    transform: translate(-100%, -50%)
`;

export default StylablePreview;