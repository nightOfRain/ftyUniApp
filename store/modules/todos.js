const state = {
	"username":"lwj",
	"age":37,
	todos: [{
		id: 1,
		text: '我是内容1',
		done: true
	},
	{
		id: 2,
		text: '我是内容2',
		done: false
	}]
};

const mutations = {
	changeName(state, obj) {
		state.username = obj.name
	}
};

const actions = {
	changeNameAction (context, obj) {
		context.commit('changeName', obj)
	}
};
const getters = {
	doneTodos: state => {
		//return state.todos.filter(todo => todo.done)
		return state.todos
	},
	doneTodosCount: (state, getters) => {
		return getters.doneTodos.length
	},
	getTodoById: (state) => (id) => {
		return state.todos.find(todo => todo.id === id)
	}
};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}