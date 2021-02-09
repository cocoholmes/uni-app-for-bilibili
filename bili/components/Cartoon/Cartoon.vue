<template>
	<view class="cartoonContainer">
		<scroll-view scroll-y="true" class="scrollView" >
			<view class="fanju">
				<view class="mainContainer" v-for="(seasonInfo,index) in timeCate" :key="seasonInfo.date_ts">
						<view class="season" v-for="(seasonItem,index) in seasonInfo.seasons" :key='seasonItem.season_id'>
								<image :src='seasonItem.square_cover' mode=""></image>
								<text>{{seasonItem.title}}</text>
								<text>最新话:{{seasonItem.pub_index}}</text>
						</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	import {mapState} from 'vuex'
	export default {
		name: '',
		data(){
			return{
				timeCate:[],
			}
		},
		mounted(){
			this.getTimeline()
		},
		methods:{
			async getTimeline(){
				const result = await request('/getTimeline')
				this.timeCate = result.data
				console.log(result.data)
			}
		},
		computed:{
			...mapState({
				cartoonList:state=>state.history.cartoonList
			})
		},


	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartoonContainer 
	.scrollView
		height calc(100vh - 87rpx)
		.fanju 
			.mainContainer
				display flex
				flex-direction row
				flex-wrap wrap
				justify-content space-around
				.season
					height 330rpx
					width 40%
					display flex
					flex-direction column
					justify-content space-evenly
					align-items center
					image
						width 150rpx
						height 200rpx
						margin 15rpx
						border-radius 10rpx
					text
						font-size: 22rpx
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					text:nth-of-type(2)
						color red
				
</style>
