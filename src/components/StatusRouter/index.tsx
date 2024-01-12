import React, { FunctionComponent, ReactElement, lazy, useEffect, useState } from "react"
import Screen from "../../enums/Screen"
import LoadScreen from '../Screens/LoadScreen'
const Install = lazy(() => import('../Screens/Install'));
const SetupStatusLibrary = lazy(() => import('../Screens/SetupStatusLibrary'));
const StatusApplication = lazy(() => import('../Screens/StatusApplication'));
import UseProviderContext from "../../contexts/SharePoint/UseProviderContext"



type StatusRouterProps = {
}
const StatusRouter: FunctionComponent<StatusRouterProps> = (props: StatusRouterProps) => {
    const { provider: {sp, StatusConfig}, actions: { setStatusConfig } } = UseProviderContext();

    const [renderComponent, setRenderComponent] =  useState<ReactElement<any, any> | undefined>()

    useEffect(() => {
        console.log('setting new Screen Code');
        switch(StatusConfig.screen){
            case(Screen.Install):
                setRenderComponent(<Install />)
                break;
            case(Screen.Loading):
                setRenderComponent(<LoadScreen />)
                break;
            case(Screen.Setup):
                setRenderComponent(<SetupStatusLibrary />)
                break;
            case(Screen.App):
                setRenderComponent(<StatusApplication />)
                break;
            default:
                setRenderComponent(<LoadScreen />)
        }
    },[StatusConfig.screen])
    return (<>{renderComponent}</>)
    
}

export default StatusRouter