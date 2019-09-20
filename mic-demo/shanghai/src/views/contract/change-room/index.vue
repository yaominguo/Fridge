<template>
  <Card dis-hover>
      <p  class="card-title">换房操作</p>
      <div id="steps">
        <Steps :current="current" style="margin-left: 100px;">
          <Step title="选择要换到的房间"></Step>
          <Step title="原房清算"></Step>
          <Step title="新房处理"></Step>
          <Step title="完成换房"></Step>
        </Steps>
      </div>
      <div class="content">
<!-- step1 -->
        <div v-if="current==0" style="margin-top: 30px;" class="step1">
          <!-- lefe-area -->
          <div class="left-area">
            <div class="title">
              <span>原房间信息</span>
              <span :title = info.address>{{info.address}}</span>
            </div>
            <div class="item">
              <span>承租人信息</span>
              <span>{{info.name}}-{{info.phone}}</span>
            </div>
            <div class="item">
              <span>租期起始</span>
              <span>{{info.timeRange}}</span>
            </div>
          </div>
          <!-- mid-img -->
          <div class="mid-img">
            <img src="@/assets/images/to.png" >
          </div>
          <!-- right-area -->
          <div class="right-area">
            <div class="title">
              <span>需换到</span>
            </div>
            <div v-if="unSelect">
              <Form :label-width="80" style="margin-top: 40px;">
                <FormItem label="房源地址" >
                  <Row>
                   <Col span="18">
                     <Select></Select>
                   </Col>
                  </Row>
                </FormItem>
              </Form>
                <Row class="right-btns" >
                    <Button v-if="unConfirm" type="primary" size="large">确认</Button>
                    <div v-else>
                      <Button  type="primary" size="large">确认</Button>
                      <Button size="large">重选</Button>
                    </div>
                </Row>

            </div>
            <div v-else class="after-confirm-room">
               <div class="new-room">
                <div :title = info.address>{{info.address}}</div>
                <Button size="large">修改</Button>
               </div>
               <div class="new-name">
                  <span>承租人信息</span>
                  <span>{{info.name}}-{{info.phone}}</span>
               </div>
            </div>
          </div>
          <!-- 下一步 -->
          <div class="step-next">
            <Button class=" btn" type="default" icon="md-exit">退出换房操作</Button>
            <Button type="primary" class="btn next" >下一步</Button>
          </div>
        </div>
<!-- step2 -->
        <div class="step2" v-if="current==1">
          <div class="stay-time">
             <Form :label-width="100" style="margin-top: 40px;">
                <FormItem label="新房入住时间" >
                  <Row>
                   <Col span="5">
                     <DatePicker type="date" placeholder="请选择入住时间" :clearable="false" :options="dateOptions" style="width: 200px"></DatePicker>
                   </Col>
                   <Col span="5"><span class="remark">（该天起按新房价格结算）</span></Col>
                  </Row>
                </FormItem>
              </Form>
          </div>
          <div >
            <Tabs class="tabs"  type="card">
                <TabPane class="tabs-item" :label="'- 欠款 （' + info.dept +'元)'">
                  <div class="item-content">1111111</div>
                </TabPane>
                <TabPane class="tabs-item" :label="'+ 退还 （' + info.dept +'元)'">
                  <div class="item-content">2222222</div>
                </TabPane>
                <TabPane class="tabs-item" :label="'+ 押金 （' + info.dept +'元)'">
                 <div class="item-content">33333333</div>
                </TabPane>
            </Tabs>
          </div>
          <div class="detail">
            <p class="pay-back-deposit">
              共计退还押金 <span>{{info.dept}}</span> 元，将转出到新房。
              <span class="blue">
                <Icon type="ios-alert" />
              该押金金额将转到换房后新房中，转为新房的押金账单和实收。
              </span>
            </p>
            <div class="pay-back-bill">
              <div>
                共计承租人退还 <span>4,258.06</span> 元，将转入到新房抵扣房租。
                <span class="blue">
                  <Icon type="ios-alert" />
                  承租人退还抵扣欠款后剩余的退还金额，承租人共退还（<span>4,258.06</span>元）- 承租人共欠款（<span>0.00</span>元）= <span>4,258.06</span>元
                </span>
              </div>
              <div class="remark">
                <span class="title">结转备注</span>
                <Input  type="textarea" :rows="4" placeholder="限输入200字" />
              </div>
            </div>
            <div class="remindTxt">
              <div class="left"> <Icon type="ios-alert" /> <span>温馨提示：</span></div>
              <div class="right">
                <div class="txtItem">
                  1.&nbsp;仅在换房操作完成后才进行账务结算，如未完成换房则不进行结算操作；
                </div>
                <div class="txtItem">2.&nbsp;换房成功后，此房源为“已退房”状态，退房结算操作不能撤销，房源将立即上线销售；</div>
                <div class="txtItem">3.&nbsp;结算后将无法对此租约账务进行操作，如添加账单等。</div>
              </div>
            </div>
          </div>
          <!-- 下一步 -->
          <div class="step-next">
            <Button class=" btn" type="default" icon="md-exit">退出换房操作</Button>
            <Button class=" back btn" type="default" >返回</Button>
            <Button type="primary" class="btn next1" >确认结算，下一步</Button>
            <div class="remark-text">
              <span > <Icon type="ios-alert" /> 此步操作将被保存</span>
              <span > <Icon type="ios-alert" /> 换房完成后系统对原房退房</span>
            </div>
          </div>
        </div>
        <div v-if="current==2">333</div>
        <div v-if="current==3">444</div>

      </div>
  </Card>
</template>

<script>
export default {
  //name: 'ChangeRoom',
  data() {
    return {
      dateOptions:{
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      current:1,
      unSelect:false,
      unConfirm:true,
      info:{
        address:'杨浦区-政立苑14栋501-RoomB(回家)',
        name:'李炜',
        phone:'13909699999',
        timeRange:'2018-05-28 - 2019-05-27 ( 1年 )',
        dept:100,

      }
    };
  },
  computed: {

  },
}
</script>
<style>


.step2 .ivu-tabs-nav{
  width: 100%;
 }
.step2 .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab{
  width: 33% ;
  text-align: center;
}
</style>
<style scoped lang="css" >
  @import '../../../assets/styles/change-house.css';
</style>

