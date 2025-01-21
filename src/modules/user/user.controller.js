import { userModel } from "../../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../emails/nodemailer.js";
const signUp = async (req, res) => {
  const { name, email, password, age } = req.body;
  const user = await userModel.findOne({ email });
  if (user) return res.json({ message: "email already exists" });
  let hash = bcrypt.hashSync(password, 8);
  userModel.insertMany({ name, email, password: hash, age });
  sendEmail({ email });
  res.status(201).json({ message: "success" });
};
export const verify = async (req, res) => {
  const { token } = req.params;
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) return res.json({ message: "error" });
    await userModel.findOneAndUpdate(
      { email: decoded.email },
      { verified: true }
    );
    res.json({ message: "success" });
  });
};
const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    let token = jwt.sign(
      { name: user.name, userId: user._id },
      process.env.SECRET_KEY
    );
    res.json({ message: "success", token });
  }

  res.json({ message: "incorrect email or password" });
};

export { signUp, signIn };
