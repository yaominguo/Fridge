<template>
  <div class="house-info">
    <table class="house-info-table">
      <tr>
        <td class="house-info-header">详情</td>
        <td class="house-info-header house-info-operation">操作</td>
      </tr>
      <tr>
        <td class="house-info-section">
          <div class="house-info-section-header">分户信息</div>
          <div class="house-info-section-content">室号：{{info.roomNo}}</div>
          <!-- <div class="house-info-section-content">建筑面积：{{info.buildArea}}m²</div> -->
          <div class="house-info-section-content">预测面积：{{info.predictedArea}}m²</div>
          <div class="house-info-section-content">套内面积：{{info.realArea}}m²</div>
          <div class="house-info-section-content">出资人：{{info.spnonsorName}}</div>
          <div class="house-info-section-content">取得方式：{{info.acquisitionMethodName}}</div>
          <div class="house-info-section-content">房型：{{info.apartmentTypeName || '未知'}}</div>
          <div class="house-info-section-content">资产类型：{{info.useAndClassName}}</div>
          <div class="house-info-section-content">资产用途：{{info.assetUseName}}</div>
          <div class="house-info-section-content">是否收益：{{info.haveIncome == '1' ? '是' : '否'}}</div>
        </td>
        <td class="house-info-section house-info-operation">
          <template v-if="info.checkStatus == '0'">
            <div class="house-info-section-operation">
              <a @click="handleEdit" href="#">修改</a>
            </div>
            <div class="house-info-section-operation">
              <a @click="handleAdd" href="#">提交新增审批</a>
            </div>
            <div class="house-info-section-operation">
              <a @click="handleDelete" href="#">删除</a>
            </div>
          </template>
          <template v-else-if="info.checkStatus == '1'">
            <div class="house-info-section-operation">
              <a @click="handleBack('0')" href="#">撤回新增审批</a>
            </div>
          </template>
          <template v-else-if="info.checkStatus == '2'">
            <div class="house-info-section-operation">
              <a @click="handleBack('5')" href="#">撤回修改审批</a>
            </div>
          </template>
          <template v-else-if="info.checkStatus == '3'">
            <div class="house-info-section-operation">
              <a @click="handleBack('5')" href="#">撤回作废审批</a>
            </div>
          </template>
          <template v-else-if="info.checkStatus == '5'">
            <div class="house-info-section-operation">
              <a @click="handleEdit" href="#">修改</a>
            </div>
            <div class="house-info-section-operation">
              <a @click="handleEdit" href="#">作废</a>
            </div>
          </template>
          <template v-else-if="info.checkStatus == '7'">
            <template v-if="info.dataStatus == '0'">
              <div class="house-info-section-operation">
                <a @click="handleEdit" href="#">修改</a>
              </div>
              <div class="house-info-section-operation">
                <a @click="handleAdd" href="#">提交新增审批</a>
              </div>
              <div class="house-info-section-operation">
                <a @click="handleDelete" href="#">删除</a>
              </div>
            </template>
            <template v-else-if="info.dataStatus == '1'">
              <div class="house-info-section-operation">
                <a @click="handleEdit" href="#">修改</a>
              </div>
              <div class="house-info-section-operation">
                <a @click="handleCancel" href="#">作废</a>
              </div>
            </template>
          </template>
        </td>
      </tr>
      <tr>
        <td class="house-info-section last-section">
          <div class="house-info-section-header">产证信息</div>
          <div class="house-info-section-content">产证人：{{info.userName}}</div>
          <div class="house-info-section-content">产证编号：{{info.rightNo}}</div>
          <div class="house-info-section-content">产证类型：{{info.rightType}}</div>
          <div class="house-info-section-content">产证面积：{{(info.rightArea && info.rightArea!='0') ? info.rightArea + 'm²' : ''}}</div>
          <div class="house-info-section-content">颁证日期：{{info.rightTime && info.rightTime.split('T')[0]}}</div>
        </td>
      </tr>
    </table>
    <Modal
      v-model="discardModal"
      title="作废资产">
      <Form v-if="discardModal" ref="deleteForm" :label-width="120" :rules="rules" :model="deleteInfo">
        <FormItem label="作废原因" prop="deleteReason">
          <Select v-model="deleteInfo.deleteReason">
            <Option value="信息填写错误">信息填写错误</Option>
            <Option value="划转">划转</Option>
            <Option value="出售">出售</Option>
            <Option value="拆除">拆除</Option>
          </Select>
        </FormItem>
        <FormItem label="备注说明">
          <Input v-model="deleteInfo.deleteRemark" type="textarea" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="discardOk" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>


