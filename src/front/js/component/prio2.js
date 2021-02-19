import "../../styles/home.scss";
import React, { useState, setStore } from "react";
// import { Link } from "react-router-dom";
// import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { TodoInfoModal } from "../component/todoInfoModal";

export class Prio2 extends React.Component {
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

	render() {
		return (
			<Context.Consumer>
				{({ actions, store }) => (
					<div className="container">
						{Array.isArray(store.hobby) &&
							store.hobby.sort((a, b) => a.priority - b.priority).map((todo, index) => (
								<div key={todo.id}>
									{todo.priority === 2 && (
										<div className="d-flex justify-content-between">
											<input
												className="inputTypeNumber text-center"
												type="number"
												min="1"
												max="5"
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
													this.state.task &&
														actions.handleChangeHobby(todo.id, this.state.task);
													this.resetTask();
												}}
											/>
											<textarea
												className="pl-2 col-10 mt-1 ml-1 activeTodo onfucus"
												type="text"
												defaultValue={todo.label}
												placeholder="dont leave me blank!"
												onChange={e => {
													this.setState({
														task: {
															label: e.target.value,
															date: todo.date,
															completed: todo.completed,
															priority: todo.priority
														}
													});
												}}
												onBlur={() => {
													if (this.state.task)
														actions.handleChangeHobby(todo.id, this.state.task);
													this.resetTask();
												}}
											/>
											<span
												onClick={() => actions.deleteHobby(todo.id)}
												className="deleteX mt-3 text-center">
												<i className="fab fa-xing" />
											</span>
										</div>
									)}
								</div>
							))}
					</div>
				)}
			</Context.Consumer>
		);
	}
}

Prio2.contextType = Context;
