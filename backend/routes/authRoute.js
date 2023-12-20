const express = require("express");
const { signUpUser,loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);



module.exports = router;
