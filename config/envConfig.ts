const envConfig=require('dotenv')
envConfig.config()

const env={
    MONGO_DB:process.env.MONGO,
    JWT:process.env.TOKEN,
}

module.exports=env