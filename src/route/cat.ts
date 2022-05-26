import { Router } from "express";
import passport from "../lib/security";

const router = Router();

// 1 jwtが不要なapi
router.get("/public", (req, res, next) => {
  res.json("public cat");
});

// 2 jwtが必要なapi
router.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json("private cat");
  }
);

export default router;
