/*------------------------------- Starter Code -------------------------------*/
//@ts-check
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require("./models/User");

const SALT_ROUNDS = 10;

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  mongoose.set("debug", true);
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

const createUsers = async () => {
  const usersData = [
    {
      username: "aloy",
      hashedPassword: await bcrypt.hash("123", SALT_ROUNDS),
    },
    {
      username: "jr",
      hashedPassword: bcrypt.hashSync("456", SALT_ROUNDS),
    },
  ];

  await User.deleteMany({});

  for (let i = 0; i < usersData.length; i++) {
    const user = await User.create(usersData[i]);
    console.log("new user", user);
  }
};

const runQueries = async () => {
  console.log("Queries running.");
  // The functions calls to run queries in our db will go here as we write them.

  await createUsers();
};

connect();
/*------------------------------ Query Functions -----------------------------*/
