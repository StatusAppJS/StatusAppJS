import {IItem} from '@pnp/sp/items'

type SPStatusConfigItem = IItem & {
    Page: string,
    StatusListId: string,
    AdminGroupId: string,
    StatusOptions: string,
}

export default SPStatusConfigItem