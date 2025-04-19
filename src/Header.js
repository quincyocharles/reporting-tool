import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  AccountCircle,
  Send,
  Logout, // Added Logout icon
  Login as LoginIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

const Header = ({ isLoggedIn, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMobileMenuClose = () => setMobileMenuOpen(false);

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#080804", overflow: "hidden" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "120px", height: "auto", objectFit: "contain" }}
          />
        </Box>

        {/* Menu Items for larger screens */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ marginLeft: 2 }}
            >
              <Home sx={{ marginRight: 1 }} /> Home
            </Button>

            {isLoggedIn ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/profile"
                  sx={{ marginLeft: 2 }}
                >
                  <AccountCircle sx={{ marginRight: 1 }} /> Profile
                </Button>
                {/* <Button
                  color="inherit"
                  component={Link}
                  to="/admin"
                  sx={{ marginLeft: 2 }}
                >
                  <AccountCircle sx={{ marginRight: 1 }} /> Admin
                </Button> */}
                <Button
                  color="inherit"
                  component={Link}
                  to="/submit-report"
                  sx={{ marginLeft: 2 }}
                >
                  <Send sx={{ marginRight: 1 }} /> Submit Report
                </Button>
                <Button
                  color="inherit"
                  onClick={onLogout} // Calls logout function
                  sx={{ marginLeft: 2 }}
                >
                  <Logout sx={{ marginRight: 1 }} /> Logout
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ marginLeft: 2 }}
              >
                <LoginIcon sx={{ marginRight: 1 }} /> Login
              </Button>
            )}
          </Box>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => setMobileMenuOpen(true)}
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Menu */}
      <Menu open={mobileMenuOpen} onClose={handleMobileMenuClose}>
        <MenuItem component={Link} to="/" onClick={handleMobileMenuClose}>
          <Home sx={{ marginRight: 1 }} /> Home
        </MenuItem>

        {isLoggedIn ? (
          <>
            <MenuItem
              component={Link}
              to="/profile"
              onClick={handleMobileMenuClose}
            >
              <AccountCircle sx={{ marginRight: 1 }} /> Profile
            </MenuItem>
            <MenuItem
              component={Link}
              to="/submit-report"
              onClick={handleMobileMenuClose}
            >
              <Send sx={{ marginRight: 1 }} /> Submit Report
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMobileMenuClose();
                onLogout();
              }}
            >
              <Logout sx={{ marginRight: 1 }} /> Logout
            </MenuItem>
          </>
        ) : (
          <MenuItem
            component={Link}
            to="/login"
            onClick={handleMobileMenuClose}
          >
            <LoginIcon sx={{ marginRight: 1 }} /> Login
          </MenuItem>
        )}
      </Menu>
    </AppBar>
  );
};

export default Header;
