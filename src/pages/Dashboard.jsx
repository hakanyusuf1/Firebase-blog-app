import { GetDataList } from "../helpers/firebase";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router";
import { PacmanLoader } from "react-spinners";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { blogList } = GetDataList();
  useEffect(()=>{
    
  })
  const { currentUser } = useContext(AuthContext);
  console.log(blogList);
  const handleLike = () => {
    blogList[0]?.likes.push(currentUser.uid);
  };
  console.log(blogList?.likes);
  if (blogList) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "1rem",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            paddingBottom: "1rem",
            fontSize: { xs: "3rem", md: "6rem" },
          }}
          color="initial"
        >
          Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {blogList?.reverse()?.map((item) => {
            return (
              <Box key={item.id} component="div">
                <button onClick={handleLike}> Lİke</button>
                <Card
                  onClick={() =>
                    navigate("/details/" + item.id, { state: item })
                  }
                  sx={{
                    position: "relative",
                    minWidth: { xs: "300px", md: "420px" },
                    maxWidth: { xs: "300px", md: "420px" },
                    height: "395px",
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
                      item?.photoUrl ||
                      "https://archive.org/download/no-photo-available/no-photo-available.png"
                    }
                    alt="Blog photo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                      {item?.title.substring(0, 15)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        wordBreak: "break-all",
                      }}
                    >
                      {item?.text ? (
                        <>
                          {item?.text.substring(0, 200)}{" "}
                          <span
                            className="readMore"
                            style={{
                              color: "blue",
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
                  <Box
                    sx={{
                      position: "absolute",
                      left: "20px",
                      bottom: "20px",
                      width: "350px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="p" color="initial">
                      <span
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Auth:
                      </span>{" "}
                      {item?.displayName} <br />
                    </Typography>
                    <Box>
                      <Typography variant="h4" color="initial">
                        {item?.likes?.length}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Box>
            );
          })}
        </Box>
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PacmanLoader color="#36d7b7" size={62} />
      </div>
    );
  }
};

export default Dashboard;
