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
			notes: "",
			color: "black",
			task: {}
		};
	}

	handleshowTodoIndex = index => this.setState({ showTodoIndex: index });

	componentDidMount() {
		// let value = this.context;
		// console.log(value);
		// this.context.store.hobby && this.setState({ hobby: this.context.store.hobby });
		this.context.actions.getAllTasks();
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
							store.hobby.map((todo, index) => (
								// console.log(todo);
								<div key={todo.id}>
									<div className="d-flex justify-content-around mx-auto col-lg-6">
										<span
											onClick={e => {
												this.setState({
													task: {
														label: todo.label,
														tDate: todo.tDate,
														completed: !this.state.task.completed
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
											onBlur={() => actions.handleChangeHobby(todo.id, this.state.task)}
											onChange={e => {
												todo.id === todo.id
													? this.setState({
															task: {
																label: e.target.value,
																date: todo.date,
																completed: todo.completed
															}
													  })
													: null;
											}}
										/>
										<span
											onClick={() => this.handleshowTodoIndex(index)}
											className="deleteX text-center mt-2 col-1">
											<i className="fas fa-info-circle" />
										</span>
										<span
											onClick={() => actions.deleteHobby(todo.id)}
											className="deleteX text-center mt-2 col-1">
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
									console.log(actions.todaysDate());
									let todo = {
										label: this.state.todo,
										date: actions.todaysDate(),
										completed: false
									};
									console.log("thisis todo:", todo);
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
							value={this.state.notes}
							onChange={e => this.handleChangeNotes(e)}
						/>
					</div>
				)}
			</Context.Consumer>
		);
	}
}

Hobby.contextType = Context;
