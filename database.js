const mongoose = require('mongoose')

async function databaseConnector(databaseURL){
    try {
        await mongoose.connect(databaseURL)
    } catch (error) {
        handleError(error);
    }
}


const seedUsers = [
    {
        
    }
]

async function databaseDisconnector(){
    try {
        await mongoose.connection.close()
    } catch (error) {
        handleError(error);
    } 
}

module.exports = {
    databaseConnector, 
    databaseDisconnector
}