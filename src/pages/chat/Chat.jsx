import { Skeleton, styled } from '@mui/material';
import { Box, display } from '@mui/system';
import React from 'react';
import ChatPage from '../chatPage/ChatPage';
import GroupDetails from '../../components/groupDetails/GroupDetails';
import { useSelector } from 'react-redux';
import { connectToChatroom } from '../../feature/chatRoomSlice';



const Container = styled(Box)({
    display: 'flex',
    height: '100vh'
})

const Chat = () => {

    const { loading } = useSelector((state) => state.user);

    if (loading) {
      return (
        <div
          style={{
            width: '75vw',
            marginInline: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '3vh'
          }}
        >
          <div style={{display: 'flex', gap: '1%', marginLeft: '1%', paddingTop: '1%'}}>
          <Skeleton
            animation="wave"
            variant="rounded"
            height={"30vh"}
            width={"48%"}
            />
           <Skeleton
            animation="wave"
            variant="rounded"
            height={"30vh"}
            width={"48%"}
          />
          </div>
          
          <div style={{marginInline: '1%'}}>

          <Skeleton
            animation="wave"
            variant="rounded"
            height={"30vh"}
            />
            </div>
       
       <div style={{display: 'flex', gap: '1%', marginLeft: '1%'}}>
          <Skeleton
            animation="wave"
            variant="rounded"
            height={"30vh"}
            width={"48%"}
            />
           <Skeleton
            animation="wave"
            variant="rounded"
            height={"30vh"}
            width={"48%"}
          />
          </div>
       
        </div>
      );
    }

    // Connect to chatroom
    // useEffect(() => {
    //     dispatch(connectToChatroom(chatroomId));
    //   }, [dispatch, chatroomId]);

    

  return (
    <Container>
      <ChatPage />
      <GroupDetails />
    </Container>
  );
}

export default Chat;
