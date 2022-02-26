import React, { useState } from "react";
import shortid from "shortid";

function TodoForm(props) {
	const [input, setInput] = useState(" ");
	const handleChanger = (e) => {
		setInput(e.target.value);
	};

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
		<form className="todo-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Add a todo"
				value={input}
				name="label"
				className="todo-input"
				onChange={handleChanger}
			/>
			<button className="todo-button">+</button>
		</form>
	);
}

export default TodoForm;
