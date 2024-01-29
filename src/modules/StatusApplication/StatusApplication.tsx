import React, { FunctionComponent, useEffect, useState } from "react"
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
// ALL LOGIC SETTING UP SHAREPOINT SYSTEM SHOULD GO HERE, IF ANYTHING IS MISSING DIRECT TO EITHER THE APP NOT SETUP OR INSTALL SCREEN BASED ON SCA STATUS

function StatusApplication<FunctionComponent>() {

    const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
    const list = sp.web.lists.getById(StatusConfig.StatusList.listId);
    const [services, setServices] = useState<Array<SPItem>>([]);
    const [categories, setCategories] = useState<Array<string>>([]);
    const [lastModified, setLastModified] = useState(new Date());

    useEffect(pollForChanges,[]);

    useEffect(() => {
        getServices().then((result) => {
            console.log(result);
            setServices(result.services);
            setCategories(result.categories.Choices);
            const lm = new Date(result.services.sort((a,b) => {return new Date(b.Modified).getTime() - new Date(a.Modified).getTime()})[0].Modified);
            setLastModified(lm);
        })
    });

    useEffect(() => {
        console.log('Updating Last Modified Date');
        if(services.length > 0){
            var lastModifiedDate = new Date(services.sort((a,b) => {return new Date(b.Modified).getTime() - new Date(a.Modified).getTime()})[0].Modified);
            setLastModified(lastModifiedDate);
        }
    },[services]);

    async function getServices() {
        return {
            services: await list.items<Array<SPItem>>(), 
            categories: await list.fields.getByInternalNameOrTitle("Categories")<ChoiceFieldInfo>()
        }
    }

    function pollForChanges() {
        let ChangeToken: IChangeToken | undefined = undefined;
        list().then((l) => {
            ChangeToken = GetChangeToken(l.Id);
        });

        const timer = setInterval(async () => {
            const latestChangeToken = await getChanges(ChangeToken)
            ChangeToken = latestChangeToken;
        }, 5000);
        return () => clearInterval(timer);
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
    async function UpdateStatus(service: SPItem, status: string): Promise<SPItem> {
        console.log(`Updating Status to ${status} from App Component in SharePoint`);
        var data = await sp.web.lists.getByTitle('IEMO Services Statuses').items.getById(service.Id).update({
            Status: status
        })
        console.log("Status Updated on SharePoint...  Waiting for changetoken to refresh UI...");
        const item: SPItem = await data.item();
        return item;
    }

    // UPDATE THE UI WITH CHANGES FROM SHAREPOINT
    async function updateServiceById(id: number) {
        const item: SPItem = await list.items.getById(id)();
        console.log('Updating UI with Server Changes...');
        
        services.map((s: SPItem) => {
            if (s.Id === item.Id) {
                s = assign(s,item);
                console.log(s.Title + ' set to ' + s.Status);
            }
        });
        setServices([...services]);
        switch(item.Status.toLowerCase()){
            case 'up':
                toast.success(`${item.Title} is Up`, {autoClose: 3000});
                break;
            case 'degraded':
                toast.warn(`${item.Title} is Degraded`, {autoClose: 3000});
                break;
            case 'down':
                toast.error(`${item.Title} Down`, {autoClose: 3000});
                break;
            default:
                toast.info(`${item.Title} Updated`, {autoClose: 3000});
                break;
        }
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
                    {categories.sort().map((c: string) => <Category category={c} services={services.filter((s: SPItem) => s.Categories === c)} key={`${getRandomString(10)}`} updateFunction={UpdateStatus} />)}
                </AppContainer>
            </StatusApp>
        </>
    )
}

export default StatusApplication;
