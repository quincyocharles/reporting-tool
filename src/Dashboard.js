import React, { useEffect, useState } from "react";
import { fetchReports } from "./api";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  TextField,
} from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const itemsPerPage = 15;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter by date range
  const filteredReports = reports.filter((report) => {
    const reportDate = new Date(report.meetingDate).toISOString().split("T")[0];
    if (startDate && reportDate < startDate) return false;
    if (endDate && reportDate > endDate) return false;
    return true;
  });

  const paginatedReports = filteredReports.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalExpected = reports.reduce(
    (sum, report) => sum + report.expectedCollection,
    0
  );
  const totalActual = reports.reduce(
    (sum, report) => sum + report.actualCollection,
    0
  );
  const totalArrears = reports.reduce(
    (sum, report) => sum + report.newArrears,
    0
  );

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredReports);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
    XLSX.writeFile(workbook, "Reports.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Reports Data", 10, 10);
    const tableData = filteredReports.map((report) => [
      report.groupName,
      report.receivingClientNumber,
      `Ksh ${report.expectedCollection.toLocaleString()}`,
      `Ksh ${report.actualCollection.toLocaleString()}`,
      report.newArrears > 0
        ? `Ksh ${report.newArrears.toLocaleString()}`
        : "None",
      report.itemsDelivered,
      new Date(report.meetingDate).toLocaleDateString(),
    ]);
    doc.autoTable({
      head: [
        [
          "Group Name",
          "Client #",
          "Expected",
          "Actual",
          "Arrears",
          "Items",
          "Meeting Date",
        ],
      ],
      body: tableData,
    });
    doc.save("Reports.pdf");
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        overflowX: "hidden",
      }}
    >
      <Typography variant="h5" gutterBottom>
        📊 Midzi Reports
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        <Grid item xs={11} sm={4}>
          <Card sx={{ backgroundColor: "#1976d2", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Expected Collection</Typography>
              <Typography variant="h5">
                Ksh {totalExpected.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={11} sm={4}>
          <Card sx={{ backgroundColor: "#2e7d32", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Actual Collection</Typography>
              <Typography variant="h5">
                Ksh {totalActual.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={11} sm={4}>
          <Card sx={{ backgroundColor: "#d32f2f", color: "white" }}>
            <CardContent>
              <Typography variant="h6">Total Arrears</Typography>
              <Typography variant="h5">
                Ksh {totalArrears.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Date Range Filter */}
      <Box
        sx={{
          mt: 7,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setPage(1);
          }}
          InputLabelProps={{ shrink: true }}
          sx={{ width: { xs: "100%", sm: "auto" }, maxWidth: 300 }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setPage(1);
          }}
          InputLabelProps={{ shrink: true }}
          sx={{ width: { xs: "100%", sm: "auto" }, maxWidth: 300 }}
        />
      </Box>

      {/* Reports Table */}
      <TableContainer component={Paper} sx={{ p: 2, mt: 4, overflowX: "auto" }}>
        <Typography variant="h6" gutterBottom>
          📋 Submissions
        </Typography>
        {loading ? (
          <Typography>Loading reports...</Typography>
        ) : error ? (
          <Typography color="error">Error: {error}</Typography>
        ) : (
          <>
            <Box sx={{ minWidth: 900 }}>
              <Table>
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
                          whiteSpace: "nowrap", // prevent wrap
                          minWidth: header === "Meeting Date" ? 140 : "auto", // force enough space
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.groupName}</TableCell>
                      <TableCell>{report.receivingClientNumber}</TableCell>
                      <TableCell>
                        Ksh {report.expectedCollection.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        Ksh {report.actualCollection.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {report.newArrears > 0
                          ? `Ksh ${report.newArrears.toLocaleString()}`
                          : "None"}
                      </TableCell>
                      <TableCell>{report.itemsDelivered}</TableCell>
                      <TableCell>
                        {new Date(report.meetingDate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </TableContainer>

      {/* Download Buttons */}
      <Box sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={downloadExcel}>
          Download Excel
        </Button>
        <Button variant="contained" color="secondary" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
