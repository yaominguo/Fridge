<template>
    <Card dis-hover>
        <Tabs type="card" :value="tabName" :animated="false">
            <TabPane label="楼栋" name="building">
                <BuildingAudit />
            </TabPane>
            <TabPane label="分户" name="room">
                <RoomAudit />
            </TabPane>
            <TabPane label="停车位" name="parking">
                <parking></parking>
            </TabPane>
			 <TabPane label="广告位" name="advertising">
			    <advertising></advertising>
			</TabPane>
        </Tabs>
    </Card>
</template>
<script>
import RoomAudit from './room-audit';
import BuildingAudit from './building-audit';
import parking from './parking';
import advertising from './advertising';
export default {
    components:{
        RoomAudit,
        BuildingAudit,
        parking,
        advertising,
    },
    data(){
        return {
            tabName:'building'
        }
    },
    mounted(){
        if(this.$route.params.tabs){
            this.tabName=this.$route.params.tabs;
        }
    }
}
</script>

