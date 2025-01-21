import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./databases/dbConnection.js";
import userRouter from "./src/modules/user/user.routes.js";
import messageRouter from "./src/modules/message/message.routes.js";
import { userModel } from "./models/user.model.js";
// load enviroment variables
dotenv.config();
const app = express();
app.use(express.json());
app.use(userRouter);
app.use("/messages", messageRouter);
const port = 3000;
dbConnection();
// app.get("/verify/:email", async(req, res) => {
//   await userModel.findOneAndUpdate({email:req.params.email},{verified:true})
//   res.json({ message: "verified" });
// });
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
