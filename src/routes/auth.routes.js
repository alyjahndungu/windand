import { getUserByEmail } from "../services/auth.service";
const UserModel = require("../models/users");

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const authorize = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// Register new User endpoint
router.post(
  "/register",
  [
    check("fullName")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage("firstName must be at least 3 characters long"),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password should be between 4 to 8 characters long")
      .not()
      .isEmpty()
      .isLength({ min: 4, max: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      await bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new UserModel({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hash,
        });

        user
          .save()
          .then((res) => {
            res.status(201).json({
              statusCode: 201,
              message: "User successfully created!",
              result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
              message:
                "Sorry, something went wrong on our server. Please try again",
            });
          });
      });
    }
  }
);

// USER Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res
        .status(400)
        .json({ statusCode: 400, message: "Password is wrong!" });

    const payload = { email, role: user.role, userId: user._id };
    const jwtToken = jwt.sign(payload, "xenon-secret", { expiresIn: "6h" });

    return res.status(200).json({
      statusCode: 200,
      accessToken: jwtToken,
      expiresIn: "6h",
      _id: user._id,
    });
  } catch (error) {
    return res.status(401).json({
      statusCode: 401,
      message: "Authentication failed, Please check your credentials",
    });
  }
});
