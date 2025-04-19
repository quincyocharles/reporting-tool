import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  MenuItem,
} from "@mui/material";
import { createUser } from "./api";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    admin: "N",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      await createUser(formData);
      setStatus({ type: "success", message: "User created successfully!" });
      setFormData({ userName: "", email: "", password: "", admin: "N" });
    } catch (error) {
      const response = error.response;
      let errorMessage = "Something went wrong.";

      if (response) {
        // Handle based on status code first
        if (response.status === 409) {
          errorMessage = "User with this username or email already exists.";
        } else if (response.data?.message) {
          errorMessage = response.data.message;
        }
      }

      setStatus({ type: "error", message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Create New User
        </Typography>

        {status.message && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            inputProps={{ pattern: "[^@\\s]+@[^@\\s]+\\.[^@\\s]+" }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            select
            label="Admin"
            name="admin"
            value={formData.admin}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateUser;
