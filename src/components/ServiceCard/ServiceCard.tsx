import * as React from 'react';
import { useEffect, useRef } from 'react';
import SPItem from '../../types/SPItem';
import SPStatusConfigItem from '../../types/SPStatusConfigItem';

import { StatusCard, DropDown, Icon, Title } from '../StyledComponents/ServiceCard';
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';

interface CardProps {
    service: SPItem;
    updateStatus: (service: SPItem, status: string) => Promise<SPItem>;
}

const ServiceCard: React.FunctionComponent<CardProps> = (props: CardProps) => {
    const { provider: {StatusConfig} } = UseProviderContext();

    const [status, setStatus] = React.useState(props.service.Status);
    const [color, setColor] = React.useState('');
    const [icon, setIcon] = React.useState('');
    const [service, setService] = React.useState<SPItem>(props.service);
    const statusTrigger = useRef<string>(props.service.Status);

    const config: SPStatusConfigItem = StatusConfig.pageconfig;
    const options = JSON.parse(config.StatusOptions as string);
    const statusOptions:Array<string> = options.options.map((option:any) => option.Title);
    const Colors:Array<string> = options.options.map((option:any) => option.Color);
    const Icons:Array<string> = options.options.map((option:any) => option.Icon);

    useEffect(() => {
        if(statusTrigger.current !== status) {
            statusTrigger.current = status;
            console.log(`Updating Status to ${status} from Card UseEffect`);
            const returnItem: Promise<SPItem> = props.updateStatus(props.service, status);
            returnItem.then((item:SPItem) => {
                console.log('Updated Item:', item);
                setService(item);
            });
        }
    }, [status]);

    const statusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('Status Changed');
        setColor(Colors[e.target.selectedIndex]);
        setIcon(Icons[e.target.selectedIndex]);
        setStatus(statusOptions[e.target.selectedIndex]);
    }
    const Card = (
        <>
            <StatusCard color={color}>
                <Icon content={icon} color={color}>
                    <Title>{props.service.Title}</Title>
                    <DropDown value={service.Status.toLowerCase()} onChange={statusChange}>
                        {statusOptions.map((option:string,) => {
                            return <option value={option.toLowerCase()}>{option}</option>
                        })}
                    </DropDown>
                </Icon>
            </StatusCard>
        </>
    )
    return Card;

}

export default ServiceCard;
