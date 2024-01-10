import React, { FunctionComponent, useEffect, useState } from 'react';
import { useForm, SubmitHandler, Form } from 'react-hook-form';
import UseProviderContext from '../../contexts/SharePoint/UseProviderContext';
import { IListInfo } from '@pnp/sp/lists/types';
import {FadeIn} from '../Animations'
import {RemoveButton, UpButton, DownButton} from './controls';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faMinus } from '@fortawesome/free-solid-svg-icons';

type Inputs = {
    Title: string,
    Status: string,
    Category: string
}

const InitializeApplicationForm: FunctionComponent = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<Inputs>();
  const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [statuses, setStatuses] = useState(['']);
  const [categories, setCategories] = useState(['']);
  
  useEffect(()=> {console.log('repainted');console.log(statuses);},[statuses, categories])

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
  function setStatus(event: React.ChangeEvent<HTMLInputElement>, index: number){
    console.log(event.currentTarget.value);
    let tempStatuses = [...statuses];
    tempStatuses[index] = event.currentTarget.value;
    setStatuses([...tempStatuses]);
  }
    function addStatus(){
        setStatuses([...statuses, '']);
    }

    function moveStatusUp(event: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number){
        console.log('moving status up');
        if(index === 0) return;
        let tempStatuses = [...statuses];
        const fromIndex = index;
        const toIndex = index - 1;
        tempStatuses.splice(toIndex,0,tempStatuses.splice(fromIndex,1)[0]);
        
        setStatuses([...tempStatuses])
        console.log(statuses);
    }

    function moveStatusDown(event: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number){
        console.log('moving status down');
        if(index === statuses.length - 1) return;
        let tempStatuses = [...statuses];
        const fromIndex = index;
        const toIndex = index + 1;
        tempStatuses.splice(toIndex,0,tempStatuses.splice(fromIndex,1)[0]);
        
        setStatuses([...tempStatuses])
        console.log(statuses);
    }

    function removeStatus(event: React.MouseEvent<SVGSVGElement, MouseEvent>){
        const currentStatus = (event.currentTarget.parentElement.children[0] as HTMLInputElement).value
        console.log('removing status', currentStatus);
        console.log(statuses.filter((status) => {
            return status !== currentStatus;
        }));
        setStatuses([...statuses.filter((status) => {
            return status !== currentStatus;
        })]);
    }

  return (
    <>
        <div>
            <div>
                <label htmlFor="Title">Title</label>
                <input type="text" placeholder="Title" {...register("Title")} />
            </div>
            <div>                
                {statuses.map((status, index) => {
                    return (
                        <FadeIn key={`${uuid()}}`}>
                            <input onChange={(e)=>{setStatus(e, index)}} type="text" placeholder="Enter a new status" defaultValue={status} /><FontAwesomeIcon icon={faMinus} type={`Button`} onClick={(e) => {removeStatus(e)}} /><FontAwesomeIcon icon={faArrowDown} type={`Button`} onClick={(e) => {moveStatusDown(e,index)}} /><FontAwesomeIcon icon={faArrowUp} type={`Button`} onClick={(e) => {moveStatusUp(e,index)}} />
                        </FadeIn>
                    )
                    })
                }
            <input type="button" onClick={addStatus} value="New Status" />
            </div>
            <div>
                <label htmlFor="Category">Category</label>
                <input type="text" placeholder="Category" {...register("Category")} />
                <input type="button" onClick={addCategory} value="Create List" />
            </div>
            <input type="submit" />
        </div>
    </>
  );
}

export default InitializeApplicationForm;