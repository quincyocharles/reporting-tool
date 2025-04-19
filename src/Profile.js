import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
} from "@mui/material";
import { getUserProfile } from "./api"; // Import the getUserProfile API function
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(); // Fetch user details using the API
        setUser(data); // Update the state with the user data
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile.");
        if (err.response?.status === 401) {
          navigate("/login"); // Redirect to login if unauthorized
        }
      } finally {
        setIsLoading(false); // Stop loading once the request is finished
      }
    };

    fetchUserProfile(); // Call the function to fetch user profile
  }, [navigate]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 5,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          My Profile
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "primary.main",
              fontSize: "2.5rem",
            }}
          >
            {user?.userName?.charAt(0).toUpperCase()}
          </Avatar>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Username
          </Typography>
          <Typography variant="h6" sx={{ wordBreak: "break-word" }}>
            {user?.userName}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Email
          </Typography>
          <Typography variant="h6" sx={{ wordBreak: "break-word" }}>
            {user?.email}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Admin
          </Typography>
          <Typography variant="h6">{user?.admin ? "Yes" : "No"}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
