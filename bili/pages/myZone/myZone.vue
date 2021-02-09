<template>
	<view class="myContainer">
		<view class="unLogin" >
			<image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" mode=""></image>
			<text v-else class="iconfont icon-qiatongtouxiang"></text>
			<view class='userInfo' @click='toLogin' >
				<text> {{userInfo.nickName?userInfo.nickName: '请点击去登录'}}</text>
			</view>
		</view>
		
		<!-- 历史记录 -->
		<view class="historyContent">
			<view class="historyTitle">
				<text>历史记录</text>
				<text>滑动查看更多</text>
			</view>
			<scroll-view class="historyInfo" enable-flex scroll-x>
			  <view class="scrollItem" v-for="(historyItem,index) in historyList" :key='season_id'>
				<image :src="historyItem.cover"></image>
				<text>{{historyItem.title}}</text>
			  </view>
			</scroll-view>
		</view>
		
		<!-- 意见反馈 -->
		<view class="feedback">
			<text>意见反馈</text>
			<text> >>> </text>
		</view>
		
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	import {mapState} from 'vuex'
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
			
			// 获取历史记录信息(仅仅作为历史记录数据)
				this.$store.dispatch('getFanjuOrHistory')
		},
		computed:{
			...mapState({
				historyList:state=>state.history.cartoonList
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
	width 750rpx
	height 100%
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
		.userInfo
			text
				background-color #fb7299
				border-radius 30rpx
				padding 20rpx
				color #EEEEEE
				border 1rpx solid white
	.historyContent
		padding-left 15rpx
		width 750rpx
		height 320rpx
		border-top 1rpx solid #e7e7e7
		.historyTitle
			margin 0 15rpx
			display flex
			flex-direction row
			justify-content space-between
		.historyInfo
			display flex
			height 300rpx
			.scrollItem
				margin-right 10rpx
				height 260rpx
				width 200rpx
				image 
					width: 200rpx;
					height 230rpx
					border-radius: 20rpx
					background-size: cover;
				text
					font-size: 26rpx
					display: block 
					white-space: nowrap
					overflow: hidden
					text-overflow: ellipsis
	.feedback 
		display flex
		flex-direction row
		justify-content space-between
		align-items center
		width 750rpx
		height 100rpx
		margin-top 10rpx
		border-top 1rpx solid #e7e7e7
		border-bottom 1rpx solid #e7e7e7
</style>
