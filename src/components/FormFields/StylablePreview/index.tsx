import React, { MutableRefObject, forwardRef } from "react";
import { Card, Arrow, StatusCard, DropDown, Icon, Title, TwitterPicker } from "../../StyledComponents/ServiceCard";
// import generic types
import { Choice }  from '../../../types/ChoiceFieldValue';
import { Icons } from "../../../enums/Icons";

type PreviewProps = {
    choice: Choice,
    setChoice: Function,
    visible: false | boolean
}

const StylablePreview = forwardRef(({choice, setChoice, visible}: PreviewProps, ref: MutableRefObject<any>) => {
    const toggleIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if((e.target as HTMLDivElement).nodeName.toLowerCase() !== 'div') return;
        
        let tempChoice = choice;
        switch(tempChoice.Icon){
            case "Success":
                tempChoice.Icon = "Warning";
                break;
            case "Warning":
                tempChoice.Icon = "Error";
                break;
            case "Error":
                tempChoice.Icon = "Success";
                break;       
        }
        setChoice(tempChoice);
    }

    return (
        <>
            <Card color={choice.Color} aria-hidden={visible}>
                <StatusCard color={choice.Color}>
                    <Icon onClick={toggleIcon} content={choice.Icon} color={choice.Color}>
                        <Title onClick={(e) => {e.preventDefault();}}>{choice.Title.length < 1 ? 'Enter a choice' : choice.Title}</Title>
                        <DropDown defaultValue={choice.Title.toLowerCase()} onClick={(e) => {e.preventDefault();}}>
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