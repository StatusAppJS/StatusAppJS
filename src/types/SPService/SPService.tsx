import { IItem } from "@pnp/sp/items"

interface SPService extends IItem {
    Title?: string,
    Status?: string,
    Id: number,
    Modified: string,
    __metadata?: {
        type: string,
        uri: string
    }
}

export default SPService;