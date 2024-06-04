const { connect } = require('mongoose')


module.exports = async()=> {
    try{
        await connect(process.env.MONGODB)
        console.log('Connected To DataBase!'.yellow)
    }catch(err){
        console.log(err.message.red)
    }
}