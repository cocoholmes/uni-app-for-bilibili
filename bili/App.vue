<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onShareAppMessage() {
			  return{
			    title:"这是自定义的内容",
			    path:'这是转发的路径',
			    imageUrl:'这是转发的路径'
			  }
		}
	}
</script>

<style lang="stylus">
	/*每个页面公共css */
@import url('/static/iconfont/iconfont.styl')
	page 
		height 100% 
</style>
