import axios from "axios";
axios.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		const token = localStorage.getItem("thot.org.token");
		config.headers.Authorization = "Bearer " + token;
		return config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	function(response) {
		return response;
	},
	function(error) {
		if (401 === error.response.status || 422 === error.response.status) {
			window.location.href = "/login";
		} else {
			return Promise.reject(error);
		}
	}
);

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userEmail: null,
			hobby: [],
			folder: [{ folder: "tasks" }, { folder: "meetings" }],
			token: null,
			notes: null,
			thots: [],
			addDate: ""
		},
		actions: {
			addUser: user => {
				fetch(process.env.BACKEND_URL + "/api/user", {
					method: "POST",
					body: JSON.stringify({
						firstName: user.firstName,
						lastName: user.lastName,
						time_zone: user.time_zone,
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
						setStore({ errors: error.message || error });
						console.error("Error:", error);
						return true;
					});
			},

			initialize: () => {
				setStore({
					token: localStorage.getItem("thot.org.token"),
					errorMSG: localStorage.getItem("thot.org.errorMSG"),
					email: localStorage.getItem("thot.org.email")
				});
			},

			logging: (email, password) => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST", // or 'POST'
					body: JSON.stringify({
						email: email,
						password: password
					}), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => {
						if (res.status >= 200 && res.status < 300) {
							return res.json();
						} else {
							throw Error("invalid user name or password");
						}
					})
					.then(response => {
						console.log("Success:", response);
						localStorage.setItem("thot.org.token", response.access_token);
						localStorage.setItem("thot.org.email", email);
						localStorage.setItem("thot.org.errorMSG", response.msg);
						window.location.href = "/home";
						// getActions().getSingleUser();
					})

					// sends error to user and to console log
					.catch(error => {
						setStore({ errors: error.message || error });
						console.error("Error:", error.message);
						return true;
					});
			},

			logOut: () => {
				localStorage.setItem("thot.org.token", "something");
				localStorage.setItem("thot.org.email", "");
				window.location.href = "/login";
			},

			getAllTasks: (from, until, _null = true) => {
				console.log("NULLFLAGGGGG", _null);
				axios
					.get(
						process.env.BACKEND_URL +
							`/api/task?from=${from.format("YYYY/MM/DD")}&until=${until.format(
								"YYYY/MM/DD"
							)}&_null=${_null == true}`
					)

					.then(response => {
						setStore({ hobby: response.data });
						console.log(response);
					});
			},

			addNewTask: async (hobby, from, until, _null = true) => {
				const res = await fetch(
					process.env.BACKEND_URL +
						`/api/task?hobby=${hobby}&from=${from.format("YYYY/MM/DD")}&until=${until.format(
							"YYYY/MM/DD"
						)}&_null=${_null == true}`,
					{
						method: "POST",
						body: JSON.stringify({
							label: hobby.label,
							date: hobby.date,
							dashboard: hobby.dashboard,
							folder: hobby.folder
						}),
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + getStore().token
						}
					}
				);
				const task = await res.json();
				console.log("this is the TASKFLAGG!$: ", task);

				setStore({
					hobby: task
				});
				return task;
			},

			getUser: async () => {
				const res = await fetch(process.env.BACKEND_URL + "/api/single_user", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("thot.org.token")}`
					}
				});
				const response = await res.json();

				console.log("Success:", response);
				console.log("Success:", response.msg);
				console.log("Success:", response.time_zone);
				response.folders.push({ folder: "tasks" }, { folder: "meetings" });
				response.msg != "Not enough segments"
					? setStore({
							folder: response.folders,
							time_zone: response.time_zone
					  })
					: (window.location = "/login");

				// sends error to user and to console log
			},

			getNotes: async () => {
				const res = await fetch(process.env.BACKEND_URL + "/api/notes");
				const notes = await res.json();
				setStore({ notes: notes });
				return notes;
			},

			addNewThot: t => {
				let store = getStore();
				store.thots.push(t);
				setStore(store);
			},

			handleChangeThot: (id, task) => {
				let store = getStore();
				let newStore = store.thots.filter(todo => todo.id != id);
				newStore.push(task);
				setStore({ thot: newStore });
			},

			// addNewFolder: newFolder => {
			// 	const store = getStore();
			// 	const newStore = store.folder.push(newFolder);
			// 	setStore(newStore);
			// },

			addNewFolder: async newFolder => {
				const res = await fetch(process.env.BACKEND_URL + "/api/folder", {
					method: "POST",
					body: JSON.stringify({
						folder: newFolder
					}),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + getStore().token
					}
				});
				const folder = await res.json();
				console.log("this is the folderFLAGG!$: ", folder);
				const store = getStore();
				folder.push({ folder: "tasks" }, { folder: "meetings" });
				setStore({ folder: folder });
				return folder;
			},

			deleteFolder: folder_id => {
				fetch(process.env.BACKEND_URL + "/api/folder/" + folder_id, {
					method: "DELETE"
				})
					.then(response => {
						if (response.status >= 200 && response.status < 300) {
							const store = getStore();
							setStore({ folder: store.folder.filter(t => t.id != folder_id) });
						} else throw Error("there was a problem deleting the task");
					})
					.catch(error => {
						setStore({ errors: error });
						console.error("Error:", error);
						return true;
					});
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
				fetch(process.env.BACKEND_URL + "/api/task/" + todo, {
					method: "PUT",
					body: JSON.stringify({
						label: hobby.label,
						date: hobby.date,
						dashboard: hobby.dashboard,
						id: todo,
						folder: hobby.folder
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(() => {
						console.log(hobby);
						let store = getStore();
						let newStore = store.hobby.filter(hobby => hobby.id != todo);
						newStore.push(hobby);
						setStore({ hobby: newStore });
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
