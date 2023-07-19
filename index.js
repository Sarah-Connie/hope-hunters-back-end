const {app, PORT} = require('./src/server');

app.listen(PORT, () => {
	console.log("Express server is running on port " + PORT);
});