
import mongodb from "mongoose"

export default function MongoInit(config) {
    mongodb.connect(
        config.db.mongo.uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    const db = mongodb.connection
    if (config.debug) {
        db.on("error", () => {
            console.log("Connection error")
        })
        db.once("open", () => {
            console.log("MongoDB connected")
        })
    }
}