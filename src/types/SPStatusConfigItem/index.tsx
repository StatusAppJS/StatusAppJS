import {IItem} from '@pnp/sp/items'

type SPStatusConfigItem = IItem & {
    Page: string,
    StatusListId: string
}

export default SPStatusConfigItem