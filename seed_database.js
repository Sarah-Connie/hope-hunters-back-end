const { databaseConnector, seedDatabase, databaseDisconnector } = require("./database")

databaseConnector(databaseURL).then(() => {
	console.log("Database connection established.")
}).catch(error => {
	console.log("Unable to establish database connection.")
	console.log(error)
})

seedDatabase().then(() => {
    console.log('Database seeded.')
}).catch(error => {
    console.log('Unable to seed data.')
    console.log(error)
})

databaseDisconnector.then(() => {
    console.log('Database connection closed.')
}).catch(error => {
    console.log('Unable to close database connection.')
    console.log(error)
})