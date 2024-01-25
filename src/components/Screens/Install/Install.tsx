import React, { FunctionComponent, useEffect, useState, lazy, Suspense } from "react"
import UseProviderContext from '../../../contexts/SharePoint/UseProviderContext';
import SPStatusConfigItem from "../../../types/SPStatusConfigItem";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import Screen from "../../../enums/Screen";
const Installing = lazy(() => import('../../../Assets/Animations/Installing'))
// ALL LOGIC SETTING UP SHAREPOINT SYSTEM SHOULD GO HERE, IF ANYTHING IS MISSING DIRECT TO EITHER THE APP NOT SETUP OR INSTALL SCREEN BASED ON SCA STATUS

function Install<FunctionComponent>() {
    const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
    const [status, setStatus] = useState('Initializing');

    useEffect(() => {
        createConfigList();
    },[])

    async function createConfigList(){
        const tempStatus = {...StatusConfig};
        setStatus('Creating Config List...')
        const ensure = await sp.web.lists.ensure("StatusAppConfigList", "List to hold configs for this site collection", 100, true, {Hidden: true});

        if(ensure.created){
            //  Add Fields if Created;
            setStatus('Creating Page Field...')
            const page = await ensure.list.fields.addText("Page");
            setStatus('Creating ListId Field...')
            const listId = await ensure.list.fields.addText("StatusListId");
            setStatus('Creating AdminGroupId Field...')
            const groupId = await ensure.list.fields.addText('AdminGroupId');
            setStatus('Creating StatusOptions Field...')
            const statusOptions = await ensure.list.fields.addText('StatusOptions');
            setStatus('Creating Default View...')
            const defaultView = ensure.list.views.getByTitle('All Items');
            await defaultView.fields.add((await page.field()).Title)
            await defaultView.fields.add((await listId.field()).Title)
            await defaultView.fields.add((await groupId.field()).Title);
            await defaultView.fields.add((await statusOptions.field()).Title);
            setStatus('Installed, Redirecting to Setup Screen...')
            //setStatusConfig({...tempStatus, configListId: ensure.data.Id, screen: Screen.Loading});
            // do stuff to load a configuration for this page.
        }
    }
    return (
        <div style={{display: 'inline-flex',flexDirection: 'column'}}>
            <h1>Installing</h1>
            <Suspense fallback={<div>Getting Animation</div>}>
                <Installing />
            </Suspense>
            <h2>{status}</h2>
        </div>
    )
}

export default Install;