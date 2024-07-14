import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import axios from "axios";

const Services: React.FC = () => {
  const [socialNetwork, setSocialNetwork] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [captions, setCaptions] = useState<string[]>([]);
  const [postIdeas, setPostIdeas] = useState<string[]>([]);

  const createCaptionsFromIdea = async (idea: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/CreateCaptionsFromIdeas",
        { idea }
      );
      setCaptions(response.data.captions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPostIdeas = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/GetPostIdeas",
        {
          topic,
        }
      );
      setPostIdeas(response.data.ideas);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const generateCaptions = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/GeneratePostCaptions",
        { socialNetwork, topic, tone }
      );
      setCaptions(response.data.captions.slice(0, 5));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const saveCaption = async (caption: string) => {
    try {
      await axios.post("http://localhost:3000/api/SaveGeneratedContent", {
        topic: topic,
        data: caption,
        phone_number: localStorage.getItem("phoneNumber"),
      });
      alert("Caption saved");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const shareContent = (
    content: string,
    method: "facebook" | "email" | null
  ) => {
    if (method === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          content
        )}`,
        "_blank"
      );
    } else if (method === "email") {
      window.location.href = `mailto:?body=${encodeURIComponent(content)}`;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Social Network</InputLabel>
        <Select
          value={socialNetwork}
          onChange={(e) => setSocialNetwork(e.target.value as string)}
        >
          <MenuItem value="Facebook">Facebook</MenuItem>
          <MenuItem value="Instagram">Instagram</MenuItem>
          <MenuItem value="Twitter">Twitter</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <TextField
        label="Tone"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      />
      <Button onClick={generateCaptions}>Generate Captions</Button>
      <Button onClick={getPostIdeas}>Get Post Ideas</Button>

      {captions.map((caption, index) => (
        <Box key={index}>
          <p>{caption}</p>
          <Button onClick={() => saveCaption(caption)}>Save</Button>
          <Button onClick={() => shareContent(caption, "facebook")}>
            Share to Facebook
          </Button>
        </Box>
      ))}
      {postIdeas.map((idea, index) => (
        <Box key={index}>
          <p>{idea}</p>
          <Button onClick={() => createCaptionsFromIdea(idea)}>
            Create Captions
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default Services;
