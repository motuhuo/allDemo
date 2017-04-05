<template>
  <transition name="move">
  	<div v-show="showFlag" class="food" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="">
					<div class="back" @click="back">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<div class="buy" v-show="!food.count || food.count===0" @click="addFirst">加入购物车</div>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :desc="desc" :ratings="food.ratings" @changeType="getType" @contentType="contentChange"></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length > 0">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
								<div class="user">
									<span class="name">
										{{rating.username}}
									</span>
									<img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
								</div>
								<div class="time">
									{{rating.rateTime}}
								</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}">
										{{rating.text}}
									</span>
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || food.ratings.length === 0">没有评价</div>
					</div>
				</div>
			</div>
	  </div>
  </transition>
</template>
<script type="ecmascript-6">
import BScroll from 'better-scroll'
import Vue from 'vue'
import {formatDate} from '@/common/js/date'
import cartcontrol from '@/components/cartControl/cartControl'
import split from '@/components/split/split'
import ratingselect from '@/components/ratingselect/ratingselect'
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
	data () {
		return {
			showFlag: false,
			selectType: ALL,
			onlyContent: true,
			desc: {
				all: '全部',
				positive: '推荐',
				negative: '吐槽'
			}
		}
	},
  props: {
  	food: {
  		type: Object
  	}
  },
  methods: {
  	show () {
  		this.showFlag = true;
  		this.selectType = ALL;
			this.onlyContent = false;
  		this.$nextTick(() => {
  			if (!this.scroll) {
  				this.scroll = new BScroll(this.$refs.food,{
  					click: true
  				})
  			} else {
  				this.scroll.refresh()
  			}
  		})
  	},
  	back () {
  		this.showFlag = false;
  	},
  	addFirst (event) {
  		if (!event._constructed) {
  			return;
  		};
  		Vue.set(this.food,'count',1)
  	},
  	needShow (type,text) {
  		if (this.onlyContent && !text) {
  			return false;
  		}
  		if (this.selectType === ALL) {
  			return true;
  		} else {
  			return type === this.selectType;
  		}
  	},
		getType (type) {
			this.selectType = type;
			this.$nextTick(() => {
				this.scroll.refresh();
			})
		},
		contentChange (type) {
			this.onlyContent = type;
			this.$nextTick(() => {
				this.scroll.refresh();
			})
		}  	
  },
  components: {
  	cartcontrol,
  	split,
  	ratingselect
  },
  filter: {
  	formatDate2 (time) {
  		let date = new Date (time);
  		alert('12');
  		return formatDate (date, 'yyyy-MM-dd hh-mm');
  	}
  }
}
</script>
<style lang="stylus" rel="stylesheet">
.food
	position:fixed
	left:0
	top:0
	bottom:48px
	z-index:30
	width:100%
	background:#fff
	transition: all 0.2s linear
	&.move-enter, &.move-leave-active
		transform:translate3d(100%,0,0)
	.image-header
		position:relative
		width:100%
		height:0
		padding-top:100%
		img
			position:absolute
			top:0
			left:0
			width:100%
			height:100%
		.back
			position:absolute
			top:10px
			left:0
			.icon-arrow_lift
				color:#fff
				display:block
				padding:10px
				font-size:20px
	.content
		padding:18px
		position:relative
		.title
			line-height:14px
			margin-bottom:8px
			font-size:14px
			font-weight:700
			color:rgb(7,17,27)
		.detail
			margin-bottom:18px
			line-height:10px
			font-size:0
			.sell-count,.rating
				font-size:10px
				color:rgb(147,153,157)
			.sell-count
				margin-right:14px
		.price
			font-weight:700
			line-height:24px
			.now
				margin-right:8px
				font-size:14px
				color:rgb(240,20,20)
			.old
				text-decoration:line-through
				font-size:10px
				color:rgb(147,153,159)
		.cartcontrol-wrapper
			position:absolute
			right:12px
			bottom:12px
		.buy 
			position:absolute
			right:18px
			bottom:18px
			z-index:10
			height:24px
			line-height:24px
			padding:0 12px
			box-sizing:border-box
			border-radius:12px
			font-size:10px
			color:#fff
			background:blue
	.rating
		padding-top:18px
		.title
			margin-left:18px
</style>
