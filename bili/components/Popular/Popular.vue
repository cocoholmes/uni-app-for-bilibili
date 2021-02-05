<template>
	<view class="popularContainer">
		<scroll-view scroll-y="true" enable-flex class="videoScorll">
			<view class="videoContainer" v-for="(videoItem,index) in videoInfo" :key="videoItem.aid">
				<view class="video">
					<image class="poster" :src="videoItem.pic" mode=""></image>
					<text >{{ videoItem.duration | formatDuration}}</text>
				</view>
				<view class="videoDesc">
					<view class="videoTitle">
						<text>{{videoItem.title}}</text>
					</view>
					<view class="reason">
						<text>{{videoItem.rcmd_reason.content}}</text>
					</view>
					<view class="up">
						<text class="iconfont icon-UPzhu"></text>
						<text>{{videoItem.owner.name}}</text>
					</view>
					<view class="playInfo">
						<text class="iconfont icon-bofangshu"></text>
						<text>{{videoItem.stat.view | formatNumber}}</text>
						<text class="iconfont icon-pinglun"></text>
						<text>{{videoItem.stat.reply}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		name: '',
		data(){
			return{
				videoInfo:[],
			}
		},
		mounted(){
			this.getPopularData()
		},
		methods:{
			async getPopularData(){
				let result = await request('/getPopularData')
				// console.log('result',result)
				this.videoInfo = result.data.list 
				console.log(this.videoInfo)
			}
		},
		
		// 使用过滤器 管道符 手写算法 实现播放时长 和 播放量的格式化
		filters: {
			formatDuration: function(time) {
				//计算分钟
				//算法：将秒数除以60，然后下舍入，既得到分钟数
				let m =   Math.floor(time/60);
				
				//计算秒
				//算法：取得秒%60的余数，既得到秒数
				let s  =  time%60;
				//将变量转换为字符串
				m    +=    '';
				s    +=    '';
				//如果只有一位数，前面增加一个0
				m  =   (m.length==1)?'0'+m:m;
				s  =   (s.length==1)?'0'+s:s;
				return m+':'+s;
			},
			formatNumber:(number)=>{
				// 计算数字到万
				let wan = Math.floor(number/10000);
				let remainder = number%10000;
				wan += '';
				remainder += '';
				let last = remainder.slice(0,1);
				return wan + '.' + last + '万'
			}

		},

	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.popularContainer
	width 750rpx
	.videoScorll
		height calc(100vh - 87rpx)
		display flex
		flex-direction column
		.videoContainer
			display flex
			padding 0 16rpx
			height 260rpx
			width 750rpx
			justify-content row
			align-items center
			border-top 2rpx solid #e7e7e7
			.video
				width 40%
				position relative
				height 260rpx
				.poster
					margin 15rpx 0
					height 230rpx
					width 100%
					border-radius 10rpx
				text
					position absolute
					bottom 20rpx
					right 5rpx
					color: #e7e7e7;
					background-color: #333333;
					border-radius: 10rpx;
					font-size: 22rpx;
			.videoDesc
				position relative
				height 260rpx
				width 60%
				margin-left 10rpx
				.videoTitle
					position absolute
					top 15rpx
					font-size: 28rpx;
					display: block;
				    text-overflow: ellipsis;
				    display: -webkit-box;
				    -webkit-line-clamp: 2;
				    -webkit-box-orient: vertical;
				.reason
					position absolute
					top 130rpx
					color #fb9e60
					font-size 24rpx
					border 1rpx solid #fb9e60
				.up
					position absolute
					top 164rpx
					color #a1a1a1
					font-size 28rpx
				.playInfo
					position absolute
					top 200rpx
					color #a1a1a1
					font-size 28rpx
					text:nth-of-type(3)
						margin-left 45rpx
				
				
</style>
