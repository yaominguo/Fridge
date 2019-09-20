<template>
  <Card dis-hover>
    <div class="bar">
      <div>
        <span>{{building.communityName}} | {{building.name}}</span>
      </div>
      <div>
        <span>显示模式：</span>
        <Button @click="changeView('table')" :class="isTable ? '' : 'gray'" :style="isTable ? '' : {color: 'gray',borderColor: '#eee'}" type="primary" size="small" icon="md-list" ghost />
        <Button @click="changeView('')" :style="isTable ? {color: 'gray',borderColor: '#eee'} : ''" type="primary" size="small" icon="md-apps" ghost />
        <Button style="marginLeft: 10px;" @click="toAddAsset(null)" type="primary">新增分户</Button>
      </div>
    </div>
    <div v-if="isTable">
      <RoomTable
        :data="list"
        :pageSize="pageSize"
        :pageNo="pageNo"
        :total="total"
        @success="handleReset"
        @changePage="changePage"
      />
    </div>
    <div v-else>
      <div v-show="!viewList || viewList.length<=0" style="textAlign: center; height: 100px;lineHeight: 100px;">
        暂无数据
      </div>
      <div class="building" v-for="views in viewList" :key="views.floor">
        <div class="floor">
          <span>{{views.floor}}</span>
        </div>
        <div class="room-list">
          <div class="room" v-for="item in views.list" :key="item.id">
            <Icon @click="showHouseInfo(item)" class="set-btn" type="md-settings" />
            <div class="content" style="marginTop: 25px;">
              <span>室号：{{item.roomNo}}</span>
              <span>户型：{{item.apartmentTypeName || '未知'}}</span>
            </div>
            <div class="content">
              <span>{{leaseStatus(item.leaseStatus)}}</span>
              <span>{{$com.transformCheckStatus(item.checkStatus)}}</span>
            </div>
            <div class="footer">
              <!-- <span>建筑面积：{{item.buildArea || '未知' }}m²</span> -->
              <span>预测：{{item.predictedArea || '未知'}}m²</span>
              <span>套内：{{item.realArea || '未知'}}m²</span>
            </div>
          </div>
          <div class="add-room-btn">
            <Button @click="toAddAsset(views.floor)" type="text" icon="md-add">新增本层分户</Button>
          </div>
        </div>
      </div>
    </div>
    <Drawer v-model="showInfo" :width="400">
      <RoomInfo @close="showInfo=false" @success="handleReset" @toEditHouse="editRow" :info="roomData" />
    </Drawer>
  </Card>
</template>

<script>
import RoomInfo from './roomInfo';
import ActiveTable from '@/components/Helper/Table/ActiveTable';
import RoomTable from '@/views/asset/rooms/room-table';

export default {
  name: 'RoomManagement',
  components: {
    RoomInfo,
    ActiveTable,
    RoomTable,
  },
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      building: {},
      showInfo: false,
      showStyle: 'table',
      list: [],
      roomData: {},
    };
  },
  mounted() {
    const building = JSON.parse(localStorage.getItem('buildingInfo'));
    // const building = this.$store.state.buildingInfo;
    if (building) {
      this.building = building;
      this.getData();
    }
  },
  methods: {
    getData() {
      this.showStyle == 'table' ? this.pageSize = 10 : this.pageSize = 1000;
      const params = {
        floorId: this.building.id,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        status: '0',
      };
      this.$ajax.post(
        this,
        this.$api.ASSET_HOUSE_LIST,
        params,
        (res) => {
          this.total = res.data.totalRows;
          this.list = res.data.content;
        }
      )
    },
    handleReset() {
      this.showInfo = false;
      this.pageNo = 1;
      this.getData();
    },
    changeView(type) {
      this.showStyle = type;
      this.pageNo = 1;
      this.getData();
    },
    toAddAsset(floor) {
      this.$router.push({
        name: 'add-single-room',
        query: {
          buildingId: this.building.id,
          curFloor: floor,
          communityId: this.building.communityId,
          communityName: this.building.communityName,
        },
      });
    },
    editRow(data) {
      this.showInfo = false;
      setTimeout(() => {
        this.$router.push({
          name: 'add-single-room',
          query: {
            id: data.id,
            isEdit: '1',
          },
        })
      }, 0)
    },
    showHouseInfo(data) {
      this.roomData = data;
      this.showInfo = true;
    },
    changePage(page) {
      this.pageNo = page;
      this.getData();
    },
    leaseStatus(status) {
      switch (status) {
        case '0':
          return '未运营';
        case '1':
          return '运营中/未租';
        case '2':
          return '运营中/已租';
        default:
          return '';
      }
    },
  },
  computed: {
    isTable() {
      return this.showStyle == 'table';
    },
    viewList() {
      if (!this.list || this.list.length <= 0) return;
      const obj = {}, result = [];
      this.list.forEach(item => {
        if (!obj[item.houseFloor]) {
          obj[item.houseFloor] = [];
        }
        obj[item.houseFloor].push(item);
      })
      for (let key in obj) {
        result.push({
          floor: key,
          list: obj[key],
        });
      }
      return result;
    },
  },
}
</script>

<style scoped>
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.gray {
  color: 'gray';
  border-color: 'gray';
}
.building {
  display: flex;
  border: 1px solid #dedede;
}
.building + .building {
  border-top: none;
}
.building .floor {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  background: #eee;
  font-size: 14px;
}
.room-list {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  padding: 10px;
}
.room-list > .room {
  background: #2d8cf0;
  border: 1px solid #eee;
  width: 240px;
  height: 100px;
  color: #fff;
  position: relative;
  margin: 0 5px 10px;
}
.room-list .content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.room-list .footer {
  display: flex;
  justify-content: space-between;
  background: #fff;
  color: #999;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  font-size: 12px;
}
.set-btn {
  color: #fff;
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 16px;
  cursor: pointer;
}
.add-room-btn {
  width: 240px;
  height: 100px;
  background: #e8eaec;
  border: 1px solid #e8eaec;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 5px;
}
.add-room-btn button {
  width: 100%;
  height: 100%;
}
</style>

