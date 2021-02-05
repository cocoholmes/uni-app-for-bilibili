<template>
	<view class="myContainer">
		<view class="unLogin">
			<image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" mode=""></image>
			<text v-else class="iconfont icon-qiatongtouxiang"></text>
			<view class='userInfo' @click='toLogin'>
				<text> {{userInfo.nickName?userInfo.nickName: '未登录'}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				userInfo: {
					
				},
			};
		},
		mounted(){
			// 获取用户基本信息
			wx.getUserInfo({
				success: (res) => {
					// console.log(res)
					this.userInfo = res.userInfo
				},
				fail: (err) => {
					console.log('获取用户信息失败')
				}
			})
			
			
			// 获取用户唯一标识openId
			
			// 1. 获取用户登录凭证code
			wx.login({
				success: async (res) => {
					let code = res.code
					// 2. 将code发请求发送给服务器端
					let token = await request('/getOpenId', {code})
					// 3. 将token存入至本地
					wx.setStorageSync('token', token)
				}
			})
		},
		methods: {
			toLogin(){
				if(this.userInfo.nickName){
					return
				}
				wx.navigateTo({
					url: '/pages/login/login'
				})
			}
		},
	}
</script>

<style lang="stylus">
.myContainer
	height 100%
	width 750rpx
	.unLogin
		width 100%
		height 260rpx
		margin 50rpx auto
		text-align center
		.iconfont
			font-size 150rpx
			color #808080
		image
			border-radius 50%
			width 150rpx
			height 150rpx
</style>
