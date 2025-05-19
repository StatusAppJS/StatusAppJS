import { sp as sharepoint } from "@pnp/sp";
import { FunctionComponent, useEffect, useState } from 'react';
import { v5 as newGuid } from 'uuid';
import ProviderContext from './context';
import StatusAppConfig from '../../types/StatusAppConfig';
import SPStatusConfigItem from '../../types/SPStatusConfigItem';

declare const _spPageContextInfo: any;

const SharePointProvider: FunctionComponent<{children: any}> = ({ children }: { children: any }) => {
  //const sharepoint = spfi().using(SPBrowser({ baseUrl: _spPageContextInfo.webAbsoluteUrl }));
  sharepoint.setup({
    sp: {
      baseUrl: _spPageContextInfo.webAbsoluteUrl,
      headers: {
        Accept: "application/json; odata=verbose",
        "Content-Type": "application/json; odata=verbose"
      }
    }
  })
  const [sp, setProvider] = useState(sharepoint);
  const [StatusConfig, setStatusConfig] = useState(Object() as StatusAppConfig);
  const value = {
    provider: { sp, StatusConfig },
    actions: { setProvider, setStatusConfig }
  };

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
}

export default SharePointProvider;