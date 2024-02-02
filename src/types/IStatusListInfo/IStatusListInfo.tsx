import { IListInfo } from '@pnp/sp/lists/types';

type IStatusListInfo = IListInfo & {
    AdminGroupName: string;
    AdminGroupId: number;
}

export default IStatusListInfo;