import React, { useState, useEffect } from "react";
import shortid from "shortid";
import "../../styles/index.css";

//Component

const Home = () => {
	//useState y variables
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState([]);

	function getDatos() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/magonzalez")
			.then((respuesta) => respuesta.json())
			.then((respuesta) => setTodos(respuesta))
			.catch((error) => console.log("Un error ocurrió", error));
	}

	//fetch con variable en headers y raw

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify(todos);

	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/magonzalez",
		requestOptions
	)
		.then((respuesta) => respuesta.text())
		.then((resultado) => console.log(resultado))
		.catch((error) => console.log("error", error));

	function agregarTareas() {
		setTodos([...todos, { label: todo, done: false }]);
		console.log(todos);
	}

	function borrarTareas(item) {
		const listaNueva = todos.filter((key) => key !== item);
		setTodos(listaNueva);
		console.log(listaNueva);
	}

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/magonzalez")
			.then((respuesta) => respuesta.json())
			.then((respuesta) => {
				setTodos(respuesta);
				console.log(respuesta);
			})
			.catch((error) => console.log("Pasó un error", error));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		props.onSubmit({
			id: shortid.generate(),
			label: input,
			done: false,
		});
		setInput(" ");
	};

	return (
		<>
			<div className="Listadetareas">
				<h1>Lista de tareas</h1>
				<input
					type="text"
					placeholder="Agrega la tarea a la lista"
					onChange={(e) => setTodo(e.target.value)}
					value={todo.id}
				/>
				<button
					id="todoform"
					onSubmit={handleSubmit}
					onClick={() => {
						agregarTareas();
					}}>
					+
				</button>
				<p className="left-items">{`Hay ${todos.length} tarea(s) por hacer`}</p>
			</div>
			<div>
				{todos.map((item, index) => {
					return (
						<>
							<div key={index}>{item.label}</div>
							<div className="icon">
								<button
									onClick={() => borrarTareas(item)}
									className="delete-icon">
									X
								</button>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
};

export default Home;
