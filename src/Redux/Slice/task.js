// taskSlice.js
import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add a new task to the state
    addTask(state, action) {
      state.tasks.push(action.payload);
    },

    // Update an existing task
    updateTask(state, action) {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
      }
    },

    // Delete a task
    deleteTask(state, action) {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },

    // Mark a task as done or undone
    toggleTaskDone(state, action) {
      const id = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.isDone = !task.isDone;
      }
    },

    // Mark a task as important or not important
    toggleTaskImportant(state, action) {
      const id = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.isImportant = !task.isImportant;
      }
    },
  },
});

// Export actions for use in components
export const { addTask, updateTask, deleteTask, toggleTaskDone, toggleTaskImportant } = taskSlice.actions;

// Selectors for filtering tasks based on different criteria
export const selectDoneTasks = createSelector(
  (state) => state.tasks.tasks,
  (tasks) => tasks.filter((task) => task.isDone)
);

export const selectToDoTasks = createSelector(
  (state) => state.tasks.tasks,
  (tasks) => tasks.filter((task) => !task.isDone)
);

export const selectImportantTasks = createSelector(
  (state) => state.tasks.tasks,
  (tasks) => tasks.filter((task) => task.isImportant)
);

export default taskSlice.reducer;
