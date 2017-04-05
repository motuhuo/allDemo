<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart($event)">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		
		<div class="cart-count" v-show="food.count>0">
			{{food.count}}
		</div>
		<div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
	</div>	
</template>

<script type="ecmascript-6">
import Vue from 'vue'
export default {
	props: {
		food: {
			type: Object
		}
	},
  data () {
    return {}
  },
  created () {
  },
  methods: {
  	addCart (event) {
  		if (!event._constructed) {
  			return;
  		}
  		if (!this.food.count) {
  			Vue.set(this.food, 'count', 1);
  		} else {
  			this.food.count++;
  		}
  		this.$emit('addcart', event.target);
  	},
  	decreaseCart (event) {
  		if (!event._constructed) {
  			return;
  		}
  		if (this.food.count) {
  			this.food.count--;
  		}
  	}
  }
}
</script>

<style  lang="stylus" rel="stylesheet">
.cartcontrol
	font-size:0
	.cart-decrease
		display:inline-block
		padding:6px
		transition:all 0.4s linear
		.inner
			font-size:24px
			line-height:24px
			color:blue
		&.move-enter, &.move-leave-active
			opacity:0
			transform:translate3D(24px,0,0) rotate(180deg)
	.cart-count
		display:inline-block
		font-size:24px
		line-height:24px
		margin:0 6x
		color:red
	.cart-add
		display:inline-block
		padding:6px
		font-size:24px
		line-height:24px
		color:blue
</style>
