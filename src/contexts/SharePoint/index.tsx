import { SPBrowser, spfi } from "@pnp/sp";
import { useState } from 'react';
import ProviderContext from './context';

declare const _spPageContextInfo: any;

const SharePointProvider = ({ children }: { children: any }) => {
  const sharepoint = spfi().using(SPBrowser({ baseUrl: _spPageContextInfo.webAbsoluteUrl }));

  const [sp, setProvider] = useState(sharepoint);
  const [StatusConfig, setStatusConfig] = useState({});
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