import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./AddTaskModal.module.scss";
import { addTask } from "../../features/tasksSlice";

interface Props {
	onClose: () => void;
}

export const AddTaskModal: React.FC<Props> = ({ onClose }) => {
	const dispatch = useDispatch();
	const [task, setTask] = useState("");

	const handleApply = () => {
		if (task.trim()) {
			dispatch(addTask(task));
			setTask("");
			onClose();
		}
	};

	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
				<div className={styles.modal__content}>
					<h2 className={styles.title}>New note</h2>
					<input
						id="inputAddNewNote"
						className={styles.input}
						type="text"
						placeholder="Добавить новое дело"
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
					<div className={styles.container__buttons}>
						<button
							onClick={onClose}
							className={`${styles.button__cancel} ${styles.buttons}`}
						>
							Cancel
						</button>
						<button
							onClick={handleApply}
							className={`${styles.button__apply} ${styles.buttons}`}
						>
							Apply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};