import { Router } from "express";

const router = Router();

router.get("/1", (req, res, next) => {
  res.json("number of dog is 1");
});

router.get("/2", (req, res, next) => {
  res.json("number of dog is 2");
});

export default router;
