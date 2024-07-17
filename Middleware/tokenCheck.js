import jwt, { decode } from "jsonwebtoken";

const tokenCheck = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid Session" });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid Session" });
    }

    req.unique_id = decodedToken.unique_id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Session" });
  }
};

export default tokenCheck;
