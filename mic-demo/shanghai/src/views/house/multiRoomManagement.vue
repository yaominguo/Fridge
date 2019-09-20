<template>
	<div>
		<Card class="card house-card" dis-hover>
			<HouseCardList v-show="canShowCenterView" v-for="(community,index) in houseList" :key="index" :buildType="1" :list="community.list"
			 :header="community.name" :subTitle="community.address" :selectHouseArray="selectHouseArray" :isCentral=true
			 :isHasDrawer="false" @cardActive="houseCardActive" :buildingCode="community.buildingCode" >
			</HouseCardList>
			<p class="no-data" v-show="!canShowCenterView">暂无数据</p>
		</Card>
		<Card class="card house-filter-card houseTemplateContainer" dis-hover :style="filterCard">
			<HouseTemplate :selectHouse="selectHouseArray"  :buildingId="$route.params.id" :selectHouseTemplate="selectHouseTemplate" @on-clear="clear" @getLists="handleUse"></HouseTemplate>
		</Card>
	</div>
</template>
<script>
	import HouseCardList from '@/components/HouseCard/HouseCardList';
	import HouseTemplate from '@/components/HouseCard/HouseTemplate';
	import axios from 'axios';
	export default {
		components: {
			HouseCardList,
			HouseTemplate
		},
		data() {
			return {
				drawerVisible: false,
				status: '',
				pageNo: 1,
				pageSize: 10,
				selectHouseArray: [],
				selectHouseTemplate:[],
				houseList: [],
				canShowCenterView: false,
				clientHeight: ""
			};
		},
		computed: {
			filterCard() {
				let render = {};
				render.height = this.clientHeight + 'px';
				render.overflow="auto";
				return render;
			}
		},
		mounted() {
			let dom = document.getElementsByClassName('ov-content-fixed');
			let height = Number(dom[0].offsetHeight + 10);
			this.clientHeight = height;
			this.getHouseList();
		},
		methods: {
			getHouseList(params = {
				buildingId: this.$route.params.id,
				pageNo: 1,
				pageSize: 1000,
				houseKind: this.$cookie.get('houseKind'),
			}) {
				this.$ajax.get(
					this,
					this.$api.GET_HOUSE_LIST_CENTRAL,
					params,
					(res) => {
						this.houseList = res.data.content;
						if (this.houseList.length > 0) {
							this.canShowCenterView = true;
						} else {
							this.canShowCenterView = false;
						}
					}
				);
			},
			houseCardActive(query) {
				if (this.selectHouseArray.indexOf(query.id) == -1) {
					this.selectHouseArray.push(query.id);
					let obj={
						id:query.id,
						template:query.template
					}
					this.selectHouseTemplate.push(obj);
				} else {
					this.selectHouseArray.forEach((item, index) => {
						if (item == query.id) {
							this.selectHouseArray.splice(index, 1);
						}
					})
					this.selectHouseTemplate.forEach((item, index) => {
						if (item.id == query.id) {
							this.selectHouseTemplate.splice(index, 1);
						}
					})
				}
			},
			clear() {
				this.selectHouseArray = [];
				this.selectHouseTemplate=[];
			},
			handleUse(){
				this.getHouseList();
				this.selectHouseArray = [];
				this.selectHouseTemplate=[];
			}
		}
	};
</script>

<style scoped>
	.house-card {
		width: calc(100% - 330px);
		display: inline-block;
		vertical-align: top;
	}

	.house-filter-card {
		width: 320px;
		display: inline-block;
		vertical-align: top;
		position: fixed;
		margin-left: 10px;
		background: rgba(246, 246, 246, 1);
	}

	.house-list-filter {
		margin-bottom: 16px;
		border-bottom: 1px solid #dcdee2;
		padding-bottom: 8px;
		display: flex;
		align-items: center;
	}

	.no-data {
		text-align: center;
	}
</style>
