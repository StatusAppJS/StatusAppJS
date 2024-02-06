import React, { FunctionComponent, createRef, useEffect, useRef, useState } from 'react';
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';
import IStatusListInfo from '../../types/IStatusListInfo';
import { v4 as uuid } from 'uuid';
import StyledChoiceField from '../FormFields/StyledChoiceField';
import { Autocomplete } from '../../utils/Autocomplete';
import { IsNullOrEmpty } from '../../utils/IsNullOrEmpty';

// Styled Components
import { StyledForm  as FormContainer, FormHeader, StyledInput, StyledLabel, InputContainer } from '../StyledComponents/InitializeApplicationForm';
import { SubmitButton } from '../SubmitButton';
import { FieldTypes, IFieldInfo } from '@pnp/sp/fields/types';

import { Choice } from '../../types/ChoiceFieldValue';

type ListCreationFormProps = {
  onCreateList: (listInfo: Partial<IStatusListInfo>, StatusInfo: Choice[]) => Promise<void>
}

const ListCreationForm: FunctionComponent<ListCreationFormProps> = ({onCreateList}: ListCreationFormProps) => {

  const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();

  const [previewRef, setPreviewRef] = useState(null);

  const previewPaneRef = useRef(null);
  const loadingRef = useRef(false);

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
  
  const [listValues, setListValues] = useState<Partial<IStatusListInfo>>({
    Title: "",
    AdminGroupName: "",
    AdminGroupId: null,
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
    if(IsNullOrEmpty(listValues.AdminGroupName) && IsNullOrEmpty(listValues.Title)){
        loadingRef.current = false;
        /*  This does need to happen, but I've commented it out for now.
        sp.web.siteGroups.getByName(listValues.AdminGroupName)().then((group) => {
            setListValues({...listValues, AdminGroupId: group.Id})
        }).catch((e) => {
            console.log('Error:',e);
        })
        */
    }
    else{
        loadingRef.current = true;
    }
    setListValues({...listValues, Fields: listValues.Fields.filter((field) => {
      if(field.Title === 'Status')
        field.Choices = [...(statuses.map((i) => i.Title))]
      if(field.Title === 'Categories')
        field.Choices = [...(categories.map((i) => i.Title))]
      return field;
    })})
  },[statuses, categories, listValues.AdminGroupName])

  const createEntry = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log('Create Entry:',e);
    /*
    const listValues = props.lv;
    listValues.AdminGroupName = (inputRef.current as HTMLInputElement).value;
    props.slv({...listValues});
    */
}

const selectEntry = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log((e.target as HTMLLIElement).innerText,'clicked')
    const listProps = listValues;
    listProps.AdminGroupName = (e.target as HTMLLIElement).innerText;
    setListValues({...listProps});
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
                  <StyledChoiceField key={`Status`} ref={previewPaneRef} childKey={`Status`} previewControl={setPreviewRef} choices={statuses} setChoices={setStatuses} />
              </InputContainer>
              <InputContainer>
                  <StyledLabel htmlFor="Category">Categories</StyledLabel>
                  <StyledChoiceField key={`Categories`} ref={previewPaneRef} childKey={`Category`} previewControl={setPreviewRef} choices={categories} setChoices={setCategories} />
              </InputContainer>
              <InputContainer>
                  <StyledLabel htmlFor="admin">Admin Group</StyledLabel>
                  <Autocomplete lv={listValues} slv={setListValues} selectEntry={selectEntry} createEntry={createEntry} suggestions={StatusConfig.siteGroups} />
              </InputContainer>
              <SubmitButton validate={loadingRef} callback={onCreateList.bind(this,listValues, statuses)}>
                Create List
              </SubmitButton>
          </div>
        </FormContainer>
    </>
  );
}



export default ListCreationForm;

