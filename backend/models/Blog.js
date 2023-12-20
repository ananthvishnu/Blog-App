const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db"); 

class Blog extends Model {}

Blog.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Blog",
    tableName: "Blogs"
  }
);

try {
    Blog.sync({ force: false })
    .then(() => {
      console.log('Blog Table created successfully.');
    })
    .catch(err => {
      console.error('Error creating blog table:', err);
    });
} catch (error) {
  console.error('Error:', error);
}

module.exports = Blog;

