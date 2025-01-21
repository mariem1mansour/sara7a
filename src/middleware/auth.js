import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  let token = req.header("token");

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err)
      return res.json({ message: "error in Token or Token not provided" });
    req.userId = decoded.userId;
    next();
  });
};
