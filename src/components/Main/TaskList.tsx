import "../../styles/main.scss";
import { AddTask } from "../../components/AddTask/AddTask";
import style from "./TaskList.module.scss";
import { TaskItem } from "./TaskItem";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import empty from '../../assets/img/empty.png';
import { Undo } from "../Undo/Undo";
import { useState } from "react";
import type { Task } from "../../types/Task";
import { removeTask } from "../../features/tasksSlice";

export const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);
  const filterStatus = useSelector((state: RootState) => state.tasks.filterStatus);

  const [pendingTask, setPendingTask] = useState<Task | null>(null);
  const [deleteTimer, setDeleteTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Фильтрация задач по тексту и статусу
  const filteredTasks = tasks.filter(task => {
    const matchesText = task.title.toLowerCase().includes(filter.toLowerCase());

    if (filterStatus === 'all') return matchesText;
    if (filterStatus === 'complete') return matchesText && task.done;
    if (filterStatus === 'incomplete') return matchesText && !task.done;
    return matchesText;
  });

  const isEmpty = filteredTasks.length === 0;

  const handleDelete = (task: Task) => {
    if (deleteTimer) {
      clearTimeout(deleteTimer);
    }

    setPendingTask(task);

    const timer = setTimeout(() => {
      dispatch(removeTask(task.id));
      setPendingTask(null);
      setDeleteTimer(null);
    }, 3000);

    setDeleteTimer(timer);
  };

  const cancelDelete = () => {
    if (deleteTimer) {
      clearTimeout(deleteTimer);
      setDeleteTimer(null);
    }
    setPendingTask(null);
  };

  return (
    <div className="container">
      <ul className={`${style.list} ${isEmpty ? style.center : ''}`}>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => handleDelete(task)}
          />
        ))}
        {isEmpty && (
          <div className={style.text__empty}>
            <img src={empty} alt="Empty tasks placeholder" />
            <h3>Oops... it's empty</h3>
          </div>
        )}

        {pendingTask && (
          <Undo
            task={pendingTask}
            cancel={cancelDelete}
          />
        )}
      </ul>
      <AddTask />
    </div>
  );
};