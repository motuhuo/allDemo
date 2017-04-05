<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li class="food-list food-list-hook" v-for="item in goods">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click="selectFood(food,$event)" class="food-item border-1px" v-for="food in item.foods">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span>￥{{food.price}}</span>
									<span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
							<div class="cartcontrol-wrapper">
									<cartcontrol v-on:addcart="_drop" :food="food"></cartcontrol>
								</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart ref="shopcart"  :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		<food :food="selectedFood" ref="food"></food>
	</div>
</template>

<script type="ecmascript-6">
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart/shopcart'
import cartcontrol from '@/components/cartControl/cartControl'
import food from '@/components/food/food'
const ERR_Ok = 0;
export default {
  props: {
  	seller: {
  		type: Object
  	}
  },
  data () {
    return {
    	show: true,
    	goods: [],
    	listHeight: [],
    	scrollY: 0,
    	selectedFood: {}
    }
  },
  computed: {
  	//第几个
  	currentIndex () {
  		for (let i = 0; i < this.listHeight.length; i++) {
  			let height1 = this.listHeight[i];
  			let height2 = this.listHeight[i + 1];
  			if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
  				return i;
  			}
  		}
  		return 0
  	},
  	selectFoods () {
  		let foods = [];
  		this.goods.forEach((good) => {
  			good.foods.forEach((food) => {
  				if (food.count) {
  					foods.push(food)
  				}
  			})
  		})
  		return foods;
  	}
  },
  created () {
    this.$http.get('/api/goods').then(( response ) => {
      response = response.body;
      if (response.errno === ERR_Ok){
        this.goods = response.data;
        // 数据更新有了新高度
        // 滚动
        this.$nextTick (() => {
        	this._initScroll();
        	this._calculateHeight();
        })
      }
    }),
    this.classMap = ['decrease','discount','special','invoice','guarantee']
  },
  methods: {
  	_drop (target) {
  		this.$refs.shopcart.drop(target)
  	},
  	// 滚动组件绑定
  	_initScroll () {
  	  this.menuScroll = new BScroll(this.$refs.menuWrapper, {
  	  	click: true
  	  });
  		this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
  			probeType: 3,
  			click: true
  		})
  		this.foodsScroll.on('scroll', (pos) => {
  			this.scrollY = Math.abs(Math.round(pos.y));
  		})
  	},
  	// 计算高度
  	_calculateHeight () {
  		let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
  		let height = 0;
  		this.listHeight.push(height);
  		for (let i = 0; i<foodList.length; i++) {
  			let item = foodList[i];
  			height += item.clientHeight;
  			this.listHeight.push(height);
  		}
  	},
  	selectMenu (index, event) {
  		// pc点击
  		if (!event._constructed) {
  			return;
  		}
  		let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
  		let el = foodList[index];
  		this.foodsScroll.scrollToElement(el, 300);
  	},
  	selectFood (food,event) {
  		if (!event._constructed) {
  			return;
  		}
  		this.selectedFood = food;
  		// 调用子组件的show() 方法
  		this.$refs.food.show()
  	}
  },
  components: {
  	shopcart,
  	cartcontrol,
  	food
  }
}
</script>

<style  lang="stylus" rel="stylesheet">
@import "../../common/stylus/mixin.styl"
.fade-enter-active, .fade-leave-active 
  transition: opacity .5s
.fade-enter, .fade-leave-active 
	opacity: 0
.goods
	display:flex
	position:absolute
	top:174px
	bottom:46px
	width:100%
	overflow:hidden
	.menu-wrapper
		flex:0 0 80px
		width:80px
		background:#f3f5f7
		.menu-item
			display:table
			height:54px
			width:56px
			padding:0 12px
			line-height:14px
			text-align:center
			&.current
				background:#fff
				font-weight:bold
			.text
				display:table-cell
				vertical-align:middle
				width:56px
				font-size:12px
				border-1px(rgba(7,17,27,0.1))
				.icon
					display:inline-block
					vertical-align:top
					width:12px
					height:12px
					background-size:12px 12px
					background-repeat:no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
	.foods-wrapper
		flex:1
		.title
			padding-left:14px
			height:26px
			line-height:26px
			border-left:2px solid #d9dde1
			font-size:12px
			color:rgb(147,153,159)
			background:#f3f5f7
		.food-item
			display:flex
			margin:18px
			padding-bottom:18px
			position:relative
			border-1px(rgba(7,17,27,0.1))
			&:last-child
				border-none()
				margin-bottom:0px
			.icon
				flex:0 0 57px
				width:57px
				margin-right:10px
			.content
				flex:1
			.cartcontrol-wrapper
				position:absolute
				right:0px
				bottom:0px
</style>
