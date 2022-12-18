import { get, set } from "../controllers/redis.controller"
import { CommunityFollows, User } from "../models"
import community from "../models/community"

export const statusUpdater_socket = async (userId, sockId, status) => {
    let bool = status === "online" ? true : false
    let sockupdate = await User.updateOne({ _id: userId }, { $set: { socketId: sockId, online: bool } })
}

export const offlineMaker = async (id, status) => {
    let bool = status === "online" ? true : false
    let sockupdate = await User.updateOne({ socketId: id }, { $set: { online: bool } })
}

export const setupOnlineCommunity = async (communities, id, type) => {
    let overallList = JSON.parse(await get("onlineCounter"))
    let data = await communities.map((item) => {
        let finder = overallList.find(listItem => listItem.id === item)
        if (type == "insert") {
            if (!finder) {
                return { id: item, lister: [id] }
            } else {
                if(finder.lister.includes(String(id))){
                    return { id: item, lister: [...finder.lister] }
                }
                return { id: item, lister: [...finder.lister, id] }
            }
        }
        else if (type == "revoke") {
            if (!finder) {
                return { id: item, lister: [] }
            } else {
                let filtrate = finder.lister.filter(ids => ids !== id)
                // console.log(filtrate, "Filtrate.................");
                return { id: item, lister: filtrate }
            }
        }
    })
    // console.log(data);
    await set("onlineCounter", JSON.stringify(data))
}

export const extractInfo = async (id, extType) => {
    try {
        id = String(id)
        let userInfo = await User.findOne({ _id: id }, { profilepic: 1, name: 1, designation: 1, _id: 0 })
        let communities = await CommunityFollows.find({ userId: id }, { communityId: 1, _id: 0 })
        communities = communities.map(item => {
            return String(item.communityId)
        })
        // if (communities.length === 0) {
        //     console.log(communities, "communitites");
        // }

        if (extType == "connect") {
            await setupOnlineCommunity(communities, String(id), "insert")
        } else if (extType == "disconnect") {
            // console.log(communities, id);
            await setupOnlineCommunity(communities, String(id), "revoke")
            return
        }

        return { community: communities, user: userInfo }
    } catch (error) {
        console.log(error);
    }
}



export const followAction = async (redis, userId, communityId, action) => {
    try {
        let i = redis.findIndex(item => String(item.id) === String(userId))
        if (action === "unfollow") {
            redis[i].community = await redis[i].community.filter(id => id !== communityId)
            return redis
        } else if (action === "follow") {
            redis[i].community = await redis[i].community.concat([communityId])
            return redis
        } else {
            return redis
        }
    } catch (error) {
        console.log("error")
    }
}