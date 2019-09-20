<template>
<Card dis-hover>
  <div class="editTitle">{{(newData.communityName || '') + ' | ' + (newData.buildingName || '') + (newData.roomNo || '')}}</div>
  <Row class="row">
    <Col :span="8"><span>总楼层数：</span><span>{{newData.floorCount | txt}}</span></Col>
    <Col :span="8"><span>所在楼层：</span><span>{{newData.houseFloor | txt}}</span></Col>
    <Col :span="8"><span>室号：</span><span>{{newData.roomNo | txt}}</span></Col>
    <Col :span="8"><span>实际户型：</span><span>{{apartmentType | txt}}</span></Col>
    <Col :span="8"><span>取得方式：</span><span>{{newData.acquisitionMethodName | txt}}</span></Col>
    <Col :span="8"><span>出资人：</span><span>{{newData.spnonsorName | txt}}</span></Col>
    <Col :span="8"><span>资产用途：</span><span>{{newData.assetUseName | txt}}</span></Col>
    <Col :span="8"><span>资产类型：</span><span>{{newData.useAndClassName | txt}}</span></Col>
    <Col :span="8"><span>是否盈利：</span><span>{{newData.haveIncome == '1' ? '是' : '否'}}</span></Col>
    <Col :span="8"><span>套内面积(㎡)：</span><span>{{newData.realArea | txt}}</span></Col>
    <Col :span="8"><span>预测(建筑)面积(㎡)：</span><span>{{newData.predictedArea | txt}}</span></Col>
    <Col :span="8"><span>每平方米月租金(元)：</span><span>{{newData.squareMeterMonthlyRent | txt}}</span></Col>
    <Col :span="8"><span>付款方式：</span><span>{{payMethod | txt}}</span></Col>
    <Col :span="8"><span>租金(元/月)：</span><span>{{newData.rent | txt}}</span></Col>
    <Col :span="8"><span>押金(元)：</span><span>{{newData.deposit | txt}}</span></Col>
    <Col :span="18"><span>水电煤户号：</span><span>{{billsNum | txt}}</span></Col>
    <Col :span="18"><span>房间配置：</span><span>{{configList | txt}}</span></Col>
  </Row>
  <Divider dashed />
  <Row class="row">
    <Col :span="8"><span>产证人：</span><span>{{newData.userName | txt}}</span></Col>
    <Col :span="8"><span>产证编号：</span><span>{{newData.rightNo | txt}}</span></Col>
    <Col :span="8"><span>产证类型：</span><span>{{newData.rightType | txt}}</span></Col>
    <Col :span="8"><span>颁证日期：</span><span>{{newData.rightTime | date | txt}}</span></Col>
    <Col :span="8"><span>产证面积(㎡)：</span><span>{{newData.rightArea | txt}}</span></Col>
    <Col :span="8"><span>产证实用面积(㎡)：</span><span>{{newData.rightInsideArea | txt}}</span></Col>
  </Row>
  <Divider dashed />
  <ActiveTable
    :columns="tableLayout"
    :data="resultList"
    :showPager="false" />
  <Divider dashed />
  <div class="btn-box">
    <Button @click="$router.back()" type="primary">返回</Button>
  </div>
</Card>
</template>

<script>
import ActiveTable from '@/components/Helper/Table/ActiveTable';
export default {
  name: 'RoomDetail',
  components: {
    ActiveTable,
  },
  data() {
    return {
      newData: {},
      tableLayout: [
        {
          title: '审批结果',
          key: 'result',
          render: (h, params) => {
            return h('div', this.$com.transformCheckStatus(params.row.checkStatus));
          }
        },
        {
          title: '审批内容',
          key: 'auditReason',
        },
        {
          title: '审批人',
          key: 'verifyUser',
        },
        {
          title: '审批时间',
          key: 'createTime',
        },
      ],
      resultList: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.id) {
        this.getInfo(this.$route.query.id);
      }
    })
  },
  methods: {
    getInfo(id) {
      this.$ajax.get(
        this,
        this.$api.GET_ROOM_INFO + id,
        null,
        res => {
          this.newData = this.$com.confirm(res, 'data.content.value', {});
          const {verifyUser, createTime, auditReason, checkStatus} = this.newData;
          if (verifyUser && createTime && checkStatus) {
            this.resultList.push({verifyUser, createTime, auditReason, checkStatus});
          }
        }
      )
    },
  },
  filters: {
    txt(val) {
      return val || '暂无';
    },
    date(val) {
      if (!val) return '暂无';
      return val.split('T')[0];
    },
  },
  computed: {
    apartmentType() {
      const {roomNum, parlourNum, toiletNum} = this.newData;
      return `${roomNum}室${parlourNum}厅${toiletNum}卫`;
    },
    payMethod() {
      const {payNum, mortgageNum, deposit} = this.newData;
      return `付${payNum}押${(!mortgageNum || mortgageNum == 'auto') ? (deposit + '元') : mortgageNum}`;
    },
    billsNum() {
      const {waterNum, elecNum, gasNum} = this.newData;
      return `水-${waterNum}  电-${elecNum}  煤-${gasNum}`;
    },
    configList() {
      const {roomConfigList} = this.newData;
      if (!roomConfigList || roomConfigList.length <= 0) {
        return '暂无';
      }
      const list = roomConfigList.map(item => item.name);
      return list.join(' ');
    },
  },
}
</script>

<style scoped>
.editTitle {
  font-size: 16px;
  padding: 7px 8px;
  border-bottom: 1px dashed #e9e9e9;
  margin-bottom: 21px;
  position: relative;
}
.editTitle:before {
  content: " ";
  display: block;
  position: absolute;
  width: 4px;
  height: 20px;
  background: #e9e9e9;
  left: 0;
  top: 8px;
}
.row > div {
  display: flex;
  align-items: center;
  min-height: 45px;
}
.row > div > span:first-child{
  display: inline-block;
  min-width: 150px;
  text-align: right;
}
.btn-box {
  text-align: center;
}
.btn-box>button {
  min-width: 86px;
}
</style>
