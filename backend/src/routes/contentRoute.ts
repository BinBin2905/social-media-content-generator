import express, { Request, Response } from "express";
import {
  GeneratePostCaptions,
  GetPostIdeas,
  SaveGeneratedContent,
  GetUserGeneratedContents,
  UnSaveContent,
} from "../controllers/contentController.js";

const router = express.Router();

router.use((req: Request, res: Response, next) => {
  console.log("Middleware function for router");
  next();
});
router.post("/GeneratePostCaptions", GeneratePostCaptions);
router.post("/GetPostIdeas", GetPostIdeas);
router.post("/SaveGeneratedContent", SaveGeneratedContent);
router.get("/GetUserGeneratedContents", GetUserGeneratedContents);
router.post("/UnSaveContent", UnSaveContent);

export default router;
