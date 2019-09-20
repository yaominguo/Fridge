// 公租房首页
<template>
<div>
  <Row :gutter="10">
    <Col :span="8">
      <Card dis-hover title="资产租赁信息" icon="ios-list-box" style="height:190px;">
        <div class="rent-container">
          <div>
            <Circle :percent="countPercent" :size="50">
              <span style="font-size:16px;font-weight: bold;">{{countPercent}}%</span>
            </Circle>
            <p>{{rentInfo.count || 0}}/{{rentInfo.countTotal || 0}}</p>
            <span>公租房屋数量已租/全量</span>
          </div>
          <div>
            <Circle :percent="areaPercent" :size="50" stroke-color="#5cb85c">
              <span style="font-size:16px;font-weight: bold;">{{areaPercent}}%</span>
            </Circle>
            <p>{{rentInfo.sumArea || 0}}/{{rentInfo.sumAreaTotal || 0}}</p>
            <span>公租房屋面积已租/全量</span>
          </div>
        </div>
      </Card>
    </Col>
    <Col :span="8">
      <Card dis-hover title="合同到期情况" icon="ios-list-box" style="height:190px;">
        <div class="info-container">
          <p>近1个月内将有 <span>{{expireInfo.next1Date}}</span> 份合同到期</p>
          <p>近3个月内将有 <span>{{expireInfo.next3Date}}</span> 份合同到期</p>
          <Divider style="margin: 10px 0;" />
          <p style="text-align: right; line-height: 20px;">
            <a @click="routerTo('public-housing/lease/lease-list', 'EXPIRE_SOON')">查看合同</a>
          </p>
        </div>
      </Card>
    </Col>
    <Col :span="8">
      <Card dis-hover title="逾期未缴情况" icon="ios-list-box" style="height:190px;">
        <div class="info-container">
          <p>本月有 <span>{{overInfo.nowOverdue}}</span> 元账单逾期未缴</p>
          <p>往期有 <span>{{overInfo.beforeOverdue}}</span> 元账单逾期未缴</p>
          <Divider style="margin: 10px 0;" />
          <p style="text-align: right; line-height: 20px;">
            <a @click="routerTo('public-housing/finance/account-list')">查看账单</a>
          </p>
        </div>
      </Card>
    </Col>
  </Row>
  <Card dis-hover title="收入情况" icon="ios-podium" style="margin: 12px 0;">
    <div class="select-container">
      <Select @on-change="selectYear" size="small" style="width:70px" :value="year">
        <Option v-for="y in yearOptions" :key="y" :value="y">{{y}}</Option>
      </Select>
    </div>
    <ECharts
      :options="chartOptions"
      :init-options="initOptions"
      ref="bar"
      theme="ovilia-green"
      autoresize
      class="public-charts" />
  </Card>
  <Card dis-hover class="short-cuts-card" title="快捷入口" icon="ios-paper-plane">
    <ul class="short-cuts-list">
      <li class="short-cuts" v-for="item in shortCuts" :key="item.name">
        <Button class="short-cuts-button"
          type="primary"
          ghost
          icon="ios-add-circle"
          @click="routerTo(item.path)"
          long>
          {{item.name}}
        </Button>
      </li>
    </ul>
  </Card>
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
    axisPointer: {
      type: 'shadow',
    }
  },
  dataset: {
    // Provide data.
    source: [
      ['Income', '使用政策性减免', '使用临时性减免', '本月应收', '实收入账', '往期欠款补收'],
      ['1月', 0, 0, 0, 0, 0],
      ['2月', 0, 0, 0, 0, 0],
      ['3月', 0, 0, 0, 0, 0],
      ['4月', 0, 0, 0, 0, 0],
      ['5月', 0, 0, 0, 0, 0],
      ['6月', 0, 0, 0, 0, 0],
      ['7月', 0, 0, 0, 0, 0],
      ['8月', 0, 0, 0, 0, 0],
      ['9月', 0, 0, 0, 0, 0],
      ['10月', 0, 0, 0, 0, 0],
      ['11月', 0, 0, 0, 0, 0],
      ['12月', 0, 0, 0, 0, 0],
    ]
  },
  // Declare X axis, which is a category axis, mapping
  // to the first column by default.
  xAxis: { type: 'category' },
  // Declare Y axis, which is a value axis.
  yAxis: { name: '金额(万)' },
  // Declare several series, each of them mapped to a
  // column of the dataset by default.
  series: [
    { type: 'bar', barGap: 0, barWidth: '20%', stack: '应收', itemStyle: {color: '#4273fc'}},
    { type: 'bar', barGap: 0, barWidth: '20%', stack: '应收', itemStyle: {color: '#42a2fc'}},
    { type: 'bar', barGap: 0, barWidth: '20%', stack: '应收', itemStyle: {color: '#75d8ff'}},
    { type: 'bar', barGap: 0, barWidth: '20%', stack: '实收', itemStyle: {color: '#6c5bda'}},
    { type: 'bar', barGap: 0, barWidth: '20%', stack: '实收', itemStyle: {color: '#947fea'}},
  ]
};
export default {
  name: 'PublicHome',
  components: {
    ECharts,
  },
  data() {
    return {
      chartOptions: option,
      initOptions: {
        renderer: 'canvas'
      },
      shortCuts: [
        {name: '政策性减免', path: 'publicHousing/RegularityReduction'},
        {name: '租约列表', path: 'public-housing/lease/lease-list'},
        {name: '账单列表', path: 'public-housing/finance/account-list'},
        {name: '房态总览', path: 'public-housing/housing/distributed-house-status-diagram'},
      ],
      year: null,
      yearOptions: [],
      rentInfo: {
        count: 0,
        countTotal: 0,
        sumArea: 0,
        sumAreaToal: 0,
      },
      expireInfo: {
        next1Date: 0,
        next3Date: 0,
      },
      overInfo: {
        beforeOverdue: 0,
        nowOverdue: 0,
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      const curYear = new Date().getFullYear();
      this.year = curYear;
      this.yearOptions = Array.from({length: 5}).map((e, i) => curYear - i);
      this.$ajax.all(
        this.getIncome(),
        this.getOverdue(),
        this.getExpires(),
        this.getRent(),
      )
    })
  },
  methods: {
    selectYear(val) {
      this.year = val;
      this.getIncome();
    },
    getIncome() { // 收入情况
      return this.$ajax.get(
        this,
        this.$api.GET_INCOME_INFO + '?query=' + this.year,
        null,
        res => {
          //0-当月应收 1-当月实收 2-预存款入账 3-预存款使用 4-政策性减免使用 5-临时性减免使用  6-往期补缴
          const data = this.$com.confirm(res, 'data.content', []);
          const obj = {}, monthList = ['1','2','3','4','5','6','7','8','9','10','11','12'];
          monthList.forEach(month => {
            obj[month] = [];
            data.forEach(item => {
              const dataMonth = item.month.startsWith('0') ? item.month.split('0')[1] : item.month;
              if (dataMonth == month) {
                obj[month].push(item);
              }
            })
          })
          const list = [], typeList = [4, 5, 0, 1, 6];
          for(let key in obj) {
            const result = [0,0,0,0,0];
            if (obj[key].length > 0) {
              obj[key].forEach(item => {
                typeList.forEach((type, i) => {
                  if (type == item.type) {
                    result[i] = item.amount;
                  }
                })
              });
            }
            list.push([key + '月', ...result]);
          }
          option.dataset.source = [option.dataset.source[0], ...list];
          this.chartOptions = option;
        }
      )
    },
    getRent() { // 租赁信息
      return this.$ajax.get(
        this,
        this.$api.GET_RENT + '0',
        null,
        res => {
          this.rentInfo = res.data.content;
        },
        true,
      )
    },
    getOverdue() { // 逾期
      return this.$ajax.get(
        this,
        this.$api.GET_OVERDUE,
        null,
        res => {
          this.overInfo = res.data.content;
        },
        true,
      )
    },
    getExpires() { // 合同到期情况
      return this.$ajax.get(
        this,
        this.$api.GET_EXPIRES,
        null,
        res => {
          this.expireInfo = this.$com.confirm(res, 'data.content');
        },
        true
      )
    },
    routerTo(name, status) {
      this.$router.push({
        name,
        params: {
          status,
        },
      });
    },
  },
  computed: {
    countPercent() {
      const { count, countTotal } = this.rentInfo;
      if (!countTotal || countTotal <= 0) return 0;
      const result = Math.round((count / countTotal) * 100);
      return isNaN(result) ? 0 : result;
    },
    areaPercent() {
      const { sumArea, sumAreaTotal } = this.rentInfo;
      if (!sumAreaTotal || sumAreaTotal <= 0 ) return 0;
      const result = Math.round((sumArea / sumAreaTotal) * 100);
      return isNaN(result) ? 0 : result;
    },
  },
}
</script>

<style scoped>
.rent-container{
  display: flex;
}
.rent-container>div{
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.rent-container>div>p {
  font-size: 18px;
  font-weight: bold;
}
.rent-container>div>span {
  font-size: 12px;
  color: #999;
}
.info-container>p{
  line-height: 30px;
}
.info-container>p>span {
  font-size: 18px;
  font-weight: bold;
  color: #2d8cf0;
}
.public-charts {
  width: 100%;
  height: 300px;
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
  width: 15%;
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
  right: 11%;
}
</style>
