import React, { useEffect, FunctionComponent, useRef } from "react";
import { useState } from "react";
import { StyledInput } from "../../components/StyledComponents/InitializeApplicationForm";
import IStatusListInfo from "../../types/IStatusListInfo";
import SuggestionList from "./SuggestionList";
import styled from "styled-components";

type AutocompleteProps = {
    suggestions: string[],
    lv: Partial<IStatusListInfo>,
    slv: React.Dispatch<React.SetStateAction<Partial<IStatusListInfo>>>,
    selectEntry: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, callback:any) => void,
    createEntry: (groupTitle: string, callback:any) => Promise<void>,
    children?: React.ReactNode
}

const StyledAutoInput = styled(StyledInput)<{isopen: boolean}>`
    border-bottom: ${props => props.isopen ? 'none !important' : '1px solid #ababab !important'};
    border-radius: ${props => props.isopen ? '5px 5px 0 0 !important' : '5px !important'};
    &:focus{
        border-color: #ababab !important;
        outline: none !important;
    }
    &:hover{
        border-color: #ababab !important;
        outline: none !important;
    }
    &:focus-visible{
        outline: none !important;
    }
`;

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

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log('showSuggestions:',showSuggestions);
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
        inputRef.current.focus();
    }

    function createEntry(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        props.createEntry(inputRef.current.value, closeSuggestions);
    }

    function setSuggestion(title:string){
        props.slv({...props.lv, AdminGroupName: title});
        inputRef.current.value = title;
        closeSuggestions();
    }

    function selectEntry(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        props.selectEntry(e, setSuggestion);
    }

    return (
        <>
            <StyledAutoInput key={`StatusAdminField`} isopen={showSuggestions} onKeyDown={onKeyDown} type="text" ref={inputRef} placeholder="Enter Group Name" defaultValue={props.lv.AdminGroupName} onChange={onChange} />
            {showSuggestions && (
                <SuggestionList selectEntry={selectEntry} createEntry={createEntry} activeSuggestions={activeSuggestions} showSuggestions={showSuggestions} filteredSuggestions={filteredSuggestions} inputRef={inputRef} />
            )}
            
        </>
    );
}

export default Autocomplete;