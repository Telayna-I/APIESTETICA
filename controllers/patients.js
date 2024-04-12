const { request, response } = require("express");
const Patient = require("../models/patient");

const getPatients = async (req = request, res = response) => {
	try {
		const [total, patients] = await Promise.all([
			Patient.countDocuments(),
			Patient.find().populate("user", "name"),
		]);

		res.status(200).json({
			total,
			patients,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const newPatient = async (req = request, res = response) => {
	const { name, surname, phone, age, treatments = [] } = req.body;

	try {
		const data = {
			name: name.toUpperCase(),
			surname: surname.toUpperCase(),
			age,
			phone,
			allergies: "",
			takeMedicine: "",
			treatments,
			recentTreatment: "",
			observations: "",
			user: req.user._id,
		};

		const patient = new Patient(data);
		await patient.save();

		return res.status(200).json({
			patient,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "El paciente no pudo ser guardado, contacte al administrador",
		});
	}
};

const updatePatient = async (req = request, res = response) => {
	const { id } = req.params;

	if (req.body.patient) {
		try {
			const { patient } = req.body;

			const updatedPatient = await Patient.findByIdAndUpdate(
				id,
				{
					...patient,
					name: patient.name && patient.name.toUpperCase(),
					surname: patient.surname && patient.surname.toUpperCase(),
				},
				{ new: true }
			);

			return res.status(200).json({
				updatedPatient,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: "El paciente no pudo ser actualizado, contacte al administrador",
			});
		}
	} else {
		res.status(500).json({
			msg: "La peticion no posee los datos solicitados",
		});
	}
};

module.exports = {
	getPatients,
	newPatient,
	updatePatient,
};
