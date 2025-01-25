import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { FaBars, FaTasks, FaStar, FaCheck, FaList, FaPlus, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddTask from "./AddTask";
import { logout } from "../Redux/Slice/auth"; // Replace with your actual authSlice logout action
import { selectDoneTasks } from "../Redux/Slice/task";

const Sidebar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state for authentication
  const userInfo = useSelector((state) => state.auth.userInfo);

  const completedTasks = useSelector(selectDoneTasks);
  const totalTasks = useSelector((state)=>state.tasks.tasks);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!userInfo) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Completed Tasks", "Remaining Tasks"],
        datasets: [
          {
            data: [completedTasks.length, totalTasks.length - completedTasks.length],
            backgroundColor: ["green", "teal"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#FFF",
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [completedTasks, totalTasks, userInfo]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleAddTask = () => {
    if (!userInfo) {
      navigate("/login"); // Redirect to login if user isn't logged in
    } else {
      setAddTaskModal(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? (isMobile ? "w-54" : "w-64")  : "w-16"
        } bg-gray-800 text-gray-200 flex flex-col min-h-screen h-auto transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1
            className={`text-lg font-semibold ${
              isOpen ? "block" : "hidden"
            } transition-all duration-300`}
          >
            Manage Your Tasks
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

        {/* User Section */}
        {userInfo ? (
          <div className="flex flex-col items-center mt-4">
           <div
            className={`${
              isOpen ? (isMobile ? "w-22 h-22" : "w-44 h-44") : "w-7 h-7"
            } ${userInfo ?"bg-teal-500 ":" bg-gray-500"} rounded-full flex items-center justify-center text-white transition-all duration-300`}
          >
            <FaUser size={isOpen ? (isMobile ? 44 : 96) : 16} />
          </div>
            {isOpen && (
              <p className="mt-2 text-gray-200 text-md font-semibold">
                {userInfo.name || "User Name"}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center mt-4">
            <FaUser size={isOpen ? 96 : 16} className="text-gray-500" />
            {isOpen && (
              <p className="mt-2 text-gray-400 text-md font-semibold">
                Please Log In
              </p>
            )}
          </div>
        )}

        <nav className="flex-1">
          <ul className="mt-4 space-y-2">
            <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/" className="flex items-center w-full text-gray-200">
                <FaList className="mr-3" />
                <span className={`${isOpen ? "block" : "hidden"}`}>To-Do</span>
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
              <Link to="/all-tasks" className="flex items-center w-full text-gray-200">
                <FaTasks className="mr-3" />
                <span className={`${isOpen ? "block" : "hidden"}`}>All Tasks</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Task Progress Graph */}
        {userInfo && (
          <div className="p-4 flex-2">
            <h2
              className={`text-center font-semibold text-gray-300 ${
                isOpen ? "block" : "hidden"
              }`}
            >
              Task Progress
            </h2>
            <div className={`w-full h-48 ${isOpen ? "block" : "hidden"}`}>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        )}

        {/* Login/Logout Button */}
        <div className={`p-4 ${isOpen ? "block" : "hidden"}`}>
          {userInfo ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Floating Add Task Button */}
      <button
        onClick={handleAddTask}
        className="fixed bottom-6 right-6 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 z-50"
      >
        <FaPlus size={24} />
      </button>

      {/* Add Task Modal */}
      {addTaskModal && <AddTask setModal={setAddTaskModal} />}
    </div>
  );
};

export default Sidebar;
