import React, { useState, useContext } from "react";
import { Box, Modal, TextField, Button, Typography } from "@mui/material";
import AuthContext from "../context/AuthContext";
import axios from "axios";


const PostForm = ({ open, onClose, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const { userId } = useContext(AuthContext);
  
  console.log("User ID from AuthContext:", userId);  

  const handleSubmit = async () => {
    if (!userId) return alert("User not authenticated");
    if (!content && !image) return alert("Post cannot be empty");

    // Create FormData for sending image as a file
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", content);
    if (image) formData.append("image", image); // Append image file

    const onPostCreated = () => {
        window.location.reload();  // ✅ Refreshes the page
      };
    try {
      const res = await axios.post("https://social-media-mini-platform-backend.onrender.com/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Post created:", res.data);
      onPostCreated(); // Refresh posts
      onClose(); // Close modal
    } catch (error) {
      console.error("❌ Error creating post:", error.response?.data || error.message);
      alert("Failed to create post");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Create a Post</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          label="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mt: 2 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginTop: "10px" }}
        />
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          Post
        </Button>
      </Box>
    </Modal>
  );
};

export default PostForm;
