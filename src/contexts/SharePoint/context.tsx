import { SPFI } from "@pnp/sp";
import { createContext, Dispatch } from "react";
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import "@pnp/sp/fields"
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import "@pnp/sp/security";
import "@pnp/sp/site-users/web";
import "@pnp/sp/context-info";
import "@pnp/sp/site-groups";
import "@pnp/sp/publishing-sitepageservice";
import "@pnp/sp/content-types";
import '@pnp/sp/views';

import StatusAppConfig from '../../types/StatusAppConfig';
import Screen from '../../enums/Screen';
import { ISiteGroupInfo } from "@pnp/sp/site-groups";

const ProviderContext = createContext({provider: {
    sp: {} as SPFI,
    StatusConfig: {
        currentUser: undefined, 
        configList: undefined,
        siteGroups: Array<ISiteGroupInfo>(),
        screen: Screen.Loading,
        Loaded: false,
    } as StatusAppConfig
}, actions: {
    setProvider: (sp: SPFI) => {},
    setStatusConfig: (StatusConfig: Object) => {}
}});

export default ProviderContext;