
export const oneTimePassword = (size = 6) => {
    if (size == 6) {
        return Math.floor(100000 + Math.random() * 900000);
    }
}

/** 
 * Get Increment Count from Object Id
*/
export const IncCntObjId = (ObjectId) => {
    try {
        ObjectId  = ObjectId.toString()
        return parseInt(ObjectId.substring(ObjectId.length - 6, ObjectId.length), 16)
    } catch (err) {
        return ''
    }
}