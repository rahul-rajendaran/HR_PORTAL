require("dotenv").config()
const { MongoClient } = require("mongodb");


const uri =`mongodb+srv://rahulrajendran1012:${process.env.MONGODB_PASSWORD}@cluster0.omrtt04.mongodb.net/?retryWrites=true&w=majority`;
let db: any;
const connectToDB = async () => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db("HR-PORTAL");
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database connection has not been established.");
  }
  return db;
};

module.exports = { connectToDB, getDB };
