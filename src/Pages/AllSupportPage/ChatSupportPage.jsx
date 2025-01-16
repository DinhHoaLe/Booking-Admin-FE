import React, { useEffect, useState } from "react";
import ChatPageBody from "../ChatPage/ChatPageBody";
import { ref, onValue } from "firebase/database";
import { database } from "../FireBase/fireBase.jsx";
import { List, Avatar, Typography } from "antd";

const { Title } = Typography;

const ChatSupportPage = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    const messagesRef = ref(database, "/");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const keysLevel1 = Object.keys(data);
      setMessages(keysLevel1);
      // const loadedMessages = data ? Object.values(data) : [];
      // setMessages(loadedMessages);
    });
  }, []);

  const handleData = (xxx) => {
    setName(xxx);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-100 ">
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-2">
        <Title
          level={4}
          style={{
            color: "#07689F",
            marginBottom: "10px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          List Messages
        </Title>

        <div className="rounded border  mb-3"></div>

        <List
          className="rounded-lg"
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item, index) => (
            <List.Item
              className="shadow-lg border cursor-pointer duration-300 hover:shadow-lg ] hover:bg-gray-100 rounded-lg"
              onClick={() => handleData(item)}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    style={{ marginLeft: "10px" }}
                  />
                }
                title={
                  <span className="font-semibold">
                    {item || `User ${index + 1}`}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </div>

      {/* Chat Section */}
      <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-5">
        <ChatPageBody dataName={name} />
      </div>
    </div>
  );
};

export default ChatSupportPage;
