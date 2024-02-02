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
        console.log(LoadStatus);
        switch(LoadState){
            case LoadStep.RetrieveUser:
                setLoadStatus('Retrieving User');
                getUser();
                break;
            case LoadStep.GetConfigList:
                setLoadStatus('Retrieving Config List');
                GetConfigList();
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

      },[LoadState, StatusConfig.pageconfig])

    async function getUser() {
      
      let user =  await sp.web.currentUser();   
      setStatusConfig({...StatusConfig, currentUser: user})
      setUser(user);
      setLoadState(LoadStep.GetConfigList)
    }
    
    async function GetConfigList(){
        
        let configList;
        let config = StatusConfig;
        let loadState = LoadState;
        try{
            configList = await sp.web.lists.getByTitle('StatusAppConfigList')();
            config.configList = sp.web.lists.getByTitle('StatusAppConfigList');
            config.configListId = configList.Id
            loadState = LoadStep.GetPageConfig;
        }
        catch(e){
            if(user.IsSiteAdmin)
                // List doesn't exist and you're an admin.  Let's install it.  
                config.screen = Screen.Install;
            else
                // List doesn't exist and you're not an admin.  Go to error page.
                config.screen = Screen.Setup;
                
        }
        finally{
            setStatusConfig({...config});
            setLoadState(loadState);
        }
    }

    async function GetPageConfig(){
        let config = StatusConfig;
        let loadState = LoadState;

        if(StatusConfig.pageconfig){
            loadState = LoadStep.LoadPageConfig;
        }
        else{
            const list =  StatusConfig.configList;
            const configItems = await list.items<SPStatusConfigItem[]>();
            
            // WE ARE GOING TO NEED GROUP NAMES FOR THIS
            const groups = await sp.web.siteGroups();
            const groupNames = groups.map((group) => {return group.Title});
            config.siteGroups = groupNames;

            if(configItems.length === 0){
                if(user.IsSiteAdmin){
                    config.screen = Screen.Setup;
                }
                       
                else{
                    config.screen = Screen.Setup; //TODO Make a new view for when a config page does not exist and user is not admin
                }
            }
            else{
                try{
                    const pageConfig = configItems.find((item: SPStatusConfigItem) => {return item.Page.toLowerCase() === window.location.pathname.toLowerCase()});
                    console.log('pageConfig',pageConfig);
                    if(pageConfig === undefined) {
                        config.screen = Screen.Setup;
                    }
                    else{
                        config.pageconfig = pageConfig;
                        config.StatusList = {listId: pageConfig.StatusListId};
                        loadState = LoadStep.LoadPageConfig;
                    }
                }
                catch (e){
                    console.log(e);
                    config.screen = Screen.Setup;
                }
            }
            setStatusConfig({...config});
            setLoadState(loadState);
        }
    }

    async function LoadPageConfig(){
        const list = sp.web.lists.getById(StatusConfig.StatusList.listId);
        const listItems = await list.items<SPItem[]>();
        const newChangeToken = GetChangeToken(StatusConfig.StatusList.listId);
        const listInfo = await list();
        // TODO: Check if user is in admin group
        //const users = await sp.web.siteGroups.getById(parseInt(StatusConfig.pageconfig.AdminGroupId)).users();
        const adminUser = true;//users.find((u) => u.UserId === user.UserId)
        let isAdmin;
        if(adminUser){
            isAdmin = true;
        }

        setStatusConfig({...StatusConfig, screen: Screen.App, Loaded: true, StatusList: { list: list, listId: listInfo.Id, listItems: listItems, changeToken: newChangeToken, isAdmin: isAdmin}})
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
