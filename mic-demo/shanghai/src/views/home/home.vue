<template>
  <div>
    <Row :gutter="24">
      <Col :span="6">
        <Card dis-hover title="空置率" icon="ios-pie">
          <p style="text-align: center; height: 120px; line-height: 120px;">
            <Circle :percent="rate">
              <span style="font-size:24px">{{rate}}%</span>
            </Circle>
          </p>
        </Card>
      </Col>
      <Col :span="6">
        <Card dis-hover title="本月收入情况" icon="ios-podium">
          <p style="text-align: center; height: 80px; line-height: 80px;">
            <Span style="font-size: 2rem;">{{income.received || 0}}</Span>
            <Span style="font-size: 16px; color: #ccc;">/</Span>
            <Span style="font-size: 1rem;">{{income.receivable || 0}}</Span>
            <!-- <Span style="font-size: 20px;">{{income.received || 0}}</Span>
            <Span style="font-size: 16px; color: #ccc;">/</Span>
            <Span style="font-size: 14px;">{{income.receivable || 0}}</Span> -->
          </p>
          <p style="text-align: left; height: 40px; line-height: 40px;">
            <Alert show-icon>包含租金、押金、生活缴费账单</Alert>
          </p>
        </Card>
      </Col>
      <Col :span="6">
        <Card dis-hover title="30天内合同到期情况" icon="ios-paper">
          <p style="text-align: left; height: 80px; line-height: 80px; font-size: 14px;">
            30天内将有<span style="color: #f90; font-size: 18px; padding: 0 4px;">{{renewalCount}}</span>份合同到期。
          </p>
          <Divider style="margin: 10px 0;" />
          <p style="text-align: right; height: 20px; line-height: 20px;">
            <a @click="routerTo('contract/lease-list', 'EXPIRE_SOON')">查看合同</a>
            <!-- <Divider type="vertical" />
            <a href="#">退租</a>
            <Divider type="vertical" />
            <a href="#">续签</a> -->
          </p>
        </Card>
      </Col>
      <Col :span="6">
        <Card dis-hover title="本月结余" icon="ios-analytics">
          <p style="text-align: center; height: 120px; line-height: 120px;">
            <Circle
              dashboard
              :trail-width="4"
              :percent="netIncomePercent"
              stroke-linecap="square"
              stroke-color="#19be6b">
                <span style="font-size:18px">{{netIncome}}</span>元
            </Circle>
          </p>
        </Card>
      </Col>
    </Row>
    <Row :gutter="24">
      <Col :span="18">
        <Card dis-hover class="income-stats-card" title="收入情况" icon="ios-stats">
          <ECharts :options="chartOptions"
          :init-options="initOptions"
          ref="bar"
          theme="ovilia-green"
          autoresize
          class="income-charts">
          </ECharts>
        </Card>
      </Col>
      <Col :span="6">
        <Card dis-hover class="income-card" title="收入情况" icon="ios-stats">

        </Card>
      </Col>
    </Row>
    <Card dis-hover class="short-cuts-card" title="快捷入口" icon="ios-paper-plane">
      <ul class="short-cuts-list">
        <li class="short-cuts">
          <Button class="short-cuts-button"
            type="primary"
            ghost
            icon="ios-add-circle"
            size="large"
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
            size="large"
            @click="routerTo('contract/tenant-register')"
            long>
            租客登记
          </Button>
        </li>
        <li class="short-cuts">
          <Button class="short-cuts-button"
            type="primary"
            ghost
            icon="ios-add-circle"
            size="large"
            @click="routerTo('account/list')"
            long>
            账单列表
          </Button>
        </li>
        <li class="short-cuts">
          <Button class="short-cuts-button"
            type="primary"
            ghost
            icon="ios-add-circle"
            size="large"
            @click="routerTo('house/distributed-house-status-diagram')"
            long>
            房态总览
          </Button>
        </li>
      </ul>
    </Card>
    <Card dis-hover
      class="todo-list-card"
      :title="todoListTitle"
      :icon="totoListIcon">
      <div class="todo-container">
        <div v-for="(todo, todoIndex) in todoList" :key="todoIndex" class="todo-list-wrapper">
          <h3 class="todo-list-header">{{ todo.header }}</h3>
          <ul class="todo-list">
            <li v-for="(item, itemIndex) in todo.list" :key="itemIndex" class="todo-list-item">
              <span class="todo-list-item-name">{{ item.name }}</span>
              <span @click="routerTo(item.router, item.params)" class="todo-list-item-content">{{ item.content }}</span>
            </li>
          </ul>
        </div>
        <div v-show="todoList.length <= 0" style="textAlign: center;">暂无待办事项</div>
      </div>
    </Card>
  </div>
