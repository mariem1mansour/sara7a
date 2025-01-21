import nodemailer from "nodemailer";
import { htmlCode } from "./html.js";
import jwt from "jsonwebtoken";
export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mariemmansour7777@gmail.com",
      pass: "mzqobfqzdziuehvx",
    },
  });
let token = jwt.sign(
      { email : options.email},
      process.env.SECRET_KEY
    );
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"pingucoder nodejs " <mariemmansour7777@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line

    html: htmlCode(`http://localhost:3000/verify/${token}`), // html body
  });

  console.log("Message sent: %s", info);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
