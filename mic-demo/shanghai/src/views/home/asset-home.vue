// 资产首页
<template>
<div>
  <Card dis-hover title="资产" icon="md-home" style="marginBottom: 12px;">
    <Row>
      <Col :span="5" style="borderRight: 1px solid #e8eaec;">
        <div class="asset-sum">
          <p>资产总量：<span>{{assetInfo.buildNumTotal}}</span>栋</p>
          <p>总面积：<span>{{assetInfo.buildSpaceTotal}}</span>㎡</p>
          <p>分户数：<span>{{assetInfo.houseTotal}}</span>户</p>
          <div class="empty-rate">
            资产总空置率：
            <Circle :percent="emptyRate" :size="40">
              <span style="font-size:14px;font-weight: bold;">{{emptyRate}}%</span>
            </Circle>
          </div>
          <p>资产产权登记：<span>{{assetInfo.haveRightTotal}}/{{assetInfo.buildNumTotal}}</span></p>
        </div>
      </Col>
      <Col :span="19">
        <ECharts
          :options="chartOptions"
          :init-options="initOptions"
          ref="bar"
          theme="ovilia-green"
          autoresize
          class="asset-charts" />
      </Col>
    </Row>
  </Card>
  <Card dis-hover title="收入" icon="ios-podium" style="marginBottom: 12px;">
    <Row>
      <Col :span="16" style="borderRight: 1px solid #e8eaec;">
        <div class="select-container">
          <Select @on-change="selectHouseKind" size="small" style="width:110px" :value="houseKind">
            <Option value="all">全部资产类型</Option>
            <Option v-for="(n,i) in 6" :key="i" :value="i+''">{{$com.switchAssetType(i+'')}} </Option>
            <!-- <Option value="0">公租房</Option>
            <Option value="1">国有公房</Option>
            <Option value="2">人才公寓</Option>
            <Option value="3">普通住房</Option>
            <Option value="4">商铺</Option>
            <Option value="5">商务办公</Option> -->
          </Select>
          <Select @on-change="selectYear" size="small" style="width:70px" :value="year">
            <Option v-for="y in yearOptions" :key="y" :value="y">{{y}}</Option>
          </Select>
        </div>
        <ECharts
          :options="chartOptions2"
          :init-options="initOptions"
          theme="ovilia-green"
          autoresize
          class="asset-charts" />
      </Col>
      <Col :span="8">
        <ECharts
          :options="chartOptions3"
          :init-options="initOptions"
          theme="ovilia-green"
          autoresize
          class="asset-charts" />
      </Col>
    </Row>
  </Card>
  <Row :gutter="10">
    <Col :span="16">
      <Card dis-hover title="待办事项" icon="ios-list-box" style="height:190px;">
        <div class="todo-container">
          <div class="box">
            <div>
              <Circle :percent="registerPercent" :size="50">
                <span style="font-size:14px;font-weight: bold;">{{registerPercent}}%</span>
              </Circle>
              <p>{{todoInfo.registered}}/{{todoInfo.allHouseCount}}</p>
              <p>已登记/全量</p>
            </div>
            <div class="content">
              <h3>产权</h3>
              <ul>
                <li> <span>产权登记</span><span>{{todoInfo.registering}}</span> 个资产待产权登记</li>
              </ul>
            </div>
          </div>
          <div class="box">
            <div>
              <Circle :percent="checkPercent" :size="50">
                <span style="font-size:14px;font-weight: bold;">{{checkPercent}}%</span>
              </Circle>
              <p>{{todoInfo.checkedBuildCount}}/{{todoInfo.allBuildCount}}</p>
              <p>已盘点/全量</p>
            </div>
            <div class="content">
              <h3>盘点</h3>
              <ul>
                <li><span>今年盘点</span><span>{{todoInfo.checkingBuildCount}}</span> 个资产待盘点</li>
                <!-- <li><span>资产核销</span><span>0</span> 个资产待核销</li> -->
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </Col>
    <Col :span="8">
      <Card dis-hover class="short-cuts-card" title="快捷入口" icon="ios-paper-plane" style="height:190px;">
        <ul class="short-cuts-list">
          <li class="short-cuts">
            <Button class="short-cuts-button"
              type="primary"
              ghost
              icon="ios-add-circle"
              @click="routerTo('house/quicklyAddRoom')"
              long>
              房源录入
            </Button>
          </li>
          <li class="short-cuts">
            <Button class="short-cuts-button"
              type="primary"
              ghost
              icon="ios-add-circle"
              @click="routerTo('contract/tenant-register')"
              long>
              租客登记
            </Button>
          </li>
        </ul>
      </Card>
    </Col>
  </Row>
