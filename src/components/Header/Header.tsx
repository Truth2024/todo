import styles from "./Header.module.scss";
import "../../styles/main.scss"
import { Button } from "../Button/Button";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilter, setFilterStatus } from "../../features/tasksSlice";


export const Header = () => {
	const [theme, setTheme] = useState<"light" | "dark">(
		(localStorage.getItem("theme") as "light" | "dark") || "light"
	);
	const dispatch = useDispatch();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setFilter(e.target.value));
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setFilterStatus(e.target.value as 'all' | 'complete' | 'incomplete'));
	};

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));
	return (
		<header className={styles.header}>
			<div className='container'>
				<div className="flex-center mb-22"><h2 className={styles.header__logo}>TODO LIST</h2></div>
				<div className="flex gap-16">
					<input onChange={handleInputChange} id="input" className={styles.input} type="text" placeholder="Поиск..." />
					<select onChange={handleStatusChange} id="select" className={styles.select}>
						<option className={styles.option} value="all">ALL</option>
						<option className={styles.option} value="complete">Complete</option>
						<option className={styles.option} value="incomplete">Incomplete</option>
					</select>
					<Button className={styles.theme__button} onClick={toggleTheme}>
						{theme == "light" ?
							<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M11.1249 0.548798C11.3387 0.917354 11.321 1.3762 11.0791 1.72705C10.3455 2.79152 9.91599 4.08062 9.91599 5.47334C9.91599 9.12428 12.8757 12.084 16.5266 12.084C17.9194 12.084 19.2085 11.6545 20.2729 10.9208C20.6238 10.6791 21.0826 10.6613 21.4512 10.8751C21.8197 11.089 22.0319 11.4962 21.9961 11.9208C21.5191 17.567 16.7867 22 11.0178 22C4.93282 22 0 17.0672 0 10.9822C0 5.21328 4.43301 0.480873 10.0792 0.00392422C10.5038 -0.0319387 10.911 0.180242 11.1249 0.548798ZM8.17985 2.63461C4.70452 3.81573 2.20355 7.10732 2.20355 10.9822C2.20355 15.8502 6.14981 19.7964 11.0178 19.7964C14.8927 19.7964 18.1843 17.2955 19.3654 13.8202C18.4741 14.1232 17.5191 14.2875 16.5266 14.2875C11.6587 14.2875 7.71244 10.3413 7.71244 5.47334C7.71244 4.48086 7.87682 3.52582 8.17985 2.63461Z" fill="#F7F7F7" />
							</svg> : <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0C11.5523 0 12 0.447715 12 1V3C12 3.55228 11.5523 4 11 4C10.4477 4 10 3.55228 10 3V1C10 0.447715 10.4477 0 11 0ZM11 18C11.5523 18 12 18.4477 12 19V21C12 21.5523 11.5523 22 11 22C10.4477 22 10 21.5523 10 21V19C10 18.4477 10.4477 18 11 18ZM22 11C22 11.5523 21.5523 12 21 12H19C18.4477 12 18 11.5523 18 11C18 10.4477 18.4477 10 19 10H21C21.5523 10 22 10.4477 22 11ZM3 12C3.55228 12 4 11.5523 4 11C4 10.4477 3.55228 10 3 10H1C0.447715 10 0 10.4477 0 11C0 11.5523 0.447715 12 1 12H3ZM17.6569 17.6569C18.0474 17.2663 18.0474 16.6332 17.6569 16.2426L16.2426 17.6569C16.6332 18.0474 17.2663 18.0474 17.6569 17.6569ZM5.75736 5.75736C6.14788 5.36683 6.14788 4.73367 5.75736 4.34315L4.34315 5.75736C4.73367 6.14788 5.36683 6.14788 5.75736 5.75736ZM17.6569 4.34315C18.0474 4.73367 18.0474 5.36683 17.6569 5.75736L16.2426 4.34315C16.6332 3.95262 17.2663 3.95262 17.6569 4.34315ZM5.75736 16.2426C6.14788 16.6332 6.14788 17.2663 5.75736 17.6569L4.34315 16.2426C4.73367 15.8521 5.36683 15.8521 5.75736 16.2426ZM11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" fill="#F7F7F7" />
							</svg>

						}
					</Button>
				</div>
			</div>
		</header>
	)
}