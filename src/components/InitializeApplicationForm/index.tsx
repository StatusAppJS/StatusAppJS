import React, { FunctionComponent, useEffect, useState } from 'react';
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';
import { IListInfo } from '@pnp/sp/lists/types';
import { v4 as uuid } from 'uuid';
import ChoiceField from '../FormFields/ChoiceField';


// Styled Components
import { StyledForm  as FormContainer, FormHeader, StyledInput, StyledLabel, InputContainer } from '../StyledComponents/InitializeApplicationForm';

type Choice = {
    Title: string,
    Id: string,
}


const InitializeApplicationForm: FunctionComponent = () => {

  const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();

  const [statuses, setStatuses] = useState<Array<Choice>>([{
    Title: '',
    Id: uuid()
} as Choice]);
  const [categories, setCategories] = useState<Array<Choice>>([{
    Title: '',
    Id: uuid()
} as Choice]);

  useEffect(() => {
    console.log('repainting statuses');
    console.log(statuses);
  }, [statuses]);

  async function createList(){
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
    const list = await sp.web.lists.ensure(listInfo.Title, listInfo.Description, listInfo.BaseTemplate, listInfo.ContentTypesEnabled, listInfo);
    if(list.created){
      console.log(list);
    }
    else{
      console.log('List already exists');
      console.log(list);
    }
  }
  
  function addCategory(){
    console.log('Adding category');
  }

  return (
    <>
        <FormContainer>
          <FormHeader>
              <h1>Initialize Application</h1>
          </FormHeader>
          <div>
              <InputContainer>
                  <StyledLabel htmlFor="Title">List Title</StyledLabel>
                  <StyledInput type="text" placeholder="Title" />                    
              </InputContainer>
              <InputContainer>
                  <StyledLabel htmlFor="Status">Status</StyledLabel>
                  <ChoiceField choices={statuses} setChoices={setStatuses} />
              </InputContainer>
              <InputContainer>
                  <StyledLabel htmlFor="Category">Category</StyledLabel>
                  <ChoiceField choices={categories} setChoices={setCategories} />
              </InputContainer>
              <input type="button" onClick={addCategory} value="Create List" />
          </div>
        </FormContainer>
    </>
  );
}

export default InitializeApplicationForm;