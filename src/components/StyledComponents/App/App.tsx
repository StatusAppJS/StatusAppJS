import styled from "styled-components";

const StatusApp = styled.div`
    display:block;
`;

const AppContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 50px;
`;

const Header = styled.header`
    background-color: #f0f0f0;
    text-align: center;
    padding: 20px 0;
`;

var CategoryContainer = styled.div<{status?: string;}>`
    position:relative;
    border: 2px solid #ccc;
    width: 329px;
    padding:25px;
    text-align:center;
    border-radius: 10px;
    height:1%;
    margin: 0 25px;
`;

var AddServiceButton = styled.div`
    cursor:pointer;
        position:absolute;
        content: "+";
        top: -2px;
	    right: 10px;
	    font-size: xx-large;
`;

export {StatusApp, AppContainer, Header, CategoryContainer, AddServiceButton};