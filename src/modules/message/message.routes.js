import express from "express";
import { addMessage, getUserMessage } from "./message.controller.js";
import { auth } from "../../middleware/auth.js";
const messageRouter = express.Router();
messageRouter.post("/", addMessage);
messageRouter.get("/", auth, getUserMessage);
export default messageRouter;
