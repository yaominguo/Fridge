<template>
  <div class="house-card-filter">
    <h4 class="house-card-filter-header">
      <span class="filter-header-title">高级筛选</span>
      <span @click='handleClear' class="filter-clear-btn">清空选项</span>
    </h4>
    <div class="house-card-filter-container">
      <div class="house-card-filter-section first-section">
        <Input v-model='searchModel.name' @on-blur="getHouseList">
          <Select v-model="searchModel.type" @on-change="getHouseList" slot="prepend" style="width: 80px">
            <Option value="1">小区</Option>
            <Option value="2">楼号</Option>
            <Option value="3">租客</Option>
            <Option value="4">电话</Option>
            <Option value="5">订单</Option>
            <Option value="6">备注</Option>
          </Select>
        </Input>
      </div>
      <div class="house-card-filter-section">
        <ActiveForm :ref="'community'"
          :layout="communityLayout"
          :model="communityModel"
          label-position="left"
          :label-width="40"
          @on-change="getHouseList">
        </ActiveForm>
      </div>
      <div class="house-card-filter-section">
        <ActiveForm :ref="'status'"
          :layout="statusLayout"
          :model="statusModel"
          @on-change="getHouseList">
        </ActiveForm>
      </div>
    </div>
  </div>
</template>

<script>
import ActiveForm from '@/components/Helper/Form/ActiveForm';

export default {
  name: 'HouseCardFilter',
  components: {
    ActiveForm,
  },
  props: {
    buildType: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    }
  },
  data() {
    return {
      isFromParent: false, // 判断是父页面来清除本页面选项
      searchModel: {
        name: '',
        type: null,
      },
      communityLayout: [
        {
          provId: {
            label: '省份',
            type: 'select',
            width: 24,
            options: [],
          },
          cityId: {
            label: '城市',
            type: 'select',
            width: 12,
            options: [],
          },
          countyId: {
            label: '区域',
            type: 'select',
            width: 12,
            options: [],
          },
          communityId: {
            label: '小区',
            type: 'select',
            width: 24,
            options: [],
          },
        },
      ],
      communityModel: {
        // communityDes: 'communityDescommunityDescommunityDes',
        // date: ['2018/01/11', '2018/03/11'],
      },
      statusLayout: [
        {
          status: {
            label: '房屋状态',
            type: 'radio',
            width: 24,
            options: [
              {
                text: '空房可租',
                value: 20,
                width: 8,
              },
              {
                text: '租客待登记',
                value: 2,
                width: 8,
              },
              {
                text: '租客待确认',
                value: 3,
                width: 8,
              },
              {
                text: '合同快到期',
                value: 5,
                width: 8,
              },
              {
                text: '合同已到期',
                value: 6,
                width: 8,
              },
              {
                text: '欠费',
                value: 14,
                width: 8,
              },
            ],
          },
          leaseType: {
            label: '出租模式',
            type: 'radio',
            width: 24,
            options: [
              {
                text: '整租',
                value: 1,
                width: '42%',
              },
              {
                text: '合租',
                value: 0,
                width: '42%',
              },
            ],
          },
        },

      ],
      statusModel: {

      },
    };
  },
  mounted() {
    this.$ajax.all(
      this.requestSelectOptions(this.$api.GET_COMMUNITY_LIST+"?buildType="+this.buildType, 'communityId'),
      this.requestSelectOptions(this.$api.GET_PROVINCE_LIST, 'provId'),
    );
    if(this.buildType === 1) { // // 房屋类型 0-分散式 1-集中式   集中式则没有出租模式筛选
      this.$delete(this.statusLayout[0], 'leaseType');
    };
  },
  methods: {
    handleClear() {
      this.communityModel = {};
      this.statusModel = {};
      this.searchModel = {};
			this.searchModel.name="";
      this.getHouseList();
    },
    // 父页面清除本页面选项时触发了change事件的话则不发请求
    clearOptions(clear) {
      this.isFromParent = clear;
      if(clear) {
        this.handleClear();
      }
    },
    getHouseList() {
      if (this.isFromParent) {
        this.getOptions();
        return;
      }
      this.$ajax.cancel();
      this.getOptions();
      this.communityModel.status = this.parentStatus;
      for(let key in this.communityModel) {
        if(!this.communityModel[key]) {
          this.$delete(this.communityModel, key);
        }
      }
      const { provId, cityId, countyId, communityId } = this.communityModel;
      const areaNames = {
        provName: provId && provId.split('#')[1],
        cityName: cityId && cityId.split('#')[1],
        countyName: countyId && countyId.split('#')[1],
        communityId: communityId && communityId.split('#')[0],
      };
      this.$emit('search');
      const params = Object.assign({houseKind: this.$cookie.get('houseKind')}, this.communityModel, this.statusModel, this.searchModel, areaNames);
			for(let i in params){
				if(params[i]==""){
					delete params[i];
				}
			}
			let links=this.buildType=="0"?this.$api.GET_HOUSE_LIST_DISTRIBUTED:this.$api.GET_HOUSE_LIST_CENTRAL;
			this.$ajax.get(
        this,
        links,
        params,
        (res) => {
          this.$store.dispatch('setHouseList', res.data.content);
          this.$store.dispatch('setHouseListParams', params);
        },
      )
    },
    /**
     * 用来请求省、市、区的options
     * @param  {String}  requestUrl  [url]
     * @param  {String}  selectItem  [layout中的哪个select]
     */
    requestSelectOptions(requestUrl, selectItem) {
      return this.$ajax.get(
        this,
        requestUrl,
        {},
        (res) => {
          const data = res.data.content;
          const options = data.map(item => {
            return {text: item.name, value: item.id + '#' + item.name, width: '42%'};
          });
          this.communityLayout[0][selectItem].options = options;
        },
        true,
      )
    },
    // 省市区联动，根据省获取市，根据市获取区
    getOptions() {
      const { provId, cityId } = this.communityModel;
      if (provId) {
        this.requestSelectOptions(this.$api.GET_CITY_LIST + provId.split('#')[0], 'cityId');
      } else {
        this.communityLayout[0].cityId.options = [];
      }
      if (cityId) {
        this.requestSelectOptions(this.$api.GET_COUNTY_LIST + cityId.split('#')[0], 'countyId');
      } else {
        this.communityLayout[0].countyId.options = [];
      }
    },
  },
  computed: {
    parentStatus() {
      return this.status;
    }
  },
  watch: {
    'communityModel.provId': {
      handler(cur, old) {
        if (cur != old) {
          this.$delete(this.communityModel, 'cityId');
          this.$delete(this.communityModel, 'countyId');
        }
      }
    },
    'communityModel.cityId': {
      handler(cur, old) {
        if (cur != old) {
          this.$delete(this.communityModel, 'countyId');
        }
      }
    },
  },
};
</script>

<style scoped>

.house-card-filter-header {
  margin-bottom: 16px;
  border-bottom: 1px solid #dcdee2;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.first-section {
  margin-bottom: 8px;
}
.filter-clear-btn {
  font-size: 12px;
  font-weight: normal;
  cursor: pointer;
}
</style>
