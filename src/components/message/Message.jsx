import { Box, styled } from "@mui/material";
import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import { FiDownload } from "react-icons/fi";
import axios from "axios";
import { useParams } from "react-router";
import { CHATROOMS_URL, FILE_URL } from "../../defaultValues/DefaultValues";
import Cookies from "js-cookie";
import { useState } from "react";
import { format } from "date-fns";

const Container = styled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginBottom: "1rem",
});

const MessageInfo = styled(Box)({});

const MessageContent = styled(Box)({
  maxWidth: "80%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  // background: '#ffffff',
  width: "48%",
  borderRadius: "10px",
  background: "#878787",
  position: "relative",
  color: "#FFFFFF",
  overflow: "hidden",
});

const Text = styled("p")({
  whiteSpace: "break-spaces",
  padding: "0 20px",
  paddingBottom: "20px",
});

const Author = styled("p")({
  color: "#252525",
  fontSize: "14px",
  padding: "2px 5px",
  background: "#e2e2e2",
});

const Time = styled("p")({
  position: "absolute",
  right: "0.4rem",
  bottom: "0.2rem",
  fontSize: "0.7rem",
});

const OwnerContainer = styled(Box)({
  display: "flex",
  gap: "10px",
  flexDirection: "row-reverse",
  alignItems: "center",
  marginBlock: ".5rem",
});

const OwnerMessageInfo = styled(Box)({});

const OwnerMessageContent = styled(Box)({
  maxWidth: "80%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "flex-start",
  background: "rgba(83, 53, 45, 0.7)",
  position: "relative",
  color: "#FFFFFF",
  width: "46%",
  borderRadius: "10px",
});

const OwnerTime = styled("p")({
  position: "absolute",
  right: "0.4rem",
  bottom: "0.2rem",
  fontSize: "0.7rem",
});

const OwnerText = styled("p")({
  whiteSpace: "break-spaces",
  padding: "5px",
  paddingBottom: "20px",
  borderRadius: "10px",
});

