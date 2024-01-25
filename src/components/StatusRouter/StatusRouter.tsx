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
                const Install = lazy(() => import('../Screens/Install'));
                setRenderComponent(<Install />)
                break;
            case(Screen.Loading):
                setRenderComponent(<LoadScreen />)
                break;
            case(Screen.Setup):
                const SetupStatusLibrary = lazy(() => import('../Screens/SetupStatusLibrary'));
                setRenderComponent(<SetupStatusLibrary />)
                break;
            case(Screen.App):
            const StatusApplication = lazy(() => import('../Screens/StatusApplication'));
                setRenderComponent(<StatusApplication />)
                break;
            default:
                setRenderComponent(<LoadScreen />)
        }
    },[StatusConfig.screen])
    return (<>{renderComponent}</>)
    
}

export default StatusRouter