const mongoose = require("mongoose");
let cached = global.__mongoose_conn;
if (!cached) {
  cached = global.__mongoose_conn = { conn: null, promise: null };
}
const connectDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!process.env.DB_URL) {
    throw new Error("DB_URL is not set");
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((m) => m)
      .catch((err) => {
        console.error("Mongo connection error:", err.message);
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
module.exports = connectDatabase;
