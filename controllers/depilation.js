const { request, response } = require("express");
const Depilation = require("../models/depilation");

const getDepilationShifts = async (req = request, res = response) => {
	try {
		const [total, depilationShifts] = await Promise.all([
			Depilation.countDocuments(),
			Depilation.find({ finished: false }).populate("patient", [
				"name",
				"surname",
				"age",
				"phone",
			]),
		]);

		res.status(200).json({
			total,
			depilationShifts,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

const newDepilationShift = async (req = request, res = response) => {
	const { price, date, hour, patient, notes, ...rest } = req.body;

	// MANDAR DESDE EL FRONT COMO OBJETO CON TODO Y FORCE, MIRAR EL POSTMAN PARA VER EL MODELO

	const depilationShift = {
		zone: {
			...rest,
		},
		price,
		date,
		hour,
		patient,
		notes,
	};

	try {
		const newDepilationShift = new Depilation(depilationShift);

		await newDepilationShift.save();
		res.status(200).json({
			depilationShift,
			newDepilationShift,
		});
		console.log(newDepilationShift);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "No se pudo generar el turno, contacte al administrador",
		});
	}
};

const updateDepilationShift = async (req = request, res = response) => {
	const { id } = req.params;

	const { price, date, hour, patient, notes, ...rest } = req.body;

	const shift = await Depilation.findById(id);

	const depilationShift = {
		zone: {
			...rest,
		},
		price,
		date,
		hour,
		patient,
		notes,
	};

	try {
		const update = await Depilation.findByIdAndUpdate(
			id,
			{
				zone: {
					...shift.zone,
					...rest,
				},
				price: price ? price : shift.price,
				date: date ? date : shift.date,
				hour: hour ? hour : shift.hour,
				patient: patient ? patient : shift.patient,
				notes: notes ? notes : shift.notes,
			},
			{ new: true }
		);
		res.status(200).json({
			depilationShift,
			update,
		});
	} catch (error) {
		console.log(error);
	}
};

const finishDepilationShift = async (req = request, res = response) => {
	const { id } = req.params;
	try {
		const depilation = await Depilation.findById(id);

		if (depilation.finished) {
			try {
				const finishedDepilation = await Depilation.findByIdAndUpdate(
					id,
					{
						finished: false,
					}
				);
				res.status(200).json({ finishedDepilation });
			} catch (error) {
				console.log(error);
				res.status(500).json({ error });
			}
		} else {
			try {
				const finishedDepilation = await Depilation.findByIdAndUpdate(
					id,
					{
						finished: true,
					}
				);
				res.status(200).json({ finishedDepilation });
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

module.exports = {
	getDepilationShifts,
	newDepilationShift,
	updateDepilationShift,
	finishDepilationShift,
};
