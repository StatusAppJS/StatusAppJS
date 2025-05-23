import { ISiteUserInfo } from "@pnp/sp/site-users/types"
import SPStatusConfigItem from "../SPStatusConfigItem"
import { IList, IListInfo } from "@pnp/sp/lists/types"
import Screen from "../../enums/Screen"
import SPItem from "../SPItem"
import { IChangeToken } from "@pnp/sp/types"
import { ISiteGroupInfo } from "@pnp/sp/site-groups"

type StatusAppConfig = {
    configListId?: string,
    pageconfig: SPStatusConfigItem,
    currentUser: ISiteUserInfo | undefined,
    configList: IList | undefined,
    siteGroups: ISiteGroupInfo[],
    screen: Screen,
    Loaded: boolean,
    StatusList: Partial<{
        listId: string,
        list: IListInfo | undefined,
        changeToken: IChangeToken,
        listItems: SPItem[], 
        isAdmin: boolean
    }>
}

export default StatusAppConfig