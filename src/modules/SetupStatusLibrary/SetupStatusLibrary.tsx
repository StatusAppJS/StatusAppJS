import React, { FunctionComponent, useEffect } from "react"
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';
import SPStatusConfigItem from "../../types/SPStatusConfigItem";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import ListCreationForm from "../../components/ListCreationForm";
import { IListInfo } from "@pnp/sp/lists/types";
import { IViewInfo } from "@pnp/sp/views/types";
import { AddChoiceProps, ChoiceFieldFormatType, FieldTypes, IFieldCreationProperties, IFieldInfo } from "@pnp/sp/fields/types";
import { Choice }  from '../../types/ChoiceFieldValue';
import Screen from "../../enums/Screen";
import { StyledLoadingContainer, StyledLoadingHeader } from "../../components/StyledComponents/LoadScreen";
import IStatusListInfo from "../../types/IStatusListInfo";
// ALL LOGIC SETTING UP SHAREPOINT SYSTEM SHOULD GO HERE, IF ANYTHING IS MISSING DIRECT TO EITHER THE APP NOT SETUP OR INSTALL SCREEN BASED ON SCA STATUS

const SetupStatusLibrary: FunctionComponent = () => {

    const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();

    async function createList(listInfo: Partial<IStatusListInfo>, statusInfo: Choice[]){
        const tempStatus = {...StatusConfig};
        console.log('Creating Status List');
        console.log(listInfo);

        const result = await sp.web.lists.add(listInfo.Title, listInfo.Description, listInfo.BaseTemplate, listInfo.ContentTypesEnabled);

        // for some reason Array.Map is not working correctly with the async calls.  I was forced into using a for loop :-(
        for(var i = 0; i < listInfo.Fields.length; i++){
            const field = listInfo.Fields[i];
            await sp.web.lists.getByTitle(result.data.Title).fields.addChoice(field.Title, {Choices: field.Choices, EditFormat: ChoiceFieldFormatType.Dropdown, FillInChoice: false, Group: 'StatusApp'});
            await result.list.views.getByTitle('All Items').fields.add(field.Title);
            console.log(field.Title,'added');
        }
        console.log('List should be created here.  The next step is registering it with the config list');

        // Now we need to add the list to the config list
        
        const configListItems = sp.web.lists.getByTitle('StatusAppConfigList').items;

        // CREATE JSON WITH THE STATUS OPTIONS
        const statuses = statusInfo.map((status:Choice) => {
            const newStatus:Partial<Choice> = {
                Title: null,
                Color: null,
                Icon: null
            };
            newStatus.Title = status.Title;
            newStatus.Color = status.Color;
            newStatus.Icon = status.Icon;
            return newStatus;
        })
        
        console.log('statusInfo:',{options: statuses});
        console.log(listInfo);
        const newConfig = await configListItems.add({
            Title: result.data.Title,
            Page: window.location.pathname.toLowerCase(),
            StatusListId: result.data.Id,
            AdminGroupId: listInfo.AdminGroupId.toString(),
            StatusOptions: JSON.stringify({options: statuses})
        });

        const statusConfigItem = newConfig.data as SPStatusConfigItem;

        statusConfigItem.StatusOptions = JSON.parse(statusConfigItem.StatusOptions as string);

        console.log('List should be added to the config list.  The next step is to add the admin group to the list');
        console.log('newConfig:',newConfig);
        setStatusConfig({...tempStatus, pageconfig: statusConfigItem, screen: Screen.Loading});
    }
    
    return (
        <>
            <StyledLoadingContainer>
                <StyledLoadingHeader>Setup Status Library</StyledLoadingHeader>
                <ListCreationForm onCreateList={createList} />
            </StyledLoadingContainer>
        </>
    )
}

export default SetupStatusLibrary;


