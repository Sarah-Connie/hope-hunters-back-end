const { seedDatabase } = require("./database")

const dotenv = require("dotenv");
dotenv.config();


// Define database urls for production, development and testing environments  
let databaseURL = "";
switch(process.env.NODE_ENV.toLowerCase()){
	case "production":
		databaseURL = process.env.DATABASE_URL;
		break;
	case "development":
		databaseURL = 'mongodb://localhost:27017/hope-hunters-dev';
		break;
	case "test":
		databaseURL = 'mongodb://localhost:27017/hope-hunters_testdb';
		break;
	default:
		console.error("Unable to connect to database");
}

// Seed the database with collections and documents.
seedDatabase(databaseURL).then(() => {
    console.log('Database seeded.')
}).catch(error => {
    console.log('Unable to seed data.')
    console.log(error)
})