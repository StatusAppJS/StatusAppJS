import styled from "styled-components";
import ColorBrightness from '../../../utils/ColorBrightness';

const Card = styled.div<{display?:boolean, color?:string}>`
    box-shadow:0 4px 8px 0 rgba(0,0,0,0.2);
    transform-origin: center left;
    position:absolute;
    top: calc(50% - 62.5px);
    left:60px;
    height:125px;
    width:350px;
    background-color: #ddd;
    z-index: 100;
    opacity: ${props => props.display ? '1' : '0'};
    transform: ${props => props.display ? 'scale(1)' : 'scale(0)'};
    transition: all ${props => props.display === null ? '0s' : (props.display === true ? '0.2s' : '0.1s')} ${props => props.display ? 'ease-out' : 'ease-in'};
    transition-delay: ${props => props.display === null ? '0s' : (props.display === true ? '0s' : '0.1s')};
`;

const Arrow = styled.div<{color?:string}>`
    position:absolute;
    width: 0;
    height: 0;
    border-top: 62.5px solid transparent;
    border-bottom: 62.5px solid transparent;
    border-right: 20px solid #bbb;
    top:50%;
    transform: translate(-100%, -50%)
`;

const Icon = styled.div<{status?: string}>`
        &::before{
            background: 0 0;
            mask-position: center center;
            mask-repeat: no-repeat;
            mask-size: 2rem 2rem;
            height: 2rem;
            width: 2rem;
            content: "";
            display:block;
            position:absolute;
            top:.75rem;
            left:.25rem;
        }
    `;



const StatusCard = styled.div<{color?: string, icon?:string}>`
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        text-align: center;
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position:relative;
        margin:20px 10px;
        background-color: ${props => ColorBrightness(props.color, 90)};
        border-left: .5rem solid ${props => props.color};

        ${Icon} {
            &::before{
                mask-image: url("data:image/svg+xml;utf8,${props => props.icon}"), linear-gradient(transparent, transparent);
                background-color: ${props => props.color}; 
            }
        }
    `;

    const Title = styled.h2`
        font-weight: bold;
        margin: 5px 0;
    `;
    const DropDown = styled.select`
        margin-bottom: 10px;
    `;

export {Card, Arrow, Icon, StatusCard, Title, DropDown};