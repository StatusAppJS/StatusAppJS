import * as React from 'react';
import { useEffect, useRef } from 'react';
import SPItem from '../../types/SPItem';
import SPStatusConfigItem from '../../types/SPStatusConfigItem';

import { StatusCard, DropDown, Icon, Title } from '../StyledComponents/ServiceCard';
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';

interface CardProps {
    service: SPItem;
    updateStatus?: (service: SPItem, status: string) => void;
    flippedProps?: object;
}

const ServiceCard: React.FunctionComponent<CardProps> = (props: CardProps) => {
    const { provider: {StatusConfig} } = UseProviderContext();

    const config: SPStatusConfigItem = StatusConfig.pageconfig;
    const options = JSON.parse(config.StatusOptions as string);
    const statusOptions:Array<string> = options.options.map((option:any) => option.Title);
    const Colors:Array<string> = options.options.map((option:any) => option.Color);
    const Icons:Array<string> = options.options.map((option:any) => option.Icon);

    const originalIndex = statusOptions.findIndex((option:string) => option.toLowerCase() === props.service.Status.toLowerCase());
    const [status, setStatus] = React.useState(statusOptions[originalIndex]);
    const [color, setColor] = React.useState(Colors[originalIndex]);
    const [icon, setIcon] = React.useState(Icons[originalIndex]);
    const [service, setService] = React.useState<SPItem>(props.service);
    const statusTrigger = useRef<string>(props.service.Status);
    console.log('ServiceCard update:', props.updateStatus);
    useEffect(() => {
        if(statusTrigger.current !== status) {
            statusTrigger.current = status;
            console.log(`Updating Status to ${status} from Card UseEffect`);
            /*const returnItem: Promise<SPItem> = props.updateStatus(props.service, status);
            returnItem.then((item:SPItem) => {
                console.log('Updated Item:', item);
                setService(item);
            });*/
        }
    }, [status]);

    const statusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('Status Changed');
        props.updateStatus(service, statusOptions[e.target.selectedIndex]);
        setColor(Colors[e.target.selectedIndex]);
        setIcon(Icons[e.target.selectedIndex]);
        setStatus(statusOptions[e.target.selectedIndex]);
    }
    const Card = (
        <>
            <StatusCard color={color} {...props.flippedProps}>
                <Icon content={icon} color={color}>
                    <Title>{props.service.Title}</Title>
                    {!props.updateStatus && <span>{service.Status}</span> || (
                    <DropDown value={service.Status.toLowerCase()} onChange={statusChange}>
                        {statusOptions.map((option:string,) => {
                            return <option key={option.toLowerCase()} value={option.toLowerCase()}>{option}</option>
                        })}
                    </DropDown>
                    )}
                </Icon>
            </StatusCard>
        </>
    )
    return Card;

}

export default ServiceCard;
