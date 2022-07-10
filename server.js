const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoute"));

app.use(errorHandler);

app.listen(port, () => console.log(`App is started and listening in ${port}`));
