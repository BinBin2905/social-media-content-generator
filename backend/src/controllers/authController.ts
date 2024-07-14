import twilio from "twilio/lib/rest/Twilio.js";
import { Request, Response } from "express";
import { db } from "../firebase/firebaseConfig.js";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID as string;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN as string;
const client = new twilio(twilioAccountSid, twilioAuthToken);

export const CreateNewAccessCode = async (req: Request, res: Response) => {
  let { phoneNumber, accessCode, user_id } = req.body;
  // const accessCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // create query to find in database have matched phone number
    const colRef = collection(db, "users");
    const q = query(colRef, where("phoneNumber", "==", phoneNumber));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Exist phone number
      res.status(409).send({ message: "Phone number already exists" });
      return;
    }

    // create a user doc with custom id
    const docRef = doc(colRef, user_id);

    //If don't have matched phone number, create new
    const newDoc = await setDoc(docRef, {
      phoneNumber: phoneNumber,
      accessCode: accessCode,
      createAt: serverTimestamp(),
    });

    // client.messages
    //   .create({
    //     body: "Your access code is " + accessCode,
    //     from: "+16283484326",
    //     to: "+84" + phoneNumber,
    //   })
    //   .then((message) => console.log("message: " + message));

    res.status(200).send({ user_id: user_id });
  } catch (error) {
    console.error("Error creating new access code: ", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const ValidateAccessCode = async (req: Request, res: Response) => {
  const { accessCode, phoneNumber } = req.body;

  try {
    // Create query to find the document that need to verified by phoneNumber
    const q = query(
      collection(db, "users"),
      where("phoneNumber", "==", phoneNumber)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // not found when don't match phone number
      res.status(404).json({ success: false });
      return;
    }

    let userDoc: DocumentData | undefined;
    let userDocId: string | undefined;

    // have found document
    querySnapshot.forEach((doc) => {
      userDoc = doc.data();
      userDocId = doc.id;
    });

    // check if userDocId have any error
    if (!userDocId) {
      res
        .status(500)
        .json({ success: false, message: "Failed to get user document ID" });
      return;
    }

    // check accessCode
    if (userDoc && userDoc.accessCode === accessCode) {
      // update accessCode into verified
      const docRef = doc(db, "users", userDocId);
      await updateDoc(docRef, {
        accessCode: "verified",
      });
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false });
    }
  } catch (error) {
    console.error("Error validating access code: ", error);
    res.status(500).json({ success: false });
  }
};
