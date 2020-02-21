import mongoose from "mongoose"

import config from "../config/config"
import app from "./express"
import devBundle from "./devBundel"

app.listen(config.port, (err) => {

  if (err) {
    console.log(err)
  }
    console.info("Server started on port %s.", config.port)
  }

)
devBundle.compile(app)

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
  }
)
