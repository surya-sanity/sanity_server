const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `mongoose connected !! ${conn.connection.host}`.green.underline
    );
  } catch (err) {
    console.log(`mongoose not connected ${err}`.red.underline);
    process.exit(1);
  }
};

module.exports = connectDB;
