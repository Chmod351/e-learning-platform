import { config } from "dotenv"
config()

 const env={
    MONGO_DB:process.env.MONGO,
}

export default env
