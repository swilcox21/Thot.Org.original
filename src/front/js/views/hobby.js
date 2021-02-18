import "../../styles/home.scss";
import React, { useState, setStore } from "react";
// import { Link } from "react-router-dom";
// import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { TodoInfoModal } from "../component/todoInfoModal";
import { Prio1 } from "../component/prio1";
import { Prio2 } from "../component/prio2";
import { Prio3 } from "../component/prio3";
import { Prio4 } from "../component/prio4";
import { Prio5 } from "../component/prio5";

export class Hobby extends React.Component {
	constructor() {
		super();
		this.state = {
			showTodoIndex: false,
			hobby: [],
			delta: 0,
			status: {
				color: "success",
				message: ""
			},
			todo: "",
			color: "black",
			priority: 2,
			task: null
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
		// this.context.store.hobby &&
		// 	this.context.store.hobby != this.state.hobby &&
		// 	this.setState({ hobby: this.context.store.hobby });
	}

	// componentDidUpdate() {
	// 	this.context.store.hobby &&
	// 		this.context.store.hobby != this.state.hobby &&
	// 		this.setState({ hobby: this.context.store.hobby });
	// }

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
		this.setState({ task: null });
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
						<Prio1 />
						<textarea
							className="pt-4 pl-2 mt-3 col-lg-6 text-center"
							placeholder="Stop being lazy and JUST DO IT!"
							type="text"
							defaultValue={this.state.task}
							onChange={e => this.handleChange(e)}
						/>
						{this.state.status.message !== "" && (
							<div className={`alert alert-${this.state.status.color}`}>{this.state.status.message}</div>
						)}
						<div className="mb-3 mt-2 d-flex justify-content-center">
							<input
								defaultValue={this.state.priority}
								onChange={e => {
									this.setState({ priority: e.target.value });
								}}
								className="inputTypeNumber text-center mr-2"
								type="number"
								min="1"
								max="5"
							/>
							<button
								onClick={() => {
									let todo = {
										label: this.state.todo,
										date: actions.todaysDate(),
										completed: false,
										priority: this.state.priority
									};
									actions
										.addNewTask(todo)
										.then(() => {
											this.resetTextArea();
										})
										.catch(error => {
											this.setState({ status: { color: "danger", message: error.message } });
										});
								}}>
								SUBMIT
							</button>
							<span className="ml-2 chooseDate">
								<i className="far fa-calendar-alt" />
							</span>
						</div>
						<Prio2 />
						<Prio3 />
						<Prio4 />
						<Prio5 />
						<textarea
							className="pt-2 pl-2 col-lg-6 notes"
							placeholder="NOTES"
							type="text"
							defaultValue={store.notes && store.notes[0].notes}
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
