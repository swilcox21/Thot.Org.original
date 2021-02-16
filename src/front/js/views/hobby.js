import "../../styles/home.scss";
import React, { useState, setStore } from "react";
// import { Link } from "react-router-dom";
// import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { TodoInfoModal } from "../component/todoInfoModal";

export class Hobby extends React.Component {
	constructor() {
		super();
		this.state = {
			showTodoIndex: false,
			hobby: [],
			todo: "",
			color: "black",
			priority: [1, 2, 3, 4],
			task: {}
		};
	}

	handleshowTodoIndex = index => this.setState({ showTodoIndex: index });

	addToHobby = todo => {
		this.setState({
			hobby: [...this.state.hobby, todo]
		});
	};

	componentDidMount() {
		// let value = this.context;
		// this.context.store.hobby && this.setState({ hobby: this.context.store.hobby });
		this.context.actions.getAllTasks();
		this.context.actions.getNotes();
		this.context.store.hobby &&
			this.context.store.hobby != this.state.hobby &&
			this.setState({ hobby: this.context.store.hobby });
	}

	componentDidUpdate() {
		this.context.store.hobby &&
			this.context.store.hobby != this.state.hobby &&
			this.setState({ hobby: this.context.store.hobby });
	}

	handleChange = e => {
		this.setState({
			todo: e.target.value
		});
	};

	handleChangeNotes = e => {
		this.setState({
			notes: e.target.value
		});
	};

	resetTextArea = () => {
		this.setState({ todo: "" });
	};

	resetTask = () => {
		this.setState({ task: {} });
	};

	// handleSetDone = (t, i) => {
	// 	this.setState(
	// 		this.state.hobby.map((td, ind) => {
	// 			if ((ind === i, this.state.color === "black")) {
	// 				this.setState({ color: "grey" });
	// 			} else if ((ind === i, this.state.color === "grey")) {
	// 				this.setState({ color: "black" });
	// 			}
	// 		})
	// 	);
	// };

	// handleSetDone = () => {
	// 	let completed = this.state.hobby.completed;
	// 	setState({ completed: !completed });
	// };

	handleComplete = () => {
		if (this.state.hobby.complete === false) {
			return "pl-2 col-10 mt-1 activeTodo";
		} else {
			return "pl-2 col-10 mt-1 activeTodo done done2";
		}
	};

	render() {
		return (
			<Context.Consumer>
				{({ actions, store }) => (
					<div className="container text-center">
						<div className="mt-5">
							<TodoInfoModal
								show={this.state.showTodoIndex}
								onClose={() => this.setState({ showTodoIndex: false })}
							/>
						</div>
						{store.hobby &&
							store.hobby.sort((a, b) => a.priority - b.priority).map((todo, index) => (
								// console.log(todo);
								<div key={todo.id}>
									<div className="d-flex justify-content-around mx-auto col-lg-6">
										<span
											onClick={e => {
												this.setState({
													task: {
														label: todo.label,
														date: todo.date,
														completed: !this.state.task.completed,
														priority: todo.priority
													}
												});
												actions.handleChangeHobby(todo.id, this.state.task);
											}}
											className="deleteX text-center mt-2 col-1">
											<i
												className={
													todo.completed === true
														? "fas fa-check"
														: (todo.completed === false) & (todo.label == "")
															? "grey fas fa-minus "
															: "fas fa-minus blackkkk"
												}
											/>
										</span>
										<textarea
											className={
												todo.completed === false
													? "pl-2 col-10 mt-1 ml-1 activeTodo onfucus"
													: "pl-2 col-10 mt-1 ml-1 activeTodo onfucus done done2"
											}
											type="text"
											defaultValue={todo.label}
											placeholder="dont leave me blank!"
											onBlur={() => {
												actions.handleChangeHobby(todo.id, this.state.task);
												this.resetTask();
											}}
											onChange={e => {
												todo.id === todo.id
													? this.setState({
															task: {
																label: e.target.value,
																date: todo.date,
																completed: todo.completed,
																priority: todo.priority
															}
													  })
													: null;
											}}
										/>
										<input
											className="inputTypeNumber text-center"
											type="number"
											min="1"
											max="4"
											defaultValue={todo.priority}
											onChange={e => {
												this.setState({
													task: {
														label: todo.label,
														date: todo.date,
														completed: todo.completed,
														priority: e.target.value
													}
												});
											}}
											onBlur={() => {
												actions.handleChangeHobby(todo.id, this.state.task);
												this.resetTask();
											}}
										/>
										<span
											onClick={() => this.handleshowTodoIndex(index)}
											className="deleteX text-center mt-3 col-1">
											<i className="fas fa-info-circle" />
										</span>
										<span
											onClick={() => actions.deleteHobby(todo.id)}
											className="deleteX text-center mt-3 col-1">
											<i className="fab fa-xing" />
										</span>
									</div>
								</div>
							))}
						<textarea
							className="pt-4 pl-2 mt-3 col-md-6 text-center"
							placeholder="Stop being lazy and JUST DO IT!"
							type="text"
							value={this.state.todo}
							onChange={e => this.handleChange(e)}
						/>
						<div className="mb-3 mt-2">
							<button
								onClick={() => {
									let todo = {
										label: this.state.todo,
										date: actions.todaysDate(),
										completed: false,
										priority: 2
									};
									console.log("thisis todo:", todo);
									this.addToHobby(todo);
									actions.addNewTask(todo);
									this.resetTextArea();
								}}>
								SUBMIT
							</button>
						</div>
						<textarea
							className="pt-2 pl-2 col-md-6 notes"
							placeholder="NOTES"
							type="text"
							defaultValue={store.cNotes && store.cNotes[0].notes}
							onChange={e => this.handleChangeNotes(e)}
							onFocus={e => this.handleChangeNotes(e)}
							onBlur={() => actions.handleChangeNotes(this.state.notes)}
						/>
					</div>
				)}
			</Context.Consumer>
		);
	}
}

Hobby.contextType = Context;
