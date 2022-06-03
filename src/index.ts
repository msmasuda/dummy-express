import express from "express";
import cors from 'cors';
import userRouter from "./route/user";

// expressの設定
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routerを追加
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("listen to 3000");
});
