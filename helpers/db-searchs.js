const { response } = require("express");
const Patient = require("../models/patient");

const searchPatients = async (term = "", res = response) => {
	const regex = new RegExp(term, "i"); // Expresion regular que valida mayusculas y minusculas

	const [count, patients] = await Promise.all([
		Patient.countDocuments({
			$or: [
				{ name: regex },
				{ surname: regex },
				{ phone: regex },
				{ observations: regex },
			],
		}),
		Patient.find({
			$or: [
				{ name: regex },
				{ surname: regex },
				{ phone: regex },
				{ observations: regex },
			],
		}),
	]);

	return res.json({
		count,
		results: patients ? [patients] : [],
	});
};

module.exports = {
	searchPatients,
};
