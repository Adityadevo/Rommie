// backend/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    try {
      const db = mongoose.connection.db;
      if (db) {
        const collection = db.collection("listings");
        const indexes = await collection.indexes();
        const geoIndexes = indexes.filter((idx) =>
          Object.values(idx.key || {}).includes("2dsphere"),
        );

        for (const idx of geoIndexes) {
          if (idx.name && idx.name !== "_id_") {
            await collection.dropIndex(idx.name);
            console.log(`✅ Dropped geo index: ${idx.name}`);
          }
        }
      }
    } catch (e) {
      console.error("❌ Geo index cleanup error:", e);
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

export default mongoose;
