import { useLocation, useNavigate } from "react-router";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { DeleteData } from "../helpers/firebase";
import { Button } from "@mui/material";

const Details = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { currentUser } = useContext(AuthContext);
  return (
    <Box mt={5}>
      <Card
        sx={{
          width: "80%",
          margin: "auto",
        }}
      >
        <CardMedia
          component="img"
          height={500}
          sx={{
            objectFit: "contain",
            borderBottom: "0.1px solid #f0f0f0",
          }}
          title={state.title}
          image={state.photoUrl}
        />
        <CardContent>
          <Typography variant="h3" color="initial">
            {state.title}
          </Typography>
          <Typography
            variant="p"
            sx={{ wordBreak: "break-word" }}
            color="initial"
          >
            {state.text}
          </Typography>
          <Box
            sx={{
              display: "flex",
              marginTop: "1.5rem",
              justifyContent: "space-around",
              gap: "1.5rem",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box mb={-2}>
              <Button
                variant="button"
                sx={{
                  backgroundColor: "#15c08d",
                  color: "black",
                }}
                onClick={() => navigate(-1)}
              >
                Go back
              </Button>
            </Box>

            {currentUser.uid === state.userId ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1rem",
                  gap: "2rem",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                  onClick={() => DeleteData(state.id, navigate)}
                >
                  <svg
                    width="48"
                    height="48"
                    style={{
                      display: "block",
                    }}
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="red"
                      d="M200 56v152a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8V56Z"
                      opacity=".2"
                    />
                    <path
                      fill="red"
                      d="M216 48H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16Zm-24 160H64V64h128ZM80 24a8 8 0 0 1 8-8h80a8 8 0 0 1 0 16H88a8 8 0 0 1-8-8Z"
                    />
                  </svg>
                  Delete
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                  onClick={() => navigate("/update", { state: state })}
                >
                  <svg
                    style={{
                      display: "block",
                    }}
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="green"
                      d="M4 19q-.825 0-1.412-.587Q2 17.825 2 17V5q0-.825.588-1.413Q3.175 3 4 3l2 4h3L7 3h2l2 4h3l-2-4h2l2 4h3l-2-4h3q.825 0 1.413.587Q22 4.175 22 5v4H4v8h8v2Zm14.3-6.475l1.075 1.075l-3.875 3.85v1.05h1.05l3.875-3.85l1.05 1.05l-4 4q-.15.15-.338.225q-.187.075-.387.075H14.5q-.2 0-.35-.15q-.15-.15-.15-.35v-2.25q0-.2.075-.387q.075-.188.225-.338Zm3.175 3.175L18.3 12.525l1.45-1.45q.275-.275.7-.275q.425 0 .7.275l1.775 1.775q.275.275.275.7q0 .425-.275.7Z"
                    />
                  </svg>
                  Edit
                </div>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Details;
