import { useSelector } from "react-redux";
import { GrClearOption } from "react-icons/gr";
import { useEffect } from "react";
import { setSelected } from "../Redux/conversationSlice";

const Messages = () => {
  const conversation = useSelector((state) => state.conversation.selected);

  useEffect(() => {
    setSelected(null);
  }, []);

  return (
    <div className="w-full bg-zinc-900 min-w-[650px] overflow-x-auto">
      {conversation ? (
        <div className="flex sticky h-[70px] bg-gray-600 top-0">
          <div className="flex items-center w-full">
            <div className="flex ml-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-6">
              <div className="text-xl text-white">{conversation?.name}</div>
              <div className="text-[0.75rem] font-semibold">ACTIVE NOW</div>
            </div>
            <div className="flex ml-auto mr-4">
              <div className="flex w-12 btn btn-ghost rounded-full p-2 cursor-pointer">
                <GrClearOption className="w-6 h-6" />
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
      ) : null}
    </div>
  );
};

export default Messages;
