import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addTask } from "../Redux/Slice/task";
import { v4 as uuidv4 } from "uuid";

const AddTask = ({ setModal }) => {
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
    isImportant: false,
    isDone: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    if (!task.title.trim() || !task.description.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    // Dispatch the addTask action with task details
    dispatch(addTask(task));

    // Close the modal
    setModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:w-96 md:w-80 lg:w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Task</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter task title"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            rows="4"
            placeholder="Enter task description"
          />
        </div>

        {/* Date Picker */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-600">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={task.date}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Star Button for Important */}
        <div className="mb-4 flex items-center">
          <button
            onClick={() => setTask({ ...task, isImportant: !task.isImportant })}
            className="p-2 rounded-full transition-colors text-yellow-500 hover:text-yellow-600"
          >
            {task.isImportant ? <FaStar size={28} /> : <FaRegStar size={28} />}
          </button>
          <span className="ml-2 text-gray-600">
            {task.isImportant ? "Important" : "Mark as Important"}
          </span>
        </div>

        {/* Modal Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setModal(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
