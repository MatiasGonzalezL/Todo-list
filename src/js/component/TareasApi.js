import React, { useState, useEffect } from "react";
import TodoForm from "./Form";
import Todo from "./Todolist";
import "../../styles/index.css";

function TodoList() {
	const [todos, setTodos] = useState([]);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/magonzalez";

	//Borrar la lista

	async function startUserAPI(address) {
		let resp = await fetch(address, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});
		resp = await resp.json();
		let secondResp = await fetch(address, {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" },
		});
		secondResp = await secondResp.json();
	}

	useEffect(() => {
		/* startUserAPI(
			"https://assets.breatheco.de/apis/fake/todos/user/magonzalez"
		); */
		fetch("https://assets.breatheco.de/apis/fake/todos/user/magonzalez")
			.then((respuesta) => respuesta.json())
			.then((respuesta) => {
				setTodos(respuesta);
				console.log(respuesta);
				console.log("Aquí");
			})
			.catch((error) => console.log("Ocurrió un error...", error));
	}, []);

	//Poner la lista en la API
	//Actualizar lista API

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify(todos);
	var requestOptions = {
		method: "PUT",
		headers: ("Context-Type", "application/json"),
		body: raw,
		redirect: "follow",
	};

	fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/magonzalez",
		requestOptions
	)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));

	/* const addTodo = (todo) => {
		if (!todo.label) {
			return;
		}
		//const newTodos = [todo, ...todos];

		//setTodos(newTodos);

		/* updateTasksAPI(newTodos); */
	function agregarTareas(todo) {
		setTodos([...todos, { label: todo, done: false }]);
		console.log(todos);
	}

	const removeTodo = (id) => {
		const removeArr = [...todos].filter((todo) => todo.id !== id);
		setTodos(removeArr);
		updateTasksAPI(removeArr);
	};

	const completeTodo = (id) => {
		let updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}
			return todo;
		});
		setTodos(updatedTodos);
		updateTasksAPI(updatedTodos);
	};

	const leftItems = todos.length === 0 || todos.length > 1 ? "items" : "item";

	return (
		<div className="Listadetareas">
			<h1>Lista de tareas</h1>
			<TodoForm id="todoform" onSubmit={agregarTareas} />
			<Todo
				todos={todos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
			/>
			<p className="left-items">{`Hay ${todos.length} ${leftItems} por hacer`}</p>
		</div>
	);
}

export default TodoList;
