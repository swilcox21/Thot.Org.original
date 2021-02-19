import "../../styles/home.scss";
import React, { useState, setStore } from "react";
// import { Link } from "react-router-dom";
// import Clock from "../component/clock";
import { Context } from "../store/appContext";
import { TodoInfoModal } from "../component/todoInfoModal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import ReactDatePicker from "react-datepicker";

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

	CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<a
			href=""
			ref={ref}
			onClick={e => {
				e.preventDefault();
				onClick(e);
			}}>
			{children}
			&#x25bc;
		</a>
	));

	CustomMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
		const [value, setValue] = useState("");

		return (
			<div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
				<FormControl
					autoFocus
					className="mx-3 my-2 w-auto"
					placeholder="Type to filter..."
					onChange={e => setValue(e.target.value)}
					value={value}
				/>
				<ul className="list-unstyled">
					{React.Children.toArray(children).filter(
						child => !value || child.props.children.toLowerCase().startsWith(value)
					)}
				</ul>
			</div>
		);
	});

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
											<Dropdown className="mt-4 ml-3">
												<Dropdown.Toggle as={this.CustomToggle} id="dropdown-custom-components">
													<button className="dropdowntoggle">
														<i className="fas fa-list" />
													</button>
												</Dropdown.Toggle>
												<Dropdown.Menu className="mt-1">
													<Dropdown.Item eventKey="1">Red</Dropdown.Item>
													<Dropdown.Item eventKey="2">Blue</Dropdown.Item>
													<Dropdown.Divider />
													<Dropdown.Item eventKey="3">
														<span
															onClick={() => actions.deleteHobby(todo.id)}
															className="deleteX text-center mt-3 col-1">
															&nbsp; &nbsp; &nbsp; <i className="fab fa-xing" />
														</span>
													</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
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
