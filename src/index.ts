import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import HttpStatus from "http-status-codes";
import mongoose from "mongoose";
import passport from "passport";
import { serializeError } from "serialize-error";
import environment_variables from "./api/v1/common/config/enviorment_config";
import { strategy } from "./api/v1/common/config/passport.config";
import Socket from "./api/v1/common/socket";
import Routes from "./api/v1/routes";

import { createServer } from "http";
dotenv.config();
export const app = express();
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
// const database = process.env.DB_URL || "";
const database = process.env.DB_URL_LIVE || "";

mongoose
  .connect(database)
  .then(async () => {
    console.log("connected to database");
  })
  .catch((err: any) => console.log("error mongodb", err));

app.use(passport.initialize());
strategy(passport);
app.use("/", Routes);
const PORT = process.env.PORT || environment_variables.PORT;
// handle internal server error while error occurring in controller part
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  let errorLog = serializeError(error);
  if (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      errors: { message: errorLog.message },
    });
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatus.NOT_FOUND).send({
    status_code: HttpStatus.NOT_FOUND,
    success: false,
    errors: { message: "Not A Valid Endpoint" },
  });
});
//BELOW LINE COMMENTED BY CHARANJIT
//app.listen(PORT, () => console.log(`server running on port:- ${PORT}`));

/** Socket Config */
//ADDED app in createServer function by CHARANJIT
let server = createServer(app);

if (!server)
  //   console.log(
  //     `Server running  on the port ${process.env.PORT} `
  //   );
  // else
  console.log(`!!!!!!!!      Unable to create Server      !!!!!!!!`);
//ADDED server.listen(PORT) by CHARANJIT
server.listen(PORT);
const { socketIO, chatIO } = Socket.connectSocket(server);
app.set("chatIO", chatIO);
app.set("socketIO", socketIO);

//server.listen(PORT);
// require("./api/v1/contoller-services/chat/conversation_io.service").connectChat(
//   chatIO
// );

// /** Database and Firebase */
// require("./app/config/database").connectMongoDb(chatIO);
