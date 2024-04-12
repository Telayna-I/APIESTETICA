const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require("express-validator");
const { hasSecretaryRole } = require("../middlewares/validate-Role");
const {
	validatePatientId,
	validateDepilationId,
} = require("../helpers/db-validators");
const {
	newDepilationShift,
	updateDepilationShift,
	finishDepilationShift,
} = require("../controllers/depilation");

const router = Router();

router.post(
	"/",
	[
		validateJWT,
		check("patient", "El paciente es reququerido").not().isEmpty(),
		check("patient", "El id no es valido").isMongoId(),
		check("patient").custom(validatePatientId),
		check("price", "El precio es requerido").not().isEmpty(),
		check("date", "La fecha es requerida ").not().isEmpty(),
		check("hour", "La hora es requerida ").not().isEmpty(),
		validateFields,
	],
	newDepilationShift
);

router.put("/update/:id", [validateJWT, validateFields], updateDepilationShift);

router.put(
	"/finish/:id",
	[
		validateJWT,
		check("id", "El id es obligatorio").not().isEmpty(),
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(validateDepilationId),
		validateFields,
	],
	finishDepilationShift
);

module.exports = router;
