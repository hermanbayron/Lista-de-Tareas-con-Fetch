import React, { useState, useEffect } from "react";

const Home = () => {
	//declaracion de estados

	const [tarea, setTarea] = useState("");
	const [listaDeTareas, setListaDeTareas] = useState([]);

	// OnKeyDown
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			setListaDeTareas([...listaDeTareas, { label: tarea, done: false }]);
			setTarea("");
			modificarTarea([...listaDeTareas, { label: tarea, done: false }]);
			console.log(listaDeTareas);
		}
	};

	const eliminarTarea = (i) => {
		const tareaFiltrada = listaDeTareas.filter((tarea, index) => {
			if (i !== index) {
				return tarea
			}
		});
		setListaDeTareas(tareaFiltrada);
		modificarTarea(tareaFiltrada);
	};

	// PUT
	const modificarTarea = async () => {// async/await
		const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/hermanbayron', {
			method: "PUT",
			body: JSON.stringify([...listaDeTareas, { label: tarea, done: false }]),
			headers: {
				'Content-Type': "application/json"
			}
		})
		const data = await response.json();
		console.log(data);
	}

	// useEffect
	// console.log(listaDeTareas);
	useEffect(() => {
		// GET
		fetch('https://assets.breatheco.de/apis/fake/todos/user/hermanbayron')
			.then((response) => response.json())//me convierte la respuesta en json
			.then((data) => setListaDeTareas(data))//guarda la info json en un objeto
			.catch((err) => console.log(err))//me avisa si algo salió mal
	}, [])
	// console.log(listaDeTareas);

	return (
		<div className="container bg-primary bg-opacity-10 m-3">
			<div className="card bg-primary bg-opacity-25">
				<div className="card-body">
					<h1 className="card-title d-flex justify-content-center fw-lighter opacity-50">Todos</h1>
					<form className="container">
						<div className="mb-3">
							<input
								type="text"
								className="form-control inputt"
								id="exampleInputTarea"
								aria-describedby="emailHelp"
								onChange={(e) => setTarea(e.target.value)}
								onKeyDown={handleKeyDown}
								value={tarea}
							/>
						</div>
					</form>
				</div>
				<div className="card">
					<ul className="list-group list-group-flush">
					{listaDeTareas.length > 0 ? listaDeTareas.map((tarea, i) => {
							return (<li className="list-group-item border border-1 tareaOculta"
								key={i}>{tarea.label}<span className="close btn btn-danger" onClick={() => eliminarTarea(i)}><b>X</b></span></li>);
						}): null }
					</ul>
					<div className="p-1 fw-lighter bg-primary bg-opacity-25"> {listaDeTareas.length == 0 ? "No hay tareas, añade una" : "Numero de tareas: " + listaDeTareas.length}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
