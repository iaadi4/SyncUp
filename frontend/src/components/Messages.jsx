import { useSelector } from "react-redux";
import { GrClearOption } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import { setSelected } from "../Redux/conversationSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Message from "./Message";

const Messages = () => {
  const conversation = useSelector((state) => state.conversation.selected);
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const data = JSON.parse(localStorage.getItem("user"));
  const token = data.userData.token;

  const onlineUsers = useSelector((state) => state.socket.onlineUsers);
  const isOnline = onlineUsers.includes(conversation?._id);

  const socket = useSelector((state) => state.socket.instance);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);

  const lastMessageRef = useRef();

  const user = useSelector((state) => state.auth.userData);
  const userId = user.userData._id;

  useEffect(() => {
    setSelected(null);
  }, []);

  const handleMessage = async (e) => {
    e.preventDefault();
    if (message) {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/message/send/${conversation._id}`,
          { message: message },
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
  };

  const deleteConversation = async () => {
    if(conversation) {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/conversation/${userId}/${conversation._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const id = response.data?.data?._id;
        if(id) {
          await axios.delete(`http://localhost:3000/api/v1/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setMessages([]);
          socket.emit('clearMessage', {conversationId: conversation._id});
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
  };

  useEffect(() => {
    if(conversation) {
      socket?.on('clearMessage', ({conversationId}) => {
        if(userId == conversationId) {
          setMessages([]);
        }
      })

      return () => socket?.off('clearMessage');
    }
  }, [conversation, socket, userId]);

  useEffect(() => {
    setMessage(null);
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
  }, [messages]);

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
              <div className="flex ml-auto mr-4">
                <div
                  className="flex w-12 btn btn-ghost rounded-full p-2 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <GrClearOption className="w-6 h-6"/>
                </div>
              </div>
              <div>
                <div className="dropdown dropdown-end">
                  <button className="btn btn-square btn-ghost w-12 mr-4 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-5 w-5 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      ></path>
                    </svg>
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box mt-2 z-[1] w-44 p-2 shadow"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex h-full w-full  items-center justify-center">
              <div className="loading loading-ring loading-lg"></div>
            </div>
          ) : (
            <div className=" grow h-[78%] overflow-y-auto">
              {messages
                ? messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                      <Message message={message} />
                    </div>
                  ))
                : null}
            </div>
          )}
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
          <ToastContainer />
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
    </div>
  );
};

export default Messages;