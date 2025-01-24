import React, { useState } from "react";
import { FiEdit, FiTrash, FiCheckCircle } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import UpdateTask from './UpdateTask';
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskDone, toggleTaskImportant } from "../Redux/Slice/task";

const TaskCard = ({ task, }) => {
  const dispatch =useDispatch();

  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const { id,title, description, date, isDone, isImportant } = task;

  // Handlers for buttons (dummy for now)
  const handleDone = () => {
    dispatch(toggleTaskDone(id))
  };

  const handleImportant = () => {
    dispatch(toggleTaskImportant(id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl p-6 rounded-lg shadow-md flex flex-col space-y-4 border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Task Details */}
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold text-wrap ${
            isDone ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setUpdateTaskModal(true)}
          className="text-blue-600 hover:text-blue-800 transition-colors"
          title="Edit Task"
        >
          <FiEdit size={22} />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 transition-colors"
          title="Delete Task"
        >
          <FiTrash size={22} />
        </button>
        <button
          onClick={handleDone}
          className={`${
            isDone ? "text-gray-400" : "text-green-600 hover:text-green-800"
          } transition-colors`}
          title={isDone ? "Task Done" : "Mark as Done"}
        >
          <FiCheckCircle size={22} />
        </button>
        <button
          onClick={handleImportant}
          className="text-yellow-500 hover:text-yellow-600 transition-colors"
          title={isImportant ? "Important Task" : "Mark as Important"}
        >
          {isImportant ? <FaStar size={22} /> : <FaRegStar size={22} />}
        </button>
      </div>
      {updateTaskModal && <UpdateTask setModal={setUpdateTaskModal} oldTask={task}/>}
    </div>
  );
};

export default TaskCard;
