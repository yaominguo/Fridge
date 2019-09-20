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
		<Form :model="addData" ref="addData" :rules="addRule">
			<FormItem label="适用场景类型" prop="applicableScenarioType">
				<Row>
					<Col span="8">
			          	<RadioGroup v-model="addData.applicableScenarioType" type="button" size="large">
					        <Radio label="0">新签</Radio>
					        <Radio label="1">续租</Radio>
					    </RadioGroup>
					</Col>
				</Row>
	          	
	        </FormItem>
	        <FormItem label="合同模板名称" prop="templateName">
	        	<Row>
					<Col span="8">
	          			<Input v-model="addData.templateName" placeholder="居住房屋租赁合同"></Input>
	          		</Col>
				</Row>
	        </FormItem>
	        <FormItem label="合同模板备注">
	        	<Row>
					<Col span="12">
	          			<Input v-model="addData.contractRemarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="最多可输入100个字..."></Input>
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
		
		<mark-down style="margin-top: 30px" title="自定义条款" :autoSave="false" @on-save="handleSave" :initialValue="str"  :toolbars="config"/>
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
  	data(){
    	return{
    		str:`## 第七条 权利义务
1. 乙方向甲方承诺，承租该房屋仅用作居住使用。
2. 租赁期间，乙方可使用的该房屋公用或合用部位的使用范围，现有的装修、附属设施、设备状况以及需约定的有关事项，将在 **《家具家电清单》** 中列明，该清单将作为甲方交付该房屋和本合同终止时乙方返还该房屋的验收依据。
3. 甲方逾期向乙方交付该房屋的，每逾期一日，则甲方需向乙方支付承租房屋日租金 ***贰*** 倍的违约金。该房屋交付验收时，现有装修、附属设施、设备存在缺陷影响乙方正常使用的，甲方应自交付之日起的5日内进行修复。
4. 甲方应确保该房屋交付时符合规定的安全条件。租赁期间，乙方发现该房屋及本合同附件中列明的附属设施、设备有损坏或故障时，应及时通知甲方修复；甲方应在接到乙方通知后的 ***2*** 日内进行维修或委托乙方进行维修。甲方逾期不维修、也不委托乙方进行维修的，乙方可代为维修，费用由甲方承担。
5. 乙方应对该房屋的使用安全负责。租赁期间，乙方应合理使用并爱护该房屋及其附属设施、设备，因乙方使用不当或不合理使用，致使该房屋及其附属设施、设备损坏或发生故障的，乙方应负责修复。乙方不维修的，甲方可代为维修，费用由乙方承担。
6. 租赁期间，最后一期租期不足期的，双方同意以乙方实际居住天数计算该期租金。在租赁期间内，未经双方协商一致，任何一方不得擅自调整租金标准。
7. 该房屋租赁期满后，甲乙双方协商一致续租的，则房屋押金自动转为该房屋续租押金，不足部分（若有）由乙方补足。租赁期满后甲、乙双方确认不续租或本合同解除后，房屋押金除用以抵扣应由乙方承担但尚未交纳的费用（包括但不限于租金、违约金等本合同约定由乙方承担的费用）外，剩余部分（若有）应无息退还乙方。
8. 该房屋租赁期限届满、乙方需继续承租的，乙方应于租赁期限届满前三十日内提出续租申请，经甲、乙双方协商一致后，另行签订书面协议。乙方不续租的，甲方有权在租赁期限届满前三十日内带人看房，乙方需给予配合。
9. 除甲方同意乙方续租外，乙方应在本合同的租期届满后 ***1*** 日内返还该房屋。乙方未经甲方书面同意逾期返还该房屋的，每逾期一日，乙方应按该房屋日租金的 ***叁*** 倍向甲方支付房屋占用费。除本合同附件另有约定外，乙方返还该房屋时，该房屋及其装修、附属设施和设备应当符合正常使用后的状态。经甲方书面验收认可后，相互结清各自应当承担的费用。
10. 本合同有效期内，乙方无转租权，并自愿放弃优先购买权。
## 第八条 解约条件
1. 甲、乙双方同意在租赁期内，有下列情形之一的，本合同解除，双方互不担责：
（一）该房屋占用范围内的土地使用权依法提前收回的；
（二）该房屋因公共利益需要被依法征收的；
（三）该房屋因城市建设需要被依法列入房屋拆迁许可范围的；
（四）该房屋因不可抗力原因毁损、灭失，致使乙方不能正常使用的；
（五）签订本合同时，甲方已告知乙方该房屋已设定抵押，租赁期间被处分的；
（六）甲乙双方协商一致解除本合同的。
2. 甲、乙双方同意，甲方有下列情形之一的，乙方可书面通知甲方解除本合同，并有权要求甲方赔偿损失。
（一）甲方未按合同约定按时交付该房屋，经乙方书面催告后  3  日内仍未交付的；
（二）甲方交付的该房屋不符合本合同约定或存在重大质量缺陷，致使乙方不能正常使用的；
3. 甲、乙双方同意，乙方有下列情形之一的，甲方可书面通知乙方解除本合同，并有权要求乙方赔偿损失。
（一）乙方擅自改变房屋居住用途的；
（二）因乙方原因造成房屋结构损坏的；
（三）乙方擅自转租该房屋、转让该房屋承租权或与他人交换各自承租的房屋的；
（四）乙方擅自增加承租同住人，或人均承租建筑面积、使用面积低于规定标准的（居住房屋人均建筑面积不低于10平方米，且人均使用面积不低于7平方米）；
（五）乙方利用承租的居住房屋从事违法违规活动的；
（六）乙方逾期不支付本合同项下约定由乙方承担的费用的（包括但不限于房屋押金、租金、水电煤费用等）；
（七）乙方擅自将该房屋钥匙交付或配给非居住人员的；
（八）乙方隐瞒、漏报、谎报自身传染性病症或隐性病症的；
（九）乙方在未承租的房间堆放私人物品的。
## 第九条 违约责任
1. 本协议有效期内，任意一方未履行或未完全履行本协议约定的，应承担相应的违约责任。守约方有权要求违约方支付相当于一个月房屋租金的违约金，若违约金无法弥补守约方损失，违约方还应负责赔偿。
## 第十条 解决争议的方式
1. 本合同由中华人民共和国法律、法规管辖。
2. 双方在履行本合同过程中若发生争议的，甲、乙双方可协商解决或者向人民调解委员会申请调解，也可依法向人民法院提起诉讼。`,
    		currentPanel: '',
    		addData:{
    			content:'',
			},
			addRule:{
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
  		handleSave(data){
  			this.addData.content = data.markdownValue
  			console.log(data)
  		},
  		save(val){
			this.$refs.addData.validate((valid)=>{
				if(!valid) return;
				if(val == '2'){
					//alert('返回到列表')
					this.$router.push({name:'contract-template'});
				}else{
					this.addData.status = val;
					if(this.addData.content == ''){
						alert('请手动保存自定义条款')
					}else{
						//提交
						this.$ajax.post(
						this,
						this.$api.POST_CONTRACT_TEMPLATE,
						this.addData,
						() => {
							this.$Message.success('新增成功');
							this.$router.push({name:'contract-template'});
						}
						)
					}
				}
			})
  			
  			//console.log(this.addData)
  			//console.log(val)
  		}
  	}
}
</script>
