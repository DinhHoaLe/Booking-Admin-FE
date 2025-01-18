import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { ref, push, onValue } from "firebase/database";
import { database } from "../FireBase/fireBase.jsx";
import { TextInput } from "./TextInput.jsx";
import { MessageLeft, MessageRight } from "./Message.jsx";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Container = styled("div")({
  // width: "100vw",
  // height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const PaperStyled = styled(Paper)({
  width: "80vw",
  height: "80vh",
  // maxWidth: "375px",
  maxHeight: "450px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
});

const MessagesBody = styled(Paper)({
  width: "calc( 100% - 20px )",
  margin: 10,
  overflowY: "scroll",
  height: "calc( 100% - 80px )",
});

export default function ChatPageBody({ dataName }) {
  const [messages, setMessages] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState();

  const { infor } = useSelector((state) => state?.inforUser);

  useEffect(() => {
    if (dataName) {
      const messagesRef = ref(database, dataName);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const loadedMessages = data ? Object.values(data) : [];
        setMessages(loadedMessages);
      });
    }
  }, [dataName]);

  const handleSendMessage = (message) => {
    const messagesRef = ref(database, dataName);
    push(messagesRef, {
      text: message.text,
      timestamp: new Date().toISOString(),
      sender: infor?.email,
    });
  };

  console.log(infor?.email);

  return (
    <Container>
      <PaperStyled elevation={2}>
        <MessagesBody>
          {messages.map((msg, index) =>
            msg.sender === infor?.email ? (
              <MessageRight
                key={index}
                message={msg.text}
                timestamp={msg?.timestamp.slice(11, 16)}
              />
            ) : (
              <MessageLeft
                key={index}
                message={msg.text}
                sender={msg.sender}
                timestamp={msg?.timestamp.slice(11, 16)}
              />
            )
          )}
        </MessagesBody>
        <TextInput onSendMessage={handleSendMessage} />
      </PaperStyled>
    </Container>
  );
}
