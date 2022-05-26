import express from "express";
import cookieParser from "cookie-parser";

import passport from "./lib/security";
import catRouter from "./route/cat";
import userRouter from "./route/user";
import dogRouter from "./route/dog";

// 1 expressの設定
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 2 passportを初期化
app.use(passport.initialize());
// 3 routerを追加
app.use("/user", userRouter);
app.use("/cat", catRouter);
app.use("/dog", passport.authenticate("jwt", { session: false }), dogRouter);

app.listen(3000, () => {
  console.log("listen to " + 3000);
});
