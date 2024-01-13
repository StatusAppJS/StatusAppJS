import React, { FunctionComponent, useEffect, useState } from 'react';
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';
import { IListInfo } from '@pnp/sp/lists/types';
import { ChoiceFieldFormatType, IFieldInfo } from '@pnp/sp/fields/types';
import { v4 as uuid } from 'uuid';
import StyledChoiceField from '../FormFields/StyledChoiceField';
import ChoiceField from '../../types/Fields/ChoiceField';
import TextField from '../../types/Fields/TextField';

// Styled Components
import { StyledForm  as FormContainer, StyledSubmitButton, FormHeader, StyledInput, StyledLabel, InputContainer } from '../StyledComponents/InitializeApplicationForm';
import { IViewInfo } from '@pnp/sp/views';

type Choice = {
    Title: string,
    Id: string,
}


const InitializeApplicationForm: FunctionComponent = () => {

  const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();

  
  const [listValues, setListValues] = useState<Partial<IListInfo>>({
    Title: "",
    Description: "Config List for the Status Application",
    BaseTemplate: 100,
    AllowContentTypes: true,
    ContentTypesEnabled: true,
    Hidden: true,
    ContentTypes: [],
    Fields: []
  })
  const [statuses, setStatuses] = useState([{
    Title: '',
    Id: uuid()
  } as Choice]);
  /*
  useState<ChoiceField>({
    Title: 'Status',
    InternalName: 'StatusAppStatus',
    Group: 'StatusApp',
    FormatType: ChoiceFieldFormatType.Dropdown,
    Choices: [{
      Title: '',
      Id: uuid()
    } as Choice]
  } as ChoiceField);
*/
  const [categories, setCategories] = useState([{
    Title: '',
    Id: uuid()
  } as Choice])
  /*useState<ChoiceField>({
    Title: 'Categories',
    InternalName: 'StatusAppCategories',
    Group: 'StatusApp',
    FormatType: ChoiceFieldFormatType.Dropdown,
    Choices: [{
      Title: '',
      Id: uuid()
    } as Choice]
  } as ChoiceField);
*/
  /*
  useEffect(() => {
    console.log('repainting statuses');
    console.log(statuses);
  }, [statuses]);
*/

  async function createStatusList(){
    console.log('"Creating list" but really just initializing the app');
    setStatusConfig({...StatusConfig, initialized: true});
    var listInfo: Partial<IListInfo> = {
      Title: "StatusAppConfig",
      Description: "Config List for the Status Application",
      BaseTemplate: 100,
      AllowContentTypes: true,
      ContentTypesEnabled: true,
      Hidden: true,
      ContentTypes: []
    };

    const list = await sp.web.lists.ensure(listInfo.Title as string, listInfo.Description, listInfo.BaseTemplate, listInfo.ContentTypesEnabled, listInfo);
    if(list.created){
      console.log(list);
    }
    else{
      console.log('List already exists');
      console.log(list);
    }
  }

  return (
    <>
        <FormContainer>
          <FormHeader>
              <h1>Create Status List</h1>
          </FormHeader>
          <div>
              <InputContainer>
                  <StyledLabel htmlFor="Title">List Title</StyledLabel>
                  <StyledInput key={`StatusTitleField`} type="text" placeholder="Title" defaultValue={listValues.Title} onChange={(e) => {setListValues({...listValues, Title: e.target.value})}} />                    
              </InputContainer>
              <InputContainer>
                  <StyledLabel htmlFor="Status">Status Choices</StyledLabel>
                  <StyledChoiceField key={`Status123`} fixedGUID={`Status123`} choices={statuses} setChoices={setStatuses} />
              </InputContainer>
              <InputContainer>
                  <StyledLabel htmlFor="Category">Categories</StyledLabel>
                  <StyledChoiceField key={`Categories123`} fixedGUID={`Categories123`} choices={categories} setChoices={setCategories} />
              </InputContainer>
              <StyledSubmitButton onClick={createStatusList}>
                Create List
              </StyledSubmitButton>
          </div>
        </FormContainer>
    </>
  );
}

export default InitializeApplicationForm;