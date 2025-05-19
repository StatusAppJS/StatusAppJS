import { IListInfo } from '@pnp/sp/lists/types';
import { ChoiceFieldInfo } from '../ChoiceFieldInfo';

type IStatusListInfo = IListInfo & {
    AdminGroupName: string;
    AdminGroupId: number;
    Fields: Partial<ChoiceFieldInfo>[]
}

export default IStatusListInfo;