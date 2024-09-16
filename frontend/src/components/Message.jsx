import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const conversation = useSelector((state) => state.conversation.selected);
  const user = useSelector((state) => state.auth.userData);

  const isReceiver = message.senderId !== user.userData._id;

  const messageTime = new Date(message.createdAt);
  const formattedMessageTime = messageTime.toISOString().substring(11, 16);

  return (
    <div className="mx-6">
      {isReceiver ? (
        <div className="chat chat-start">
          <div className="chat-image avatar">
          </div>
          <div className="chat-bubble bg-chatstart text-white max-w-96" style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{message.message}</div>
          <time className="text-xs opacity-50">{formattedMessageTime}</time>
        </div>
      ) : (
        <div className="chat chat-end">
          <div className="chat-image avatar">
          </div>
          <div className="chat-bubble bg-chatend max-w-96 text-white" style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{message.message}</div>
          <time className="text-xs opacity-50">{formattedMessageTime}</time>
        </div>
      )}
    </div>
  );
};

export default Message;
