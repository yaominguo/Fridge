<template>
	<div>
		<Card class="card house-card" dis-hover>
			<div class="house-list-filter">
				<div>
					<span>
						<Icon type="ios-funnel" /> 快速筛选：</span>
					<RadioGroup @on-change='handleChange' type="button" size="small">
						<Radio label="">
							<span>显示所有房源</span>
						</Radio>
						<Radio label="21">
							<span>仅显示已租房源</span>
						</Radio>
						<Radio label="20">
							<span>仅显示空置房</span>
						</Radio>
					</RadioGroup>
				</div>
				<!-- <div class="exportVacant">
					<Button type="primary" ghost>
						导出所有空房
					</Button>
				</div> -->

			</div>
			<HouseCardList v-show="canShowCenterView" v-for="(community,index) in houseList" :key="index" :buildType="1" :list="community.list"
			 :header="community.name" :subTitle="community.address" :isCentral="true" :buildingCode="community.buildingCode">
				<div slot="functionMenu" class="house-card-list-header-function">
					<router-link :to="'/public-housing/house/central-house-create/'+community.id+'/'+community.name+'/'+community.floorCount+'/'+community.isElevator+'/'+community.communityId">批量添加房间</router-link>
					<router-link :to="'/public-housing/house/multiRoomManagement/'+community.id">管理房间</router-link>
				</div>
			</HouseCardList>
			<p class="no-data" v-show="!canShowCenterView">暂无数据</p>
			<Button v-show="canShowCenterView" @click="loadMore" type="dashed" style="width: 100%;">
				加载更多
			</Button>
		</Card>
		<Card class="card house-filter-card" dis-hover>
			<HouseCardFilter @search="handleSearch" class="house-card-filter" ref="filter" :buildType="1" :status="status"></HouseCardFilter>
		</Card>
	</div>
</template>


<script>
	import HouseCardList from '@/components/HouseCard/HouseCardList';
	import HouseCardFilter from '@/components/HouseCard/HouseCardFilter';
	import axios from 'axios';
	export default {
		components: {
			HouseCardList,
			HouseCardFilter,
		},
		data() {
			return {
				drawerVisible: false,
				status: '',
				pageNo: 1,
				pageSize: 10,
			};
    },
    created() {
      const {houseKind} = this.$route.meta;
      this.$cookie.set('houseKind', houseKind || null);
    },
		mounted() {
			this.$store.dispatch('setHouseList', []);
			this.$store.dispatch('setHouseListParams', {});
			this.getHouseList();
		},
		methods: {
			handleSearch() {
				this.pageNo = 1;
			},
			loadMore() {
				this.pageNo += 1;
				const searchParams = this.$store.state.searchParams;
				const params = Object.assign({
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					houseKind: this.$cookie.get('houseKind')
				}, searchParams);
				this.$ajax.get(
					this,
					this.$api.GET_HOUSE_LIST_CENTRAL,
					params,
					(res) => {
						if (!this.$com.confirm(res, 'data.content') || this.$com.confirm(res, 'data.content.length') <= 0) {
							this.$Message.success('没有更多数据了');
							return;
						}
						const data = [...this.$store.state.houseList, ...res.data.content];
						this.$store.dispatch('setHouseList', data);
						this.$refs.filter.clearOptions(false);
					}
				);
			},
			handleChange(status) {
				this.pageNo=1;
				this.status = status;
				this.$refs.filter.clearOptions(true);
				if (!status) {
					this.getHouseList({
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						houseKind: this.$cookie.get('houseKind')
					});
					return;
				}
				this.getHouseList({
					status: status,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					houseKind: this.$cookie.get('houseKind')
				});
			},
			getHouseList(params = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				houseKind: this.$cookie.get('houseKind')
			}) {
				this.$ajax.get(
					this,
					this.$api.GET_HOUSE_LIST_CENTRAL,
					params,
					(res) => {
						this.$store.dispatch('setHouseList', res.data.content);
						this.$refs.filter.clearOptions(false);
					}
				);
			},
			residenceSelect(scoped) {
				const id = this.$route.params.scoped || 'all';
				return id === scoped;
			},
			bindResidenceRoute(to) {
				return {
					name: 'house/central-house-status-diagram/scoped',
					params: {
						scoped: to
					}
				};
			},
		},
		computed: {
			houseList() {
				return this.$store.state.houseList;
			},
			canShowCenterView() {
				if (!this.houseList || this.houseList.length <= 0) {
					return false
				} else {
					return true
				};
				const valid = this.houseList.every(item => {
					return item.list && item.list.length <= 0;
				})
				return !valid;
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
	}

	.house-list-filter {
		margin-bottom: 16px;
		border-bottom: 1px solid #dcdee2;
		padding-bottom: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.no-data {
		text-align: center;
	}

	.house-card-list-header-function {
		display: inline-block;
		font-size: 12px;
	}
</style>
