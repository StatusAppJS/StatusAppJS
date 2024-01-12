import React, { FunctionComponent } from "react"
import UseProviderContext from '../../../contexts/SharePoint/UseProviderContext';
import SPStatusConfigItem from "../../../types/SPStatusConfigItem";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
// ALL LOGIC SETTING UP SHAREPOINT SYSTEM SHOULD GO HERE, IF ANYTHING IS MISSING DIRECT TO EITHER THE APP NOT SETUP OR INSTALL SCREEN BASED ON SCA STATUS

function SetupStatusLibrary<FunctionComponent>() {

    const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
    
    return (
        <>
        
        </>
    )
}

export default SetupStatusLibrary;
