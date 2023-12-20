const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register user
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




// Login user
const loginUser = async (req, res) => {
  const JWTSecret = 'https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
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

const getOneUser = async (req, res) => {
  try{
    const user = await User.findByPk(req.params.id,{
      attributes: ['id', 'email', 'username', 'password']
    });

    return res.status(200).json(user);
  }catch(error){
    console.error('Error while logging in:', error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
}



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
  signUpUser,loginUser,getOneUser
};
