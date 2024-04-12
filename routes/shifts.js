const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const {
	getTreatments,
	getTreatmentByUserId,
} = require("../controllers/shifts");
const { getDepilationShifts } = require("../controllers/depilation");

const router = Router();

router.get("/", [validateJWT, validateFields], getTreatments);

router.get("/depilation", [validateJWT, validateFields], getDepilationShifts);

router.get("/:id", [validateJWT, validateFields], getTreatmentByUserId);

module.exports = router;
