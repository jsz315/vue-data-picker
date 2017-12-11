<template>
	<div class="mask" v-show="visible" :style="{'opacity': opacity}">
		<div class="alert">
			<div class="header">
				<div class="cancel" @click="hide">取消</div>
				<div class="sure" @click="sendData(true)">确定</div>
			</div>

			<div class="list">
				<view-picker-item class="item" ref="item1" @change="changepro"></view-picker-item>
				<view-picker-item class="item" ref="item2" @change="changecity"></view-picker-item>
				<view-picker-item class="item" ref="item3" @change="changeArea"></view-picker-item>
			</div>

		</div>
	</div>
</template>

<script>

import cityData from './city'
import ViewPickerItem from './view-picker-item'


export default{
	data () {
	    return {
	    	curPro: "",
	    	curCity: "",
	    	curArea: "",
	    	visible: false,
	    	opacity: 0
	    }
	},
	components: {ViewPickerItem},
	computed:{

	},
	methods:{
		show(){
			this.visible = true;
			var $this = this;
			setTimeout(function () {
				$this.opacity = 1;
			}, 30);
		},
		hide(){
			this.opacity = 0;
			var $this = this;
			setTimeout(function () {
				$this.visible = false;
			}, 300);
		},
		changepro(n){
			this.curPro = n;
			this.$refs.item2.show(this.getCitys());
			this.$refs.item3.show(this.getAreas());
			//this.sendData();
		},
		changecity(n){
			this.curCity = n;
			this.$refs.item3.show(this.getAreas());
			//this.sendData();
		},
		changeArea(n){
			this.curArea = n;
			//this.sendData();
		},
		getPros(){
			var list = [];
			for(var i in cityData){
				list.push(i);
			}
			this.curPro = list[0];
			return list;
		},
		getCitys(){
			var citys = cityData[this.curPro];
			var list = [];
			for(var i in citys){
				list.push(i);
			}
			this.curCity = list[0];
			return list;
		},
		getAreas(){
			var list = cityData[this.curPro][this.curCity];
			this.curArea = list[0];
			return list;
		},
		sendData(n){
			this.$emit("change", [this.curPro, this.curCity, this.curArea].join(","));
			if(n){
				this.hide();
			}
		}

	},
	mounted(){
		this.$refs.item1.show(this.getPros());
		this.$refs.item2.show(this.getCitys());
		this.$refs.item3.show(this.getAreas());
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