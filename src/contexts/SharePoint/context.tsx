import { SPFI } from "@pnp/sp";
import { createContext } from "react";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import "@pnp/sp/security";
import "@pnp/sp/site-users/web";
const ProviderContext = createContext({provider: {
    sp: {} as SPFI
}, actions: {}});

export default ProviderContext;