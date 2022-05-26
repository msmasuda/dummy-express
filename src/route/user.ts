import express from "express";
import jwt from "jsonwebtoken";
import passport from "../lib/security";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    // 1 jwtのtokenを作成
    const user = req.user;
    const payload = { user: req.user };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1m",
    });
    res.json({ user, token });
  }
);

export default router;