</template>


<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts-liquidfill';

import theme from '@/assets/styles/chartTheme.json';

ECharts.registerTheme('ovilia-green', theme);

let option = {
  legend: {},
  tooltip: {},
  dataset: {
    // Provide data.
    source: [
      ['Product', '实际收入', '预估收入'],
      ['1月', 912, 712],
      ['2月', 1211, 1282],
      ['3月', 1312, 1512],
      ['4月', 912, 1712],
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
  // Declare X axis, which is a category axis, mapping
  // to the first column by default.
  xAxis: { type: 'category' },
  // Declare Y axis, which is a value axis.
  yAxis: {},
  // Declare several series, each of them mapped to a
  // column of the dataset by default.
  series: [
    { type: 'bar' },
    { type: 'bar' },
  ]
};

export default {
  components: {
    ECharts
  },
  data() {
    return {
      chartOptions: option,
      initOptions: {
        renderer: 'canvas'
      },
      renewalCount: 0, // 将到期待续租合同数目
      rate: 0, // 空置率
      netIncome: 0, // 本月结余
      income: {}, // 本月收入
      todoListTitle: '待办事项',
      totoListIcon: 'ios-list-box',
      todoList: [
        // {
        //   header: '财务',
        //   list: [
        //     {
        //       name: '房租',
        //       content: '59笔(696889元) 近30天房租欠款',
        //     },
        //     {
        //       name: '水电煤',
        //       content: '44笔(487269.6元) 近30天水电煤欠款',
        //     },
        //     {
        //       name: '未来3天',
        //       content: '87笔(198300元) 账单等待收款',
        //     },
        //   ],
        // },
        // {
        //   header: '租约',
        //   list: [
        //     {
        //       name: '登记',
        //       content: '114间已租房源等待录入租约',
        //     },
        //     {
        //       name: '续租',
        //       content: '23个租约即将到期等待续租',
        //     },
        //     {
        //       name: '退房',
        //       content: '5间房源等待退房处理',
        //     },
        //   ],
        // },
        // {
        //   header: '其他',
        //   list: [
        //     {
        //       name: '照片',
        //       content: '28间空置房源无照片，将无法进行展示',
        //     },
        //     {
        //       name: '业主',
        //       content: '94套房源等待录入业主',
        //     },
        //     {
        //       name: '报修',
        //       content: '无报修处理',
        //     },
        //   ],
        // },
      ],
    };
  },
  mounted() {
    this.fetchData().then(
      this.$ajax.get(
        this,
        this.$api.GET_TODO_COUNT,
        null,
        (res) => {
          this.fetchData();
        }
      )
    );;
  },
  methods: {
    fetchData() {
      // 同时请求空置率和待办事项
      return this.$ajax.all(
        this.getLeaseRate(),
        this.getTodoList(),
        this.getIncome(),
        this.getNetIncome(),
      )
    },
    getNetIncome() {
      return this.$ajax.get(
        this,
        this.$api.GET_NET_INCOME,
        {},
        (res) => {
          this.netIncome = res.data.content.amount;
        }
      )
    },
    getIncome() {
      return this.$ajax.get(
        this,
        this.$api.GET_INCOME,
        {},
        (res) => {
          this.income = res.data.content;
        }
      )
    },
    getLeaseRate() {
      return this.$ajax.get(
        this,
        this.$api.GET_LEASE_RATE,
        {},
        (res) => {
          this.rate = res.data.content;
        }
      );
    },
    getTodoList() {
      return this.$ajax.get(
        this,
        this.$api.GET_TODO_LIST,
        {},
        (res) => {
          const data = res.data.content, result = [];
          for (let key in data) {
            const header = this.transformHeader(key);
            let list = [];
            for(let i=0; i<data[key].length; i++) {
              const item = data[key][i];
              const todoItem = this.transformList(item);
              if (!todoItem) continue;
              list.push(todoItem);
            }
            if(list && list.length > 0) {
              result.push({
                header,
                list,
              })
            }
          }
          this.todoList = result;
        }
      );
    },
    transformHeader(name) {
      switch (name) {
        case 'accountingArr':
          return '账务';
        case 'leaseArr':
          return '租约';
        case 'otherArr':
          return '其他';
        default:
          return '';
      };
    },
    transformList(obj) {
      switch (obj.type) {
        case 'lease_arrears':
          if (obj.scope != 30) {
            return null;
          }
          return {
            name: '房租',
            content: `${obj.numCount}笔（${obj.amtCount}元）近30天房租欠款`,
          };
        case 'convenient_arrears':
          if (obj.scope != 30) {
            return null;
          }
          return {
            name: '水电煤',
            content: `${obj.numCount}笔（${obj.amtCount}元）近30天水电煤欠款`,
          };
        case 'collection_bills':
          if (obj.scope != 30) {
            return null;
          }
          return {
            name: '待收款',
            content: `${obj.numCount}笔（${obj.amtCount}元）账单等待收款`,
          };
        case 'registration':
          return {
            name: '登记',
            content: `${obj.numCount}间已租房源等待录入租约`,
            router: 'contract/lease-list',
            params: 'EXPIRE_SOON',
          };
        case 'renewal':
          this.renewalCount = obj.numCount; // 将到期合同数目
          return {
            name: '续租',
            content: `${obj.numCount}个租约即将到期等待续租`,
            router: 'contract/lease-list',
            params: 'EXPIRE_SOON',
          };
        case 'checkout':
          return {
            name: '退房',
            content: `${obj.numCount}间房源等待退房处理`,
            router: 'contract/lease-list',
            params: 'REBACK',
          };
        case 'without_pic':
          return {
            name: '照片',
            content: `${obj.numCount}间空置房源无照片，将无法进行展示`,
          };
        case 'without_owner':
          return {
            name: '业主',
            content: `${obj.numCount}套房源等待录入业主`,
          };
        case 'repair':
          return {
            name: '报修',
            content: `${obj.numCount}套房源申请报修`,
          };
        default:
          return {};
      };
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
    netIncomePercent() {
      const num = Number.parseFloat((this.netIncome).toString().replace(/,/g,''));
      const result = (num / 100000) * 100;
      return result >= 100 ? 100 : result;
    }
  },
};
</script>

<style scoped>
.rate {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
}
.short-cuts-list li {
  list-style: none;
  display: inline-block;
  margin-right: 0;
}
.short-cuts {
  width: 200px;
  margin: 8px 0px;
  padding: 0 30px 0 24px;
  border-right: 1px dashed #ccc;
}
.short-cuts-button {
  height: 40px;
}
.income-stats-card, .income-card, .short-cuts-card, .todo-list-card {
  margin-top: 24px;
}
.todo-container {
  display: flex;
}
.todo-list-wrapper {
  display: inline-block;
  margin: 12px 96px 12px 12px;
}
.todo-list-header {
  color:  #a0a0a0;
  margin-bottom: 8px;
}
.todo-list {
  margin-left: 16px;
}
.todo-list-item {
  list-style: none;
  height: 40px;
}
.todo-list-item-name {
  color: #2d8cf0;
  border-left: 2px solid #2d8cf0;
  padding-left: 8px;
  display: inline-block;
  width: 60px;
  height: 24px;
  line-height: 24px;
  margin: 4px 0;
}
.todo-list-item-content {
  margin-left: 16px;
  cursor: pointer;
}
.todo-list-item-content:hover {
  color: #2d8cf0;
}
.income-charts {
  width: 100%;
}
</style>
