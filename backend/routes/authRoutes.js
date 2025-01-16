const { Router } = require('express');
const authcontroller = require("../controllers/authController");

const router = Router();

router.post ("/sign_up", authcontroller.signup_post);
router.post ("/sign_in", authcontroller.signin_post);
router.get ("/log_out", authcontroller.logout_get);

module.exports = router;