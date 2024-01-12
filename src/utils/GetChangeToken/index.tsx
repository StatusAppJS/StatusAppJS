//"1;3;d22d4f6b-9a8e-401a-b42c-2dc962b93c4e;638400023238130000;36322927"

import { IChangeToken } from "@pnp/sp";

export default function GetChangeToken(listGuid: string){
    let ChangeToken: IChangeToken | undefined = {} as IChangeToken;
    var ticks = ((Date.now() * 10000) + (621355968 * 1000000000))
    ChangeToken.StringValue = `1;3;${listGuid};${ticks};-1`
    
    return ChangeToken;
}