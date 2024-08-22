import {setSelected} from "../Redux/conversationSlice";
import { useDispatch, useSelector } from "react-redux";

const Conversation = ({conversation}) => {

    const dispatch = useDispatch();    
    const selectedConversation = useSelector((state) => state.conversation.selected);
    const selected = selectedConversation?._id === conversation._id;

  return (
    <div
        className={`flex w-full h-20 cursor-pointer hover:bg-gray-900 ${selected ? "bg-gray-900": ""}`}
        onClick={() => dispatch(setSelected(conversation))}
    >
      <div className="flex items-center w-full mx-5">
        <div className="flex basis-2/12">
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        </div>
        <div className="flex flex-col basis-8/12">
          <div>
            <h1 className="font-semibold text-slate-300 ml-4 md:ml-3 lg:ml-2">{conversation.name}</h1>
          </div>
          <div>
            <h1 className="ml-4 md:ml-3 lg:ml-2">hello, how are you doing?</h1>
          </div>
        </div>
        <div className="">
            <div className="px-2 py-1 bg-neutral-900 rounded-3xl">
                <h1>40m</h1>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;