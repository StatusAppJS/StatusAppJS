import { SPBrowser, spfi } from "@pnp/sp";
import { useState } from 'react';
import ProviderContext from './context';
import UseProviderContext from './UseProviderContext';

declare var _spPageContextInfo: any;

const SharePointProvider = ({ children }: { children: any }) => {
    const sp = spfi().using(SPBrowser({ baseUrl: "https://intelshare.intelink.gov/sites/hqmcintel" }));

  const [provider, setProvider] = useState(sp);
  const value = {
    provider: { sp },
    actions: { setProvider }
  };

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
}

export default SharePointProvider;