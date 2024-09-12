import { useSelector, useDispatch } from "react-redux";
import { GrClearOption } from "react-icons/gr";
import { useCallback, useEffect, useRef, useState } from "react";
import { setSelected } from "../Redux/conversationSlice";
import { ToastContainer, toast } from "react-toastify";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { GoStar } from "react-icons/go";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Message from "./Message";
import { setReload } from "../Redux/reloadSlice";

const Messages = () => {
  const conversation = useSelector((state) => state.conversation.selected);
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const lastMessageRef = useRef();

  const data = JSON.parse(localStorage.getItem("user"));
  const token = data?.userData?.token;

  const onlineUsers = useSelector((state) => state.socket.onlineUsers);
  const isOnline = onlineUsers.includes(conversation?._id);

  const socket = useSelector((state) => state.socket.instance);
  const user = useSelector((state) => state.auth.userData);
  const userId = user.userData._id;

  useEffect(() => {
    setSelected(null);
  }, []);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId === conversation?._id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages, conversation]);

  const handleMessage = useCallback(async (e) => {
    e.preventDefault();
    if (message) {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/message/send/${conversation._id}`,
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
      }
    }
  }, [conversation, message, token]);

  const deleteConversation = useCallback(async () => {
    if (conversation) {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/conversation/${userId}/${conversation._id}`, {
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
          socket.emit('clearMessage', { conversationId: conversation._id });
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
  }, [conversation, socket, token, userId]);

  const removeFriend = useCallback(async () => {
    if (conversation) {
      try {
        await axios.patch(`http://localhost:3000/api/v1/removeFriend/${conversation._id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        dispatch(setReload(true));
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
  }, [conversation, token, dispatch]);

  const toggleFavourite = useCallback(async () => {
    if(conversation) {
      try {
        await axios.post(`http://localhost:3000/api/v1/favourite/${conversation._id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        dispatch(setReload(true));
      } catch (error) {
        toast.error("Failed to remove the friend", {
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: true,
        });
        console.log(error);
      }
    }
  }, [conversation, token, dispatch]);

  useEffect(() => {
    if (conversation) {
      socket?.on('clearMessage', ({ conversationId }) => {
        if (userId == conversationId) {
          setMessages([]);
        }
      })

      return () => socket?.off('clearMessage');
    }
  }, [conversation, socket, userId]);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (conversation) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/messages/${conversation._id}`,
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
  }, [conversation, token]);

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="w-full h-full min-w-[650px] overflow-x-auto">
      {conversation ? (
        <div className="h-full w-full">
          <div className="flex sticky min-h-14 h-[10%] top-0">
            <div className="flex min-h-14 items-center w-full">
              <div className="flex ml-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={conversation.image ? conversation.image : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-6">
                <div className="text-xl text-white">{conversation?.name}</div>
                <div className="text-[0.75rem] font-semibold">
                  {isOnline ? <span>ACTIVE NOW</span> : <span>OFFLINE</span>}
                </div>
              </div>
              <div className="flex ml-auto mr-3">
                <div
                  className="flex w-12 btn btn-ghost rounded-full p-2 cursor-pointer mr-3"
                  onClick={toggleFavourite}
                >
                  <GoStar className="w-6 h-6" />
                </div>
                <div
                  className="flex w-12 btn btn-ghost rounded-full p-2 cursor-pointer mr-3"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <GrClearOption className="w-6 h-6" />
                </div>
                <div className="flex mr-4">
                  <div
                    className="flex w-12 btn btn-ghost rounded-full p-2 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_11").showModal()
                    }
                  >
                    <IoPersonRemoveSharp className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" grow h-[78%] overflow-y-auto">
            {loading ? (
              <div className="flex h-full w-full  items-center justify-center">
                <div className="loading loading-ring loading-lg"></div>
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
            className="flex items-center min-h-16 h-[12%] bg-zinc-900 mt-auto"
            onSubmit={handleMessage}
          >
            <input
              type="text"
              placeholder="Type a message"
              className="input mx-6 w-full h-[60%] focus:outline-none border-none"
              value={message || ""}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        </div>
      ) : null}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">
            This will clear all messages from this chat.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-3 btn-ghost">Cancel</button>
              <button className="btn" onClick={deleteConversation}>Clear chat</button>
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
              <button className="btn mr-3 btn-ghost">Cancel</button>
              <button className="btn" onClick={removeFriend}>Remove</button>
            </form>
          </div>
        </div>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default Messages;