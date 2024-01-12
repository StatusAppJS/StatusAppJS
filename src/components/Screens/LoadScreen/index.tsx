import React, { FunctionComponent, useEffect, useState } from "react"
import UseProviderContext from '../../../contexts/SharePoint/UseProviderContext';
import SPStatusConfigItem from "../../../types/SPStatusConfigItem";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import Screen from "../../../enums/Screen";
import Loading from "./Loading";

import { StyledLoadingContainer, StyledHeader, StyledSubHeader } from './StyledLoadingComponents';
// ALL LOGIC SETTING UP SHAREPOINT SYSTEM SHOULD GO HERE, IF ANYTHING IS MISSING DIRECT TO EITHER THE APP NOT SETUP OR INSTALL SCREEN BASED ON SCA STATUS

function LoadScreen<FunctionComponent>() {

    const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
    const [user, setUser] = useState<ISiteUserInfo | undefined>(undefined);
    useEffect(() => {
      getUser();
    },[])
       
    async function getUser() {
      let user =  await sp.web.currentUser();   
      setStatusConfig({...StatusConfig, currentUser: user})
      setUser(user);
    }
    

    async function LoadApp() {
      const currentUser = user;
      if(!currentUser.IsSiteAdmin){
        // Redirect to StatusApplication Screen
        console.log('Not Site Admin');
      }

      if(StatusConfig.configListId === undefined){
        const tempStatus = {...StatusConfig};
        const configList = await sp.web.lists.getByTitle('StatusAppConfigList')();
        console.log(configList);
      }
    }

    function Install(){
      setStatusConfig({...StatusConfig, screen: Screen.Install});
    }

    return (
        <>
          <StyledLoadingContainer>
            <StyledHeader>Loading</StyledHeader>
            <div className="spinner">
              <Loading />
              {user && user.IsSiteAdmin ? <StyledSubHeader onClick={Install}>Install</StyledSubHeader> : <></> }
            </div>
          </StyledLoadingContainer>
        </>
    )
}

export default LoadScreen
