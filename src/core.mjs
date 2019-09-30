
import debug from "debug"

import Config from "../config/startup"
import ServerInit from "./components/api/ServerInit"

import MongoInit from "./components/db/MongoInit"
import PostgreInit from "./components/db/PostgreInit"

const logError = debug("main:error")

async function MainInit() {
    console.clear()
    console.log(process.cwd())
    
    await ServerInit(Config)
    MongoInit(Config)
    //PostgreInit(Config)
}

MainInit().catch(logError)