import React from 'react'
import TaskCard from "../Components/TaskCard";
import Weather from "../Components/Weather";
import { useSelector } from 'react-redux';
import { selectImportantTasks } from '../Redux/Slice/task';


const Important = () => {
  const importantTasks = useSelector(selectImportantTasks);

  return (
    <div className="flex flex-col lg:w-[86vw] sm:w-auto">
      <Weather/>
      <div className="px-8 py-2 min-h-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Important
      </h2>
      <div
        className="grid gap-5
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4"
      >
        {importantTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Important