const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const {
	getPatients,
	newPatient,
	updatePatient,
} = require("../controllers/patients");
const { check } = require("express-validator");

const router = Router();

router.get("/", [validateJWT, validateFields], getPatients);

router.post(
	"/",
	[
		validateJWT,
		check("name", "El nombre es requerido").not().isEmpty(),
		check("surname", "El apellido es requerido").not().isEmpty(),
		check("phone", "El telefono es requerido").not().isEmpty(),
		check("age", "La edad es requerida").not().isEmpty(),
		validateFields,
	],
	newPatient
);

router.put("/update/:id", [validateJWT, validateFields], updatePatient);

module.exports = router;
