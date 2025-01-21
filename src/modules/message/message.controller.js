import { messageModel } from "../../../models/message.model.js";

const addMessage = async (req, res) => {
  const { message, receivedId } = req.body;
  await messageModel.insertMany({ message, receivedId });
  res.status(201).json({ message: "success" });
};
const getUserMessage = async (req, res) => {
  
  const messages = await messageModel.find({ receivedId: req.userId });
  res.json({ message: "success", messages });
};
export { addMessage, getUserMessage };
