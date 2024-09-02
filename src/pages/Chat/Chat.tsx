import React from "react"
import LeftSideBar from "../../components/LeftSideBar";
const Chat = () =>{
    return(
        <>
         <div className="flex h-screen">
      {/* Left Sidebar - Chat List */}
      
      <LeftSideBar/>

      {/* Right Side - Active Chat */}
      <div className="w-3/4 flex flex-col">
        <div className="p-4 bg-gray-800 text-white border-b border-gray-700">
          <h1 className="text-xl font-semibold">User 1</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="mb-4">
            <div className="flex items-start">
              <img src="/user1.jpg" alt="User 1" className="w-8 h-8 rounded-full mr-3" />
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <p>Hello! How are you?</p>
              </div>
            </div>
          </div>
          <div className="mb-4 text-right">
            <div className="inline-block bg-blue-500 text-white p-2 rounded-lg shadow-sm">
              <p>I'm good, thanks! How about you?</p>
            </div>
          </div>
          {/* Add more messages as needed */}
        </div>
        <div className="p-4 bg-gray-800 flex items-center">
          <input type="text" placeholder="Type a message..." className="flex-1 p-2 rounded-lg border border-gray-700 bg-gray-900 text-white" />
          <button className="ml-2 bg-blue-500 p-2 rounded-lg text-white">Send</button>
        </div>
      </div>
    </div>
        </>
    )
}

export default Chat;