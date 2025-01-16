import React from "react";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";

// Styled Components
const MessageRow = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
});

const MessageRowRight = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "10px",
});

const MessageBubbleBlue = styled("div")({
  position: "relative",
  marginLeft: "20px",
  padding: "10px",
  backgroundColor: "#A8DDFD",
  // width: "60%",
  textAlign: "left",
  font: "400 .9em 'Open Sans', sans-serif",
  border: "1px solid #97C6E3",
  borderRadius: "10px",
  "&:after": {
    content: "''",
    position: "absolute",
    width: 0,
    height: 0,
    borderTop: "15px solid #A8DDFD",
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    top: 0,
    left: "-15px",
  },
  "&:before": {
    content: "''",
    position: "absolute",
    width: 0,
    height: 0,
    borderTop: "17px solid #97C6E3",
    borderLeft: "16px solid transparent",
    borderRight: "16px solid transparent",
    top: "-1px",
    left: "-17px",
  },
});

const MessageBubbleOrange = styled("div")({
  position: "relative",
  marginRight: "20px",
  padding: "10px",
  backgroundColor: "#f8e896",
  // width: "50%",
  textAlign: "left",
  font: "400 .9em 'Open Sans', sans-serif",
  border: "1px solid #dfd087",
  borderRadius: "10px",
  "&:after": {
    content: "''",
    position: "absolute",
    width: 0,
    height: 0,
    borderTop: "15px solid #f8e896",
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    top: 0,
    right: "-15px",
  },
  "&:before": {
    content: "''",
    position: "absolute",
    width: 0,
    height: 0,
    borderTop: "17px solid #dfd087",
    borderLeft: "16px solid transparent",
    borderRight: "16px solid transparent",
    top: "-1px",
    right: "-17px",
  },
});

const MessageText = styled("p")({
  padding: 0,
  margin: 0,
});

const Timestamp = styled("div")({
  position: "absolute",
  fontSize: ".85em",
  fontWeight: "300",
  bottom: "-3px",
  right: "5px",
});

const DisplayName = styled("div")({
  marginLeft: "10px",
  fontSize: "0.85em",
  fontWeight: "bold",
  color: "#555",
});

const OrangeAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepOrange[500]),
  backgroundColor: "#07689F",
  width: theme.spacing(4),
  height: theme.spacing(4),
}));

// MessageLeft Component
export const MessageLeft = ({
  message = "No message",
  timestamp = "",
  photoURL = "",
  displayName = "Admin's EasySet 24",
}) => {
  return (
    <MessageRow>
      <OrangeAvatar alt={displayName} src={photoURL} />
      <div>
        <DisplayName>{displayName}</DisplayName>
        <MessageBubbleBlue>
          <MessageText>{message}</MessageText>
          <Timestamp>{timestamp}</Timestamp>
        </MessageBubbleBlue>
      </div>
    </MessageRow>
  );
};

// MessageRight Component
export const MessageRight = ({ message = "No message", timestamp = "" }) => {
  return (
    <MessageRowRight>
      <MessageBubbleOrange>
        <MessageText>{message}</MessageText>
        <Timestamp>{timestamp}</Timestamp>
      </MessageBubbleOrange>
    </MessageRowRight>
  );
};
