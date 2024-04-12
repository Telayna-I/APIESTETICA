const { Router } = require("express");
const { createUser, deleteUser, getUsers } = require("../controllers/users");
const {
	validateEmail,
	isValidRole,
	validateId,
} = require("../helpers/db-validators");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields.js");
const { hasAdminRole } = require("../middlewares/validate-Role.js");
const { validateJWT } = require("../middlewares/validate-JWT.js");

const router = Router();

router.get("/", [validateJWT, hasAdminRole], validateFields, getUsers);

router.post(
	"/",
	[
		validateJWT,
		hasAdminRole,
		check("role").custom(isValidRole),
		check("name", "El nombre es requerido").not().isEmpty(),
		check("email", "El email no es valido").isEmail(),
		check("email").custom(validateEmail),
		check(
			"password",
			"El password debe tener mas de 6 caracteres"
		).isLength({ min: 6 }),
		validateFields,
	],
	createUser
);

router.delete(
	"/:id",
	[
		validateJWT,
		hasAdminRole,
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(validateId),
		validateFields,
	],
	deleteUser
);

module.exports = router;
