const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoute");
const blogRoutes = require("./routes/blogRoute")
const sequelize = require('./config/db');


const app = express();
const PORT = 3000 || 3001;

const User = require("./models/User");
const Blog = require("./models/Blog");

app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:4200', // Update with your client's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Adjust as needed
  credentials: true,
};

app.use(cors(corsOptions));


app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);


// Sync Sequelize models with the database
const syncAllModels = async () => {
  await sequelize.sync();
  await User.sync();
  await Blog.sync();
};

syncAllModels();


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
