const { Schema, model } = require("mongoose");

const patientSchema = Schema({
	name: {
		type: String,
		required: [true, "El nombre es obligatorio."],
	},
	surname: {
		type: String,
		required: [true, "El apellido es obligatorio."],
	},
	phone: {
		type: String,
		required: true,
	},
	age: {
		type: String,
		required: true,
	},
	allergies: {
		type: String,
	},

	takeMedicine: {
		type: String,
	},
	recentTreatment: {
		type: String,
	},
	// Seria como para escribir datos de historia clinica las observaciones posta son las de cada tratamiento.
	observations: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

patientSchema.methods.toJSON = function () {
	const { __v, _id, ...patient } = this.toObject();
	patient.uid = _id;
	return patient;
};

module.exports = model("Patient", patientSchema);
