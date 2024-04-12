const { request, response } = require("express");
const Treatment = require("../models/treatment");

const newTreatment = async (req = request, res = response) => {
	const toDo = req.body.toDo.toUpperCase();
	const { price, _id, finished, date, hour, patient, notes, dateOfShift } =
		req.body;

	try {
		const data = {
			toDo,
			date,
			hour,
			price,
			notes,
			patient,
		};

		const treatment = new Treatment(data);

		await treatment.save();
		res.status(201).json({ treatment });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "No se pudo generar el tratamiento, contacte al administrador",
		});
	}
};

const finishTreatments = async (req = request, res = response) => {
	const { id } = req.params;
	try {
		const treatment = await Treatment.findById(id);

		if (await treatment.finished) {
			try {
				const finishedTreatment = await Treatment.findByIdAndUpdate(
					id,
					{
						finished: false,
					}
				);
				res.status(200).json({ finishedTreatment });
			} catch (error) {
				console.log(error);
				res.status(500).json({ error });
			}
		} else {
			try {
				const finishedTreatment = await Treatment.findByIdAndUpdate(
					id,
					{
						finished: true,
					}
				);
				res.status(200).json({ finishedTreatment });
			} catch (error) {
				console.log(error);
				res.status(500).json({ error });
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

const updateTreatment = async (req = request, res = response) => {
	const { id } = req.params;

	const {
		price,
		_id,
		toDo,
		finished,
		date,
		hour,
		patient,
		notes,
		dateOfShift,
		...rest
	} = req.body;

	const treatment = await Treatment.findByIdAndUpdate(
		id,
		{
			...rest,
			toDo: toDo && toDo.toUpperCase(),
			price: price && price,
			date: date && date,
			hour: hour && hour,
		},
		{ new: true }
	).populate("patient", "name");

	res.json(treatment);
};

module.exports = {
	finishTreatments,
	newTreatment,
	updateTreatment,
};
