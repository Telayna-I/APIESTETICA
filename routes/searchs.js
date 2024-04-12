const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-JWT");
const { validateFields } = require("../middlewares/validate-fields");
const { search } = require("../controllers/searchs");

const router = Router();

router.get("/:collection/:term", [(validateJWT, validateFields)], search);

module.exports = router;
