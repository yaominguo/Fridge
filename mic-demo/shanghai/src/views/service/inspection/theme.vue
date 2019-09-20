<template>
	<Card dis-hover :bordered="false">
		<ActiveForm labelPosition="right" :labelWidth="80" :header="null" :layout="searchLayout" :model="searchModel">
			<Row type="flex" justify="space-between">
				<Col><Button type="primary" @click="$router.push({name:'patrol/addTheme'})">+添加主题</Button></Col>
				<Col><Button type="primary" @click="handleSearch">查询</Button>
				<Button @click="handleReset">重置</Button></Col>
			</Row>
		</ActiveForm>
		<ActiveTable :showTitle="true" :columns="columns" :data="resultList" :pageSize="pageSize" :current="pageNo" :total="total"
		 @on-page-change="changePage" />
	</Card>
</template>

<script>
import ActiveForm from "@/components/Helper/Form/ActiveForm.vue";
import ActiveTable from "@/components/Helper/Table/ActiveTable.vue";

export default {
  name: "RepairList",
  components: {
    ActiveForm,
    ActiveTable
  },
  data() {
    return {
      total: 0,
      pageNo: 1,
      pageSize: 10,
      showModal: false,
      searchLayout: [
        {
          name: {
            label: "主题名称",
            type: "input",
            width: 6
          },
          obj: {
            label: "检查对象",
            type: "select",
            options: [
              {
                text: "小区",
                value: "0"
              },
              {
                text: "楼栋",
                value: "1"
              },
              {
                text: "停车位",
                value: "2"
              },
              {
                text: "广告位",
                value: "3"
              },
              {
                text: "分户",
                value: "4"
              }
            ],
            width: 6
          },
          operatorType: {
            label: "检查人类型",
            type: "select",
            options: [
              {
                text: "内部",
                value: "in"
              },
              {
                text: "外部",
                value: "out"
              }
            ],
            width: 6
          },
          status: {
            label: "主题状态",
            type: "select",
            options: [
              {
                text: "使用中",
                value: 1
              },
              {
                text: "未使用",
                value: 0
              }
            ],
            width: 6
          }
        }
      ],
      searchModel: {},
      columns: [
        {
          title: "主题名称",
          key: "name"
        },
        {
          title: "检查对象",
          key: "obj",
          width: 150,
          render: (h, params) => {
            let obj = params.row.obj;
            let msg = "";
            switch (obj) {
              case "0":
                msg = "小区";
                break;
              case "1":
                msg = "楼栋";
                break;
              case "2":
                msg = "停车位";
                break;
              case "3":
                msg = "广告位";
                break;
              case "4":
                msg = "分户";
                break;
              default:
                break;
            }
            return h("div", {}, msg);
          }
        },
        {
          title: "检查人类型",
          key: "operatorType",
          width: 150,
          render: (h, params) => {
            let obj = params.row.operatorType;
            let msg = "";
            switch (obj) {
              case "in":
                msg = "内部";
                break;
              case "out":
                msg = "外部";
                break;
              default:
                break;
            }
            return h("div", {}, msg);
          }
        },
        {
          title: "主题状态",
          key: "status",
          width: 150,
          render: (h, params) => {
            let obj = params.row.status;
            let msg = "";
            switch (obj) {
              case "0":
                msg = "未使用";
                break;
              case "1":
                msg = "使用中";
                break;
              default:
                break;
            }
            return h("div", {}, msg);
          }
        },
        {
          title: "操作",
          key: "actions",
          width: 180,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    ghost: true,
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "patrol/showTheme",
                        query: {
                          id: params.row.id
                        }
                      });
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "patrol/editTheme",
                        query: { id: params.row.id }
                      });
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      resultList: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const params = Object.assign(this.searchModel, {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      });
      this.$ajax.get(this, this.$api.GET_TOPIC_LISTS, params, res => {
        this.resultList = this.$com.confirm(res, "data.content", []);
        this.total = res.data.totalRows;
      });
    },
    handleReset() {
      this.pageNo = 1;
      this.searchModel = {};
      this.getList();
    },
    handleSearch() {
      this.pageNo = 1;
      this.getList();
    },
    changePage(page) {
      this.pageNo = page;
      this.getList();
    }
  }
};
</script>

<style scoped>
.btn-box {
  display: flex;
  justify-content: flex-end;
}

.btn-box > button {
  margin-left: 10px;
  min-width: 86px;
}
</style>
