import Box from "@mui/material/Box";
import Logo from "../assets/SİYAH-1-removebg-preview.png";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { signIn, signUpProvider } from "../helpers/firebase";
import { useState } from "react";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    mail: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const { mail, password } = userLogin;
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(mail, password, navigate);
  };
  const handleGoogle = () => {
    signUpProvider(navigate);
  };
  return (
    <div
      style={{
        height: "100vh",
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
          height: "480px",
          margin: "5px 0",
        }}
        style={{
          backgroundColor: "rgba(0,0,0,.2)",
          padding: "0 2rem",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            margin: "-70px auto -75px",
          }}
        >
          <img src={Logo} height="200px" width="200px" alt="" />
        </Box>
        <TextField
          required
          type="email"
          id="outlined"
          onChange={handleChange}
          value={userLogin.mail || ""}
          label="E-mail"
          sx={{ backgroundColor: "transparent" }}
          color="error"
          name="mail"
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          value={userLogin.password || ""}
          onChange={handleChange}
          type="password"
          color="error"
          name="password"
        />

        <Box
          sx={{
            margin: "-20px 0 0",
          }}
        >
          <Link
            to="/register"
            style={{
              width: "100%",
              textAlign: "end",
            }}
          >
            Don't you have an account?
          </Link>
        </Box>

        <Box>
          <Button
            sx={{ width: "100%", height: "3rem" }}
            type="submit"
            variant="contained"
          >
            Login
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
    </div>
  );
};
export default Login;
