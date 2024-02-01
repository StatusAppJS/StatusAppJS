import React, { FunctionComponent, createRef, useEffect, useRef, useState } from "react"
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';
import SPStatusConfigItem from "../../types/SPStatusConfigItem";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import SPItem from "../../types/SPItem";
import { Category } from "../../components/Category";
import { IChangeQuery, IChangeToken } from "@pnp/sp/types";
import { assign, getRandomString } from '../../utils/pnp2';
import { toast } from "react-toastify";
import {ChoiceFieldInfo} from "../../types/ChoiceFieldInfo";
import GetChangeToken from "../../utils/GetChangeToken";
import { AppContainer, Header, StatusApp } from "../../components/StyledComponents/App";
import { Flipped, Flipper } from "react-flip-toolkit";
import ServiceCard from "../../components/ServiceCard";
import { animateElementIn, animateElementOut, simultaneousAnimations } from "../../utils/FlipAnimation";
import { IItemUpdateResult, IItemUpdateResultData } from "@pnp/sp/items";
// ALL LOGIC SETTING UP SHAREPOINT SYSTEM SHOULD GO HERE, IF ANYTHING IS MISSING DIRECT TO EITHER THE APP NOT SETUP OR INSTALL SCREEN BASED ON SCA STATUS

function StatusApplication<FunctionComponent>() {

    const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
    const list = sp.web.lists.getById(StatusConfig.StatusList.listId);
    type ServiceGroup = {
        category: string,
        services: Array<SPItem>,
    }
    const [services, setServices] = useState<Array<SPItem>>([]);
    const [serviceGroups, setServiceGroups] = useState<Array<ServiceGroup>>([]); // [0] = Operational, [1] = Degraded, [2] = Non-Operational
    const [lastModified, setLastModified] = useState(new Date());
    
    let timerRef = useRef<any>();
    let flipTrigger = useRef<any>();

    useEffect(() => {
        if(services.length > 0) return;
        
        getServices().then((result: {services: SPItem[], categories: ChoiceFieldInfo}) => {
            const categories = result.categories.Choices;
            console.log(categories);
            let tempSG = [...serviceGroups];
            for(var i = 0; i < categories.length; i++){
                tempSG =[...tempSG, {category: categories[i], services: result.services.filter((s:SPItem) => s.Categories === categories[i])}];
            }
            setServiceGroups([...tempSG]);
            flipTrigger.current = getRandomString(10);
            setServices(result.services);
            const lm = new Date(result.services.sort((a,b) => {return new Date(b.Modified).getTime() - new Date(a.Modified).getTime()})[0].Modified);
            setLastModified(lm);
        });
        return;
    },[]);

    useEffect(() => {
        console.log('Updating Last Modified Date');
        if(services.length > 0){
            var lastModifiedDate = new Date(services.sort((a,b) => {return new Date(b.Modified).getTime() - new Date(a.Modified).getTime()})[0].Modified);
            setLastModified(lastModifiedDate);
        }
    },[services]);

    useEffect(pollForChanges,[serviceGroups]);

    async function getServices() {
        const items = await list.items<Array<SPItem>>();
          
        return {
            services: items, 
            categories: await list.fields.getByInternalNameOrTitle("Categories")<ChoiceFieldInfo>()
        }
    }

    function pollForChanges() {
        let ChangeToken: IChangeToken | undefined = undefined;
        list().then((l) => {
            ChangeToken = GetChangeToken(l.Id);
        });

        clearInterval(timerRef.current);
        timerRef.current = setInterval(async () => {
            const latestChangeToken = await getChanges(ChangeToken)
            ChangeToken = latestChangeToken;
        }, 15000);
        return () => clearInterval(timerRef.current);
    }

    async function getChanges(ChangeToken: IChangeToken | undefined) {
        const ct = ChangeToken;
        const changeQuery: IChangeQuery = {
            ChangeTokenStart: ct,
            Item: true,
            Update: true,
        }

        const changes = await list.getChanges(changeQuery);
        
        const itemChanges = changes.filter((change: { ChangeType: number; }) => change.ChangeType === 2);
        
        if(itemChanges.length > 0){
            console.log('Item Changes:',itemChanges.length);
            itemChanges.forEach(async (change: any) => {
                console.log("Change Detected, Updating Service: " + change.ItemId);
                await updateServiceById(change.ItemId)
                flipTrigger.current = getRandomString(10);
            });
        }

        if(itemChanges.length > 0){
            return itemChanges.slice(-1)[0].ChangeToken as IChangeToken;
        }
        else{
            return ct as IChangeToken;
        }
    }

    // UPDATE THE SHAREPOINT LIST WITH THE NEW STATUS
    function UpdateStatus(service: SPItem, status: string) {
        console.log(`Updating Status to ${status} from App Component in SharePoint`);
        var data = sp.web.lists.getById(StatusConfig.pageconfig.StatusListId).items.getById(service.Id).update({
            Status: status
        })
        data.then((item: IItemUpdateResult) => {
            console.log('Status updated on SharePoint...  Refreshing UI...');
            item.item().then((i: SPItem) => {refreshUI(i);})
        })
    }

    function refreshUI(item: SPItem) {
        let tempSG = [...serviceGroups];
        const serviceGroup = tempSG.find((sg: ServiceGroup) => sg.category === item.Categories);
        const tempServices = serviceGroup.services.map((s: SPItem) => {
            if (s.Id === item.Id) {
                s = assign(s,item);
                console.log(s.Title + ' set to ' + s.Status);
            }
            return s;
        });
        tempSG.find((sg: ServiceGroup) => sg.category === item.Categories).services = tempServices;
        setServiceGroups([...tempSG]);

        const toastMessage = `${item.Title} is ${item.Status}`
        switch(item.Status.toLowerCase()){
            case 'operational':
                toast.success(toastMessage, {autoClose: 3000});
                break;
            case 'degraded':
                toast.warn(toastMessage, {autoClose: 3000});
                break;
            case 'non-operational':
                toast.error(toastMessage, {autoClose: 3000});
                break;
            default:
                toast.info(`${item.Title} Updated`, {autoClose: 3000});
                break;
        }
    }

    // UPDATE THE UI WITH CHANGES FROM SHAREPOINT
    async function updateServiceById(id: number) {
        const item: SPItem = await list.items.getById(id)();
        console.log('Updating UI with Server Changes...');
       
        refreshUI(item);

    }

    return (
        <>
            <StatusApp>
               <Header>
                    <h1>
                        Last Updated: {lastModified.toLocaleString()}
                    </h1>
                </Header>
                    <AppContainer>
                        {serviceGroups.map((sg: ServiceGroup) => {
                            return(
                                <Category services={sg.services} category={sg.category} key={`${getRandomString(10)}`} updatestatus={UpdateStatus} />
                            )
                        })}
                    </AppContainer>
            </StatusApp>
        </>
    )
}

export default StatusApplication;

