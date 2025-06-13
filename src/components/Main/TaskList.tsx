import "../../styles/main.scss";
import { AddTask } from "../../components/AddTask/AddTask";
import style from "./TaskList.module.scss";
import { TaskItem } from "./TaskItem";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export const TaskList = () => {
	const tasks = useSelector((state: RootState) => state.tasks.tasks);
	const filter = useSelector((state: RootState) => state.tasks.filter);
	const filterStatus = useSelector((state: RootState) => state.tasks.filterStatus)


	const filteredTasks = tasks.filter(task => {
		const matchesText = task.title.toLowerCase().includes(filter.toLowerCase());

		if (filterStatus === 'all') {
			return matchesText;
		}
		if (filterStatus === 'complete') {
			return matchesText && task.done;
		}
		if (filterStatus === 'incomplete') {
			return matchesText && !task.done;
		}
		return matchesText;
	});

	return (
		<div className="container">
			<ul className={style.list}>
				{filteredTasks.map((task) => (
					<TaskItem key={task.id} task={task} />
				))}
			</ul>
			<AddTask />
		</div>
	);
};