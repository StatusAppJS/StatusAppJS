import {IItem} from '@pnp/sp/items'

type SPStatusConfigItem = IItem & {
    Page: string,
    StatusListId: string,
    AdminGroupId: string
}

export default SPStatusConfigItem