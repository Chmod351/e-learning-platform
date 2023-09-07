const envConfig=require('dotenv')

const env={
    MONGO_DB:process.env.MONGO,
    MONGO_PASS:process.env.PASSWORD,
    JWT:process.env.TOKEN,
}
module.exports=env