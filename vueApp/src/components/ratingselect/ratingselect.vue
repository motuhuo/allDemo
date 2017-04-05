<template>
  <div class="ratingselect">
  	<div class="rating-type border-1px">
  		<span class="block positive" :class="{'active':selectType === 2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
  		<span @click="select(0,$event)" class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
  		<span @click="select(1,$event)" class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
  	</div>
  	<div class="switch" @click="toggleContent">
  		<span class="icon-check_circle" :class="{'on':onlyContent}"></span>
  		<span class="text">只看有内容的评价</span>
  	</div>
  </div>
</template>
<script type="ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
	props: {
		ratings: {
			type: Array,
			default () {
				return [];
			}
		},
		desc: {
			type: Object,
			default () {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				}
			}
		}
	},
	data () {
		return {
			selectType: 2,
			onlyContent: false
		}
	},
	computed: {
		positives () {
			return this.ratings.filter((rating) => {
				return rating.rateType === POSITIVE;
			})
		},
		negatives () {
			return this.ratings.filter((rating) => {
				return rating.rateType === NEGATIVE;
			})
		}
	},
	methods: {
		select (type,event) {
			if(!event._constructed) {
				return;
			}
			this.selectType = type;
			this.$emit('changeType',this.selectType);
			
		},
		toggleContent (event) {
			if(!event._constructed) {
				return;
			}
			this.onlyContent = !this.onlyContent;
			this.$emit('contentType',this.onlyContent)
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet">
@import "../../common/stylus/mixin.styl"
.ratingselect
	.rating-type
		padding:18px 0
		margin: 0 18px
		border-1px(rgba(7,17,27,0.1))
		font-size:0
		.block
			display:inline-block
			padding:8px 12px
			margin-right:8px
			border-radius:1px
			font-size:16px
			color:rgb(77,85,93)
			&.active
				color:#fff
			.count
				font-size:8px
				margin-left:2px
			&.positive
				background:rgba(0,160,220,0.2)
				&.active
					background:rgb(0,160,220)
			&.negative
				background:rgba(77,85,93,0.2)
				&.active
					background:rgb(77,85,93)
	.switch
		padding:12px 18px
		line-height:24px
		border-bottom:1px solid #ccc
		color:#ccc
		font-size:12px
		.icon-check_circle
			display:inline-block
			font-size:24px
			margin-right:4px
			vertical-align:top
			&.on
				color:blue
</style>
