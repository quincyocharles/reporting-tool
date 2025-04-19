import React, { useEffect, useState } from "react";
import { fetchReports } from "./api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const ReportsTable = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReports = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getReports();
  }, []);

  if (loading) return <Typography>Loading reports...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ width: "100%", overflowX: "auto", mt: 3 }}>
      <TableContainer component={Paper} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Mifos Reports
        </Typography>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {[
                "Group Name",
                "Client #",
                "Expected",
                "Actual",
                "Arrears",
                "Items",
                "Meeting Date",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  {report.groupName}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  {report.receivingClientNumber}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  Ksh {report.expectedCollection.toLocaleString()}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  Ksh {report.actualCollection.toLocaleString()}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  {report.newArrears > 0
                    ? `Ksh ${report.newArrears.toLocaleString()}`
                    : "None"}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  {report.itemsDelivered}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  {new Date(report.meetingDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportsTable;
