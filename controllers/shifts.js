const { request, response } = require("express");
const Treatment = require("../models/treatment");

const getTreatments = async (req = request, res = response) => {
	try {
		const [total, treatments] = await Promise.all([
			Treatment.countDocuments(),
			Treatment.find({ finished: false }).populate("patient", [
				"name",
				"surname",
				"age",
				"phone",
			]),
		]);

		res.status(200).json({
			total,
			treatments,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const getTreatmentByUserId = async (req = request, res = response) => {
	const { id } = req.params;
	console.log(id);

	// las dos peticiones en simultaneo para traerme todos los tratamientos que sean del id del usuario.
	// mal razonamiento pensalo de nuevo.
	try {
		const treatments = await Treatment.find({ patient: id });

		res.status(200).json({
			treatments,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error,
		});
	}
};

module.exports = {
	getTreatments,
	getTreatmentByUserId,
};
