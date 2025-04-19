import React from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ backgroundColor: "#080804", color: "white", padding: "20px 0" }}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Left section */}
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h7"
            align="center"
            px={3}
            sx={{ marginBottom: 1 }}
          >
            &copy; {new Date().getFullYear()} Ryleq Solutions. All Rights
            Reserved.
          </Typography>
        </Grid>

        {/* Right section with Links */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            paddingRight: isMobile ? 0 : "40px", // Add padding to the right
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="/" color="inherit" underline="none">
              <Typography variant="body2">About</Typography>
            </Link>
            <Link href="/" color="inherit" underline="none">
              <Typography variant="body2">Privacy Policy</Typography>
            </Link>
            <Link href="/" color="inherit" underline="none">
              <Typography variant="body2">Terms of Service</Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Social Media Icons */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Link href="https://www.facebook.com" target="_blank" color="inherit">
          <Facebook sx={{ fontSize: 30, marginX: 1 }} />
        </Link>
        <Link href="https://www.twitter.com" target="_blank" color="inherit">
          <Twitter sx={{ fontSize: 30, marginX: 1 }} />
        </Link>
        <Link href="https://www.instagram.com" target="_blank" color="inherit">
          <Instagram sx={{ fontSize: 30, marginX: 1 }} />
        </Link>
        <Link href="https://www.linkedin.com" target="_blank" color="inherit">
          <LinkedIn sx={{ fontSize: 30, marginX: 1 }} />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
