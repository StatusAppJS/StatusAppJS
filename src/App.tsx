import React, { FunctionComponent, useEffect, useState } from "react";
import UseProviderContext from "./contexts/SharePoint/UseProviderContext";
import SPItem from "./types/SPItem";
import { IListInfo } from "@pnp/sp/lists";
import InitializeApplicationForm from "./components/InitializeApplicationForm";
import { StatusApp, Header, AppContainer } from "./components/StyledComponents/App";

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
    <>
    <StatusApp>
      <Header>
        <h1>Status App</h1>
        <div>
          <span>Logged in as: </span>
          <span>Still need to implement this</span>
        </div>
      </Header>
    </StatusApp>
    <AppContainer>
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
    </AppContainer>
    </>
  ); 
}

export default App;