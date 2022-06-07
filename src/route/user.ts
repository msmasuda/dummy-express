import express, { Request, Response } from "express";
import * as sqlite3 from "sqlite3";

const router = express.Router();

router.get("/login", (req: Request, res: Response, next) => {
  console.log(`login: ${JSON.stringify(req.query)}`);
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
    db.close();
  });
});

router.get("/find_by_name", (req: Request, res: Response, next) => {
  console.log(`find_by_name: ${JSON.stringify(req.query)}`);
  const user = req.query.username;
  const db = new sqlite3.Database("./test.db", (err) => {
    db.get(
      "select name from users where name = ?",
      user,
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
    db.close();
  });
});

router.post("/update", (req: Request, res: Response, next) => {
  console.log(`update: ${JSON.stringify(req.body.params)}`);
  const user = req.body.params.username;
  const password = req.body.params.password;
  const db = new sqlite3.Database("./test.db", (err) => {
    // トランザクション開始
    db.run("BEGIN TRANSACTION");
    db.run(
      "update users set password = ? where name = ?",
      password,
      user,
      (err: any, count: number) => {
        if (err) {
          res.status(400).json({
            status: "error",
            message: err.message,
          });
          return;
        } else {
          res.status(200).json({
            status: "OK",
          });
        }
      }
    );
    db.run("COMMIT");
    db.close();
  });
});

export default router;
