const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			hobby: [],
			notes: null,
			addDate: ""
		},
		actions: {
			addUser: user => {
				fetch(process.env.BACKEND_URL + "/api/user", {
					method: "POST",
					body: JSON.stringify({
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						password: user.password
					}), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response => {
						console.log("Success:", response);
						setStore({
							user: response
						});
					})
					// sends error to user and to console log
					.catch(error => {
						setStore({ errors: error });
						console.error("Error:", error);
						return true;
					});
			},

			getAllTasks: (from, until) => {
				fetch(
					process.env.BACKEND_URL +
						`/api/task?from=${from.format("YYYY/MM/DD")}&until=${until.format("YYYY/MM/DD")}`
				)
					.then(response => response.json())
					.then(tasks => setStore({ hobby: tasks }));
			},

			getNotes: async () => {
				const res = await fetch(process.env.BACKEND_URL + "/api/notes");
				const notes = await res.json();
				setStore({ notes: notes });
				return notes;
			},

			addNewTask: async hobby => {
				const res = await fetch(process.env.BACKEND_URL + "/api/task", {
					method: "POST",
					body: JSON.stringify({
						label: hobby.label,
						date: hobby.date,
						completed: hobby.completed,
						priority: hobby.priority
					}),
					headers: {
						"Content-Type": "application/json"
					}
				});
				const task = await res.json();
				setStore({
					hobby: task
				});
				return task;
			},

			deleteHobby: task_id => {
				fetch(process.env.BACKEND_URL + "/api/task/" + task_id, {
					method: "DELETE"
				})
					.then(response => {
						if (response.status >= 200 && response.status < 300) {
							const store = getStore();
							setStore({ hobby: store.hobby.filter(t => t.id != task_id) });
						} else throw Error("there was a problem deleting the task");
					})
					.catch(error => {
						setStore({ errors: error });
						console.error("Error:", error);
						return true;
					});
			},

			handleChangeHobby: (todo, hobby) => {
				console.log("hobby!!!!:", hobby);
				fetch(process.env.BACKEND_URL + "/api/task/" + todo, {
					method: "PUT",
					body: JSON.stringify({
						label: hobby.label,
						date: hobby.date,
						completed: hobby.completed,
						priority: hobby.priority
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(() => {
						getActions().getAllTasks();
					})
					.catch(error => {
						setStore({ errors: error });
						console.error("Error:", error);
						return true;
					});
			},

			handleChangeNotes: notes => {
				fetch(process.env.BACKEND_URL + "/api/notes/1", {
					method: "PUT",
					body: JSON.stringify({
						notes: notes
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(() => {
						getActions().getNotes();
					})
					.catch(error => {
						setStore({ errors: error });
						console.error("Error:", error);
						return true;
					});
			},

			todaysDate: () => {
				var d = new Date();
				let month = "" + (d.getMonth() + 1);
				let day = "" + d.getDate();
				let year = d.getFullYear();
				if (month.length < 2) month = "0" + month;
				if (day.length < 2) day = "0" + day;
				return [month, day, year].join("-");
			},

			// SAVING BELOW JUST INCASE // no relevant code beyond this point

			// handleChangeHobby: (e, i) => {
			// 	let tempStore = getStore();
			// 	const newTodos = tempStore.hobby.map((t, ind) => {
			// 		if (ind === i) {
			// 			t.name = e.target.value;
			// 		}
			// 		return t;
			// 	});
			// 	setStore({ hobby: newTodos });
			// },

			//  IGNORE BELOW THIS LINE

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
