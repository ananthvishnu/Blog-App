const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db"); 

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users"
  }
);

try {
  User.sync({ force: false })
    .then(() => {
      console.log('User table created successfully.');
    })
    .catch(err => {
      console.error('Error creating user table:', err);
    });
} catch (error) {
  console.error('Error:', error);
}

module.exports = User;