</div>
</template>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts-liquidfill';
import theme from '@/assets/styles/chartTheme.json';

ECharts.registerTheme('ovilia-green', theme);
const option = {
  legend: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  dataset: {
    // Provide data.
    source: [
      ['Product', '楼栋数', '分户数' , '面积'],
      ['公租房', 0, 0, 0],
      ['国有公房', 0, 0, 0],
      ['人才公寓', 0, 0, 0],
      ['普通住房', 0, 0, 0],
      ['商铺', 0, 0, 0],
      ['商务办公', 0, 0, 0],
    ]
  },
  // Declare X axis, which is a category axis, mapping
  // to the first column by default.
  xAxis: { type: 'category' },
  // Declare Y axis, which is a value axis.
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: '数量',
      min: 0,
      max: 'dataMax',
      // interval: 5,
    },
    {
      type: 'value',
      scale: true,
      name: '面积(㎡)',
      min: 0,
      max: 'dataMax',
      // interval: Math.ceil(this.chartOptions.yAxis[1].max/5),
    }
  ],
  // Declare several series, each of them mapped to a
  // column of the dataset by default.
  series: [
    { type: 'bar', barGap: 0, barWidth: '20%', yAxisIndex: 0, itemStyle: {color: '#ffce34'} },
    { type: 'bar', barGap: 0, barWidth: '20%', yAxisIndex: 0 },
    { type: 'bar', barGap: 0, barWidth: '20%', yAxisIndex: 1 },
  ]
};
const option2 = {
  legend: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    }
  },
  dataset: {
    // Provide data.
    source: [
      ['Income', '当月收入', '去年当月收入'],
      ['1月', 0, 0],
      ['2月', 0, 0],
      ['3月', 0, 0],
      ['4月', 0, 0],
      ['5月', 0, 0],
      ['6月', 0, 0],
      ['7月', 0, 0],
      ['8月', 0, 0],
      ['9月', 0, 0],
      ['10月', 0, 0],
      ['11月', 0, 0],
      ['12月', 0, 0],
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {name: '金额(万)',},
  series: [
    { type: 'bar', barWidth: '50%'},
    { type: 'line'},
  ]
};
const option3 = {
  legend: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    }
  },
  dataset: {
    source: [
      ['Income', '本月各类资产收入(万)'],
      ['公租房', 0],
      ['国有公房', 0],
      ['人才公寓', 0],
      ['普通住房', 0],
      ['商铺', 0],
      ['商务办公', 0],
    ]
  },
  grid: {left: '20%',},
  xAxis: { type: 'value'},
  yAxis: { type: 'category'},
  series: [
    { type: 'bar', label: {normal: {show: true, position: 'right'}}, itemStyle: {color: '#947fea'}, barWidth: '60%'},
  ]
};
export default {
  name: 'AssetHome',
  components: {
    ECharts,
  },
  data() {
    return {
      chartOptions: option,
      chartOptions2: option2,
      chartOptions3: option3,
      initOptions: {
        renderer: 'canvas'
      },
      houseKind: 'all',
      year: null,
      yearOptions: [],
      todoInfo: {
        checkingBuildCount: 0,
        registering: 0,
        registered: 0,
        allHouseCount: 0,
        checkedBuildCount: 0,
        allBuildCount: 0,
      },
      assetInfo: {},
      emptyRate: 0,
    }
  },
  mounted() {
    this.$nextTick(() => {
      const curYear = new Date().getFullYear();
      this.year = curYear;
      this.yearOptions = Array.from({length: 5}).map((e, i) => curYear - i);
      this.$ajax.all(
        this.getEmptyRate(),
        this.getAssetInfo(),
        this.getCountTotal(),
        this.getGroupByMonth(),
        this.getTodo(),
      );
    })
  },
  methods: {
    selectHouseKind(val) {
      this.houseKind = val;
      this.getGroupByMonth();
    },
    selectYear(val) {
      this.year = val;
      this.getGroupByMonth();
    },
    getAssetInfo() { // 资产信息
      return this.$ajax.get(
        this,
        this.$api.GET_ASSET_INFO,
        null,
        res => {
          this.assetInfo = this.$com.confirm(res, 'data.content', {});
          const list = this.$com.confirm(res, 'data.content.list', []);
          if (list.length > 0) {
            const result = [...option.dataset.source], houseCountList = [], buildSpaceList = [];
            list.forEach(item => {
              const index = result.findIndex(ele => ele[0] == this.$com.switchAssetType(item.houseKind));
              if (index >= 0) {
                result.splice(index, 1, [this.$com.switchAssetType(item.houseKind), item.buildNum, item.houseCount, item.buildSpace]);
              }
              // result.push([this.$com.switchAssetType(item.houseKind), item.buildNum, item.houseCount, item.buildSpace]);
              houseCountList.push(item.houseCount);
              buildSpaceList.push(item.buildSpace);
            });
            const maxCount = Math.max(...houseCountList), maxSpace = Math.max(...buildSpaceList);
            option.yAxis[0]['interval'] = Math.ceil(maxCount / 5);
            option.yAxis[1]['interval'] = Math.ceil(maxSpace / 5);

            // option.dataset.source = [option.dataset.source[0], ...result];
            option.dataset.source = result;
            this.chartOptions = option;
          }
        }
      )
    },
    getEmptyRate() { // 资产空置率
      return this.$ajax.get(
        this,
        this.$api.GET_LEASE_RATE,
        null,
        res => {
          this.emptyRate = this.$com.confirm(res, 'data.content', 0);
        },
        true,
      )
    },
    getCountTotal() { // 本月各类资产收入
      return this.$ajax.get(
        this,
        this.$api.GET_COUNT_TOTAL,
        null,
        res => {
          const data = res.data.content;
          const result = [...option3.dataset.source];
          // const result = [
          //   option3.dataset.source[0],
          //   ...data.reverse().map(item => [this.$com.switchAssetType(item[1]), item[0]]),
          // ];
          data.reverse().forEach(item => {
            const index = result.findIndex(ele => ele[0] == this.$com.switchAssetType(item[1]));
            if (index >= 0) {
              result.splice(index, 1, [this.$com.switchAssetType(item[1]), item[0]]);
            }
          })
          option3.dataset.source = result;
          this.chartOptions3 = option3;
        }
      )
    },
    getGroupByMonth() { // 今年对比去年收入总览
      return this.$ajax.get(
        this,
        this.$api.GET_GROUP_BY_MONTH,
        {
          houseKind: this.houseKind == 'all' ? null : this.houseKind,
          year: this.year,
        },
        res => {
          const data = res.data.content;
          let result = [];
          for(let i=0; i < 12; i++) {
            result.push([
              i + 1 + '月',
              this.$com.confirm(data, `current.${i}.amount`, 0),
              this.$com.confirm(data, `last.${i}.amount`, 0),
            ])
          }
          option2.dataset.source = [
            option2.dataset.source[0],
            ...result,
          ];
          this.chartOptions2 = option2;
        },
        true,
      )
    },
    getTodo() { // 待办事项
      return this.$ajax.get(
        this,
        this.$api.GET_ASSET_TODO,
        null,
        res => {
          this.todoInfo = this.$com.confirm(res, 'data.content', {});
        }
      )
    },
  },
  computed: {
    registerPercent() {
      const { registered, allHouseCount } = this.todoInfo;
      if (allHouseCount <= 0) return 0;
      const result = Math.round((registered / allHouseCount) * 100);
      return isNaN(result) ? 0 : result;
    },
    checkPercent() {
      const { checkedBuildCount, allBuildCount } = this.todoInfo;
      if (allBuildCount <= 0 ) return 0;
      const result = Math.round((checkedBuildCount / allBuildCount) * 100);
      return isNaN(result) ? 0 : result;
    },
  },
}
</script>

