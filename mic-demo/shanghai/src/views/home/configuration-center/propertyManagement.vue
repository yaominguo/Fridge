<style scoped>
	
	.title-color{
        color:#507bea;
        font-weight: 400;
        font-size: 16px;
        padding-bottom:20px;
        border-bottom: 1px solid #e6e8ef;
        margin-bottom:10px;
    }
    .cursorP{
    	cursor: pointer;
    }
    .row-center{
        text-align: center;
        margin:20px;
    }
    .leftM20{
        margin-left: 20px;
    }
    .item-label{
        background-color:#f5f5f5;
        text-align:center;
        font-size:14px;
        color:#495060;
        line-height:1;
        padding-top:20px;
        box-sizing:border-box;
        width:8%;
        position: absolute;
        height: 100%;
    }
    .item-content{
        padding-top:20px;
        margin-left:10%;
        font-size:14px;
    }
	.height-row{
        min-height: 69px;border-bottom: 1px dashed #ccc;
    }
</style>
<template>
    <div>
    	<p class="title-color">1、物业维修服务类型<Button type="primary" class="leftM20" @click="addPocketBtn" icon="md-add" ghost>添加子分类</Button></p>
    	<Row v-for="(item,nameIndex) in serverType" :key="nameIndex" class="height-row">
    	    <div class="item">
    	        <label class="item-label">{{item.name}}</label>
    	        <Row class="item-content">
    	            <Col span="4" class="bottomM20" v-for="(checxLabel,index) in item.checkList" :key="index">
    	                <Checkbox true-value='1' false-value='0' large v-model="checxLabel.status">
    	                    {{checxLabel.name}}
    	                </Checkbox>
    	                <Icon class="cursorP" v-if="checxLabel.id == null" @click="deleteLable(nameIndex,index)" color="#507bea" size="24" type="ios-trash-outline" />
    	            </Col>
    	        </Row>
    	    </div>  
    	</Row>
    	<Row class="row-center">
    	    <Button type="primary" @click="save('pocketBook')">保存</Button>
    	</Row>
    </div>
</template>
<script>
	export default{
		data(){
			return {
				serverType:[
					{
						name:'公租房',
						checkList:[
							{
								name:'公租房',
								status:'1',
								id:'2222222'
							},
							{
								name:'廉租房',
								status:'0',
								id:''
							}
						],
					},
					{
						name:'非居',
						checkList:[
							{
								name:'商铺',
								status:'1',
								id:'2222222'
							},
							{
								name:'商业综合体',
								status:'0',
								id:'2222222'
							},
						],
					},
					{
						name:'住宅',
						checkList:[
							{
								name:'普通住宅',
								status:'1',
								id:'2222222'
							},
							{
								name:'国有公房',
								status:'0',
								id:'2222222'
							},
						],
					}
				],
			}
		},
		mounted(){

		},
		methods:{

		},
	}
</script>