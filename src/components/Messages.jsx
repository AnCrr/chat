import { MessageList } from "react-chat-elements";
import React from "react";
import "react-chat-elements/dist/main.css";
import { getDate } from "../helpers";

const Messages = ({ chatId, messages, userId, onMessageScroll }) => {
  return (
    <div>
      Messages chata {chatId}
      <MessageList
        className="message-list"
        lockable={true}
        dataSource={messages.map((message) => {
          message.dateString = getDate(message.createdAt);
          message.className = "message";

          if (message.owner._id === userId) {
            let { ...newMessage } = message;
            newMessage.position = "right";
            newMessage.className = "messageRight";
            return newMessage;
          }

          return message;
        })}
        onScroll={onMessageScroll}
      />
    </div>
  );
};

export default Messages;
