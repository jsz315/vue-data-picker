<template>

	<div class="view-picker-item" :style="{height: height * display + 'px'}">
		<div class="data" ref="data">
			<div class="list" :style="{transform: 'translateY(' + position + 'px)'}">
				<div class="item" v-for="(item, index) in list" :style="{opacity: opacity(index), height: height + 'px', 'line-height': height + 'px'}">{{item}}</div>
			</div>
		</div>
		<div class="line" :style="{height: height + 'px'}"></div>
	</div>

</template>

<script>

export default{
	data () {
	    return {
	      list: [],
	      position: 0,
	      height: 40,
	      display: 7,
	      init: false
	    }
	},
	computed:{
		max(){
			return this.height * Math.floor(this.display / 2);
		},
		min(){
			return this.max - (this.list.length - 1) * this.height;
		}
	},
	methods:{
		opacity(n){
			var num = 120 - (this.position + n * 40);
			return 1 - Math.abs(num) / 140;
		},
		show(list){
			this.list = list;
			this.position = this.max;
			var pot = 0;
			var isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
			var $this = this;
			var isDrag = false;

			if(!this.init){
				this.init = true;
				if(isMobile){
					this.$refs.data.addEventListener("touchstart", dragstart);
					this.$refs.data.addEventListener("touchmove", dragmove);
					this.$refs.data.addEventListener("touchend", dragend);
				}
				else{
					this.$refs.data.addEventListener("mousedown", dragstart);
					this.$refs.data.addEventListener("mousemove", dragmove);
					this.$refs.data.addEventListener("mouseup", dragend);
				}

			}

			function dragstart(e){
				isDrag = true;
				pot = isMobile ? e.changedTouches[0].clientY : e.clientY;
			}

			function dragmove(e){
				if(!isDrag){
					return;
				}
				var newPot = isMobile ? e.changedTouches[0].clientY : e.clientY;
				var move = newPot - pot;
				$this.position += move * 1;
				pot = newPot;
			}

			function dragend(e){
				$this.position = Math.floor($this.position / $this.height) * $this.height;
				if($this.position < $this.min){
					$this.position = $this.min;
				}
				if($this.position > $this.max){
					$this.position = $this.max;
				}
				var n = $this.position / $this.height;
				n = Math.floor($this.display / 2) - n;
				$this.$emit("change", $this.list[n]);
				isDrag = false;
			}
		}
	},
	mounted(){

	}
}
</script>

<style scoped>
.view-picker-item{
	position: relative;
	width: 100%;
	background: #f9f9f9;
	cursor: pointer;
	user-select: none;
}
.data{
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.line{
	position: absolute;
	width: 100%;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	border-top: solid 1px #ddd; 
	border-bottom: solid 1px #ddd; 
}
.list{
	position: relative;
	transition: 0.3s transform;
}
.item{
	color: #333;
	font-size: 20px;
	text-align: center;
	transition: 0.3s opacity;
	width: 100%;
	text-overflow: ellipsis;
	overflow-x: hidden;
	white-space: normal;
	word-break: keep-all;
}
</style>