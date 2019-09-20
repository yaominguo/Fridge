<template>
  <Card dis-hover>
    <Card dis-hover title="房源信息">
      <Form :label-width="100">
        <Row>
          <Col :span="8">
            <FormItem label="房源">
              <span>{{basicInfo.house}}</span>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card dis-hover title="个人信息" style="marginTop: 10px;">
      <Form :label-width="100">
        <Row>
          <Col :span="8">
            <FormItem label="业主姓名">
              <span>{{basicInfo.name}}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="业主电话">
              <span>{{basicInfo.phone}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="身份证号码">
              <span>{{basicInfo.certNo}}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="身份证有效期">
              <span>{{basicInfo.certPeriod}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="16">
            <FormItem label="证件照片">
              <img style="width: 58px; height: 58px;" v-for="item in imgList" :key="item.id" :src="item.picPath" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="紧急联系人姓名">
              <span>{{basicInfo.emgcPes}}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="紧急联系人电话">
              <span>{{basicInfo.emgcPesPhone}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="支付方式">
              <span>{{basicInfo.payMethod}}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="支付账号">
              <span>{{basicInfo.payAccount}}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="收款人姓名">
              <span>{{basicInfo.payAccountName}}</span>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card dis-hover title="产权方信息" style="marginTop: 10px;">
      <Form :label-width="100">
        <Row>
          <Col :span="8">
            <FormItem label="产证人">
              <span>{{rightInfo.accountName}}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="联系方式">
              <span>{{rightInfo.phone}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="身份证号码">
              <span>{{rightInfo.idCardNo}}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="身份证有效期">
              <span>{{rightInfo.certPeriod}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="8">
            <FormItem label="产证编号">
              <span>{{rightInfo.cardNo}}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="产证面积">
              <span>{{rightInfo.rightArea}}㎡</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="16">
            <FormItem label="产证附件">
              <img style="width: 58px; height: 58px;" v-for="item in propertyImgList" :key="item.id" :src="item.picPath" />
            </FormItem>
          </Col>
        </Row>
        <Row style="textAlign: center">
          <Button @click="back" type="primary">返回</Button>
        </Row>
      </Form>
    </Card>
  </Card>
</template>

<script>

export default {
  name: 'ViewPropertyInfo',
  data() {
    return {
      basicInfo: {},
      rightInfo: {},
      imgList: [],
      propertyImgList: [],
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.getDetail(id);
    }
  },
  methods: {
    getDetail(id) {
      this.$ajax.get(
        this,
        this.$api.GET_PROPERTY_DETAIL + id,
        null,
        (res) => {
          const data = res.data.content;
          this.basicInfo = Object.assign(data.tenant, {
            house: data.propertyRight.houseName,
            houseName: data.propertyRight.houseName,
            houseId: data.propertyRight.houseId,
            period: data.tenant.certPeriod && data.tenant.certPeriod.split('~'),
          });
          this.imgList = data.certPic;
          this.rightInfo = Object.assign(data.propertyRight, {
            period: data.propertyRight.certPeriod && data.propertyRight.certPeriod.split('~'),
          });
          this.propertyImgList = data.propertyPic;
        }
      )
    },
    back() {
      this.$router.back();
    }
  },
}
</script>

