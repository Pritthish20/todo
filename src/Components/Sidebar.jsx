import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { FaBars, FaTasks, FaStar, FaCheck, FaList, FaPlus, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddTask from "./Addtask";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const chartRef = useRef(null); // Reference for the canvas
  const chartInstanceRef = useRef(null); // Reference for the chart instance

  const completedTasks = 3;
  const totalTasks = 5;

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
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy the existing chart instance
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Completed Tasks", "Remaining Tasks"],
        datasets: [
          {
            data: [completedTasks, totalTasks - completedTasks],
            backgroundColor: ["green", "teal"], // Updated colors for better contrast
            // hoverBackgroundColor: ["green", "teal"], // Slightly darker hover effect
            borderWidth: 0, // Remove the white borders
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
              color: "#FFF", // Match text color to design
              font: {
                size: 12, // Adjust label font size
              },
            },
          },
        },
        elements: {
          arc: {
            hoverOffset: 10, // Add a subtle hover effect
            borderWidth: 0, // Ensure no borders
            shadowOffsetX: 2, // Add shadow offset horizontally
            shadowOffsetY: 2, // Add shadow offset vertically
            shadowBlur: 6, // Blur effect for the shadow
            shadowColor: "rgba(0, 0, 0, 0.3)", // Soft shadow
          },
        },
      },
    });
  

    // Cleanup the chart instance on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [completedTasks, totalTasks]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
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

        {/* User Icon */}
        <div className="flex flex-col items-center mt-4">
          <div
            className={`${
              isOpen ? "w-44 h-44" : "w-7 h-7"
            } bg-teal-500 rounded-full flex items-center justify-center text-white transition-all duration-300`}
          >
            <FaUser size={isOpen ? 96 : 16} />
          </div>
          {isOpen && (
            <p className="mt-2 text-gray-200 text-md font-semibold">User Name</p>
          )}
        </div>

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

        {/* Pie Chart Section */}
        <div className=" flex-2 p-4">
          <h2
            className={`text-center font-semibold text-gray-300 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            Task Progress
          </h2>
          <div className={`w-full h-48 ${
              isOpen ? "block" : "hidden"
            }`}>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Floating Add Task Button */}
      <button
        onClick={() => setAddTaskModal(true)}
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
