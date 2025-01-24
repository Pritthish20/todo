import React from 'react'
import TaskCard from "../Components/TaskCard";
import Weather from "../Components/Weather";
import { useSelector } from 'react-redux';
import { selectDoneTasks } from '../Redux/Slice/task';



const Completed = () => {
  const completedTasks = useSelector(selectDoneTasks);

  return (
    <div className="flex flex-col">
    <Weather/>
    <div className="px-8 py-2 min-h-auto">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
      Completed
    </h2>
    <div
      className="grid gap-5
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4"
    >
      {completedTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  </div>
  </div>
  );
}

export default Completed