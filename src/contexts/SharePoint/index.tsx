import { SPBrowser, spfi } from "@pnp/sp";
import { useEffect, useState } from 'react';
import { v5 as newGuid } from 'uuid';
import ProviderContext from './context';
import { stringIsNullOrEmpty } from '@pnp/core'
import StatusAppConfig from '../../types/StatusAppConfig';

declare const _spPageContextInfo: any;

const SharePointProvider = ({ children }: { children: any }) => {
  const sharepoint = spfi().using(SPBrowser({ baseUrl: _spPageContextInfo.webAbsoluteUrl }));

  const [sp, setProvider] = useState(sharepoint);
  const [StatusConfig, setStatusConfig] = useState(Object() as StatusAppConfig);
  const value = {
    provider: { sp, StatusConfig },
    actions: { setProvider, setStatusConfig }
  };

  useEffect(() => {
    if(StatusConfig.listId === undefined || StatusConfig.ctId === undefined) return;
    const list = sp.web.lists.getById(StatusConfig.listId)();
    console.log(list);
    list.then((list) => {
      console.log(`List: ${list.Title}`);
    }).catch((error) => {
      if(error.status === 404){
        console.log('List does not exist');
        setStatusConfig({...StatusConfig, listExists: false});
      }
      console.log(error.status);
      console.log(error.statusText);
    })

  }, [StatusConfig.listId, StatusConfig.ctId]);
  async function initializeSharePoint() {
    const web = await sp.site.rootWeb();
    const tempStatus = {...StatusConfig};
    tempStatus.listId = newGuid('StatusAppList', web.Id);
    tempStatus.ctId = newGuid('StatusAppContentType', web.Id);
    setStatusConfig(tempStatus);
  }

  if(stringIsNullOrEmpty(StatusConfig.listId) || stringIsNullOrEmpty(StatusConfig.ctId))
    initializeSharePoint();

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
}

export default SharePointProvider;