import React, { FunctionComponent } from "react"
import UseProviderContext from '../../../contexts/SharePoint/UseProviderContext';
import SPStatusConfigItem from "../../../types/SPStatusConfigItem";
// ALL LOGIC SETTING UP SHAREPOINT SYSTEM SHOULD GO HERE, IF ANYTHING IS MISSING DIRECT TO EITHER THE APP NOT SETUP OR INSTALL SCREEN BASED ON SCA STATUS

const LoadScreen: FunctionComponent = () => {

    const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();


    async function LoadApp() {
        if(StatusConfig.configListId === undefined){
            const configList = await sp.web.lists.ensure('StatusAppConfigList');
            
        }
        const user = await sp.web.currentUser();
        setStatusConfig({...StatusConfig, currentUser: user})
        console.log(user);
        console.log('Loading Application')
        const tempStatus = {...StatusConfig};
        const ensure = await sp.web.lists.ensure("StatusAppConfigList", "List to hold configs for this site collection", 100, true, {Hidden: true});
        
        if(ensure.created){
          //  Add Fields if Created;
          const page = await ensure.list.fields.addText("Page");
          const listId = await ensure.list.fields.addText("StatusListId");
          const groupId = await ensure.list.fields.addText('AdminGroupId');
          const defaultView = ensure.list.views.getByTitle('All Items');
          await defaultView.fields.add((await page.field()).Title)
          await defaultView.fields.add((await listId.field()).Title)
          await defaultView.fields.add((await groupId.field()).Title);
          setStatusConfig({...tempStatus, configListId: ensure.data.Id});
          // do stuff to load a configuration for this page.
        }
        else{
          console.log('List Exists, get specific config here');
          const allItems: SPStatusConfigItem[] = await ensure.list.items();
          const configs = (allItems).filter((item: SPStatusConfigItem) => item.Page = window.location.pathname);
          setStatusConfig({...tempStatus, configListId: ensure.data.Id, pageconfig: configs[0] || undefined});
        }
      }

    return (
        <>
            <h1>Loading</h1>
        </>
    )
}

export default LoadScreen;