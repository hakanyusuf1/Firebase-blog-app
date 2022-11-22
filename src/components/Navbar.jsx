import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { SentimentSatisfiedOutlined } from "@mui/icons-material";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { logOut } from "../helpers/firebase";

const userPasive = ["login", "register"];

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu11 = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          height: "64px",
          backgroundColor: "black",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mr: 1,
            }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                color: "white",
              }}
            >
              <SentimentSatisfiedOutlined sx={{ mr: 1 }} />
              <Typography
                noWrap
                variant="h6"
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                }}
              >
                {" "}
                HYB|BLOG-APP
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 0, display: { xs: "block", md: "none" } }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                  }}
                >
                  {currentUser ? (
                    <Box
                      sx={{
                        padding: "2px",
                        border: "white 2px dotted",
                        borderRadius: "50%",
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          currentUser?.photoURL ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                      />
                    </Box>
                  ) : (
                    <Box>
                      <MenuIcon fontSize="large" sx={{ color: "white" }} />
                    </Box>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {currentUser ? (
                  <Box>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        sx={{
                          textDecoration: "none",
                        }}
                        to="profile"
                      >
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "600",
                          }}
                          textAlign="center"
                        >
                          Profile
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        sx={{
                          textDecoration: "none",
                        }}
                        to="new"
                      >
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "600",
                          }}
                          textAlign="center"
                        >
                          New Blog
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <span
                        onClick={() => logOut(navigate)}
                        sx={{
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "600",
                          }}
                          textAlign="center"
                        >
                          Logout
                        </Typography>
                      </span>
                    </MenuItem>
                  </Box>
                ) : (
                  <Box>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to="/login">
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "600",
                          }}
                          textAlign="center"
                        >
                          login
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to="/register">
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "600",
                          }}
                          textAlign="center"
                        >
                          register
                        </Typography>
                      </Link>
                    </MenuItem>
                  </Box>
                )}
              </Menu>
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "none", md: "flex", gap: "50px" },
              }}
            >
              {currentUser ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    marginRight: "1rem",
                  }}
                >
                  <Link
                    style={{
                      color: "white",
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                    to="profile"
                  >
                    Profile
                  </Link>
                  <Link
                    style={{
                      color: "white",
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                    to="new"
                  >
                    New Blog
                  </Link>
                  <span
                    onClick={() => logOut(navigate)}
                    style={{
                      color: "white",
                      fontWeight: "600",
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    Logout
                  </span>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      currentUser?.photoURL ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                  />
                </Box>
              ) : (
                userPasive.map((page) => (
                  <Link
                    key={page}
                    to={`/${page}`}
                    className="lgPages"
                    onClick={handleCloseNavMenu11}
                    style={{
                      color: "white",
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                  >
                    {page}
                  </Link>
                ))
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ height: "64px" }}></Box>
    </Box>
  );
};

export default Navbar;
