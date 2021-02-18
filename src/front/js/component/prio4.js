import "../../styles/home.scss";
import React, { useState, setStore } from "react";
// import { Link } from "react-router-dom";
// import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { TodoInfoModal } from "./todoInfoModal";

export class Prio4 extends React.Component {
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
					<div className="container text-center">
						{Array.isArray(store.hobby) &&
							store.hobby.sort((a, b) => a.priority - b.priority).map((todo, index) => (
								<div key={todo.id}>
									{todo.priority === 4 && (
										<div
											className={
												todo.priority === 1
													? "d-flex justify-content-around mx-auto col-lg-10 mb-5 activeTodoDiv"
													: "d-flex justify-content-around mx-auto col-lg-8"
											}>
											<div className="inputAndTextArea d-flex col-10 mr-4">
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
													className={
														todo.priority === 1
															? "pl-2 col-12 mt-1 ml-1 activeTodo onfucus activeTodoDiv"
															: "pl-2 col-12 mt-1 ml-1 activeTodo onfucus"
													}
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
											</div>
											<span className="deleteX text-center mt-3 col-1">
												<i className="fas fa-info-circle" />
											</span>
											<span
												onClick={() => actions.deleteHobby(todo.id)}
												className="deleteX text-center mt-3 col-1">
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

Prio4.contextType = Context;
