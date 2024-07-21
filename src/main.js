import Express from "express"
import Cors from "cors"
import middlewares from "./middlewares/config.js"

const app = Express()

middlewares(app, Express, Cors)

export default app