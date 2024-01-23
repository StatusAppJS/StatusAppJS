import React, { MutableRefObject, createRef, forwardRef, useRef, useState } from "react";
import { FunctionComponent } from "react";
import { Card, Arrow, StatusCard, DropDown, Icon, Title } from "./StyledPreviewComponents";
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
import { StyledBlockPicker } from "../../StyledComponents/InitializeApplicationForm";
import TwitterPicker from "react-color/lib/components/twitter/Twitter";

const Icons =  [
    {
        key: 'success',
        value : '%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm-2%2015-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22%2F%3E%3C%2Fsvg%3E'
    },
    {
        key: 'warning',
        value :  '%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M1%2021h22L12%202%201%2021zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z%22%2F%3E%3C%2Fsvg%3E'
    },
    {
        key: 'error',
        value : '%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm1%2015h-2v-2h2v2zm0-4h-2V7h2v6z%22%2F%3E%3C%2Fsvg%3E'
    },
]

type PreviewProps = {
    choice: Choice,
    setChoice: Function,
    visible: boolean
}

const StylablePreview = forwardRef(({choice, setChoice, visible}: PreviewProps, ref: MutableRefObject<any>) => {
 
    const toggleIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if((e.target as HTMLDivElement).nodeName.toLowerCase() !== 'div') return;
        let index = Icons.findIndex(i => i.value === choice.Icon);
        console.log('toggling icon');
        console.log(`index: ${index}, choice: ${choice.Title}`)
        let tempChoice = choice;
        if(index === Icons.length - 1) {
            index = 0;
        }
        else{
            index++;
        }
        tempChoice.Icon = Icons[index].value;
        setChoice(tempChoice);
    }

    return (
        <>
            <Card color={choice.Color} display={visible}>
                <StatusCard color={choice.Color} icon={choice.Icon}>
                    <Icon onClick={toggleIcon}>
                        <Title onClick={(e) => {e.preventDefault();}}>{choice.Title.length < 1 ? 'Enter a choice' : choice.Title}</Title>
                        <DropDown value={choice.Title.toLowerCase()} onClick={(e) => {e.preventDefault();}}>
                            <option value={choice.Title.toLowerCase()}>{choice.Title}</option>
                        </DropDown>
                    </Icon>
                </StatusCard>
                <TwitterPicker colors={['#00a91c','#ffbe2e', '#d54309', '#00bde3', '#9c3d10']} color={choice.Color} onChange={(c) => {let newChoice = choice; newChoice.Color = c.hex; setChoice(newChoice)}} />
                <Arrow />
            </Card>
        </>
    );
        
});

export default StylablePreview;