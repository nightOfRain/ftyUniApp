const state = {
	userinfo:{
		loginStat : false,
		userId : '',
		deptId : '',
		deptName : '',
		nickName:'',
		avatarUrl:'',
	}
};

const mutations = {
	updateUserinfo(state, obj) {
		
		state.userinfo = obj
	},
	updateLoginStat(state, loginStat){
		state.userinfo.loginStat = loginStat;
		
	}
};

const actions = {
	updateUserinfoAction (context, obj) {
		context.commit('updateUserinfo', obj)
	}
};
const getters = {
	getUserinfo: state => {
		//return state.todos.filter(todo => todo.done)
		return state.userinfo
	},
	getLoginStat: state =>{
		return state.userinfo.loginStat
	}
};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}