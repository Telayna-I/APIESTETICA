const mongoose = require("mongoose");

const dbConnection = async () => {
	const connectionpOptions = {
		dbName: `API_ESTETICA`,
	};
	try {
		await mongoose.connect(process.env.MONGODB_CNN, connectionpOptions);
		console.log("Base de datos ONLINE.");
	} catch (error) {
		console.log(error);
		throw new Error("Error a la hora de iniciar la base de datos");
	}
};

module.exports = { dbConnection };
