import React, { useState } from 'react';
import { useForm, SubmitHandler, Form } from 'react-hook-form';
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';
import { IListInfo } from '@pnp/sp/lists/types';

type Inputs = {
    Title: string,
    Status: string,
    Category: string
}

export default function InitializeApplicationForm() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<Inputs>();
  const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [statuses, setStatuses] = useState([]);
  const [categories, setCategories] = useState([]);
  
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
  function addStatus(){
    console.log('adding status ' + getValues("Status"));
    setStatuses([...statuses, getValues("Status")]);
  }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="Title">Title</label>
            <input type="text" placeholder="Title" {...register("Title")} />
            <label htmlFor="Status">Status:
                <datalist>
                    {
                        statuses.map((status, index) => {
                            return <option key={index} value={status} />
                        })
                    }
                </datalist>
            </label>
            <input type="text" placeholder="Status" list={`Status`} {...register("Status")} />
            <input type="button" onClick={addStatus} value="Create List" />
            <label htmlFor="Category">Category</label>
            <input type="text" placeholder="Category" {...register("Category")} />
            <input type="button" onClick={addCategory} value="Create List" />
            <input type="submit" />
        </form>
    </>
  );
}