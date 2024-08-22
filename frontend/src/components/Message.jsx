import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const conversation = useSelector((state) => state.conversation.selected);
  const isReceiver = conversation._id === message?.senderId ? true : false;
  console.log(message);
  console.log(isReceiver);

  const messageTime = new Date(message.createdAt);
  const formattedMessageTime = messageTime.toISOString().substring(11, 16);

  return (
    <div className="mx-6">
      {isReceiver ? (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            <time className="text-xs opacity-50">{formattedMessageTime}</time>
          </div>
          <div className="chat-bubble">{message.message}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      ) : (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            <time className="text-xs opacity-50">{formattedMessageTime}</time>
          </div>
          <div className="chat-bubble">{message.message}</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      )}
    </div>
  );
};

export default Message;