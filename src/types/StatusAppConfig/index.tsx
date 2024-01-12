import { ISiteUserInfo } from "@pnp/sp/site-users/types"
import SPStatusConfigItem from "../SPStatusConfigItem"
import { IListInfo } from "@pnp/sp/lists/types"
import Screen from "../../enums/Screen"

type StatusAppConfig = {
    listId?: string,
    configListId?: string,
    listExists?: boolean,
    pageconfig: SPStatusConfigItem,
    initialLoad: true,
    loading: false,
    currentUser: ISiteUserInfo | undefined,
    configList: IListInfo | undefined,
    initialized?: boolean,
    screen: Screen
}

export default StatusAppConfig