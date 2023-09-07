import mongoose from "mongoose"
import enviroments from './envConfig'

const url:any = enviroments.MONGO_DB

const connect = () => {
    mongoose.connect(url).then(() => {
        console.log('connected to db')
    }).catch((err: any) => {
        throw err
    })
}

export default connect


