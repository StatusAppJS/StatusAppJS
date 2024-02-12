import { FunctionComponent, ReactElement, lazy, useEffect, useState } from "react"
import Screen from "../../enums/Screen"
import LoadScreen from '../Screens/LoadScreen'
import UseProviderContext from "../../contexts/SharePoint/UseProviderContext"



type StatusRouterProps = {
}
const StatusRouter: FunctionComponent<StatusRouterProps> = (props: StatusRouterProps) => {
    const { provider: {StatusConfig} } = UseProviderContext();

    const [renderComponent, setRenderComponent] =  useState<ReactElement<any, any> | undefined>()

    useEffect(() => {
        switch(StatusConfig.screen){
            case(Screen.Install):
                const Install = lazy(() => import(/* webpackChunkName: "Install" */ '../../modules/Install'));
                setRenderComponent(<Install />)
                break;
            case(Screen.Loading):
                setRenderComponent(<LoadScreen />)
                break;
            case(Screen.Setup):
                const SetupStatusLibrary = lazy(() => import(/* webpackChunkName: "InitStatusLibrary" */ '../../modules/SetupStatusLibrary'));
                setRenderComponent(<SetupStatusLibrary />)
                break;
            case(Screen.App):
                let StatusApplication;
                if(StatusConfig.StatusList.isAdmin)
                    StatusApplication = lazy(() => import(/* webpackChunkName: "StatusAppAdmin" */ '../../modules/StatusApplication'));
                else
                    StatusApplication = lazy(() => import(/* webpackChunkName: "StatusAppUser" */ '../../modules/StatusAppUser'));
                setRenderComponent(<StatusApplication />)
                break;
            default:
                setRenderComponent(<LoadScreen />)
        }
    },[StatusConfig.screen])
    return (<>{renderComponent}</>)
    
}

export default StatusRouter