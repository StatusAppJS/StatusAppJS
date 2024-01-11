import { SPBrowser, spfi } from "@pnp/sp";
import { FunctionComponent, useEffect, useState } from 'react';
import { v5 as newGuid } from 'uuid';
import ProviderContext from './context';
import { stringIsNullOrEmpty } from '@pnp/core'
import StatusAppConfig from '../../types/StatusAppConfig';
import SPStatusConfigItem from '../../types/SPStatusConfigItem';

declare const _spPageContextInfo: any;

const SharePointProvider: FunctionComponent<{children: any}> = ({ children }: { children: any }) => {
  const sharepoint = spfi().using(SPBrowser({ baseUrl: _spPageContextInfo.webAbsoluteUrl }));
  
  const [sp, setProvider] = useState(sharepoint);
  const [StatusConfig, setStatusConfig] = useState(Object() as StatusAppConfig);
  const value = {
    provider: { sp, StatusConfig },
    actions: { setProvider, setStatusConfig }
  };

  useEffect(() => {

    //LIST ID SHOULD BE GOT HERE
    if(StatusConfig.configListId === undefined){
      setupStatusApp();
      return;
    }
    if(StatusConfig.pageconfig === undefined){
      sp.web.lists.getById(StatusConfig.configListId).items<SPStatusConfigItem[]>()
        .then((items:SPStatusConfigItem[]) => {
          const config = items.filter((item:SPStatusConfigItem) => item.Page === window.location.pathname)
          if(config.length > 0){
            setStatusConfig({...StatusConfig, pageconfig: config[0]});
          }
          else{
            setStatusConfig({...StatusConfig, pageconfig: null});
          }
          console.log(StatusConfig);
        });
      return;
    }
    console.log(StatusConfig);

  }, [StatusConfig.configListId, StatusConfig.pageconfig]);

  async function setupStatusApp() {
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
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
}

export default SharePointProvider;