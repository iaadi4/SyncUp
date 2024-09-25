import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const user = useSelector((state) => state.auth.userData);
  const socket = useSelector((state) => state.socket.instance);

  const [status, setStatus] = useState(message.status);

  const isReceiver = message.senderId !== user.userData._id;

  const messageTime = new Date(message.createdAt);
  const formattedMessageTime = messageTime.toISOString().substring(11, 16);

  const setSeen = () => {
    setStatus('seen');
  }

  useEffect(() => {
    socket?.on('newMessage', setSeen);
    return () => socket?.off('newMessage', setSeen);
  }, [socket])

  useEffect(() => {
    socket?.on('updated', setSeen);
    return () => socket?.off('updated', setSeen);
  }, [socket])

  return (
    <div className="mx-6 z-[-1]">
      {isReceiver ? (
        <div className="chat chat-start">
          <div className="chat-bubble bg-chatstart max-w-96" style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{message.message}</div>
          <time className="text-xs opacity-50 relative bottom-4">{formattedMessageTime}</time>
        </div>
      ) : ( 
        <div className="chat chat-end">
          <div className="chat-bubble bg-chatend max-w-96" style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{message.message}</div>
          <time className="text-xs opacity-50">{formattedMessageTime}</time>
          <div className="chat-footer opacity-50">{status}</div>
        </div>
      )}
    </div>
  );
};

export default Message;
