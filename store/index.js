import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)
	
	console.log("modules:"+JSON.stringify(value))
	modules[moduleName] = value.default
	
	return modules
}, {})

const store = new Vuex.Store({
	modules,
//	todos,
//	getters
})

export default store

/*
const store = new Vuex.Store({
	state: {
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
	},
	getters: {
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
	},
	mutations: {
		changeName(state, obj) {
			state.username = obj.name
		}
	},
	actions: {
		changeNameAction (context, obj) {
			context.commit('changeName', obj)
		}
	}
})

export default store

*/