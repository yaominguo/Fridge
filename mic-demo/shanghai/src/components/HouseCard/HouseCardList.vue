<template>
	<ul class="house-card-list">
		<li class="house-card-list-section">
			<div class="house-card-list-wrapper">
				<h4 class="house-card-list-header">{{ header }}<span  v-if="isCentral">-{{buildingCode}}</span>
					<span class="house-card-list-header-subtitle">({{ subTitle }}) </span>
					<slot name="functionMenu"></slot>
					<div class="occupancyRate">出租率{{occupancyRate(list)}}，总共{{totalCountRoom(list)}}间</div>
				</h4>
				
				<div v-if="isCentral">
					<div class="house-card-floor-container" v-for="(floor, key) in list" :key="key" v-show="floor.list.length>0">
						<div v-for="house in floor.list" style="display: inline-block;">
							<div class="house-card-floor">{{house.floor}}层</div>
							<HouseCard :key="house.id" :buildType="buildType" :houseInfo="house" :isHasDrawer="isHasDrawer"
							 :selectHouseArray="selectHouseArray" :header="header+'('+subTitle+')'" @houseCardActive="houseCardActive">
							</HouseCard>
						</div>
					</div>
				</div>
				<div v-else>
					<div class="house-card-floor-container distributedContainer" v-for="house in list" v-show="house.list.length>0">
						<div class="house-card-floor">{{house.buildingCode}}<br/>{{house.list.length}}间</div>
						<HouseCard v-for="house in house.list" :key="house.id" :buildType="buildType" :houseInfo="house" :is-first="isFirst(house.group)"
						 :is-last="isLast(house.groupTotal)" :header="header+'('+subTitle+')'"  :isHasDrawer="isHasDrawer" :selectHouseArray="selectHouseArray"
						 @houseCardActive="houseCardActive">
						</HouseCard>
					</div>
				</div>
			</div>
		</li>
	</ul>
</template>


<script>
	import HouseCard from '@/components/HouseCard/HouseCard';

	let globalGroup = 0;
	let groupCount = 0;

	export default {
		components: {
			HouseCard,
		},
		props: {
			list: {
				type: Array,
				required: true,
			},
			header: {
				type: String,
				required: true,
			},
			subTitle: {
				type: String,
				required: true,
			},		
			buildingCode:{
				type: String
			},
			isCentral: {
				type: Boolean,
				default: false,
			},
			buildType: {
				type: Number,
				required: true,
			},
			isHasDrawer: {
				type: Boolean,
				default: true,
			},
			selectHouseArray: {
				type: Array
			}
		},
		mounted() {
		},
		methods: {
			isFirst(group) {
				if (group && globalGroup === 0) {
					globalGroup = group;
					groupCount += 1;
					return true;
				}
				if (group === globalGroup) {
					groupCount += 1;
					return groupCount === 1;
				}
				globalGroup = 0;
				groupCount = 0;
				return false;
			},
			isLast(groupTotal) {
				if (groupTotal === groupCount) {
					globalGroup = 0;
					groupCount = 0;
					return true;
				}
				return false;
			},
			houseCardActive(query) {
				this.$emit("cardActive", query);
			},
			occupancyRate(array) {
				let total=0;
				let rented=0;
				array.forEach(item => {
					if (item.list.length > 0) {
						total += item.list.length;
						item.list.forEach(item=>{
							let array=["2","3","4","5","6","7","8"];
							if(array.indexOf(item.leaseStatus)!=-1){
								rented+=1;
							}
						})
					}
				})
				if(rented=="0"&&total=="0"){
					return "0%"
				}else{
					return (Math.round(rented / total * 10000) / 100.00 + "%");
				}
			
			},
			totalCountRoom(array) {
				let total = 0;
				array.forEach(item => {
					if (item.list.length > 0) {
						total += item.list.length;
					}
				})
				return total;
			},
		},
	};
</script>


<style scoped>
	.house-card-list-section {
		margin-bottom: 16px;
	}

	.house-card-list-header {
		height: 40px;
		line-height: 40px;
		text-indent: 16px;
		border-bottom: 1px solid #dcdee2;
		background: #f0f0f0;
		margin-bottom: 8px;
		overflow: hidden;
		padding-right: 10px;
	}

	.house-card-list-header-subtitle {
		font-size: 12px;
		font-weight: normal;
	}

	.house-card-list-section {
		list-style: none;
	}

	.house-card-floor-container {
		position: relative;
		padding-left: 70px;
		border: 1px solid #dcdee2;
	}

	.house-card-floor-container+.house-card-floor-container {
		border-top: none;
	}

	.house-card-floor {
		position: absolute;
		width: 60px;
		font-size: 12px;
		top: 0;
		left: 0;
		bottom: 0;
		background: #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.distributedContainer {
		padding: 5px 0 1px 70px;
	}

	.occupancyRate {
		float: right;
		/* color:red; */
		font-size: 12px;
	}
</style>
