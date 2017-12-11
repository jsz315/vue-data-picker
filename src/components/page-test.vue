<template>
	<div class="page-test">
		<div class="address" @click="showAddress">{{address}}</div>
		<div class="base" @click="showBase">{{base}}</div>
		<view-city-picker ref="city" @change="changeAddress"></view-city-picker>
		<view-base-picker ref="base" @change="changeBase"></view-base-picker>
	</div>
</template>

<script>

import cityData from './city'
import ViewCityPicker from './view-city-picker'
import ViewBasePicker from './view-base-picker'


export default{
	data () {
	    return {
	    	address: "请选择地址",
	    	base: "请选择工作年限"
	    }
	},
	components: {ViewCityPicker, ViewBasePicker},
	computed:{

	},
	methods:{
		changeAddress(n){
			this.address = n;
		},
		changeBase(n){
			this.base = n;
		},
		showAddress(){
			this.$refs.city.show();
		},
		showBase(){
			this.$refs.base.show(this.getList());
		},
		getList(){
			var list = [];
			list.push("无经验");
			list.push("1-3年");
			list.push("3-5年");
			list.push("5-10年");
			list.push("10年以上");
			return list;
		}
	},
	mounted(){

	}
}
</script>

<style scoped>
.address{
	padding: 12px;
	font-size: 18px;
	text-align: center;
	margin-top: 24px;
	border-bottom: solid 1px #f0f0f0; 
}
.base{
	padding: 12px;
	font-size: 18px;
	text-align: center;
	border-bottom: solid 1px #f0f0f0; 
}
</style>