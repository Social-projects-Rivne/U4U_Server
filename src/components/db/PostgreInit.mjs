
import { Sequelize } from "sequelize"

export default function PostgreInit(config) {
    const pgConfig = config.db.postgre

    const db = new Sequelize(
        pgConfig.name,          // db name
        pgConfig.username,
        pgConfig.password,
        {
            host: pgConfig.host,
            port: pgConfig.port,
            dialect: pgConfig.dialect
        }
    )

    return db.authenticate() // -> Promise<void>
}