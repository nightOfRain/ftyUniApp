const state = {
	systemInfo:{

	}
};

const mutations = {
	updateSystemInfo(state, obj) {
		console.log("mutations updateSystemInfo:"+JSON.stringify(obj))
		state.systemInfo = obj
	}
};

const actions = {
	updateSystemInfoAction (context, obj) {
		context.commit('updateSystemInfo', obj)
	}
};
const getters = {
	getSystemInfo: state => {
		//return state.todos.filter(todo => todo.done)
		return state.systemInfo
	}
};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}