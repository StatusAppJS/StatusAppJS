import React, { useEffect, FunctionComponent, useRef } from "react";
import { useState } from "react";
import { StyledInput } from "../../components/StyledComponents/InitializeApplicationForm";
import IStatusListInfo from "../../types/IStatusListInfo";
import SuggestionList from "./SuggestionList";
import styled from "styled-components";

type AutocompleteProps = {
    suggestions: string[],
    lv: Partial<IStatusListInfo>,
    slv: React.Dispatch<React.SetStateAction<Partial<IStatusListInfo>>>
}

const Autocomplete: FunctionComponent<AutocompleteProps> = (props: AutocompleteProps, children) => {
    const [activeSuggestions, setActiveSuggestions] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState(Array<string>());
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const inputRef = useRef<HTMLInputElement>();

    // FUNCTIONS
    const closeSuggestions = () => {
        setFilteredSuggestions([]);
        setActiveSuggestions(0);
        setShowSuggestions(false);
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(inputRef.current.value.length === 0){
            closeSuggestions();
            props.slv({...props.lv, AdminGroupName: e.target.value});
            return;
        }
        const suggestions = props.suggestions;
        const userInput = e.currentTarget.value;

        const filtered = suggestions.length ? suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        ): [];

        setFilteredSuggestions(filtered);
        setActiveSuggestions(0);
        setShowSuggestions(true);
        props.slv({...props.lv, AdminGroupName: e.target.value});
    }

    const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        console.log((e.target as HTMLLIElement).innerText,'clicked')
        closeSuggestions();
        const listValues = props.lv;
        listValues.AdminGroupName = (e.target as HTMLLIElement).innerText;
        if (inputRef.current) {
            inputRef.current.value = listValues.AdminGroupName;
        }
        props.slv({...listValues});
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const suggestions = filteredSuggestions;
        if (e.code === "Enter") {
            closeSuggestions();
        } else if (e.code === "ArrowUp") {
            if (activeSuggestions === 0) {
                return;
            }
            setActiveSuggestions(activeSuggestions - 1);
        } else if (e.code === "ArrowDown") {
            if (activeSuggestions - 1 === suggestions.length) {
                return;
            }
            setActiveSuggestions(activeSuggestions + 1);
        }
    }

    const StyledAutoInput = styled(StyledInput)<{isOpen: boolean}>`
        border-bottom: ${props => props.isOpen ? 'none !important' : '1px solid #ababab !important'};
        border-radius: ${props => props.isOpen ? '5px 5px 0 0 !important' : '5px !important'};
        &:focus{
            border-color: #ababab !important;
        }
        &:hover{
            border-color: #ababab !important;
        }
    `;

    const StyledSuggestionList = styled(SuggestionList)<{showSuggestions:boolean}>`
        display: ${props => props.showSuggestions ? 'block' : 'none'};
    `
    return (
        <>
            <StyledAutoInput key={`StatusAdminField`} isOpen={showSuggestions} onKeyDown={onKeyDown} type="text" ref={inputRef} placeholder="Enter Group Name" defaultValue={props.lv.AdminGroupName} onChange={onChange} />
            <SuggestionList onClick={onClick} activeSuggestions={activeSuggestions} showSuggestions={showSuggestions} filteredSuggestions={filteredSuggestions} inputRef={inputRef} />
        </>
    );
}

export default Autocomplete;