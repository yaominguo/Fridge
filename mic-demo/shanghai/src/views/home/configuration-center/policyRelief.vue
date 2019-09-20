<style scoped>
	.title-color{
        color:#507bea;
        font-weight: 400;
        font-size: 16px;
        padding-bottom:20px;
        border-bottom: 1px solid #e6e8ef;
        margin-bottom:10px;
    }
	.ml20{
    	margin-left: 20px;
    	margin-right: 0;
    }
</style>
<template>
    <div>
    	<p class="title-color">1、地段租金标准</p>
    	<div class="ml20">用于设置政策减免公式中，各个地级区县的地段标准租金。一旦发生修改，只对下次政策性减免金额生效。之前已生效部分，不受影响</div>
    	<Row type="flex" justify="end" align="middle" >
    		<Col><Button>添加</Button></Col>
    	</Row>
    	<Table :data="listData" :columns="columns"></Table>
    </div>
</template>
<script>
	export default{
		data(){
			return {
					listData:[
						{
							address:'长宁区',
							rent:2000,
						},
						{
							address:'嘉定区',
							rent:3000,
						},
						{
							address:'浦东新区',
							rent:4000,
						}
					],
					columns:[
						{
							title:'地级区县',
							key:'address'
						},
						{
							title:'地段租金（元）',
							key:'rent'
						},
						{
							title:'操作',
							width:300,
							align:'center',
							render:(h,params)=>{
                    		let view = h(
                                        'Button', 
                                        {
                                            props: {
                                                size: 'small'
                                            },
                                            on:{
                                                'click': () =>{
                                                  this.singleModal = true;
                                                  //调用详情接口，回调打开模态框
                                                  this.getDetail(params.row.id)
                                                },

                                            },
                                            style: {
                                                margin: '3px'
                                            }
                                        },
                                        '查看'
                                    );
                    		let edit = h(
                                        'Button', 
                                        {
                                            props: {
                                                size: 'small'
                                            },
                                            on:{
                                                'click': () =>{
                                                  this.$router.push({
                                                        name:'contract-detail',
                                                        //query:{ac_id:params.row.ac_id,}
                                                    })
                                                }
                                            },
                                            style: {
                                                margin: '3px'
                                            }
                                        },
                                        '编辑'
                                    );
                    		let cancel = h(
                                        'Button', 
                                        {
                                            props: {
                                            	type:'error',
                                                size: 'small'
                                            },
                                            on:{
                                                'click': () =>{
                                                  this.$router.push({
                                                        name:'contract-detail',
                                                        //query:{ac_id:params.row.ac_id,}
                                                    })
                                                }
                                            },
                                            style: {
                                                margin: '3px'
                                            }
                                        },
                                        '删除'
                                    );
                    			return h('div',[view,edit,cancel])
                    		}
                    	}
					]
			}
		}
	}
</script>
