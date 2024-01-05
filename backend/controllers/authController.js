const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendEmail } = require("../helpers/helper");
const randomstring = require('randomstring'); 


// REGISTER USER
const signUpUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: "Invalid password" });
    }
    if (!isValidUserName(username)) {
      return res.status(400).json({ message: "Invalid username" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return res
        .status(200)
        .json({ message: "User Already exist", status: 200 });
    } else {
      const user = await User.create({
        email: email,
        password: hashedPassword,
        username: username,
      });
    }

    res.status(201).json({
      message: `signed up successfully`,
    });
  } catch (error) {
    console.error("Error registering user:");
    res.status(500).json({ message: "Sign up error occurred" });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  const JWTSecret =
    "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "User Email and Password are required", status: 400 });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: ["email", "password", "id", "username"],
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Authorization Failed", status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Authorization Failed", status: 401 });
    }

    const token = jwt.sign({ user_email: email }, JWTSecret, {
      expiresIn: "3h",
    });
    res.cookie("tokenComp", token);
    return res
      .status(200)
      .json({ message: "Success", token: token, status: 200, user: user });
  } catch (error) {
    console.error("Error while logging in:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
};

// GET ONE USER
const getOneUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "email", "username", "password"],
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error while logging in:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "username"],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal Server Error", status: 500 });
  }
};

// UPDATE USER BY ID
const updateUserById = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    // Validate and update user data
    if (email && !isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (password && !isValidPassword(password)) {
      return res.status(400).json({ message: "Invalid password" });
    }
    if (username && !isValidUserName(username)) {
      return res.status(400).json({ message: "Invalid username" });
    }

    // Update user data
    const updatedUser = await user.update({
      email: email || user.email,
      password: password ? await bcrypt.hash(password, 10) : user.password,
      username: username || user.username,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Update user error occurred", status: 500 });
  }
};

// CHANGE PASSWORD USER
const changeUserPassword = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;
    const user = await User.findByPk(id);

    const isOldPasswordsSame = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordsSame) {
      return res.status(406).json({ message: "Old password did not match" });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await User.update(
      {
        password: newPasswordHash,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({ message: "Passwords reset" });
  } catch (error) {
    console.error("Error while logging in:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
};

// USER PASSWORD RESET
const passwordReset = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    const newHashedPassword = await bcrypt.hash(password, 10);

    await User.update(
      {
        password: newHashedPassword,
      },
      {
        where: {
          id: user.dataValues.id,
        },
      }
    );

    return res.status(200).json({ message: "password reset" });
  } catch (error) {
    console.error("Error while logging in:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
};

// Generate token for reset password link
const generateResetToken = () => {
  return randomstring.generate({
    length: 32,
    charset: "alphanumeric",
  });
};

// Forgot Password Route
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in your database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    // Generate token for reset password link
    const resetToken = generateResetToken();

    // Save the reset token to the user in the database (you might want to store it securely)
    user.update({ resetToken });

    // Send reset password link to the user's email using the sendEmail function
    const resetLink = `http://yourwebsite.com/reset-password/${resetToken}`;
    await sendEmail(
      email,
      "Password Reset",
      `Click the following link to reset your password: ${resetLink}`,
      resetToken
    );

    res
      .status(200)
      .json({ message: "Reset link sent successfully", status: 200 });
  } catch (error) {
    console.error("Error sending reset link:", error);
    res.status(500).json({ message: "Internal Server Error", status: 500 });
  }
};

// Validation functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 6;
}

function isValidUserName(username) {
  return username.length > 3;
}

module.exports = {
  signUpUser,
  loginUser,
  getOneUser,
  updateUserById,
  getAllUsers,
  changeUserPassword,
  passwordReset,
  forgetPassword,
};
