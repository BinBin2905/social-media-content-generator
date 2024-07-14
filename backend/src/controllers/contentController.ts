import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";
import { db } from "../firebase/firebaseConfig.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const genAI = new GoogleGenerativeAI("AIzaSyCab6wCCYerkdPPv0Ge0-JuviQPKFGq6v0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const CreateCaptionsFromIdeas = async (req: Request, res: Response) => {
  try {
    const { idea } = req.body;
    const result = await model.generateContent(
      `Generate 5 captions based on this post idea: ${idea}`
    );
    const captions = result.response
      .text()
      .split("\n")
      .filter((caption) => caption.trim() !== "");
    res.status(200).json({ captions });
  } catch (error) {
    console.error("Error creating captions from idea:", error);
    res
      .status(500)
      .json({ success: false, message: "Error creating captions from idea" });
  }
};

export const GeneratePostCaptions = async (req: Request, res: Response) => {
  try {
    const { socialNetwork, topic, tone } = req.body;
    const result = await model.generateContent(
      `Generate 5 ${tone} captions for ${socialNetwork} about ${topic}`
    );
    const captions = result.response
      .text()
      .split("\n")
      .filter((caption) => caption.trim() !== "");
    res.status(200).json({ captions });
  } catch (error) {
    console.error("Error generating captions:", error);
    res
      .status(500)
      .json({ success: false, message: "Error generating captions" });
  }
};

export const GetPostIdeas = async (req: Request, res: Response) => {
  try {
    const { topic } = req.body;
    const result = await model.generateContent(
      `Generate 10 post ideas about ${topic}`
    );
    const ideas = result.response
      .text()
      .split("\n")
      .filter((idea) => idea.trim() !== "");
    res.status(200).json({ ideas });
  } catch (error) {
    console.error("Error generating post ideas:", error);
    res
      .status(500)
      .json({ success: false, message: "Error generating post ideas" });
  }
};

export const SaveGeneratedContent = async (req: Request, res: Response) => {
  try {
    const { topic, data, phone_number } = req.body;
    await addDoc(collection(db, "generatedContent"), {
      topic,
      data,
      phone_number,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving generated content:", error);
    res.status(500).json({ success: false, message: "Failed to save content" });
  }
};

export const GetUserGeneratedContents = async (req: Request, res: Response) => {
  try {
    const { phone_number } = req.query;
    const q = query(
      collection(db, "generatedContent"),
      where("phone_number", "==", phone_number)
    );
    const snapshot = await getDocs(q);

    const contents = snapshot.docs.map((doc) => doc.data());
    res.status(200).json(contents);
  } catch (error) {
    console.error("Error getting user generated contents:", error);
    res.status(500).json({ success: false });
  }
};
export const UnSaveContent = async (req: Request, res: Response) => {
  try {
    const { captionId } = req.body;
    const docRef = doc(db, "generatedContent", captionId);
    await deleteDoc(docRef);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting content:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete content" });
  }
};
