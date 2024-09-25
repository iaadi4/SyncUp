import { useSelector } from "react-redux";
import { GrClearOption } from "react-icons/gr";
import { useCallback, useEffect, useRef, useState } from "react";
import { setSelected } from "../Redux/contactSlice";
import { IoMdMore } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { toast } from 'react-toastify';
import axios from "axios";
import Message from "./Message";

const Messages = () => {
  const contact = useSelector((state) => state.contact.selected);
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const lastMessageRef = useRef();

  const data = JSON.parse(localStorage.getItem("user"));
  const token = data?.userData?.token;

  const onlineUsers = useSelector((state) => state.socket.onlineUsers);
  const isOnline = onlineUsers.includes(contact?._id);

  const socket = useSelector((state) => state.socket.instance);
  const user = useSelector((state) => state.auth.userData);
  const reload = useSelector((state) => state.refresh.reload);
  const userId = user.userData._id;

  useEffect(() => {
    setSelected(null);
  }, [reload]);

  const handleNewMessage = useCallback((newMessage) => {
    if (newMessage.senderId === contact?._id) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket?.emit('seen', { userId: userId, conversationId: contact?._id });
    }
  }, [contact?._id, socket, userId])

  useEffect(() => {
    socket?.on("newMessage", handleNewMessage);

    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, handleNewMessage]);

  const handleMessage = useCallback(async (e) => {
    e.preventDefault();
    if (message) {
      try {
        setSending(true);
        const res = await axios.post(
          `http://localhost:3000/api/v1/message/send/${contact._id}`,
          { message: message, status: 'sent' },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newMessage = res.data.data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage(null);
      } catch (error) {
        toast.error("Failed to send message, Please try again.", {
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: true,
        });
        console.log(error);
      } finally {
        setSending(false);
      }
    }
  }, [contact, message, token]);

  const deleteConversation = useCallback(async () => {
    if (contact) {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/conversation/${userId}/${contact._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const id = response.data?.data?._id;
        if (id) {
          await axios.delete(`http://localhost:3000/api/v1/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setMessages([]);
          socket.emit('clearMessage', { conversationId: contact._id });
        }
      } catch (error) {
        toast.error("Failed to delete messages, Please try again.", {
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: true,
        });
        console.log(error);
      }
    }
  }, [contact, socket, token, userId]);

  const removeFriend = useCallback(async () => {
    if (contact) {
      try {
        await axios.patch(`http://localhost:3000/api/v1/removeFriend/${contact._id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success("User removed from your contacts", {
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: true,
        });
      } catch (error) {
        toast.error("Failed to remove the friend", {
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: true,
        });
        console.log(error);
      }
    }
  }, [contact, token]);

  const toggleFavourite = useCallback(async () => {
    if (contact) {
      try {
        await axios.post(`http://localhost:3000/api/v1/favourite/${contact._id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        toast.error("Failed! Please try again later", {
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: true,
        });
        console.log(error);
      }
    }
  }, [contact, token]);

  useEffect(() => {
    if (contact) {
      socket?.on('clearMessage', ({ conversationId }) => {
        if (userId == conversationId) {
          setMessages([]);
        }
      })

      return () => socket?.off('clearMessage');
    }
  }, [contact, socket, userId]);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (contact) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/messages/${contact._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMessages(response.data.data);
        } catch (error) {
          toast.error("Message not loaded", {
            theme: "dark",
            autoClose: 2000,
            hideProgressBar: true,
          });
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [contact, token]);

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="w-full h-full min-w-[650px] overflow-x-auto">
      {contact ? (
        <div className="h-full w-full">
          <div className="flex sticky min-h-14 h-[10%] top-0 bg-customDark z-20">
            <div className="flex min-h-14 items-center w-full">
              <div className="flex ml-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={contact.image ? contact.image : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-6">
                <div className="text-xl text-white">{contact?.name}</div>
                <div className="text-[0.75rem] font-semibold">
                  {isOnline ? <span>ACTIVE NOW</span> : <span>OFFLINE</span>}
                </div>
              </div>
              <div className="flex ml-auto mr-3">
                <div
                  className="flex w-12 btn btn-ghost rounded-full p-2 cursor-pointer mr-3"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <GrClearOption className="w-6 h-6 t" />
                </div>
                <div tabIndex={0} className="dropdown dropdown-bottom dropdown-end flex w-12 btn btn-ghost rounded-full p-2 cursor-pointer mr-3">
                  <IoMdMore className="w-6 h-6" />
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2">
                    <li><div onClick={toggleFavourite}>Toggle Favourite</div></li>
                    <li><div onClick={() => document.getElementById("my_modal_11").showModal()}>Remove Contact</div></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className=" grow h-[78%] overflow-y-auto pt-2">
            {loading ? (
              <div className="flex h-full w-full items-center justify-center">
                <div className="loading loading-dots loading-lg"></div>
              </div>
            ) : null}
            {messages
              ? messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                  <Message message={message} />
                </div>
              ))
              : null}
          </div>
          <form
            className="flex items-center min-h-16 h-[12%]"
            onSubmit={handleMessage}
          >
            <div className="relative w-full mx-6 h-[60%]">
              <input
                type="text"
                placeholder="Type a message"
                className="input w-full h-full focus:outline-none border-none bg-customBlack pl-4 pr-10"
                value={message || ""}
                onChange={(e) => setMessage(e.target.value)}
              />
                {sending ? (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                  </div>
                ) : (
                  <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <IoIosSend className="w-6 h-6 mr-2" />
                  </button>
                )}
            </div>
          </form>
        </div>
      ) : (
        <div className="h-full w-full"></div>
      )}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">
            This will clear all messages from this chat.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-3 btn-ghost">Cancel</button>
              <button className="btn hov" onClick={deleteConversation}>Clear chat</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_11" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">
            User will be removed from your contacts.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-3 btn-ghost ">Cancel</button>
              <button className="btn hov" onClick={removeFriend}>Remove</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Messages;