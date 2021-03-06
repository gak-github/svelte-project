const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const PASSWORD = process.env.MONGO_PWD; // comes from netlify environment variable setting
    
    if (!PASSWORD) { // if it is local development the password won't be availale so don't connect DB
      return;
    }

    const MONGO_URI = `mongodb+srv://ashok:${PASSWORD}@mern-stack-tw5cv.mongodb.net/mernstack?retryWrites=true&w=majority`;
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connection: ${conn.connection.host}`);

  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
