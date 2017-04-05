<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highLight':totalCount > 0}">
						<i class="icon-shopping_cart" :class="{'highLight':totalCount > 0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highLight':totalCount > 0}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop="pay">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<transition  @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
			<div class="ball-container">
				<div v-for="ball in balls" v-show="ball.show" class="ball">
					<div class="inner inner-hook"></div>
				</div>
			</div>
		</transition>
		
		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" ref='listContent'>
				<ul>
					<li class="food" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>￥{{food.price * food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
	
	</div>	
</template>

<script type="ecmascript-6">
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartControl/cartControl'
export default {
  data () {
    return {
    	balls: [
    		{
    			show: false
    		},
    		{
    			show: false
    		},
    		{
    			show: false
    		},
    		{
    			show: false
    		},
    		{
    			show: false
    		}
    	],
    	dropBalls: [],
    	fold: true
    }
  },
  props: {
  	selectFoods: {
  		type: Array,
  		default () {
  			return [];
  		}
  	},
  	deliveryPrice: {
  		type: Number,
  		default: 0
  	},
  	minPrice: {
  		type: Number,
  		default: 0
  	}
  },
  computed: {
  	// 总价
  	totalPrice () {
  		let total = 0;
  		this.selectFoods.forEach( (food) => {
  			total += food.price * food.count;
  		})
  		return total;
  	},
  	// 总数
  	totalCount () {
  		let count = 0;
  		this.selectFoods.forEach ((food) => {
  			count += food.count;
  		})
  		return count;
  	},
  	//价格
  	payDesc () {
  		if (this.totalPrice === 0) {
  			return `￥${this.minPrice}元起送`;
  		} else if (this.totalPrice < this.minPrice) {
  			let diff = this.minPrice - this.totalPrice;
  			return `还差￥${diff}元起送`;
  		} else {
  			return '去结算';
  		}
  	},
  	payClass () {
  		if (this.totalPrice < this.minPrice) {
  			return 'no-enough'
  		} else {
  			return 'enough'
  		}
  	},
  	listShow () {
  		if (!this.totalCount) {
  			this.fold = true;
  			return false;
  		}
  		let show = !this.fold;
  		if (show) {
  			this.$nextTick(() => {
  				if (!this.scroll) {
  					this.scroll = new BScroll(this.$refs.listContent, {
	  					click: true
	  				})
  				} else {
  					this.scroll.refresh()
  				}
  			})
  		}
  		return show;
  	}
  },
  methods: {
  	drop (el) {
  		for (let i = 0; i < this.balls.length; i++) {
  			let ball = this.balls[i];
  			if ( !ball.show ) {
  				ball.show = true;
  				ball.el = el;
  				this.dropBalls.push(ball);
  				return;
  			}
  		}
  	},
  	beforeEnter (el) {
  		alert(beforeEnter);
			let count = this.balls.length;
			while (count--) {
				let ball = this.balls[count];
				if (ball.show) {
					let rect = ball.el.getBoundingClientRect();
					let x=rect.left - 32;
					let y= -(window.innerHeight - rect.top - 22);
					el.style.display = '';
					el.style.webkitTransform = `translate3d(0,${y}px,0)`;
					el.style.transform = `translate3d(0,${y}px,0)`;
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
					nner.style.transform = `translate3d(${x}px,0,0)`;
				}
			}
		},
		enter (el, done) {
			alert(enter);
			/* eslint-disable no-unused-vars */
			let rf = el.offsetHeight;
			this.$nestTick(() => {
				el.style.webkitTransform = 'translate3d(0,0,0)';
				el.style.transform = 'translate3d(0,0,0)';
				let inner = el.getElementsByClassName('inner-hook')[0];
				inner.style.webkitTransform = 'translate3d(0,0,0)';
				nner.style.transform = 'translate3d(0,0,0)';
			})
		},
		afterEnter (el) {
			alert(afterEnter);
			let ball = this.dropBalls.shift();
			if (ball) {
				ball.show = false;
				el.style.display = 'none';
			}
		},
		toggleList () {
			if (!this.totalCount) {
				return;
			}
			this.fold = !this.fold;
		},
		empty () {
			this.selectFoods.forEach( (food) => {
				food.count = 0;
			})
		},
		pay () {
			if (this.totalPrice < this.minPrice) {
				return;
			}
			window.alert (`支付${this.totalPrice}元`)
		}
  },
  components: {
  	cartcontrol
  }
}
</script>

<style  lang="stylus" rel="stylesheet">
.shopcart
	position:fixed
	left:0
	bottom:0
	z-index:50
	width:100%
	height:48px
	background:#ccc
	.content
		display:flex
		background:#141d27
		font-size:0
		.content-left
			flex:1
			.logo-wrapper
				display:inline-block
				position:relative
				top:-10px
				margin:0 12px
				padding:6px
				width:56px
				height:56px
				box-sizing:border-box
				vertical-align:top
				border-radius:50%
				background:#000
				.logo
					width:100%
					height:100%
					border-radius:50%
					background:#2b3c3e
					text-align:center
					&.highLight
						background:blue
					.icon-shopping_cart
						line-height:44px
						font-size:24px
						color:#80858a
						&.highLight
							color:#fff
				.num 
					position:absolute
					top:0
					right:0
					width:24px
					height:16px
					background:red
					color:#fff
					font-size:14px
					line-height:16px
					text-align:center
					border-radius:16px
			.price
				display:inline-block
				vertical-align:top
				margin-top:12px
				line-height:24px
				padding-right:12px
				box-sizing:border-box
				border-right:1px solid #fff
				font-size:16px
				font-weight:700
				color:#ccc
				&.highLight 
					color:#fff
			.desc
				display:inline-block
				color:#fff
				font-size:16px
				font-weight:700
				margin-top:12px
				line-height:24px
		.content-right
			flex:0 0 105px
			width:105px
			.pay
				height:48px
				line-height:48px
				text-align:center
				font-size:12px
				color:#fff
				&.no-enough
					background:#2b333b
				&.enough
					background:blue
					color:#fff
	.ball-container
		.ball
			position:fixed
			left:32px
			bottom:22px
			z-index:200
			transition:all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
			.inner
				width:16px
				height:16px
				border-radius:50%
				background:blue
				z-index:200
	.shopcart-list
		position:absolute
		left:0
		top:0
		z-index:-1
		width:100%
		transform:translate3d(0,-100%,0)
		.list-header
			height:40px
			line-height:40px
			padding:0 18px
			background:#f3f5f7
			border-bottom:1px solid #ccc
			.title
				float:left
				font-size:14px
				color:rgb(7,17,27)
			.empty
				float:right
				font-size:12px
				color:rgb(0,160,220)
		.list-content
			padding:0 18px
			max-height:217px
			overflow:hidden
			background:#fff
			.food
				position:relative
				padding:12px 0
				box-sizing:border-box
				border-bottom:1px solid #ccc
				.name
					line-height:24px
					font-size:14px
					color:#ccc
				.price
					position:absolute
					right:90px
					bottom:12px
					line-height:24px
					font-size:14px
					font-weight:700
					color:red
				.cartcontrol-wrapper
					position:absolute
					right:0
					bottom:6px
</style>
