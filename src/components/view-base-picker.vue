<template>
	<div class="mask" v-show="visible" :style="{'opacity': opacity}">
		<div class="alert">
			<div class="header">
				<div class="cancel" @click="hide">取消</div>
				<div class="sure" @click="sendData(true)">确定</div>
			</div>

			<div class="list">
				<view-picker-item class="item" ref="item" @change="change"></view-picker-item>
			</div>

		</div>
	</div>
</template>

<script>

import ViewPickerItem from './view-picker-item'


export default{
	data () {
	    return {
	    	curData: "",
	    	opacity: 0,
	    	visible: false
	    }
	},
	components: {ViewPickerItem},
	computed:{

	},
	methods:{
		show(list){
			this.visible = true;
			var $this = this;
			setTimeout(function () {
				$this.opacity = 1;
			}, 30);
			if(list){
				this.$refs.item.show(list);
			}
		},
		hide(){
			this.opacity = 0;
			var $this = this;
			setTimeout(function () {
				$this.visible = false;
			}, 300);
		},
		change(n){
			this.curData = n;
		},
		sendData(n){
			this.$emit("change", this.curData);
			if(n){
				this.hide();
			}
		}

	},
	mounted(){

	}
}
</script>

<style scoped>
.mask{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	transition: 0.3s opacity;
}
.alert{
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	background: #fff;
}
.header{
	height: 40px;
	color: #390;
	font-size: 18px;
	position: relative;
}
.cancel{
	position: absolute;
	height: 40px;
	line-height: 40px;
	padding: 0 16px;
	left: 0;
	top: 0;
	color: #39f;
}
.sure{
	position: absolute;
	height: 40px;
	line-height: 40px;
	padding: 0 16px;
	right: 0;
	top: 0;
	color: #39f;
}
.list{
	display: flex;
	justify-content: center;
	align-items: center;
}
.item{
	flex: 1;
}
</style>