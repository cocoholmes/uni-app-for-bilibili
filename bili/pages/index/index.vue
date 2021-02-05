<template>
	<view class="contentContainer">
		<!-- 头部 -->
		<view class="header">
			<view class="search">
				<text class="iconfont .icon-icon-plus-search"></text>
				<input type="text" value="" placeholder="请赢入" placeholder-class='placeholder'/>
			</view>
		</view>
			
		<!-- title 两个块级标题 -->
		<view class="title">
			<view class="title-pop " :class="{active:isShowPop}" @click='toCartoon(true)'>
				热门
			</view>
			<view class="title-cartoon" :class="{active:!isShowPop}" @click="toCartoon(false)">
				追番
			</view>
		</view>
		
		<!-- 内容区 -->
		<view class="main">
			<view class="popularContainer" v-if="isShowPop">
				<Popular></Popular>
			</view>
			<view class="cartoonContainer" v-else>
				<Cartoon></Cartoon>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	import Popular from '../../components/Popular/Popular.vue'
	import Cartoon from '../../components/Cartoon/Cartoon.vue'
	export default {
		components:{
			Popular,
			Cartoon
		},
		data() {
			return {
				isShowPop: true
			}
		},
		onLoad() {

		},
		methods: {
			toCartoon(isShowPop){
				this.isShowPop = isShowPop
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
.contentContainer
	width 750rpx
	height 100%
	.header
		display flex
		padding 15rpx 0
		width 100%
		.search
			margin 0 auto
			position relative
			width 700rpx
			height 75rpx
			background #f4f4f4
			border-radius 60rpx
			.iconfont
				position absolute
				top 18rpx
				left 10rpx
				font-size 36rpx
			input
				width 700rpx
				margin-left 50rpx
				height 75rpx
				.placeholder
					font-size 26rpx
	.title
		width 100%
		height 70rpx
		display flex
		justify-content space-around
		.title-pop
			text-align center
			width 70rpx
			height 50rpx
		.title-cartoon
			width 70rpx
			text-align center
			height 50rpx
		.active
				border-bottom 5rpx solid #fc7299
				color #fc7299
			
</style>