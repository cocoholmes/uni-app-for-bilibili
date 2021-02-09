<template>
	<view class="v-container">
		
	
		<view class="main">
			<video class="video" id="myVideo" @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls src="http://vodkgeyttp9.vod.126.net/vodkgeyttp8/o8GrSil0_24029854_shd.mp4?ts=1612586132&rid=B20D7F8474DECBF19F10C33E018227E8&rl=3&rs=SMwPfQvXYKSzfacntGijViZFwyXYxCpJ&sign=15551f8a4224b02c5019664f7bda164e&ext=LCtRhLsaUNgIEkZeiG4AuCm4C%2FThBMuVQpyhdn3bH6plRDmrZTIr8DF%2BMtV7mSedroGf7YBi0n0zYCPO%2BT99EZD9FsuSd76P%2FMEN6AIjdJcV7s6SvBm4rU8VtL2FJJvHSwOQpPlssmEdZuJSoJQR74MnPSsUmoitL%2BYVVZlGmyy1BoLR1gD0YhQixaS2M2wJOpZjcjYAScfH8ksVhTAi0jACbS7gguiGNMm%2B3mURA7VQXhAk5SUNjREK62RZjKz4"></video>
		</view>
		<view class="videoDesc">
			<text v-if="videoItem.desc">视频简介{{videoItem.desc}}</text>
		</view>
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				videoItem: {},
				title: 'video',
				src: '',
				inputValue: '',
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				]
			};
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		onLoad(options) {
			console.log(options)
			this.videoItem = JSON.parse(options.videoItem)
		},
		methods: {
			bindInputBlur: function(e) {
				this.inputValue = e.target.value
			},
			bindButtonTap: function() {
				var that = this
				uni.chooseVideo({
					sourceType: ['album', 'camera'],
					maxDuration: 60,
					camera: ['front', 'back'],
					success: function(res) {
						this.src = res.tempFilePath
					}
				})
			},
			bindSendDanmu: function() {
				this.videoContext.sendDanmu({
					text: this.inputValue,
					color: this.getRandomColor()
				})
			},
			videoErrorCallback: function(e) {
				console.log('视频错误信息:')
				console.log(e.target.errMsg)
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			}
		}

	}
</script>

<style lang="stylus">
	.main
		display flex
		flex-direction column
		align-items center
		height 100%
		.video
			margin-top 20rpx
			border-radius 15rpx
			width 95%
			height 500rpx
		.videoDesc 
			font-size 22rpx
			margin-top 50rpx
			margin-left -40rpx
			color #333
</style>
