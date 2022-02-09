import { isEmpty } from "lodash";
import React, { useState } from "react";
import shortid from "shortid";

//create your first component
const Home = () => {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);

	const addTask = (e) => {
		e.preventDefault();
		if (isEmpty(task)) {
			console.log("Task empty");
			return;
		}
		const newTask = {
			id: shortid.generate(),
			name: task,
		};

		setTasks([...tasks, newTask]);

		setTask("");
	};

	const deleteTask = (id) => {
		const filteredTasks = tasks.filter((task) => task.id !== id);
		setTasks(filteredTasks);
	};

	return (
		<div className="container">
			<h1>Todo List</h1>
			<form className="encabezado" onSubmit={addTask}>
				<div className="cuadroTexto">
					<input
						type="text"
						className="inputText"
						placeholder="Agrega una tarea aquí"
						onChange={(text) => setTask(text.target.value)}
						value={task}
					/>
				</div>
			</form>
			{tasks.length == 0 ? (
				<h5> Aún no hay tareas añadidas</h5>
			) : (
				<ul className="linesHead">
					{tasks.map((task) => (
						<li className="lines" key={task.id}>
							<span className="tarea">{task.name}</span>
							<span
								className="button"
								onClick={() => deleteTask(task.id)}>
								X
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Home;
