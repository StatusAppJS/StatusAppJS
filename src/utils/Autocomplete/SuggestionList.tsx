import React, { MouseEventHandler } from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";

type SuggestionListProps = {
    onClick: MouseEventHandler<HTMLLIElement>,
    activeSuggestions: number,
    showSuggestions: boolean,
    filteredSuggestions: string[]
    inputRef: any;
}

const SuggestionList: FunctionComponent<SuggestionListProps> = (props: SuggestionListProps, children) => {

    const StyledUl = styled.ul`
        position:absolute;
        z-index: 1000;
        background-color: #fff;
        border-radius: 0 0 5px 5px;
        transform: translate(55px, 38px);
        width: 308px;
        list-style-type: none;
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid #ababab;
        border-top: none;
    `;
    const StyledLi = styled.li`
        padding: 10px;
        &:hover{
            background-color: #f2f2f2;
            cursor: pointer;
        }
    `;

    if(props.showSuggestions && props.inputRef.current) {
        if (props.filteredSuggestions.length) {
            children = props.filteredSuggestions.map((suggestion, index) => {
                let className;
                if (index === props.activeSuggestions) {
                    className = "suggestion-active";
                }
                return (
                    <li className={className} key={suggestion} onClick={props.onClick}>
                        {suggestion}
                    </li>
                );
            });
        } else {
            children = (
                <li className="no-suggestions">
                    <em>No suggestions available.</em>
                </li>
            );
        }
    }

    const suggestions = (
        <StyledUl>
            {props.filteredSuggestions.map((suggestion, index) => {
                let className;
                if (index === props.activeSuggestions) {
                    className = "suggestion-active";
                }
                return (
                    <StyledLi className={className} key={suggestion} onClick={props.onClick}>
                        {suggestion}
                    </StyledLi>
                );
            })
            }
        </StyledUl>
    );

    const nosuggestions = (
        <StyledUl>
            <StyledLi>
                <em>No suggestions available.</em>
            </StyledLi>
        </StyledUl>
    )

    return (
        <>
            {(props.showSuggestions && props.inputRef.current) ? suggestions : nosuggestions}
        </>
    );
}

export default SuggestionList;