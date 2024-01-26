import React, { FunctionComponent, useEffect, useState } from "react"
import UseProviderContext from '../../../contexts/SharePoint/UseProviderContext';
import SPStatusConfigItem from "../../../types/SPStatusConfigItem";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import Screen from "../../../enums/Screen";
import LoadStep from '../../../enums/LoadStep';
import Loading from "../../../Assets/Animations/Loading";
import GetChangeToken from '../../../utils/GetChangeToken'

import { StyledLoadingContainer, StyledLoadingHeader, StyledLoadingSubHeader } from '../../StyledComponents/LoadScreen';
import SPItem from "../../../types/SPItem";

// ALL LOGIC SETTING UP SHAREPOINT SYSTEM SHOULD GO HERE, IF ANYTHING IS MISSING DIRECT TO EITHER THE APP NOT SETUP OR INSTALL SCREEN BASED ON SCA STATUS

function LoadScreen<FunctionComponent>() {

    const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
    const [user, setUser] = useState<ISiteUserInfo | undefined>(undefined);
    const [LoadStatus, setLoadStatus ] = useState('');
    const [LoadState, setLoadState ] = useState(LoadStep.RetrieveUser)

    useEffect(() => {
        switch(LoadState){
            case LoadStep.RetrieveUser:
                setLoadStatus('Retrieving User');
                getUser();
                break;
            case LoadStep.GetConfigList:
                setLoadStatus('Retrieving Config List');
                GetConfigList()
                break;
            case LoadStep.GetPageConfig:
                setLoadStatus('Retrieving Page Config');
                GetPageConfig();
                break;
            case LoadStep.LoadPageConfig:
                setLoadStatus('Loading Application');
                LoadPageConfig();
                break;
        }
      },[LoadState])

    async function getUser() {
      
      let user =  await sp.web.currentUser();   
      setStatusConfig({...StatusConfig, currentUser: user})
      setUser(user);
      setLoadState(LoadStep.GetConfigList)
    }
    
    async function GetConfigList(){
        
        let configList;
        try{
            configList = await sp.web.lists.getByTitle('StatusAppConfigList')();
            setStatusConfig({...StatusConfig, configList: configList, confiListId: configList.Id});
            setLoadState(LoadStep.GetPageConfig);
        }
        catch(e){
            if(user.IsSiteAdmin)
                // List doesn't exist and you're an admin.  Let's install it.  
                setStatusConfig({...StatusConfig, screen: Screen.Install});
            else
                // List doesn't exist and you're not an admin.  Let's set it up.
                setStatusConfig({...StatusConfig, screen: Screen.Setup});
        }
    }

    async function GetPageConfig(){
        
        let pageConfig;
    
        const configItems = await sp.web.lists.getByTitle('StatusAppConfigList').items<SPStatusConfigItem[]>()
        pageConfig = configItems.find((item: SPStatusConfigItem) => {item.Page.toLowerCase() === window.location.pathname.toLowerCase()});
        if(!pageConfig){
            if(user.IsSiteAdmin)
                setStatusConfig({...StatusConfig, screen: Screen.Setup});
            else
            setStatusConfig({...StatusConfig, screen: Screen.Setup}); //TODO Make a new view for when a config page does not exist and user is not admin
        }   
        else{
            setStatusConfig({...StatusConfig, pageConfig: pageConfig, StatusList: {listId: pageConfig.StatusListId}});
            setLoadState(LoadStep.LoadPageConfig);
        }
    }

    async function LoadPageConfig(){
        const config =  StatusConfig.pageconfig;
        const list = sp.web.lists.getById(config.StatusListId);
        const listItems = await list.items<SPItem[]>();
        const newChangeToken = GetChangeToken(config.StatusListId);
        const users = await sp.web.siteGroups.getById(parseInt(config.AdminGroupId)).users();
        const adminUser = users.find((u) => u.UserId === user.UserId)
        let isAdmin;
        if(adminUser){
            isAdmin = true;
        }
        
        setStatusConfig({...StatusConfig, Loaded: true, StatusList: { list: list, listItems: listItems, changeToken: newChangeToken, isAdmin: isAdmin}})
    }

    return (
        <>
          <StyledLoadingContainer>
            <StyledLoadingHeader>Loading</StyledLoadingHeader>
            <div className="spinner">
              <Loading />
              <StyledLoadingSubHeader>{LoadStatus}</StyledLoadingSubHeader>
            </div>
          </StyledLoadingContainer>
        </>
    )
}

export default LoadScreen
