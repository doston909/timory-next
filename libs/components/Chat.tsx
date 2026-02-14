import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import { useReactiveVar } from "@apollo/client";
import { socketVar, userVar } from "@/apollo/store";
import { Messages } from "@/libs/config";
import { sweetErrorAlert } from "@/libs/sweetAlert";

/** Backend dan keladigan member ma'lumoti (xabar yuboruvchi) */
interface ChatMember {
  _id: string;
  memberName?: string;
  memberImage?: string;
}

interface MessagePayload {
  event: string;
  text: string;
  memberData: ChatMember | null;
}

interface InfoPayload {
  event: string;
  totalClients: number;
  memberData: ChatMember | null;
  action?: string;
}

const Chat = () => {
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [messagesList, setMessagesList] = useState<MessagePayload[]>([]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [messageInput, setMessageInput] = useState("");
  const [open, setOpen] = useState(false);
  const user = useReactiveVar(userVar);
  const socket = useReactiveVar(socketVar);

  /** Xabarlar o'zgarganda pastga scroll */
  useEffect(() => {
    chatContentRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  /** WebSocket message handler */
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (msg: MessageEvent) => {
      try {
        const data = JSON.parse(msg.data as string);
        switch (data.event) {
          case "info": {
            const info: InfoPayload = data;
            setOnlineUsers(info.totalClients ?? 0);
            break;
          }
          case "getMessages": {
            const list: MessagePayload[] = data.list ?? [];
            setMessagesList(list);
            break;
          }
          case "message": {
            const newMessage: MessagePayload = data;
            setMessagesList((prev) => [...prev, newMessage]);
            break;
          }
        }
      } catch (e) {
        console.error("Chat message parse error:", e);
      }
    };
    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  const handleOpenChat = () => setOpen((prev) => !prev);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  const handleSend = () => {
    if (!messageInput.trim()) {
      sweetErrorAlert(Messages.error4);
      return;
    }
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      sweetErrorAlert("Chat server is not connected.");
      return;
    }
    socket.send(JSON.stringify({ event: "message", data: messageInput.trim() }));
    setMessageInput("");
  };

  const getMemberImage = (memberData: ChatMember | null) => {
    if (!memberData?.memberImage) return "/img/profile/defaultUser.svg";
    const img = memberData.memberImage;
    return img.startsWith("http") ? img : img;
  };

  const displayName = (memberData: ChatMember | null) =>
    memberData?.memberName || "User";

  return (
    <Stack className="chatting">
      <Stack className={`chat-frame ${open ? "open" : ""}`}>
        <Box className="chat-top">
          <Typography component="span" className="chat-top-title">Online Chat</Typography>
          <span className="chat-online-badge">({onlineUsers})</span>
        </Box>

        <Box className="chat-content" ref={chatContentRef}>
          <div className="welcome">
            <span>Welcome to Timory Live chat 👋</span>
            <p className="welcome-subtitle">Free communication space for users</p>
          </div>
          {messagesList.map((ele: MessagePayload, idx: number) => {
            const { text, memberData } = ele;
            const isMe = memberData?._id === user?._id;
            const avatarSrc = getMemberImage(memberData);
            return isMe ? (
              <Box key={idx} sx={{ display: "flex", justifyContent: "flex-end", mb: 0.5 }}>
                <div className="msg-right">{text}</div>
              </Box>
            ) : (
              <Box key={idx} sx={{ display: "flex", alignItems: "flex-end", gap: 1, mb: 0.5 }}>
                <Avatar alt={displayName(memberData)} src={avatarSrc} sx={{ width: 32, height: 32 }} />
                <div className="msg-left">{text}</div>
              </Box>
            );
          })}
        </Box>

        <Box className="chat-bott">
          <input
            type="text"
            placeholder="Type message..."
            value={messageInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="msg-input"
          />
          <button type="button" className="send-msg-btn" onClick={handleSend}>
            <SendIcon sx={{ fontSize: 20 }} />
          </button>
        </Box>
      </Stack>

      <button type="button" className="chat-button" onClick={handleOpenChat}>
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </Stack>
  );
};

export default Chat;
