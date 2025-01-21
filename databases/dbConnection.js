import mongoose from "mongoose";
export function dbConnection() {
  return mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log("DB error ", err);
    });
}
