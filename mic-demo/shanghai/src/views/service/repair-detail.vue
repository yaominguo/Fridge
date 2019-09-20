<template>
  <Card title="报修信息" dis-hover>
    <Row>
      <Col span="6"><span class="label">租客：</span><span>{{detail.tenantName}}</span></Col>
      <Col span="6"><span class="label">手机：</span><span>{{detail.tenantPhone}}</span></Col>
    </Row>
    <Row>
      <Col span="6"><span class="label">房源地址：</span><span>{{detail.address}}</span></Col>
      <Col span="6"><span class="label">报修内容：</span><span>{{detail.content}}</span></Col>
    </Row>
    <ActiveTable
      :columns="columns"
      :data="detail.repairRecordList"
      :showPager="false"
    >
      <template slot="header">
        <div class="title">
          <h4>维修记录</h4>
          <Button @click="showModal = true" type="primary" icon="md-add">新增</Button>
        </div>
      </template>
    </ActiveTable>
    <RepairModal :repairId="repairId" :showModal="showModal" @success="handleSuccess" @close="handleClose"/>
  </Card>
</template>

<script>
import ActiveTable from '@/components/Helper/Table/ActiveTable.vue';
import RepairModal from './components/repair-modal';

export default {
  name: 'RepairDetail',
  components: {
    ActiveTable,
    RepairModal,
  },
  data() {
    return {
      showModal: false,
      columns: [
        {
          title: '状态',
          key: 'status',
          width: 110,
          align: 'center',
          render: (h, params) => {
            const status = this.$com.transformRepairStatus(params.row.status);
            return h('div', [
              h('Tag', {
                props: {
                  color: status.color,
                },
              }, status.txt)
            ]);
          },
        },
        {
          title: '登记时间',
          key: 'time',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.registerTime.split(' ')[0]);
          },
        },
        {
          title: '处理人',
          key: 'dealingPeople',
          width: 120,
        },
        {
          title: '联系方式',
          key: 'phone',
          width: 120,
        },
        {
          title: '情况描述',
          key: 'situationDescription',
        },
      ],
      resultList: [],
      repairId: '',
      detail: {
        repairRecordList: [],
      },
    }
  },
  mounted() {
    const { repairId } = this.$route.query;
    this.repairId = repairId;
    this.getList();
  },
  methods: {
    getList() {
      this.$ajax.get(
        this,
        this.$api.GET_REPAIR_DETAIL + this.repairId,
        null,
        res => {
          this.detail = res.data.content;
        }
      )
    },
    handleSuccess() {
      this.showModal = false;
      this.$Message.success('登记成功');
      setTimeout(() => {
        this.getList();
      }, 0);
    },
    handleClose(val) {
      this.showModal = val;
    }
  },
}
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-top: none;
}
.label {
  width: 80px;
  display: inline-block;
  text-align: right;
}
</style>

