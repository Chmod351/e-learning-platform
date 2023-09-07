const db = require('mongoose')
const enviroments = require('./envConfig')

const url: string = enviroments.MONGO_DB

const connect = () => {
    db.connect(url).then(() => {
        console.log('connected to db')
    }).catch((err: any) => {
        throw err
    })
}

module.exports = connect


