import KCPInfo from '../entities/KCPEntity';
import { getEntityManager } from '@typedorm/core';

const getKCPInfo = async function(root:any, args:any, context:any) {
    console.log(args.id);
    const userObj = await getEntityManager().find(KCPInfo, {
        contentId: args.id,
      });
    console.log(userObj);
    return userObj.items
}

export const Query = {
    getKCPInfo
}
