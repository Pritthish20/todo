import React from "react";
import TaskCard from "../Components/TaskCard";
import Weather from "../Components/Weather";
import { useSelector } from "react-redux";

const Alltasks = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  console.log(tasks);
  return (
    <div className="flex flex-col lg:w-[86vw] sm:w-auto">
      <Weather />
      <div className="px-8 py-2 min-h-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
          All Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-gray-600 text-center">No tasks available. Add a task to get started!</p>
        ) : (
          <div
            className="grid gap-5
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4"
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alltasks;
