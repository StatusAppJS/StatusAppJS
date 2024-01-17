import { FunctionComponent, useEffect, useState } from 'react';
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';
import { IListInfo } from '@pnp/sp/lists/types';
import { v4 as uuid } from 'uuid';
import StyledChoiceField from '../FormFields/StyledChoiceField';


// Styled Components
import { StyledForm  as FormContainer, StyledSubmitButton, FormHeader, StyledInput, StyledLabel, InputContainer } from '../StyledComponents/InitializeApplicationForm';
import { IViewInfo } from '@pnp/sp/views';
import { FieldTypes, IFieldInfo } from '@pnp/sp/fields/types';

import { Choice } from '../../types/ChoiceFieldValue';

type ListCreationFormProps = {
  onCreateList: (listInfo: Partial<IListInfo>) => Promise<void>
}

const ListCreationForm: FunctionComponent<ListCreationFormProps> = ({onCreateList}: ListCreationFormProps) => {

  const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();

  const [statuses, setStatuses] = useState([{
    Title: '',
    Color: '#000000',
    Id: uuid()
  } as Choice]);

  const [categories, setCategories] = useState([{
    Title: '',
    Color: '#000000',
    Id: uuid()
  } as Choice])
  
  const [listValues, setListValues] = useState<Partial<IListInfo>>({
    Title: "",
    Description: "Config List for the Status Application",
    BaseTemplate: 100,
    AllowContentTypes: true,
    ContentTypesEnabled: true,
    ContentTypes: [],
    Fields:[
      {
        Title: "Status",
        InternalName: 'StatusAppStatus',
        FieldTypeKind: FieldTypes.Choice,
        Group: 'StatusApp',
        Choices: [...(statuses.map((i) => i.Title))]
      } as Partial<IFieldInfo>,
      {
        Title: 'Categories',
        InternalName: 'StatusAppCategories',
        FieldTypeKind: 6,
        Group: 'StatusApp',
        Choices: [...(categories.map((i) => i.Title))]
      } as Partial<IFieldInfo>
    ]
  })
  
  useEffect(() => {
    setListValues({...listValues, Fields: listValues.Fields.filter((field) => {
      if(field.Title === 'Status')
        field.Choices = [...(statuses.map((i) => i.Title))]
      if(field.Title === 'Categories')
        field.Choices = [...(categories.map((i) => i.Title))]
      return field;
    })})
  },[statuses, categories])

  /*
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
*/
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
                  <StyledChoiceField key={`Status123`} childKey={`Status`} choices={statuses} setChoices={setStatuses} />
              </InputContainer>
              <InputContainer>
                  <StyledLabel htmlFor="Category">Categories</StyledLabel>
                  <StyledChoiceField key={`Categories123`} childKey={`Category`} choices={categories} setChoices={setCategories} />
              </InputContainer>
              <StyledSubmitButton onClick={onCreateList.bind(this,listValues)}>
                Create List
              </StyledSubmitButton>
          </div>
        </FormContainer>
    </>
  );
}

export default ListCreationForm;