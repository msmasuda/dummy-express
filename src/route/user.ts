import express, { Request, Response } from "express";
import * as sqlite3 from "sqlite3";

const router = express.Router();

router.get("/find", (req: Request, res: Response, next) => {
  console.log(req.query);
  const user = req.query.username;
  const password = req.query.password;
  const db = new sqlite3.Database("./test.db", (err) => {
    db.get(
      "select name from users where name = ? and password = ?",
      user,
      password,
      (err: any, row: { name: string }) => {
        if (err) {
          res.status(400).json({
            status: "error",
            message: err.message,
          });
          return;
        } else {
          console.log(row);
          res.status(200).json({
            status: "OK",
            user: row,
          });
        }
      }
    );
  });
});

export default router;
