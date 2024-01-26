import React, { FunctionComponent, useEffect, useState } from "react"
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';
import { StyledLoadingContainer, StyledLoadingHeader, StyledLoadingSubHeader } from '../../components/StyledComponents/LoadScreen';
import SPStatusConfigItem from "../../types/SPStatusConfigItem";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import Screen from "../../enums/Screen";
import Installing from '../../Assets/Animations/Installing';
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
            setStatusConfig({...tempStatus, configListId: ensure.data.Id, screen: Screen.Loading});
        }
    }
    return (
        <StyledLoadingContainer>
            <StyledLoadingHeader>Installing</StyledLoadingHeader>
                <Installing />
            <StyledLoadingSubHeader>{status}</StyledLoadingSubHeader>
        </StyledLoadingContainer>
    )
}

export default Install;