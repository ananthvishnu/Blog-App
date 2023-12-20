const express = require("express");
const { signUpUser,loginUser,getOneUser } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/user/:id", getOneUser);




module.exports = router;
