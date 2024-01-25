import React, { FunctionComponent, useEffect } from "react"
import UseProviderContext from '../../../contexts/SharePoint/UseProviderContext';
import SPStatusConfigItem from "../../../types/SPStatusConfigItem";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import ListCreationForm from "../../ListCreationForm";
import { IListInfo } from "@pnp/sp/lists/types";
import { IViewInfo } from "@pnp/sp/views/types";
import { AddChoiceProps, ChoiceFieldFormatType, FieldTypes, IFieldCreationProperties, IFieldInfo } from "@pnp/sp/fields/types";
import { Choice }  from '../../../types/ChoiceFieldValue';
// ALL LOGIC SETTING UP SHAREPOINT SYSTEM SHOULD GO HERE, IF ANYTHING IS MISSING DIRECT TO EITHER THE APP NOT SETUP OR INSTALL SCREEN BASED ON SCA STATUS

const SetupStatusLibrary: FunctionComponent = () => {

    const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();

    async function createList(listInfo: Partial<IListInfo>, statusInfo: Choice[]){
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

        const newConfig = await configListItems.add({
            Title: result.data.Title,
            Page: window.location.pathname.toLowerCase(),
            StatusListId: result.data.Id,
            StatusOptions: JSON.stringify({options: statuses}),
        });

        console.log('List should be added to the config list.  The next step is to add the admin group to the list');
        console.log('newConfig:',newConfig);
    }
    
    return (
        <>
            <div className="setup">
            <h1>Setup Status Library</h1>
            <ListCreationForm onCreateList={createList} />
            </div>
        </>
    )
}

export default SetupStatusLibrary;


