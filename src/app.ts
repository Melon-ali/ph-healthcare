import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import httpStatus from "http-status";

const app: Application = express();

app.use(cors());

// parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Ph Health Care Server",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req)
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found",
    error: {
      path: req.originalUrl,
      message: "Your request path is not available",
    },
  });
})

export default app;
