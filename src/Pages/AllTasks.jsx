import React from 'react'
import TaskCard from '../Components/TaskCard';

const tasks = [
  {
    id: 1,
    title: "Grocery Shopping",
    description: "Buy milk, eggs, bread, and fruits.",
    date: "2024-11-25",
    isDone: false,
    isImportant: true,
  },
  {
    id: 2,
    title: "Finish Project Report",
    description: "Complete the final draft and submit before deadline.",
    date: "2024-11-28",
    isDone: true,
    isImportant: true,
  },
  {
    id: 3,
    title: "Schedule Doctor's Appointment",
    description: "Call the clinic to book an appointment for next week.",
    date: "2024-11-27",
    isDone: false,
    isImportant: false,
  },
  {
    id: 4,
    title: "Read Chapter 5",
    description: "Finish reading Chapter 5 of 'The Lord of the Rings'.",
    date: "2024-11-26",
    isDone: false,
    isImportant: false,
  },
  {
    id: 5,
    title: "Gym Workout",
    description: "Complete a full-body workout routine.",
    date: "2024-11-25",
    isDone: true,
    isImportant: true,
  },
  {
    id: 6,
    title: "Pay Bills",
    description: "Pay electricity, internet, and phone bills online.",
    date: "2024-11-25",
    isDone: false,
    isImportant: true,
  },
  {
    id: 7,
    title: "Plan Weekend Trip",
    description: "Research destinations and book accommodations.",
    date: "2024-11-24",
    isDone: false,
    isImportant: false,
  },
];


const Alltasks = () => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task}  
        />
      ))}
    </div>
  )
}

export default Alltasks