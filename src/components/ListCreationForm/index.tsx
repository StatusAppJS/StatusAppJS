import { FunctionComponent, createRef, useEffect, useRef, useState } from 'react';
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';
import { IListInfo } from '@pnp/sp/lists/types';
import { v4 as uuid } from 'uuid';
import StyledChoiceField from '../FormFields/StyledChoiceField';


// Styled Components
import { StyledForm  as FormContainer, StyledSubmitButton, FormHeader, StyledInput, StyledLabel, InputContainer } from '../StyledComponents/InitializeApplicationForm';
import { IViewInfo } from '@pnp/sp/views';
import { FieldTypes, IFieldInfo } from '@pnp/sp/fields/types';

import anime from 'animejs';
import { BlockPicker } from 'react-color';
import { Choice } from '../../types/ChoiceFieldValue';

type ListCreationFormProps = {
  onCreateList: (listInfo: Partial<IListInfo>, StatusInfo: Choice[]) => Promise<void>
}

const ListCreationForm: FunctionComponent<ListCreationFormProps> = ({onCreateList}: ListCreationFormProps) => {

  const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();

  const [previewRef, setPreviewRef] = useState(null);

  const previewPaneRef = useRef(null);

  const createChoice = (title: string, color: string, icon: string) => {
    return {
      Title: title,
      Color: color,
      ColorPalletteToggle: false,
      Icon: icon,
      Id: uuid(),
      nodeRef: createRef()
    } as Choice
  }

  const [statuses, setStatuses] = useState([
    createChoice('Operational', '#00A91C', 'Success'),
    createChoice('Degraded', '#FFBE2E', 'Error'),
    createChoice('Non-Operational', '#D54309', 'Warning')
  ]);

  const [categories, setCategories] = useState([{
    Title: '',
    Color: '#000000',
    ColorPalletteToggle: false,
    Icon: 'Success',
    Id: uuid(),
    nodeRef: createRef()
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
  
  const closeAllToggleExcept = (id: string) =>{
    const newStatuses = [...statuses];
    const newCategories = [...categories];
    newStatuses.map(status => {
      if(status.Id !== id)
        return status.ColorPalletteToggle = false
      else
        return status.ColorPalletteToggle = true;
    });
    newCategories.map(category => {
      if(category.Id !== id)
        return category.ColorPalletteToggle = false
      else
        return category.ColorPalletteToggle = true;
    });
    setStatuses([...newStatuses]);
    setCategories([...newCategories]);
  
  }
  useEffect(() => {
    if(previewRef === null){
      // Setting all statuses to false
      const newStatuses = [...statuses];
      const newCategories = [...categories];
      newStatuses.map(status => {return status.ColorPalletteToggle = false});
      newCategories.map(category => {return category.ColorPalletteToggle = false});
      setStatuses([...newStatuses]);
      setCategories([...newCategories]);
    }
    else{
      closeAllToggleExcept(previewRef);
    }
  },[previewRef])

  useEffect(() => {
    setListValues({...listValues, Fields: listValues.Fields.filter((field) => {
      if(field.Title === 'Status')
        field.Choices = [...(statuses.map((i) => i.Title))]
      if(field.Title === 'Categories')
        field.Choices = [...(categories.map((i) => i.Title))]
      return field;
    })})
  },[statuses, categories])

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
                  <StyledChoiceField key={`Status123`} ref={previewPaneRef} childKey={`Status`} previewControl={setPreviewRef} choices={statuses} setChoices={setStatuses} />
              </InputContainer>
              <InputContainer>
                  <StyledLabel htmlFor="Category">Categories</StyledLabel>
                  <StyledChoiceField key={`Categories123`} ref={previewPaneRef} childKey={`Category`} previewControl={setPreviewRef} choices={categories} setChoices={setCategories} />
              </InputContainer>
              <StyledSubmitButton onClick={onCreateList.bind(this,listValues, statuses)}>
                Create List
              </StyledSubmitButton>
          </div>
        </FormContainer>
    </>
  );
}

export default ListCreationForm;