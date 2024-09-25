import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { setSelected } from "../Redux/contactSlice";
import { useDispatch, useSelector } from "react-redux";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const selectedcontact = useSelector((state) => state.contact.selected);
  const selected = selectedcontact?._id === contact._id;
  const onlineUsers = useSelector((state) => state.socket.onlineUsers);
  const isOnline = onlineUsers.includes(contact._id);

  const [lastMessage, setLastMessage] = useState('');
  const [lastMessageTime, setLastMessageTime] = useState('');

  const user = useSelector((state) => state.auth.userData);
  const socket = useSelector((state) => state.socket.instance);
  const userId = user.userData._id;

  const data = JSON.parse(localStorage.getItem("user"));
  const token = data?.userData?.token;

  const getId = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/conversation/messages/${userId}/${contact._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const messages = response.data?.data?.messages;

      const otherUserMessages = messages?.filter(
        (message) => message.senderId !== userId
      );

      if (otherUserMessages && otherUserMessages.length > 0) {
        let lastMessage = otherUserMessages[otherUserMessages.length - 1];
        if (lastMessage.message.length > 30) {
          lastMessage.message = lastMessage.message.substring(0, 30)
          lastMessage.message += '...'
        }
        setLastMessage(lastMessage.message);
        const now = new Date();
        const messageDate = new Date(lastMessage.createdAt);
        const isOlderThanToday = messageDate.toDateString() !== now.toDateString();
        if (isOlderThanToday) {
          const formattedDate = messageDate.toLocaleDateString('en-GB');
          setLastMessageTime(formattedDate);
        } else {
          const formattedTime = messageDate.toISOString().substring(11, 16);
          setLastMessageTime(formattedTime);
        }
      } else {
        setLastMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  }, [contact, token, userId])

  useEffect(() => {
    getId();
  }, [getId])

  useEffect(() => {
    socket?.on('clearMessage', getId);
    socket?.on('newMessage', getId);

    return () => {
      socket?.off('clearMessage', getId);
      socket?.off('newMessage', getId);
    }
  }, [getId, socket])

  useEffect(() => {
    if(selected) {
      socket?.emit('seen', {userId: userId, conversationId: contact._id});
    }
  }, [contact, socket, selected, userId])

return (
  <div
    className={`flex w-full h-20 cursor-pointer ${selected ? "bg-zinc-900" : ""}`}
    onClick={() => dispatch(setSelected(contact))}
  >
    <div className="flex items-center w-full mx-5">
      <div className="flex basis-2/12">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <img src={contact.image ? contact.image : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} />
          </div>
        </div>
      </div>
      <div className="flex flex-col basis-8/12">
        <div>
          <h1 className="font-semibold text-slate-300 ml-4 md:ml-3 lg:ml-2">{contact.name}</h1>
        </div>
        <div>
          <h1 className="ml-4 md:ml-3 lg:ml-2" style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{lastMessage}</h1>
        </div>
      </div>
      <div className="">
        <div className="px-2 py-1 rounded-3xl">
          <h1>{lastMessageTime}</h1>
        </div>
      </div>
    </div>
  </div>
);
};

export default Contact;
