import express, { Request, Response } from "express";
import {
  CreateNewAccessCode,
  ValidateAccessCode,
} from "../controllers/authController.js";

const router = express.Router();

router.use((req: Request, res: Response, next) => {
  console.log("Middleware function for router");
  next();
});

router.get("/hello", (req, res) => {
  res.send("hello");
});

router.post("/CreateNewAccessCode", CreateNewAccessCode);
router.post("/ValidateAccessCode", ValidateAccessCode);

export default router;
