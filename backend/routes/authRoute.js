const express = require("express");
const { signUpUser,loginUser,getOneUser, updateUserById, getAllUsers, changeUserPassword, passwordReset, forgetPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/users",getAllUsers)
router.get("/user/:id", getOneUser);
router.put("/user-edit/:id",updateUserById);
router.put("/change-password",changeUserPassword);
router.put("/reset-password",passwordReset);
router.post("/forgot",forgetPassword);




module.exports = router;
