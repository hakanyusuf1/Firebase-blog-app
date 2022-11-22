import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { useState } from "react";
import Logo from "../assets/SİYAH-1-removebg-preview.png";

import { createUser, signUpProvider } from "../helpers/firebase";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    mail: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const { name, lastName, mail, password } = userInfo;

  const handleSubmit = (e) => {
    const displayName = name + " " + lastName;
    e.preventDefault();
    createUser(mail, password, navigate, displayName);
  };
  const handleGoogle = () => {
    signUpProvider(navigate);
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          width: { xs: "70%", md: "50%", lg: "20%" },
          height: "620px",
          margin: "5px 0",
        }}
        style={{
          backgroundColor: "rgba(0,0,0,.2)",
          padding: "0 2rem 10px",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            margin: "-50px auto -75px",
          }}
        >
          <img src={Logo} height="200px" width="200px" alt="" />
        </Box>
        <TextField
          required
          type="text"
          id="outlined-name"
          label="Name"
          value={userInfo.name || ""}
          color="error"
          onChange={handleChange}
          name="name"
        />
        <TextField
          required
          type="text"
          id="outlined-lastName"
          label="Last Name"
          onChange={handleChange}
          value={userInfo.lastName || ""}
          color="error"
          name="lastName"
        />
        <TextField
          required
          type="email"
          id="outlined-mail"
          label="E-mail"
          onChange={handleChange}
          value={userInfo.mail || ""}
          color="error"
          name="mail"
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={handleChange}
          color="error"
          value={userInfo.password || ""}
          name="password"
        />

        <Box
          sx={{
            margin: "-20px 0 0",
          }}
        >
          <Link
            to="/login"
            style={{
              width: "100%",
              textAlign: "end",
            }}
          >
            You already have an account?
          </Link>
        </Box>

        <Box sx={{ mt: "-15px" }}>
          <Button
            sx={{ width: "100%", height: "3rem" }}
            type="submit"
            variant="contained"
          >
            Sign up
          </Button>
          <p
            style={{
              margin: "2px 0",
              color: "rgba(0,0,0,.5)",
              userSelect: "none",
              textAlign: "center",
            }}
          >
            - OR -
          </p>
          <Button
            onClick={handleGoogle}
            sx={{
              width: "100%",
              height: "3rem",
              backgroundColor: "red",
            }}
            type="button"
            variant="contained"
          >
            <Google sx={{ mr: "5px" }} /> Continue with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default Register;
