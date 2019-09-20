<style >
	
	#test .markdown .markdown-content .markdown-editor textarea {
		-background-color: #000;
	}
	#test .markdown .markdown-toolbars .title{
		font-size: 18px;
		font-weight: 700;
	}
	
</style>
<style scoped>
	#test{
		background-color: #fff;
		padding: 10px;
	}
	.fix-clause{
		padding: 20px 0;
	}
	.title{
		text-align: center;
	}
	.fix-clause .fix{
		padding-bottom: 10px;
	}
	.fix-clause p{
		margin: 2px 0;
    	line-height: 1.5em;
    	text-align: justify;
	}
	.fix-clause h3{
		padding:10px 0;
	}
</style>
<template>
	<div id="test">
		<Form :model="editData" ref="editData" :rules="editRule">
			<FormItem label="适用场景类型" prop="applicableScenarioType">
				<Row>
					<Col span="8">
			          	<RadioGroup v-model="editData.applicableScenarioType" type="button" size="large">
					        <Radio label="0">新签</Radio>
					        <Radio label="1">续租</Radio>
					    </RadioGroup>
					</Col>
				</Row>
	          	
	        </FormItem>
	        <FormItem label="合同模板名称" prop="templateName">
	        	<Row>
					<Col span="8">
	          			<Input v-model="editData.templateName" placeholder="居住房屋租赁合同"></Input>
	          		</Col>
				</Row>
	        </FormItem>
	        <FormItem label="合同模板备注">
	        	<Row>
					<Col span="12">
	          			<Input v-model="editData.contractRemarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="最多可输入100个字..."></Input>
	          		</Col>
				</Row>
	        </FormItem>
		</Form>
		<Alert style="text-align: center;">注: 自定义合同模板，分为上部分固定条款，及下部分自定义条款。您可自行修改自定义条款部分</Alert>

		<h1 class="title">居住房屋租赁合同</h1>

		<Collapse simple style="border:none;" v-model="currentPanel">
          <Panel name="more">
          	<Button type="text">{{currentPanel[0] == 'more' ? '收起' : '展开'}}固定条款 </Button>
			<div slot="content" class="fix-clause">
				<h2 class="fix">固定条款</h2>
				<hr>
				<p><b>甲方（出租人）：</b>${房东/甲方姓名}</p>
				<p><b>乙方（承租人）：</b>${承租人/乙方姓名}</p>
				<p>根据《中华人民共和国合同法》等有关法律、法规的规定，甲、乙双方在平等、自愿、公平和诚实信用的基础上，经协商一致，就乙方承租甲方可依法出租的房屋事宜，订立本合同。</p>
				
				<h3>租金及支付方式</h3>
				<p>租赁起止日期：${租约起止日期}</p>
				<p>交房日期：${租约起始日期}</p>
				<p>租赁期限：${租约期长} </p>
				<p>租金付款方式：${租金付款方式}</p>
				<p>押金金额：${押金总额（含其他押金）}元${押金明细（含其他押金）}</p>
				<p>人民币（大写）：${押金总额（含其他押金）大写}</p>
				<p>每月租金金额：${每月房租金额}元</p>
				<p>人民币（大写）：${每月房租金额大写}</p>
				<p>首期一次性费用：${首期一次性费用总额}元${首期一次性费用明细}</p>
				<p>人民币（大写）：${首期一次性费用总额大写}</p>
				<p>每月周期费用：${每月周期性费用总额}元${每月周期性费用明细}</p>
				<p>人民币（大写）：${每月周期性费用总额大写}</p>
				<p>租金及支付方式详见本合同第三条（本条约定与第三条约定不一致的，以第三条约定为准）</p>
				
				<h3>租客身份信息</h3>
				<p>姓名：${租客姓名}</p>
				<p>性别：${租客性别}</p>
				<p>联系电话：${租客手机号}</p>
				<p>证件类型：${租客证件类型}</p>
				<p>证件号码：${租客证件号}</p>
				<p>证件照片：${租客证件照片}</p>

				<h3>条款内容</h3>
				<h3>第一条 出租房屋</h3>	
				<p>1.	甲方将坐落在 ${房源地址} （简称该房屋）出租给乙方。该房屋建筑面积为 ${房源面积} 平方米。</p>
				<h3>第二条 交付日期和租赁期限</h3>
				<p>1.	甲、乙双方约定，该房屋租赁期起止时间 ${租约起止日期} 。</p>
				<p>2.	双方同意，甲方于 ${租约开始日期} 前将该房屋交付给乙方，由乙方进行验收。</p>
				<h3>第三条 租金及支付方式</h3>
				<p>1.	甲、乙双方约定，在租赁期间内，该房屋的房屋押金为${押金总额（含其他押金）}元，月租金${每月房租金额}元，首期一次性费用${首期一次性费用总额}元，每月周期费用（不含每月租金${每月周期性费用总额}元），首期一次性费用及每月周期费用明细可见文首租金及支付方式内清单。</p>
				<p>2.	甲、乙双方约定，乙方应根据 ${交租日规则} 的支付方式，分别于 ${每期交租日明细} （乙方系统账户中显示的最晚支付日与本合同约定不一致的，以系统显示的日期为准）支付该房屋租金及每月周期费用。</p>
				<p>3.	乙方租金及支付方式详见如下表格（表格约定与本条1至3项约定不一致的，以表格约定为准）：${账单计划} </p>
				
				<h3>第四条 其他相关费用</h3>
				<p>1.	租赁期限内，该房屋所发生的 ：<b>水费、电费、煤气费、有线电视费、网络宽带费、物业管理费、室内设施维修费（人为使用不当的应由乙方承担的除外）、保洁费、暖气费中</b>，甲方承担的费用为：${租金包含费用类目}除甲方承担的费用外，其他费用均由 <b>【乙方】</b>承担</p>

				<h3>第五条 联系方式、生效条件及其他</h3>
				<p>1.	甲方联系地址： <b>${房东（甲方）地址}</b> ，乙方联系地址： <b>${租客（乙方）地址}</b> ，甲、乙双方向前述对方联系地址以挂号信方式邮寄法律文书的，即视为法律文书已经通知并送达对方。</p>
				<p>2.	<b>本合同为电子合同，经乙方在本系统点击”确认签署“或支付本合同项下账单（该房屋租金及/或押金账单）后生效。</b>任意一方需对本合同进行公证或认证的，有权要求蘑菇租房平台及提供电子合同服务的第三方配合，由此产生的费用（包括但不限于公证费用、认证费用）由需求方承担。</p>
				<p>3.	本合同生效后，甲、乙双方对合同内容的变更或补充应另行订立电子合同，作为本合同的附件。本合同附件与本合同具有同等法律效力。</p>
				<p>4.	本合同第一条至第五条内容与其他条款内容不一致的，以本合同第一条至第五条内容为准。</p>
				<p>5.	本合同内容由甲乙双方自行确认，对双方具法律约束力，其他任何第三方不介入甲乙双方间的行为。</p>

				<h3>第六条 附件内容</h3>
				<p>1. 备注及补充条款：${合同补充条款}</p>
				<p>2. 房间家具清单:${房间家具清单}</p>
				<p>3. 公共家具清单:${公共家具清单}</p>
			</div>
		  </Panel>
		</Collapse>
		
		<mark-down style="margin-top: 30px" title="自定义条款" :autoSave="false" @on-save="handleSave" :initialValue="editData.content"  :toolbars="config"/>
		<Alert type="warning" style="text-align: center;margin-top: 5px;">注：自定义条款修改完成后请手动保存，mac按<code>Command+s</code>,windows按Ctrl+s</Alert>

		<Row style="text-align: center;margin:20px">
			<Button size="large" type="primary" @click="save('1')">预览并使用</Button>
			<Button size="large" @click="save('0')">保存为草稿</Button>
			<Button size="large" @click="save('2')">放弃</Button>
		</Row>
	</div>
