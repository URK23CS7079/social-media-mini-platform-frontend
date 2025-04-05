import React, { useState, useContext } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Modal,
} from "@mui/material";
import { Home, Search, AccountCircle, ExitToApp, AddBox } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PostForm from "./PostForm";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const { logout, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "64px",
          right: 0,
          height: "calc(100vh - 64px)",
          backgroundColor: "rgba(18, 18, 18, 0.8)", // Exact Navbar color
          backdropFilter: "blur(10px)",
          width: isExpanded ? "200px" : "60px",
          transition: "width 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "15px",
          borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
          zIndex: 1100,
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <List sx={{ width: "100%", flexGrow: 1 }}>
          {/* Home Button */}
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                color: "white",
                "&:hover": { 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderLeft: "3px solid rgba(144, 202, 249, 0.5)"
                },
                justifyContent: isExpanded ? "flex-start" : "center",
                padding: "12px 8px",
                width: "100%",
                transition: "all 0.2s ease",
              }}
            >
              <ListItemIcon
                sx={{ 
                  color: "white", 
                  minWidth: "auto", 
                  marginRight: isExpanded ? "16px" : "0",
                }}
              >
                <Home fontSize="medium" />
              </ListItemIcon>
              {isExpanded && <ListItemText primary="Home" />}
            </ListItemButton>
          </ListItem>

          {/* Search Button */}
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/search"
              sx={{
                color: "white",
                "&:hover": { 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderLeft: "3px solid rgba(244, 143, 177, 0.5)"
                },
                justifyContent: isExpanded ? "flex-start" : "center",
                padding: "12px 8px",
                width: "100%",
              }}
            >
              <ListItemIcon
                sx={{ color: "white", minWidth: "auto", marginRight: isExpanded ? "16px" : "0" }}
              >
                <Search fontSize="medium" />
              </ListItemIcon>
              {isExpanded && <ListItemText primary="Search" />}
            </ListItemButton>
          </ListItem>

          {/* Profile Button */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleProfileClick}
              sx={{
                color: "white",
                "&:hover": { 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderLeft: "3px solid rgba(144, 202, 249, 0.5)"
                },
                justifyContent: isExpanded ? "flex-start" : "center",
                padding: "12px 8px",
                width: "100%",
              }}
            >
              <ListItemIcon
                sx={{ color: "white", minWidth: "auto", marginRight: isExpanded ? "16px" : "0" }}
              >
                <AccountCircle fontSize="medium" />
              </ListItemIcon>
              {isExpanded && <ListItemText primary="Profile" />}
            </ListItemButton>
          </ListItem>

          {/* Post Button */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setOpenPostModal(true)}
              sx={{
                color: "white",
                "&:hover": { 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderLeft: "3px solid rgba(244, 143, 177, 0.5)"
                },
                justifyContent: isExpanded ? "flex-start" : "center",
                padding: "12px 8px",
                width: "100%",
              }}
            >
              <ListItemIcon
                sx={{ color: "white", minWidth: "auto", marginRight: isExpanded ? "16px" : "0" }}
              >
                <AddBox fontSize="medium" />
              </ListItemIcon>
              {isExpanded && <ListItemText primary="Post" />}
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ 
          backgroundColor: "rgba(255, 255, 255, 0.08)", 
          width: "80%",
          my: 1 
        }} />

        <List sx={{ width: "100%", paddingBottom: "20px" }}>
          {/* Logout Button */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={logout}
              sx={{
                color: "white",
                "&:hover": { 
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  borderLeft: "3px solid rgba(255, 82, 82, 0.5)"
                },
                justifyContent: isExpanded ? "flex-start" : "center",
                padding: "12px 8px",
                width: "100%",
              }}
            >
              <ListItemIcon
                sx={{ color: "white", minWidth: "auto", marginRight: isExpanded ? "16px" : "0" }}
              >
                <ExitToApp fontSize="medium" />
              </ListItemIcon>
              {isExpanded && <ListItemText primary="Logout" />}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Modal 
        open={openPostModal} 
        onClose={() => setOpenPostModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PostForm open={openPostModal} onClose={() => setOpenPostModal(false)} />
      </Modal>
    </>
  );
};

export default Sidebar;