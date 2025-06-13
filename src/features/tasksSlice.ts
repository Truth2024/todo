import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface Task {
	id: number;
	title: string;
	done: boolean;

}

interface TasksState {
	tasks: Task[];
	filter: string;
	filterStatus: 'all' | 'complete' | 'incomplete';
}

const initialState: TasksState = {
	tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
	filter: '',
	filterStatus: 'all',
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<string>) => {
			const newTask: Task = {
				id: Date.now(),
				title: action.payload,
				done: false,
			};
			state.tasks.push(newTask);
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		removeTask: (state, action: PayloadAction<number>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		doneTask: (state, action: PayloadAction<number>) => {
			const task = state.tasks.find(task => task.id === action.payload);
			if (task) {
				task.done = !task.done;
			}
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},

		updateTask: (state, action: PayloadAction<{ id: number; title: string }>) => {
			const { id, title } = action.payload;
			const task = state.tasks.find(t => t.id === id);
			if (task) {
				task.title = title;
			}
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		setFilter: (state, action: PayloadAction<string>) => {
			state.filter = action.payload;
		},
		setFilterStatus(state, action: PayloadAction<'all' | 'complete' | 'incomplete'>) {
      state.filterStatus = action.payload;
    },

	},
});

export const { addTask, doneTask, removeTask, updateTask, setFilter, setFilterStatus } = tasksSlice.actions;
export default tasksSlice.reducer;