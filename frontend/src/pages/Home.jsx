import axios from "axios";
import io from "socket.io-client";
import Contacts from "../components/Contacts";
import Messages from "../components/Messages";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket, setOnlineUsers } from "../Redux/socketSlice";

const Home = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const socket = useSelector((state) => state.socket.instance);

  const data = JSON.parse(localStorage.getItem("user"));
  const token = data?.userData?.token;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = io('localhost:3000', {
      query: {
        userId: user.userData._id
      }
    });
    dispatch(setSocket(socket));
    socket.on('getOnlineUsers', (users) => {
      dispatch(setOnlineUsers(users));
    })
    return () => socket.disconnect();
  }, [dispatch, user])

  const handleMessageSeen = useCallback(async ({ userId, conversationId }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/conversation/messages/${userId}/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const messages = response.data?.data.messages;
      const id = response.data?.data?._id;
      if (messages) {
        try {
          await axios.patch(`http://localhost:3000/api/v1/conversation/updateSeen/${id}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          socket?.emit('updateSeen', { conversationId });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, token])

  useEffect(() => {
    socket?.on('messageSeen', handleMessageSeen)
    return () => socket?.off('messageSeen', handleMessageSeen);
  }, [socket, handleMessageSeen])

  return (
    <div className="flex h-screen w-screen overflow-x-auto overflow-y-auto">
      {loading ? (
        <div className="h-screen w-screen flex items-center justify-center bg-customBlack">
          <div className="loading loading-dots loading-lg"></div>
        </div>
      ) : (
        <>
          <div className="flex h-screen">
            <Contacts />
          </div>
          <div className="flex h-full w-2/3 grow">
            <Messages />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
