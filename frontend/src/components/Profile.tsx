import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";

interface Content {
  id: string;
  data: string;
}

const Profile: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/GetUserGeneratedContents?phone_number=${phoneNumber}`
        );
        setContents(response.data.contents);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const unSaveContent = async (id: string) => {
    try {
      await axios.post("http://localhost:3000/api/UnSaveContent", {
        captionId: id,
      });
      fetchContents();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const shareContent = (content: string) => {
    // Implement sharing functionality
    console.log("Sharing:", content);
  };

  return (
    <Box>
      {contents.map((content) => (
        <Box key={content.id}>
          <p>{content.data}</p>
          <Button onClick={() => unSaveContent(content.id)}>Unsave</Button>
          <Button onClick={() => shareContent(content.data)}>Share</Button>
        </Box>
      ))}
    </Box>
  );
};

export default Profile;
