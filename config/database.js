// IMPORTS NPM
const mongoose = require("mongoose")

const databaseConnection = (cb) => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err, _data) => {
        if (err) {
            console.log("\x1b[31m",'Database connect error', err)
            setTimeout(() => {
                databaseConnection(cb)
            }, 1000)
        } else {
            if(process.env.SERVER_RUNTIME === "developement"){
                console.log('\x1b[33m%s\x1b[0m', `Connected to mongodb developement cloud successfully`)
                return cb(true)
            }
            console.log('\x1b[33m%s\x1b[0m', `Connected to mongodb production cloud successfully`)
            return cb(true)
        }
    })
}




module.exports = databaseConnection;