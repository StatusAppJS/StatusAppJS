import { FunctionComponent, useEffect, useState, Suspense } from "react";
import UseProviderContext from "../../contexts/SharePoint/UseProviderContext";
import { StatusApp, Header, AppContainer } from "../../components/StyledComponents/App";
import { ISiteUserInfo } from "@pnp/sp/site-users/types"
import StatusRouter from "../../components/StatusRouter";

const AppFramework: FunctionComponent = () => {
  const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();
  const [user, setUser] = useState<ISiteUserInfo | undefined>(undefined);


  useEffect(() => {
    if(StatusConfig.currentUser === undefined) return;
    setUser(StatusConfig.currentUser);
  },[StatusConfig.currentUser]);

  return (
    <>
    <StatusApp>
      <Header>
        <h1>Status App</h1>
        <div>
          <span>Logged in as: </span>
          <span>{user ? user.Title: ''} { user ? (user.IsSiteAdmin ? "(Site Collection Admin)": "") : ""}</span>
        </div>
      </Header>
    </StatusApp>
    <AppContainer>
      <Suspense fallback={<div>Loading Components</div>}>
        <StatusRouter />
      </Suspense>
    </AppContainer>
    </>
  ); 
}

export default AppFramework;