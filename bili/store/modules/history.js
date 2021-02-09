import request from '../../utils/request.js'

const state = {
	cartoonList:[]
}

const mutations = {
	FANJUORHISTORY(state,data){
		state.cartoonList = data 
	}
}

const actions = {
	async getFanjuOrHistory({commit}){
		let result = await request('/getCartoonData')
		commit('FANJUORHISTORY',result.data.list)
	}
}

const getters ={
	
}

export default {
	state,
	mutations,
	actions,
	getters
}