<style scoped>
.asset-sum {
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.asset-sum > p {
  padding-left: 5px;
  margin: 10px 0;
}
.asset-sum > p > span {
  font-weight: bold;
  font-size: 16px;
}
.asset-sum .empty-rate {
  background: #e8eaec;
  padding: 10px 5px;
  margin-right: 16px;
  display: flex;
  align-items: center;
}
.asset-charts {
  width: 100%;
  height: 300px;
}
.todo-container {
  display: flex;
}
.todo-container .box {
  display: flex;
  flex:1;
}
.box > div:first-child {
  text-align: center;
}
.box > .content {
  margin-left: 20px;
}
.box > .content h3 {
  color: #999;
  margin-bottom: 10px;
}
.box > .content ul {
  list-style: none;
}
.box >.content li {
  border-left: 2px solid #2d8cf0;
  padding-left: 5px;
  margin-top: 5px;
}
.box >.content li span {
  color: #2d8cf0;
  font-weight: bold;
}
.box >.content li span:last-child {
  margin-left: 20px;
}
.short-cuts-list {
  display: flex;
  align-items: center;
  height: 88px;
}
.short-cuts-list li {
  list-style: none;
}
.short-cuts {
  width: 50%;
  margin: 8px 0px;
  padding: 0 30px 0 24px;
}
.short-cuts + .short-cuts {
  border-left: 1px dashed #ccc;
}
.short-cuts-button {
  height: 40px;
}
.select-container {
  z-index: 10;
  position: absolute;
  right: 10%;
}
</style>
