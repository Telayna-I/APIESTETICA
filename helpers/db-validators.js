const User = require("../models/user");
const Role = require("../models/role");
const Patient = require("../models/patient");
const Treatment = require("../models/treatment");
const Depilation = require("../models/depilation");

const validateEmail = async (email = "") => {
	try {
		const emailExist = await User.findOne({ email });
		if (emailExist) {
			throw new Error(`El correo ${email} ya se encuentra registrado`);
		}
	} catch (error) {
		throw new Error(error);
	}
};

const isValidRole = async (role = "") => {
	const existeRole = await Role.findOne({ role });
	if (!existeRole) {
		throw new Error(
			`El rol ${role} no esta registrado en la base de datos.`
		);
	}
};

const validateId = async (id) => {
	const idExist = await User.findById({ _id: id });
	if (!idExist) {
		throw new Error(`El ${id} no se encuentra registrado`);
	}
};

const validatePatientId = async (id) => {
	const idExist = await Patient.findById({ _id: id });
	if (!idExist) {
		throw new Error(`El ${id} no se encuentra registrado`);
	}
};

const validateTreatmentId = async (id) => {
	const idExist = await Treatment.findById({ _id: id });
	if (!idExist) {
		throw new Error(`El ${id} no se encuentra registrado`);
	}
};

const validateDepilationId = async (id) => {
	const idExist = await Depilation.findById({ _id: id });
	if (!idExist) {
		throw new Error(`El ${id} no se encuentra registrado`);
	}
};

module.exports = {
	validateEmail,
	isValidRole,
	validateId,
	validatePatientId,
	validateTreatmentId,
	validateDepilationId,
};
