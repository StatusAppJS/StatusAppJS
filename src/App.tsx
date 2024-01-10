import React, { FunctionComponent, useEffect, useState } from "react";
import UseProviderContext from "./contexts/SharePoint/UseProviderContext";
import SPItem from "./types/SPItem";
import { IListInfo } from "@pnp/sp/lists";
import InitializeApplicationForm from "./components/InitializeApplicationForm";

const App: FunctionComponent = () => {
  const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
  const [items, setItems] = useState(Array<SPItem>());

  useEffect(() => {
    if(!StatusConfig.initialized) return;

    getItems().then((items: SPItem[]) => {
      setItems(items);
    })  
  },[]);

  async function getItems(){
    return sp.web.lists.getByTitle("IEMO Services Statuses").items<SPItem[]>();
    
  }

  async function createContentType(){
    console.log(StatusConfig);
    //var ct = await provider.sp.web.contentTypes.add("Status App", "0x0100D7A7F4A7F8E8C24D9F5F2C9D1F0F1C3F", "Status App Content Type", true);
    //console.log(ct);
    //setStatusConfig({});
  }
 
  const initializeRender = (
    <>
      <h2>Initializing</h2>
      <div onClick={createContentType}>Create Content Type</div>
    </> 
  )

  const initializeForm = (
    <InitializeApplicationForm />
  )

  return (
    <div>
      <h1>SharePoint Provider</h1>
      {
        !StatusConfig.initialized ? (
          initializeForm
        )            
        : (
          <>
            <h2>Initialized</h2>
            <div onClick={createContentType}>Create Content Type</div>
          </>
        )
      }
    </div>
  );
  
}

export default App;