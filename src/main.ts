import express from "express"
import { PORT } from "./util/env-util"
import { publicRouter } from "./routes/public-api"
import { errorMiddleware } from "./middleware/error-middleware"

export const app = express()

app.use(express.json())

app.use("/api",publicRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`)
})