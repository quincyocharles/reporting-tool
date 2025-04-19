import React, { useEffect, useState } from "react";
import { fetchReports } from "./api";
import "./Reports.css";

const Reports = () => {
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

  if (loading) return <div className="loading">Loading reports...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="reports-container">
      <h1>Mifos Reports</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <h2>{report.groupName}</h2>
            <h2>{report.expectedCollection}</h2>
            <h2>{report.groupName}</h2>
            <h2>{report.groupName}</h2>
            <h2>{report.groupName}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
