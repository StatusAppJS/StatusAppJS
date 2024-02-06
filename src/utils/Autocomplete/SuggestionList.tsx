import React, { MouseEventHandler } from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";

type SuggestionListProps = {
    selectEntry: MouseEventHandler<HTMLElement>,
    createEntry: MouseEventHandler<HTMLElement>,
    activeSuggestions: number,
    showSuggestions: boolean,
    filteredSuggestions: string[]
    inputRef: any;
}

const StyledDiv = styled.div`
position:absolute !important;
z-index: 1000;
background-color: #fff;
border-radius: 0 0 5px 5px;
left: 130px;
top: 38px;
width: 348px;
list-style-type: none;
max-height: 200px;
overflow-y: auto;
border: 1px solid #ababab;
border-top: none;
`;
const StyledP = styled.div`
padding: 10px;
&:hover{
    background-color: #f2f2f2;
    cursor: pointer;
}
`;

const SuggestionList: FunctionComponent<SuggestionListProps> = (props: SuggestionListProps, children) => {

    if(props.showSuggestions && props.inputRef.current) {
        if (props.filteredSuggestions.length) {
            children = props.filteredSuggestions.map((suggestion, index) => {
                let className;
                if (index === props.activeSuggestions) {
                    className = "suggestion-active";
                }
                return (
                    <StyledP className={className} key={suggestion} onClick={props.selectEntry}>
                        {suggestion}
                    </StyledP>
                );
            });
        } else {
            children = (
                <StyledP className="no-suggestions">
                    <div onClick={props.createEntry}>Does not exists.  Click here to create it.</div>
                </StyledP>
            );
        }
    }

    return (
        <>
            <StyledDiv>
                {children}
            </StyledDiv>
            
        </>
    );
}

export default SuggestionList;
