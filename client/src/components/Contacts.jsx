import Contact from "./Contact";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo, useCallback } from "react";
import { logout } from "../Redux/authSlice";
import { setRemove } from "../Redux/contactSlice";
import { setContactReload } from "../Redux/reloadSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Contacts = () => {
    const [conversations, setConversations] = useState([]);
    const [favourite, setFavourites] = useState([])
    const [friendEmail, setFriendEmail] = useState("");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(1);
    const [loading, setLoading] = useState(true);

    const data = JSON.parse(localStorage.getItem("user"));
    const token = data?.userData?.token;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const reload = useSelector((state) => state.refresh.contactReload);

    const logoutUser = () => {
        dispatch(setRemove())
        dispatch(logout())
        navigate('/login')
    }

    const searchUser = useMemo(() => {
        if (search.trim() != "" && conversations) {
            return conversations.filter((convo) =>
                convo.name.toLowerCase().startsWith(search.toLowerCase())
            )
        }
        return []
    }, [conversations, search])

    const addFriend = useCallback(async () => {
        if (!friendEmail) {
            toast.error("Email cannot be empty", {
                theme: "dark",
                autoClose: 2000,
                hideProgressBar: true,
            })
        }
        else {
            try {
                dispatch(setContactReload(true));
                const response = await axios.post(`http://localhost:3000/api/v1/addFriend/${friendEmail}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const friendName = response?.data?.data?.name;
                if (friendName) {
                    toast.success(`${friendName} is added.`, {
                        theme: "dark",
                        autoClose: 2000,
                        hideProgressBar: true,
                    })
                }
            } catch (error) {
                toast.error("Failed to add user", {
                    theme: "dark",
                    autoClose: 2000,
                    hideProgressBar: true,
                })
                console.log(error);
            } finally {
                setFriendEmail("");
                dispatch(setContactReload(false));
            }
        }
    }, [friendEmail, token, dispatch])

    useEffect(() => {
        const getConversation = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/friends", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setConversations(response.data.data);
            } catch (error) {
                toast.error("Error fetching conversation", {
                    theme: "dark",
                    autoClose: 2000,
                    hideProgressBar: true,
                });
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getConversation();
    }, [token, reload, dispatch]);

    useEffect(() => {
        const getFavourites = async () => {
            try {
                dispatch(setContactReload(true));
                const response = await axios.get('http://localhost:3000/api/v1/favourite/get', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFavourites(response.data?.data);
            } catch (error) {
                toast.error("Failed to fetch favourites", {
                    theme: "dark",
                    autoClose: 2000,
                    hideProgressBar: true,
                })
                console.log(error);
            } finally {
                dispatch(setContactReload(false));
            }
        }
        getFavourites();
    }, [token, reload, dispatch])

    const displayedConversations = useMemo(() => {
        if (search.length == 0) {
            if (selected == 1)
                return favourite.length > 0 ? favourite : null;
            else
                return conversations.length > 0 ? conversations : null;
        }
        else
            return searchUser;
    }, [favourite, search, selected, conversations, searchUser])

    return (
        <div>
            <div className="flex h-full flex-col w-1/3 min-w-[400px] max-w-[500px] bg-customBlack">
                <div className="sticky top-0 z-10 flex flex-col">
                    <div className="flex h-[74px] w-full">
                        <div className="flex items-center basis-[75%] lg:basis-[85%]">
                            <h1 className="text-[1.75rem] font-semibold m-4 ml-10 text-white">
                                Chats
                            </h1>
                        </div>
                        <div className="flex items-center justify-end">
                            <div tabIndex={0} className="flex w-12 p-2 mr-3 rounded-full cursor-pointer dropdown dropdown-bottom btn btn-ghost">
                                <IoMdSettings className="w-6 h-6" />
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li><div onClick={() => document.getElementById('my_modal_10')?.showModal()}>Add contact</div></li>
                                    <li><div onClick={() => document.getElementById('my_modal_5')?.showModal()}>Log out</div></li>
                                    <li><Link to="/settings">All settings</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex m-4">
                        <div className="flex items-center w-full h-10 gap-2 border-none input input-bordered focus:outline-none focus-within:outline-none focus-within:border-none">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center h-10 mb-6 justify-evenly">
                        <h1
                            className={`text-sm cursor-pointer font-semibold ${selected == 1 ? 'underline underline-offset-4 decoration-[1.5px] text-white' : ''}`}
                            onClick={(() => setSelected(1))}
                        >
                            FAVOURITES
                        </h1>
                        <h1
                            className={`text-sm cursor-pointer font-semibold ${selected == 2 ? 'underline underline-offset-4 decoration-[1.5px] text-white' : ''}`}
                            onClick={(() => setSelected(2))}
                        >
                            CONTACTS
                        </h1>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center w-full bg-customBlack">
                            <div className="loading loading-dots loading-lg"></div>
                        </div>
                    ) : (<div>
                        {displayedConversations ? (
                            displayedConversations.map((contact) => (
                                <Contact key={contact._id} contact={contact} />
                            ))
                        ) : (
                            <div className="flex justify-center h-full">
                                <h1 className="mt-40 text-lg">Feels so empty!</h1>
                            </div>
                        )}
                    </div>
                    )}
                </div>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Are you sure?</h3>
                    <p className="py-4">You will be logged out!</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="mr-3 btn btn-ghost">Close</button>
                            <button className="btn" onClick={logoutUser}>Logout</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="my_modal_10" className="modal">
                <div className="w-full modal-box">
                    <h3 className="mb-4 text-lg font-bold">Add Contact</h3>
                    <input
                        type="text"
                        placeholder="Enter contact's email"
                        className="w-full input input-bordered focus:border-none"
                        value={friendEmail}
                        onChange={(e) => setFriendEmail(e.target.value)}
                    />
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="mr-3 btn btn-ghost">Close</button>
                            <button className="btn" onClick={addFriend}>Add</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Contacts