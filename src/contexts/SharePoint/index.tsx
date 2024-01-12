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
    
    console.log('Loading Application')
    
  }

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
}

export default SharePointProvider;