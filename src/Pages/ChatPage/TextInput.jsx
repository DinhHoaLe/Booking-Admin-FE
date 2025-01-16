import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import { PlusOutlined } from "@ant-design/icons";


const WrapForm = styled("form")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "95%",
  margin: `${theme.spacing(0)} auto`,
}));

const WrapText = styled(TextField)({
  width: "100%",
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

export const TextInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage({ text: message, sender: "me" });
      setMessage("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const UploadButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  }));

  return (
    <WrapForm onSubmit={handleSubmit}>
      <UploadButton
        component="label"
        style={{
          padding: "10px",
          margin: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "40px",
        }}
      >
        <PlusOutlined style={{ fontSize: "20px", color: "#07689F" }} />
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </UploadButton>

      <WrapText
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        label="Type your message"
        variant="outlined"
      />
      <StyledButton
        type="submit"
        variant="contained"
        color="primary"
        style={{ backgroundColor: "#07689F" }}
      >
        <SendIcon />
      </StyledButton>
    </WrapForm>
  );
};
