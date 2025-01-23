import React from "react";
import { FaEdit, FaTrash, FaCheck, FaStar } from "react-icons/fa";

const TaskCard = ({ task }) => {
  const { title, description, date, isDone, isImportant } = task;

  // Handlers for buttons (dummy for now)
  const handleDone = () => {
    console.log(`Mark task "${title}" as done`);
  };

  const handleImportant = () => {
    console.log(`Mark task "${title}" as important`);
  };

  const handleDelete = () => {
    console.log(`Delete task "${title}"`);
  };

  const handleUpdate = () => {
    console.log(`Update task "${title}"`);
  };

  return (
    <div className="bg-white p-3 rounded-md shadow-md flex flex-col space-y-2 border border-gray-200 sm:flex-row sm:items-center sm:justify-between">
      {/* Left Section */}
      <div className="flex-1">
        <h3
          className={`text-md font-semibold truncate ${
            isDone ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-600 truncate">{description}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>

      {/* Button Section */}
      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
        <button
          onClick={handleUpdate}
          className="text-blue-500 hover:text-blue-700 transition-colors"
          title="Edit Task"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Delete Task"
        >
          <FaTrash size={16} />
        </button>
        <button
          onClick={handleDone}
          className={`${
            isDone ? "text-gray-400" : "text-green-500 hover:text-green-700"
          } transition-colors`}
          title={isDone ? "Task Done" : "Mark as Done"}
        >
          <FaCheck size={16} />
        </button>
        <button
          onClick={handleImportant}
          className={`${
            isImportant
              ? "text-yellow-400"
              : "text-yellow-500 hover:text-yellow-700"
          } transition-colors`}
          title={isImportant ? "Important Task" : "Mark as Important"}
        >
          <FaStar size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
