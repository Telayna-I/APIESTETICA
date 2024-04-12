const { Schema, model, SchemaTypes } = require("mongoose");

const treatmentSchema = Schema({
	toDo: {
		type: String,
		required: [true, "El tratamiento es obligatorio."],
	},
	price: {
		type: String,
		required: [true, "El precio es obligatorio."],
	},
	date: {
		type: String,
		required: [true, "La fecha es obligatoria."],
	},
	hour: {
		type: String,
		required: [true, "La fecha es obligatoria."],
	},
	patient: {
		type: SchemaTypes.ObjectId,
		ref: "Patient",
		required: true,
	},
	notes: {
		type: String,
	},
	finished: {
		type: Boolean,
		default: false,
	},
	dateOfShift: {
		type: String,
		default: new Date().toLocaleDateString(),
	},
});

treatmentSchema.methods.toJSON = function () {
	const { __v, _id, ...treatment } = this.toObject();
	treatment.uid = _id;
	return treatment;
};

module.exports = model("Treatment", treatmentSchema);
