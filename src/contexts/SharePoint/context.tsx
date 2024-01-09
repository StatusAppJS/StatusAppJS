import { SPFI } from "@pnp/sp";
import { createContext } from "react";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import "@pnp/sp/security";
import "@pnp/sp/site-users/web";
import "@pnp/sp/context-info";
import "@pnp/sp/site-groups";

const ProviderContext = createContext({provider: {
    sp: {} as SPFI,
    StatusConfig: {}
}, actions: {}});

export default ProviderContext;