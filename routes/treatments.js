const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require("express-validator");
const { hasAdminRole } = require("../middlewares/validate-Role");
const { validateTreatmentId } = require("../helpers/db-validators");
const {
	finishTreatments,
	newTreatment,
	updateTreatment,
} = require("../controllers/treatments");

const router = Router();

router.post(
	"/",
	[
		validateJWT,
		check("toDo", "El tratamiento es reququerido").not().isEmpty(),
		check("patient", "El paciente es reququerido").not().isEmpty(),
		check("patient", "El id no es valido").isMongoId(),
		check("price", "El precio es requerido").not().isEmpty(),
		check("date", "La fecha es requerida ").not().isEmpty(),
		check("hour", "La hora es requerida ").not().isEmpty(),
		validateFields,
	],
	newTreatment
);

router.put("/update/:id", [validateJWT, validateFields], updateTreatment);

router.put(
	"/finish/:id",
	[
		validateJWT,
		check("id", "El id es obligatorio").not().isEmpty(),
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(validateTreatmentId),
		validateFields,
	],
	finishTreatments
);

module.exports = router;
