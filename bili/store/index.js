import Vue from 'vue'
import Vuex from 'vuex'
import history from './modules/history.js'


Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		history
	}
})

export default store