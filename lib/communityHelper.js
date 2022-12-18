// export const communityStatus = (data) => {
//   let statusUpdater = [...data];
//   statusUpdater = statusUpdater.map((item) => {
//     let temp = JSON.parse(JSON.stringify(item))
//     temp['status'] = temp['isHidden'] ? 'in-active' : 'active'
//     return temp
//   });
//   return statusUpdater;
// };

import { get } from "../controllers/redis.controller"

export const onliner = async (data, userId) => {
    let overallList = JSON.parse(await get("onlineCounter"))
    let resultant = await data.map(item => {
        let finder = overallList.find(listitem => listitem.id === String(item._id))
        if (finder) {
            if(userId && finder.lister.includes(String(userId))){
                return { ...item, online: finder.lister.length-1 }
            }
            return { ...item, online: finder.lister.length }
        } else {
            return { ...item, online: 0 }
        }
    })

    return resultant
}
