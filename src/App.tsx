import React, { FunctionComponent, useEffect, useState } from "react";
import UseProviderContext from "./contexts/SharePoint/UseProviderContext";
import SPItem from "./types/SPItem";
import { IListInfo } from "@pnp/sp/lists";
import InitializeApplicationForm from "./components/InitializeApplicationForm";
import { StatusApp, Header, AppContainer } from "./components/StyledComponents/App";
import { ISiteUserInfo } from "@pnp/sp/site-users/types"
import StatusRouter from "./components/StatusRouter";

const App: FunctionComponent = () => {
  const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
  const [items, setItems] = useState(Array<SPItem>());
  const [user, setUser] = useState<ISiteUserInfo | undefined>(undefined);
  const [load, setLoad] = useState<number>(0);
  // 0 = Initial State
  // 1 = Loading
  // 2 = Loaded
  // 3 = Setup

  useEffect(() => {
    if(!StatusConfig.initialized) return;

    getItems().then((items: SPItem[]) => {
      setItems(items);
    })  
  },[]);

  useEffect(() => {
    if(StatusConfig.currentUser === undefined) return;
    setUser(StatusConfig.currentUser);
  },[StatusConfig.currentUser]);

  async function getItems(){
    return sp.web.lists.getByTitle("IEMO Services Statuses").items<SPItem[]>();
    
  }

  return (
    <>
    <StatusApp>
      <Header>
        <h1>Status App</h1>
        <div>
          <span>Logged in as:</span>
          <span>{user ? user.Title: ''} { user ? (user.IsSiteAdmin ? "(Site Collection Admin)": "") : ""}</span>
        </div>
      </Header>
    </StatusApp>
    <AppContainer>
      <StatusRouter />
    </AppContainer>
    </>
  ); 
}

export default App;