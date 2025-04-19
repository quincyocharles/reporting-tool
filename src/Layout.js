import React from "react";
import { Box } from "@mui/material";
import Footer from "./Footer"; // Adjust the import path as needed

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensure the layout takes at least the full viewport height
      }}
    >
      <Box sx={{ flex: 1 }}>{children}</Box> {/* Main content */}
      <Footer /> {/* Footer */}
    </Box>
  );
};

export default Layout;
