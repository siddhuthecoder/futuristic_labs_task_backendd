import User from "../Models/Auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    // Finding User
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    //Checking Password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    //Create jwt token
    const token = await jwt.sign(
      { unique_id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // returning token
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const singUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(404)
        .json({ message: "This Username is already taken" });
    }

    // hashing password
    const hash = await bcrypt.hash(password, 12);

    // creating User
    const newUser = await User.create({ username, password: hash });

    // generating jwt token
    const token = await jwt.sign(
      { unique_id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // returning data
    return res
      .status(200)
      .json({ message: "Account Created Successfully", token, user: newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  const id = req.unique_id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "No User found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
