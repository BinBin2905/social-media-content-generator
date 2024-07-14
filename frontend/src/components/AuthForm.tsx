import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import firebase from "../firebaseConfig";
import { Navigate } from "react-router-dom";

declare global {
  interface Window {
    recaptchaVerfier: firebase.auth.RecaptchaVerifier;
    confirmationResult: firebase.auth.ConfirmationResult;
  }
}
function AuthForm() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [accessCode, setAccessCode] = useState<string>("");
  // const [verified, setVerified] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+84");
  const countryCodes = [
    { code: "+84", country: "Vietnam" },
    { code: "+1", country: "United States" },
    { code: "+81", country: "Japan" },
    { code: "+82", country: "South Korea" },
    { code: "+86", country: "China" },
    { code: "+65", country: "Singapore" },
    { code: "+61", country: "Australia" },
    { code: "+44", country: "United Kingdom" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "enter", country: "other" },
  ];

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCode(event.target.value);
  };
  const setupRecaptcha = () => {
    window.recaptchaVerfier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        defaultCountry: "VN",
      }
    );
  };

  useEffect(() => {
    setupRecaptcha();
  }, []);

  const removeLeadingZero = (phoneNumber: string): string => {
    return phoneNumber.slice(1);
  };

  const handleSubmitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    const appVerify = window.recaptchaVerfier;
    let newPhoneNumber = phoneNumber;
    if (selectedCode.includes("+")) {
      console.log("include selectedCode");
      newPhoneNumber = selectedCode + removeLeadingZero(phoneNumber);
      console.log("newPhone: " + newPhoneNumber);
      setPhoneNumber(newPhoneNumber);
    }
    console.log("Phone number: " + phoneNumber);

    await firebase
      .auth()
      .signInWithPhoneNumber(newPhoneNumber, appVerify)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        alert("OTP sended");
      })
      .catch((err) => {
        console.log(err);
        alert("OTP sended failed");
      });

    // const response = await axios
    //   .post("http://localhost:3000/api/CreateNewAccessCode", {
    //     phoneNumber: newPhoneNumber,
    //     accessCode: window.confirmationResult,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    let user_id;
    console.log("Access code: " + accessCode);
    await window.confirmationResult
      .confirm(accessCode)
      .then((res) => {
        console.log(res.user?.uid);
        user_id = res.user?.uid;
        alert("Verify success");
      })
      .catch((err) => {
        console.log(err);
        alert("Verify failed");
      });

    // const response = await axios.post(
    //   "http://localhost:3000/api/ValidateAccessCode",
    //   {
    //     accessCode: accessCode,
    //     phoneNumber: phoneNumber,
    //   }
    // );
    // if (response.data.success) {
    //   // setVerified(true);
    //   localStorage.setItem("phoneNumber", phoneNumber);
    // }

    await axios
      .post("http://localhost:3000/api/CreateNewAccessCode", {
        user_id: user_id,
        accessCode: "verified",
        phoneNumber: phoneNumber,
      })
      .then((res) => {
        console.log(res);
        console.log("success verified");
        localStorage.setItem("phoneNumber", phoneNumber);
        <Navigate to="/" />;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          flexDirection: "column",
          margin: "100px",
        }}
      >
        <FormHelperText>
          Enter your phone number like this format: `+'country number''your
          phone number' remove the first number of your phone number`
        </FormHelperText>
        <FormHelperText>
          Ex: Country_Vietname_+84; Phone number_0903xxxxxx will be +84903xxxxxx
        </FormHelperText>
        <Box component="section" sx={{ display: "flex", gap: "12px" }}>
          <Select
            value={selectedCode}
            onChange={handleChange}
            label="Country Code"
          >
            {countryCodes.map((item) => (
              <MenuItem key={item.code} value={item.code}>
                {item.country} ({item.code})
              </MenuItem>
            ))}
          </Select>
          <TextField
            variant="outlined"
            type="text"
            label="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmitPhone}>
            SUBMIT
          </Button>
        </Box>
        <Box component="section" sx={{ display: "flex", gap: "12px" }}>
          <TextField
            type="text"
            variant="outlined"
            label="Access Code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />
          <Button variant="contained" onClick={handleVerifyCode}>
            VERIFY
          </Button>
        </Box>
      </Box>
      <div id="sign-in-button"></div>

      {/* {!verified ? (
        
      ) : (
        <p>Access verified!</p>
      )} */}
    </div>
  );
}

export default AuthForm;
