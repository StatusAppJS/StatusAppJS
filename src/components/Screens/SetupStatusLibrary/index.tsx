import React, { FunctionComponent, useEffect } from "react"
import UseProviderContext from '../../../contexts/SharePoint/UseProviderContext';
import SPStatusConfigItem from "../../../types/SPStatusConfigItem";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import InitializeApplicationForm from "../../InitializeApplicationForm";
import { IListInfo } from "@pnp/sp/lists/types";
import { IViewInfo } from "@pnp/sp/views/types";
import { AddChoiceProps, ChoiceFieldFormatType, FieldTypes, IFieldCreationProperties, IFieldInfo } from "@pnp/sp/fields/types";
// ALL LOGIC SETTING UP SHAREPOINT SYSTEM SHOULD GO HERE, IF ANYTHING IS MISSING DIRECT TO EITHER THE APP NOT SETUP OR INSTALL SCREEN BASED ON SCA STATUS

const SetupStatusLibrary: FunctionComponent = () => {

    const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
    
    useEffect(()=>{
        var listInfo: Partial<IListInfo> = {
            Title: "StatusAppList",
            Description: "List For the Status Application",
            BaseTemplate: 100,
            AllowContentTypes: true,
            ContentTypesEnabled: true,
            Hidden: true,
            Views: [],
            Fields: [{
              Title: 'Status',
              InternalName: 'StatusAppStatus',
              FieldTypeKind: FieldTypes.Choice,
              Group: 'StatusApp',
              Choices: ['Up','Degraded','Down']
            } as Partial<IFieldInfo>, {
              Title: 'Categories',
              InternalName: 'StatusAppCategories',
              FieldTypeKind: FieldTypes.Choice,
              Group: 'StatusApp',
              Choices: ['Hosted', 'Collaborative']
            } as Partial<IFieldInfo>]
          };

        addList(listInfo);
    },[])

    async function addList(listInfo: Partial<IListInfo>) {
      console.log('creating generic status list');
        const result = await sp.web.lists.ensure(listInfo.Title, listInfo.Description, listInfo.BaseTemplate, listInfo.ContentTypesEnabled);
        let list;
        if(result.created){
          list = await result.list();

          listInfo.Fields.map(async (field) => {
            const f = await sp.web.lists.getByTitle(result.data.Title).fields.addChoice(field.Title, {Choices: field.Choices, EditFormat: ChoiceFieldFormatType.Dropdown, FillInChoice: false, Group: 'StatusApp'});
            await result.list.views.getByTitle('All Items').fields.add(field.Title);
            console.log('Added Field: ', f);
          });
        }
        console.log(list);
    }

    return (
        <>
            <h1>Setup Status Library</h1><br />
            <InitializeApplicationForm />
            
        </>
    )
}

export default SetupStatusLibrary;


