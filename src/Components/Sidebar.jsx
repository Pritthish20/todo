import React, { useState, useEffect } from "react";
import { FaBars, FaTasks, FaStar, FaCheck, FaList, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddTask from "./Addtask";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-800 text-gray-200 flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1
            className={`text-lg font-semibold ${
              isOpen ? "block" : "hidden"
            } transition-all duration-300`}
          >
            Task Manager
          </h1>
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <FaBars size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1">
          <ul className="mt-4 space-y-2">
            <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/all-tasks" className="flex items-center w-full text-gray-200">
                <FaTasks className="mr-3" />
                <span className={`${isOpen ? "block" : "hidden"}`}>All Tasks</span>
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/important" className="flex items-center w-full text-gray-200">
                <FaStar className="mr-3" />
                <span className={`${isOpen ? "block" : "hidden"}`}>Important</span>
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/completed" className="flex items-center w-full text-gray-200">
                <FaCheck className="mr-3" />
                <span className={`${isOpen ? "block" : "hidden"}`}>Completed</span>
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/to-do" className="flex items-center w-full text-gray-200">
                <FaList className="mr-3" />
                <span className={`${isOpen ? "block" : "hidden"}`}>To-Do</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 relative">
        {children}
        {/* Floating Add Task Button */}
        <button
          onClick={() => setAddTaskModal(true)}
          className="fixed bottom-6 right-6 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <FaPlus size={24} />
        </button>
        {addTaskModal && <AddTask setModal={setAddTaskModal} />}
      </div>
    </div>
  );
};

export default Sidebar;
