import { useState } from "react";
import { logOut } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const LeftSideBar = () => {
  const [openModal, setOpenModal] = useState(false);

  const navigate =useNavigate()

  return (
    <div className="relative w-1/4 bg-gray-800 text-white flex flex-col">
      {/* Header with Chats and Menu Icon */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h1  className="text-xl font-semibold text-white cursor-pointer">
          Chats
        </h1>
        <div onClick={() => setOpenModal(!openModal)} className="flex flex-col justify-center items-center gap-1 cursor-pointer">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Modal for Logout and My Profile */}
      {openModal && (
        <div className="absolute top-12 right-4 bg-gray-700 text-white rounded-lg shadow-lg z-100 p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold"></span>
            <button
              onClick={() => setOpenModal(false)}
              className="text-gray-400 hover:text-white transition duration-200"
            >
              &times; {/* Close icon */}
            </button>
          </div>
          <ul className="flex flex-col mt-2">
            <li
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => {navigate('/profile')
                /* Handle Profile Click */
              }}
            >
              My Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => {
                logOut()
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer">
          <div className="flex items-center">
            <img src="/user1.jpg" alt="User 1" className="w-12 h-12 rounded-full mr-3" />
            <div>
              <h2 className="font-semibold">User 1</h2>
              <p className="text-sm text-gray-300">Last message from User 1</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer">
          <div className="flex items-center">
            <img src="/user2.jpg" alt="User 2" className="w-12 h-12 rounded-full mr-3" />
            <div>
              <h2 className="font-semibold">User 2</h2>
              <p className="text-sm text-gray-300">Last message from User 2</p>
            </div>
          </div>
        </div>
        {/* Add more chats as needed */}
      </div>
    </div>
  );
};

export default LeftSideBar;
