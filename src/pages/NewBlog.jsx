import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Logo from "../assets/SİYAH-1-removebg-preview.png";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { addData } from "../helpers/firebase";
import { useNavigate } from "react-router";

const NewBlog = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newBlog, setNewBlog] = useState({
    title: "",
    photoUrl:
      "https://archive.org/download/no-photo-available/no-photo-available.png",
    text: "",
    likes: ["1212","3131","12151"],
    displayName: currentUser?.displayName,
    userId: currentUser?.uid,
  });
  const handleChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addData(newBlog);

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: "20px", lg: "10rem" },
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "rgba(0,0,0,.2)",
          padding: "1.5rem",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            margin: "30px auto ",
          }}
        >
          <img
            src={Logo}
            style={{
              margin: "-80px auto  -30px",
            }}
            height="200px"
            width="200px"
            alt=""
          />
          <Typography variant="h4" color="initial">
            Add New Blog
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            backgroundColor:
              "linear-gradient(0deg,   rgba(34, 193, 195, 1) 0%,    rgba(253, 187, 45, 1) 100% )",
          }}
        >
          <TextField
            id="outlined-basic"
            required
            label="Title"
            color="error"
            variant="outlined"
            name="title"
            onChange={handleChange}
          />

          <TextField
            id="outlined-basic"
            color="error"
            label="Photo URL"
            placeholder="Paste your image link here"
            variant="outlined"
            name="photoUrl"
            onChange={handleChange}
          />

          <TextField
            id="outlined-multiline-static"
            label="Context"
            multiline
            rows={10}
            placeholder="Write your text here"
            sx={{ width: "400px" }}
            required
            name="text"
            onChange={handleChange}
          />
          <Button
            sx={{
              width: "100%",
              height: "3rem",
              backgroundColor: "red",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
            type="submit"
            variant="contained"
          >
            Add New Blog
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "1.5rem",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            margin: "30px auto ",
          }}
        >
          <Typography variant="h4" color="initial" textAlign="center">
            Your Blog Shows Like <br /> This on Dashboard page
          </Typography>
        </Box>
        <Box component="div">
          <Card
            sx={{
              minWidth: 350,
              maxWidth: 420,
              borderRadius: "15px",
              cursor: "pointer",
            }}
          >
            <CardMedia
              sx={{
                borderBottom: "0.1px solid #f0f0f0",
              }}
              component="img"
              height="200"
              image={
                newBlog?.photoUrl ||
                "https://archive.org/download/no-photo-available/no-photo-available.png"
              }
              alt="Blog photo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {newBlog.title.substring(0, 15)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  wordBreak: "break-all",
                }}
              >
                {newBlog.text ? (
                  <>
                    {newBlog?.text.substring(0, 220) + " "}
                    <span
                      className="readMore"
                      style={{
                        color: "blue",
                        wordBreak: "keep-all",
                      }}
                    >
                      Read more...
                    </span>
                  </>
                ) : (
                  ""
                )}
              </Typography>
            </CardContent>
            <Box>
              <Typography
                variant="p"
                color="initial"
                sx={{
                  paddingBottom: "1rem",
                  margin: "1rem ",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Auth:
                </span>{" "}
                {newBlog.displayName} <br />
                <br />
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
export default NewBlog;