</template>

<script>
import MarkDown from 'vue-meditor'
export default {
	name: 'contractTemplate',
  	components: {
    	MarkDown,
  	},
  	mounted(){

  		this.getDetail()
  	},
  	data(){
    	return{
    		currentPanel: '',
    		editData:{
    			content:'',
			},
			editRule:{
				applicableScenarioType: [
					{ required: true, message: '请选择适用场景类型', trigger: 'change' }
				],
				templateName: [
					{ required: true, message: '请输入合同模板名称', trigger: 'blur' }
				],
			},
	      	config : {
	        	strong:false,
	            italic:false,
	            overline:false,
	            h1:false,
	            h2:false,
	            h3:false,
	            h4:false,
	            h5:false,
	            h6:false,
	            hr:false,
	            quote:false,
	            ul:false,
	            ol:false,
	            code:false,
	            link:false,
	            image:false,
	            table:false,
	            checked:false,
	            notChecked:false,
	            shift:false,
	            print:false,
	            theme:false,
	            fullscreen:false,
	            exportmd:false,
	            importmd:false,
	        }
    	}
  	},
  	methods:{
  		getDetail(){
  			this.$ajax.get(
  				this,
  				this.$api.GET_CONTRACH_TDETAIL.replace('{id}',this.$route.query.id),
  				{},
  				(res) => {
	                this.editData = res.data.content;
	             },
  			)
  		},
  		handleSave(data){
  			this.editData.content = data.markdownValue
  		},
  		save(val){
			  this.$refs.editData.validate((valid)=>{
				  if(!valid) return;
				  if(val == '2'){
						//alert('返回到列表')
						this.$router.push({name:'contract-template'});
					}else{
						this.editData.status = val;
						if(this.editData.content == ''){
							alert('请手动保存自定义条款')
						}else{
							let params=JSON.parse(JSON.stringify(this.editData));
							if(params.createTime) delete params.createTime;
							//提交
							this.$ajax.put(
							this,
							this.$api.UPDATE_CONTRACT_TEMPLATE,
							params,
							() => {
								this.$Message.success('编辑成功');
								this.$router.push({name:'contract-template'});
							}
							)
						}
					}
			  })
  		}
  	}
}
</script>