<script>
export default {
  name: 'RoomInfo',
  props: {
    info: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      options: [
        {
          id: '0',
          name: '自用',
        },
        {
          id: '1',
          name: '出租',
        },
        {
          id: '2',
          name: '出售',
        },
      ],
      deleteInfo: {},
      discardModal: false,
      rules: {
        deleteReason: [{
          required: true,
          message: "请选择作废原因",
        }],
      },
    }
  },
  methods: {
    handleEdit() {
      this.$emit('toEditHouse', this.info);
    },
    handleDelete() {
      this.$emit('close');
      this.$Modal.confirm({
        title: '确认删除分户信息？',
        content: '<p>删除后，数据将无法恢复或找回。</p>',
        onOk: () => {
          this.$ajax.delete(
            this,
            this.$api.ASSET_HOUSE + this.info.id,
            null,
            () => {
              this.$Message.success('删除成功');
              this.$emit('success');
            }
          )
        },
      });
    },
    handleAdd() {
      this.$emit('close');
      this.$Modal.confirm({
        title: '确认新增分户信息？',
        content: '<p>资产新增需由专人审批后方可生效。生效后，不可撤回。</p>',
        onOk: () => {
          this.$ajax.post(
            this,
            this.$api.POST_ADD_VERIFY.replace('{id}', this.info.id),
            null,
            () => {
              this.$Message.success('提交成功');
              this.$emit('success');
            }
          )
        },
      });
    },
    handleBack(status) {
      this.$emit('close');
      this.$Modal.confirm({
        title: '是否确认撤回审批',
        content: '<p>审批撤回后，原修改内容将失效。</p>',
        onOk: () => {
          this.$ajax.put(
            this,
            this.$api.POST_BACK_VERIFY.replace('{id}', this.info.id) + '?status=' + status,
            null,
            () => {
              this.$Message.success('撤回成功');
              this.$emit('success');
            }
          )
        }
      })
    },
    handleCancel() {
      this.$emit('close');
      this.deleteInfo = {};
      this.discardModal = true;
    },
    discardOk() {
      this.$refs.deleteForm.validate(valid => {
        if (!valid) return;
        this.discardModal = false;
        this.$Modal.confirm({
          title: '确认作废分户信息？',
          content: '<p>资产作废需由专人审批后方可生效。生效后，不可撤回。</p>',
          onOk: () => {
            this.$ajax.delete(
              this,
              this.$api.DELETE_ROOM.replace('{id}', this.info.id).replace('{status}', '1'),
              {...this.deleteInfo, status: '3'},
              () => {
                this.$Message.success('作废成功');
                this.deleteInfo = {};
                this.$emit('success');
              },
            )
          }
        })
      })
    },
  },
};
</script>


<style scoped>
.house-info {
  width: 100%;
  height: 100%;
}
.house-info-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 4px;
}
.house-info-table td {
  padding: 4px 8px 4px 16px;
}
.house-info-header {
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  height: 32px;
  line-height: 32px;
  font-weight: bold;
}
.house-info-section {
  border-bottom: 1px dashed #ccc;
  height: 24px;
  line-height: 24px;
}
.house-info-section.last-section {
  border-bottom: none;
}
.house-info-operation {
  width: 30%;
  border-left: 1px dashed #efefef;
}
.house-info-section.house-info-operation {
  vertical-align: text-top;
}
.house-info-section-header {
  font-size: 14px;
  font-weight: bold;
}
</style>
