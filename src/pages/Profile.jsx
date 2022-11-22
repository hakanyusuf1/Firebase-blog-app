import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Typography from "@mui/material/Typography";
import { GetDataList } from "../helpers/firebase";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const { blogList } = GetDataList();
  const [userPosts, setUserPosts] = useState([]);
  blogList?.forEach((element) => {
    if (element.userId === currentUser.uid) {
      userPosts.push(element);
    } else {
      console.log(-1);
    }
    console.log(userPosts.length);
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          height: "420px",
          width: { xs: "95%", md: "50%" },
          padding: "1rem 0",
          borderRadius: "15px",
          gap: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ width: 150, height: 150 }}
          src={
            currentUser?.photoURL ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
        />
        <Typography variant="h4" color="initial">
          {currentUser.displayName}
        </Typography>
        <Box>
          <Typography variant="h6" mr={2} component="span" color="initial">
            Email:
          </Typography>
          <Typography variant="h5" component="span" color="initial">
            {currentUser.email}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" mr={2} component="span" color="initial">
            Last login:
          </Typography>
          <Typography variant="h5" component="span" color="initial">
            {currentUser.metadata.lastSignInTime.substring(0, 17)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "40%",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <Box
            sx={{
              padding: "10px 20px",
              backgroundColor: "yellow",
            }}
          >
            <Typography
              variant="span"
              sx={{
                color: "rgba(0,0,0,.5)",
                userSelect: "none",
                fontSize: "1.1rem",
                paddingBottom: "4px",
                borderBottom: "rgba(0,0,0,.5) 1px solid",
              }}
              textAlign="end"
              color="initial"
            >
              Posts
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: "4.5rem",
              }}
              textAlign="center"
              color="initial"
            >
              {userPosts.length ? userPosts.length : "Loading"}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "10px 20px",
              backgroundColor: "yellow",
            }}
          >
            <Typography
              variant="span"
              sx={{
                color: "rgba(0,0,0,.5)",
                userSelect: "none",
                fontSize: "1.1rem",
                paddingBottom: "4px",
                borderBottom: "rgba(0,0,0,.5) 1px solid",
              }}
              color="initial"
            >
              Likes
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: "4.5rem",
              }}
              textAlign="center"
              color="initial"
            >
              0
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "10px 20px",
              backgroundColor: "yellow",
            }}
          >
            <Typography
              variant="span"
              sx={{
                color: "rgba(0,0,0,.5)",
                userSelect: "none",
                fontSize: "1.1rem",
                paddingBottom: "4px",
                borderBottom: "rgba(0,0,0,.5) 1px solid",
              }}
              color="initial"
            >
              Comments
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: "4.5rem",
              }}
              textAlign="center"
              color="initial"
            >
              0
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
