const { request, response } = require("express");

const hasAdminRole = (req = request, res = response, next) => {
	console.log(req.user.role);
	if (!req.user) {
		return res.status(500).json({
			msg: "Se quiere verificar el rol sin validar el token primero",
		});
	}
	if (req.user.role !== "ADMIN_ROLE") {
		return res.status(401).json({
			msg: "No tienes permisos para esa operacion.",
		});
	}
	next();
};

const hasDoctorRole = (req = request, res = response, next) => {
	if (!req.user) {
		return res.status(500).json({
			msg: "Se quiere verificar el rol sin validar el token primero",
		});
	}
	if (req.user.role !== "DOCTOR_ROLE" || req.user.role !== "ADMIN_ROLE") {
		return res.status(401).json({
			msg: "No tienes permisos para esa operacion.",
		});
	}
	next();
};

const hasSecretaryRole = (req = request, res = response, next) => {
	if (!req.user) {
		return res.status(500).json({
			msg: "Se quiere verificar el rol sin validar el token primero",
		});
	}
	if (req.user.role !== "SECRETARY_ROLE") {
		return res.status(401).json({
			msg: "No tienes permisos para esa operacion.",
		});
	}
	next();
};

const hasEpilatorRole = (req = request, res = response, next) => {
	if (!req.user) {
		return res.status(500).json({
			msg: "Se quiere verificar el rol sin validar el token primero",
		});
	}
	if (req.user.role !== "EPILATOR_ROLE" || req.user.role !== "ADMIN_ROLE") {
		return res.status(401).json({
			msg: "No tienes permisos para esa operacion.",
		});
	}
	next();
};

module.exports = {
	hasAdminRole,
	hasDoctorRole,
	hasSecretaryRole,
	hasEpilatorRole,
};
