<template>
	<div :class="houseCardSectionClass">
		<div class="house-card" @click="showDetail" :class="houseSelect">
			<!-- 	<div class="house-card layout" :class="houseSelect" v-show="houseInfo.isComplete">
				<div class="layout-template-name">一层楼模板</div>
			</div> -->
			<div v-if="houseInfo.template">
				<div :class="houseInfoClass">
					<div class="house-info-building">{{this.houseShow(houseInfo)}}</div>
					<div class="imgs">
						<img :src="shui">
						<img :src="dian">
						<!-- <img :src="men"> -->
					</div>
					<div style="overflow:hidden;margin-top: 5px;">
						<!-- 空 -->
						<HouseTag style="float: left;"  v-if="houseInfo.countDayType" :type="houseInfo.countDayType" :day="houseInfo.countDay || '0'"></HouseTag>
						<!-- 已 -->
						<HouseTag style="float: left;" v-if="houseInfo.countContractDay != null && houseInfo.countContractDay < 0" :type="'77'"
						 :day="houseInfo.countContractDay || '0'"></HouseTag>
						<!-- 续 -->
						<HouseTag style="float: left;" v-if="houseInfo.countContractDay != null && houseInfo.countContractDay >=0" :type="'88'"
						 :day="houseInfo.countContractDay || '0'"></HouseTag>
						<!-- 收 -->
						<HouseTag style="float: left;" v-if="houseInfo.countPayDay != null && houseInfo.countPayDay >= 0"  :type="'99'"
						 :day="houseInfo.countPayDay || '0'"></HouseTag>
						 <!-- 欠-->
						 <HouseTag style="float: left;" v-if="houseInfo.countAmount  != null && houseInfo.countAmount  >= 0"  :type="'2'"
						  :day="houseInfo.countRentDay"></HouseTag>
						<img class="house-type" :src="houseTypeIcon">
					</div>

				</div>
				<div class="house-rent">
					<div class="house-rent-fee">
						￥{{ $com.toMoney(houseInfo.fee) }}
					</div>
					<div  :class="isRed"  v-if="this.houseInfo.leaseStatus !== '0' && this.houseInfo.leaseStatus != '1' && this.houseInfo.leaseStatus != '2'"  :title="houseInfo.customer && houseInfo.customer.name">
						{{ houseInfo.customer && houseInfo.customer.name }}
					</div>
				</div>
			</div>
			<div v-else>
				<div class="houseInfo" :class="houseInfoClass">
					<div class="house-info-building">{{this.houseShow(houseInfo)}}</div>
					<div class="imgs">
						<img :src="shui">
						<img :src="dian">
						<img :src="men">
					</div>
				</div>
				<div class="house-rent">
					<Row style="width:100%;padding:0 10px" type="flex" justify="start" align="middle">
						<Col>
						<Icon type="ios-alert-outline" class="warning-icon" :size="15" color="red" />
						</Col>
						<Col>
						租赁信息待完善
						</Col>
					</Row>
				</div>
			</div>
		</div>
		<Drawer v-model="value" :width="400">
			<HouseInfo :buildType="buildType"  :header="header" :detail="detailData" :lease="leaseData" ></HouseInfo>
		</Drawer>
	</div>
</template>