const Message = () => {
  const [messages, setMessages] = useState([]);
  const { pusherMessages } = useSelector((state) => state.chat);
  const PusherMessages = pusherMessages;
  console.log(PusherMessages);
 
 
  // The Focus should always stay at the bottom for Messages
  const messagesRef = useRef(null);
  useEffect(() => {
    messagesRef.current?.scrollIntoView();
  }, [messages, PusherMessages]);

  const { id } = useParams();
  const userToken = Cookies.get("userToken");
  const { userInfo } = useSelector((state) => state.user);
  let username = userInfo.name;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${CHATROOMS_URL}/${id}/message`,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        setMessages(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });

    messages &&
      messages?.map((el) => {
        setChatroomId(el.chat_room_id);
        return el;
      });


  }, [id]);

  if (!messages) {
    return <div>No message yet</div>;
  }

  // Get Pusher Messages from redux store

  const sortedPusherMessages = [...PusherMessages].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  {
    sortedPusherMessages &&
      sortedPusherMessages?.map((message) => {
        const userImage = message?.user?.image;
        const chatImage = message?.image;
        const chatVideo = message?.video;
        const chatVoiceNote = message?.voiceNote;
        const chatFile = message?.file;
        // const formattedDate = format(new Date(message?.created_at), "p");
        console.log(message);
        return (
          <div key={message.text} className="text-[0.9rem]"></div>
        )
      });
  }

  return (
    <>
      {sortedMessages &&
        sortedMessages.map((el) => {
          const userImage = el.user.image;
          const chatImage = el.image;
          const chatVideo = el.video;
          const chatVoiceNote = el.voiceNote;
          const chatFile = el.file;
          const formattedDate = format(new Date(el.created_at), "p");
          return (
            <div key={el.id} className="text-[0.9rem]">
              {el.user.fullname !== username && (
                <div key={el.user.fullname}>
                  <Container component="article">
                    <MessageInfo>
                      <img
                        src={`${FILE_URL}${userImage}`}
                        style={{ width: "2.5rem", objectFit: "cover" }}
                        alt="User Image"
                      />
                    </MessageInfo>
                    <MessageContent>
                      <Author>@{el.user.username}</Author>
                      <Text>{el.text}</Text>
                      {el.image && (
                        <img
                          src={`${FILE_URL}${chatImage}`}
                          style={{
                            marginBottom: "25px",
                            width: "98%",
                            marginInline: "auto",
                            borderRadius: "10px",
                          }}
                          alt="image"
                        />
                      )}

                      {el.video && (
                        <>
                          <p className="mb-[-0.5rem] text-sm text-zinc-300">
                            Video name:{" "}
                            {chatVideo.substring(7, 30).slice(".", -4)}
                          </p>
                          <video style={{ marginBottom: "1.2rem" }} controls>
                            <source
                              src={`${FILE_URL}${chatVideo}`}
                              type="video/mp4"
                            />
                          </video>
                        </>
                      )}

                      {el.voiceNote && (
                        <audio controls>
                          <source
                            src={`${FILE_URL}${chatVoiceNote}`}
                            type="audio/mp3"
                          />
                        </audio>
                      )}

                      {el.file && (
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            margin: "1rem 0.5rem",
                            marginTop: "0",
                            alignItems: "center",
                          }}
                        >
                          <p className="mb-[-0.5rem] text-sm text-zinc-300">
                            File name: {chatFile.substring(6, 20).split(".")}
                          </p>
                          <a
                            href={`${FILE_URL}${chatFile}`}
                            download={chatFile.substring(6)}
                          >
                            <FiDownload
                              style={{ color: "#3683F5", fontSize: "1.5rem" }}
                            />
                          </a>
                        </div>
                      )}

                      <Time>{formattedDate}</Time>
                    </MessageContent>
                  </Container>
                </div>
              )}

              {el.user.fullname === username && (
                <div key={el.user.fullname}>
                  <OwnerContainer component="article">
                    <OwnerMessageContent>
                      <OwnerText>{el.text}</OwnerText>
                      {el.image && (
                        <img
                          src={`${FILE_URL}${chatImage}`}
                          style={{
                            marginBottom: "25px",
                            width: "10rem",
                            // height: '20rem',
                            marginInline: "auto",
                            borderRadius: "10px",
                          }}
                          alt="image"
                        />
                      )}

                      {el.video && (
                        <>
                          <p className="mb-[-0.5rem] text-sm text-zinc-300">
                            Video name:{" "}
                            {chatVideo.substring(7, 30).slice(".", -4)}
                          </p>
                          <video style={{ marginBottom: "1.2rem" }} controls>
                            <source
                              src={`${FILE_URL}${chatVideo}`}
                              type="video/mp4"
                            />
                          </video>
                        </>
                      )}

                      {el.voiceNote && (
                        <audio
                          controls
                          src={`${FILE_URL}${chatVoiceNote}`}
                          style={{ marginBottom: "2rem" }}
                        >
                          <a
                            href={`${FILE_URL}${chatVoiceNote}`}
                            download="recording.ogg"
                          >
                            Download Recording
                          </a>
                        </audio>
                      )}

                      {el.file && (
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            margin: "1rem 0.5rem",
                            marginTop: "0",
                            alignItems: "center",
                          }}
                        >
                          <p className="mb-[-0.5rem] text-sm text-zinc-300">
                            File name: {chatFile.substring(6, 20).split(".")}
                          </p>
                          <a
                            href={`${FILE_URL}${chatFile}`}
                            download={chatFile.substring(6)}
                          >
                            <FiDownload
                              style={{ color: "#3683F5", fontSize: "1.5rem" }}
                            />
                          </a>
                        </div>
                      )}

                      <OwnerTime>{formattedDate}</OwnerTime>
                    </OwnerMessageContent>
                  </OwnerContainer>
                </div>
              )}
            </div>
          );
        })}
      <div ref={messagesRef} />
    </>

    // <div></div>
  );
};

export default Message;
