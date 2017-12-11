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
			//var max = this.height * Math.floor(this.display / 2);
			//var min = max - (this.list.length - 1) * this.height;
			var $this = this;

			if(!this.init){
				this.init = true;	
				this.$refs.data.addEventListener("touchstart", touchstart);
				this.$refs.data.addEventListener("touchmove", touchmove);
				this.$refs.data.addEventListener("touchend", touchend);
			}

			function touchstart(e){
				pot = e.changedTouches[0].clientY;
			}

			function touchmove(e){
				var move = e.changedTouches[0].clientY - pot;
				$this.position += move * 1;
				pot = e.changedTouches[0].clientY;
			}

			function touchend(e){
				//document.removeEventListener("touchmove", touchmove);
				//document.removeEventListener("touchend", touchend);
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