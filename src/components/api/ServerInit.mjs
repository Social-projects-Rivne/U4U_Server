
import express from "express"
import httpLogger from "morgan"
import bodyParser from "body-parser"

// Routers
import regionsRouter from "../../routes/regions/index.mjs"

export default function ServerInit(config) {
    return new Promise((resolve, reject) => {
        const app = express()

        // Attach middlewares
        app.use(express.json())
        app.use(bodyParser.json())
        app.use(httpLogger("dev"))
        app.use(express.urlencoded({ extended: false }))

        // Attach routes
        app.get("/", (_, res) => res.send("test"))
        app.use("/regions", regionsRouter)

        // Init server
        const server = app.listen(config.server.port)
        server.on("error", error => reject(onError(error)))
        server.on("listening", () => resolve(onListening(server)))
    })
}

function onError(error) {
    const errMessages = {
        "EACCES": "requires elevated privileges",
        "EADDRINUSE": "address in use"
    }
    return {
        ok: false, error,
        message:
            error.syscall !== "listen"
            ? "syscall not \"listen\""
            : errMessages[error.code]
    }
}

function onListening(server) {
    const addr = server.address()
    const isString = typeof addr == "string"
    return {
        ok: true,
        type: isString ? "pipe" : "port",
        payload: isString ? addr : addr.port
    }
}