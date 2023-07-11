const { databaseConnector, seedDatabase, databaseDisconnector } = require("./database")
const { databaseURL } = require('./server')


// Call connector function to establish a connection with the appropriate database, 
// which depends on the environment stated in the run script.
databaseConnector(databaseURL).then(() => {
	console.log("Database connection established.")
}).catch(error => {
	console.log("Unable to establish database connection.")
	console.log(error)
})

// Seed the database with collections and documents.
seedDatabase().then(() => {
    console.log('Database seeded.')
}).catch(error => {
    console.log('Unable to seed data.')
    console.log(error)
})