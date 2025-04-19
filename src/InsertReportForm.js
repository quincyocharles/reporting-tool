import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InsertReportForm = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    receivingClientNumber: "",
    expectedCollection: 0,
    actualCollection: 0,
    additionalAmountDueToClient: 0,
    additionalAmountFromClient: 0,
    previousArrears: 0,
    newArrears: 0,
    arrearsCollected: 0,
    userId: "",
    itemsDelivered: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false); // New loading state

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    if (loggedInUserId) {
      setFormData((prevData) => ({
        ...prevData,
        userId: loggedInUserId,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbarMessage("You must be logged in to submit a report.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      navigate("/login");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://reports.ryleq.com:4100/api/reports",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbarMessage("Report submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setFormData({
        groupName: "",
        receivingClientNumber: "",
        expectedCollection: 0,
        actualCollection: 0,
        additionalAmountDueToClient: 0,
        additionalAmountFromClient: 0,
        previousArrears: 0,
        newArrears: 0,
        arrearsCollected: 0,
        userId: localStorage.getItem("userId") || "",
        itemsDelivered: "",
      });
    } catch (error) {
      setSnackbarMessage("Error submitting report. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error submitting report:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        📝 New Report
      </Typography>

      {/* Show progress bar when loading */}
      {loading && <LinearProgress sx={{ mb: 2 }} />}

      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Group Name"
                name="groupName"
                value={formData.groupName}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Receiving Client Number"
                name="receivingClientNumber"
                value={formData.receivingClientNumber}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expected Collection"
                name="expectedCollection"
                type="number"
                value={formData.expectedCollection}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Actual Collection"
                name="actualCollection"
                type="number"
                value={formData.actualCollection}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Additional Amount Due to Client"
                name="additionalAmountDueToClient"
                type="number"
                value={formData.additionalAmountDueToClient}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Additional Amount From Client"
                name="additionalAmountFromClient"
                type="number"
                value={formData.additionalAmountFromClient}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Previous Arrears"
                name="previousArrears"
                type="number"
                value={formData.previousArrears}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Arrears"
                name="newArrears"
                type="number"
                value={formData.newArrears}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Arrears Collected"
                name="arrearsCollected"
                type="number"
                value={formData.arrearsCollected}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="User ID"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                required
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Items Delivered"
                name="itemsDelivered"
                value={formData.itemsDelivered}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
                placeholder="Enter items delivered, one per line"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading} // Disable button while submitting
              >
                {loading ? "Submitting..." : "Submit Report"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InsertReportForm;
