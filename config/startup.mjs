
require('dotenv').config()

export default {
    debug: !!(process.env.DEBUG || true),
    environment: process.env.NODE_ENV || "development",
    server: {
        port: Number(process.env.serverPort || 8080),
    },
    db: {
        mongo: {
            uri: process.env.mongoUri
        },
        postgre: {
            name: process.env.sqlName,
            host: process.env.sqlHost || "localhost",
            port: Number(process.env.sqlPort || 9999),
            dialect: process.env.sqlDialect || "postgres",
            username: process.env.sqlUsername || "postgres",
            password: process.env.sqlPassword || "postgres",
            logging: !!(process.env.sqlLogging || false)
        }
    }
}