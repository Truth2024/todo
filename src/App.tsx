import React from "react";
import { Header } from './components/Header/Header'
import { TaskList } from "./components/Main/TaskList";
import "./styles/main.scss";

const App: React.FC = () => {
	return (
		<div >
			<Header />
			
			<TaskList />
		</div>
	);
};

export default App;