<script>
	import HouseTag from '@/components/HouseCard/HouseTag';
	import HouseInfo from '@/components/HouseCard/HouseInfo';

	// // eslint-disable-next-line
	// const STATUS_UNLEASED = 0;
	// // eslint-disable-next-line
	// const STATUS_LEASED = 1;

	export default {
		components: {
			HouseTag,
			HouseInfo,
		},
		props: {
			houseInfo: {
				type: Object,
				required: true,
			},
			isFirst: {
				type: Boolean,
				default: false,
			},
			isLast: {
				type: Boolean,
				default: false,
			},
			buildType: {
				type: Number,
				required: true,
			},
			isHasDrawer: {
				type: Boolean,
				default: false,
			},
			selectHouseArray: {
				type: Array
			},
			header: {
				type: String,
				default: false
			}
		},
		data() {
			return {
				shui: require('@/assets/icons/shui.png'),
				dian: require('@/assets/icons/dian.png'),
				men: require('@/assets/icons/men.png'),
				zz: require('@/assets/icons/zz.png'),
				fz: require('@/assets/icons/fz.png'),
				value: false,
				detailData: {},
				leaseData: {}
			};
		},
		computed: {
			isRed() {
				return `house-rent-customer ${this.houseInfo.countDayType == '2' ? ' red' : ''} `;
			},
			houseTypeIcon() {
				return this.houseInfo.leaseType == '1' ? this.zz : this.fz;
			},
			houseCardSectionClass() {
				return `house-card-section ${this.houseInfo.group ? 'house-card-group ' : 'house-card-ungroup'} ${this.isFirst ? 'house-card-group-first ' : ''} ${this.isLast ? 'house-card-group-last ' : ''}`;
			},
			houseInfoClass() {
				if (this.houseInfo.template) {
					return `house-info ${this.houseInfo.leaseStatus == '0' || this.houseInfo.leaseStatus == '1' || this.houseInfo.leaseStatus == '2' ? 'house-info-unleased' : 'house-info-leased'}`;
				} else {
					return 'house-info house-info-uncomplete'
				}

			},
			/*houseTypeIcon() {
			  return this.houseInfo.group ? 'ios-grid' : 'ios-square';
			},*/
			houseSelect() {
				if (this.isHasDrawer == false && this.selectHouseArray.indexOf(this.houseInfo.id) != -1) {
					return 'house-selectedCard'
				}
			}
		},
		methods: {
			showDetail() {
				if (this.isHasDrawer == false) {
					let obj={
						id: this.houseInfo.id,
						template:this.houseInfo.template
					}
					this.$emit("houseCardActive",obj);
					return;
				}
				this.$ajax.get(
					this,
					this.$api.GET_LEASE_INFO + this.houseInfo.id, {},
					(res) => {
						this.detailData = this.houseInfo;
						this.value = true;
						if (res.data && res.data.content) {
							this.leaseData = res.data.content;
						}
					}
				)
			},
			houseShow(info) {
				const {
					roomNo,
					room
				} = info;
				let str = '';
				if (roomNo) {
					str += roomNo + '-'
				}
				if (room) {
					str += room + '-'
				}
				return str.slice(0, str.length - 1)
			}
		}
	};
</script>


<style scoped>
	.red {
		color: #ff6161;
	}

	.imgs img {
		margin-left: 8px;
		width: 25px;
		height: 25px;
	}

	.house-card-section {
		display: inline-block;
		margin-bottom: 4px;
		cursor: pointer;
	}

	.house-card-ungroup {
		border: 1px solid #fff;
		padding: 0;
		margin: 0 1px;
		position: relative;
	}

	.house-card-group {
		border: 1px solid #73a6fb;
		border-left: none;
		border-right: none;
		background: #f1f5ff;
		padding: 0 2px;

	}

	.house-card-group-first {
		border-left: 1px solid #73a6fb;
		padding-left: 0;
		margin-left: 1px;
	}

	.house-card-group-last {
		border-right: 1px solid #73a6fb;
		padding-right: 0;
		margin-right: 1px;
	}

	.house-card {
		width: 190px;
		height: 150px;
		margin: 8px;
		box-sizing:content-box;
		display: inline-block;
		border:1px solid #d0d0d0; 
		cursor: pointer;
	}

	.house-info {
		height: 120px;
	}

	.house-info-unleased {
		background: #8ed617;
		color: #fff;
		position: relative;
	}

	.house-info-leased {
		background: #75a8f8;
		color: #fff;
		position: relative;
	}

	.house-info-uncomplete {
		background: #cfd5df;
		color: white;
		position: relative;
	}

	.house-info-building {
		font-size: 16px;
		height: 30px;
		font-weight: bold;
		line-height: 30px;
		text-indent: 8px;
	}

	.house-type {
		float: right;
		width: 20px;
		height: 20px;
		margin: 25px 10px 0 0;
	}

	.house-info-unleased .house-type {
		color: #639510;
	}

	.house-info-leased .house-type {
		color: #5C84C8;
	}

	.warning-icon {
		position: relative;
		top: -1px;
		left: -5px;
	}

	.house-rent {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		color: #444;
		background: #fff;
		display: flex;
	}

	.house-rent-fee {
		display: inline-block;
		width: 55%;
		text-align: left;
		text-indent: 8px;
	}

	.house-rent-customer {
		width: 45%;
		text-align: right;
		margin-right: 10px;
		align-items: center;
		justify-content: flex-end;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.house-selectedCard {
		box-sizing:content-box;
		border:1px solid rgba(42, 130, 228, 1); 
		cursor: pointer;
	}

	.layout {
		position: absolute;
		background: rgba(0, 0, 0, .5);
		top: 0px;
		left: 0px;
		z-index: 100
	}

	.layout-template-name {
		width: 174px;
		height: 30px;
		border-radius: 4px;
		background: rgba(42, 130, 228, 1);
		margin: 0 auto;
		margin-top: 60px;
		text-align: center;
		line-height: 30px;
		color: white;
		font-size: 14px;
	}
</style>
