const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

// Define port and host url as per environmental variable or specified value
const PORT = 5001
const HOST = process.env.HOST || '127.0.0.1'

// Define helmet policies
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
	directives:{
		defaultSrc:["self"]
	}
}));

// Define approved connection origins
const cors = require('cors');
let corsOptions = {
	origin: ["http://localhost:3000", "https://hope-helpers.netlify.app"],
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


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
		databaseURL = 'mongodb://localhost:27017/hope-hunters-testdb';
		break;
	default:
		console.error("Unable to connect to database");
};

const { databaseConnector } = require("./database");

// All database connector function and pass in the appropriate database url as per environment
databaseConnector(databaseURL).then(() => {
	console.log("Database connection established.")
}).catch(error => {
	console.log("Unable to establish database connection.")
	console.log(error)
});


// Define route to check database status and details for debugging purposes
app.get("/databaseHealth", (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    })
});

const usersRouter = require('./routes/users_routes');
const missingRouter = require('./routes/missing_persons_routes');

app.get("/", (request, response) => {
	response.json({
		message: 'Welcome to the Hope Helpers API. Please see our docs for details: https://github.com/Sarah-Connie/hope-hunters-back-end'
	});
});

app.use("/users", usersRouter);
app.use("/missing", missingRouter);


module.exports = {
	app, HOST, PORT
}