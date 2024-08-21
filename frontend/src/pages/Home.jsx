import { FaPlus } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col w-1/3 overflow-x-auto bg-black">
        <div className="flex h-16 w-full">
          <div className="flex items-center basis-[75%] lg:basis-[85%]">
            <h1 className="text-[1.75rem] font-semibold m-4 ml-10 text-white">
              Chats
            </h1>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex p-2 rounded-full hover:bg-slate-900 cursor-pointer mt-1">
              <FaPlus className="w-6 h-6"/>
            </div>
          </div>
        </div>
        <div className="flex m-4">
          <label className="input input-bordered flex items-center gap-2 w-full h-10">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="flex justify-evenly h-10 items-center">
          <h1 className="text-sm cursor-pointer font-semibold">ACTIVE NOW</h1> {/* add font-semibold on active */}
          <h1 className="text-sm cursor-pointer ">CONTACTS</h1> 
        </div>
        <div>
          
        </div>
      </div>
      <div className="flex w-2/3"></div>
    </div>
  );
};

export default Home;
