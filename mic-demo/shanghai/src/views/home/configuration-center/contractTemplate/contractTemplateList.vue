<style scoped>
	.mb20{
		margin-bottom: 20px;
	}
</style>
<template>
	<div >
		<Button  icon="ios-add" :to="{name:'contractTemplate/add'}" size="large" class="mb20">添加合同模板</Button>
		<Form :label-width="88">
			<Row>
		  <Col span="6">
		    <FormItem label="适用场景类型" >
		      <Select clearable v-model="searchData.applicableScenarioType">
		        <!-- <Option  value="全部">全部</Option> -->
		        <Option  value="0">新签</Option>
		        <Option  value="1">续签</Option>
		      </Select>
		    </FormItem>
		  </Col>
		  <Col offset="2" span="6">
		    <FormItem label="合同模板状态" >
		      <Select clearable v-model="searchData.status">
		        <!-- <Option  value="全部">全部</Option> -->
		        <Option  value="0">草稿</Option>
		        <Option  value="1">启用</Option>
		        <Option  value="2">停用</Option>
		      </Select>
		    </FormItem>
		  </Col>
		  <Col offset="4"  span="6">
		    <FormItem >
		      <Button @click="handleSearch" type="primary">查询</Button>
		      <Button @click="handleReset">重置</Button>
		    </FormItem>
		  </Col>
		  	</Row>
		</Form>
        <!-- -->
		<Table :columns="columns" :data="data"></Table>
	</div>
   
</template>

<script>
export default {
	name: 'contractTemplate',
  	data(){
    	return{
    		data:[],
    		columns:[
    			{
    				title:'合同模板名称',
    				key:'templateName',
                    render:(h,params)=>{
                        if(params.row.templateStatus == '0'){
                            return h('div',[
                                h('span', {}, params.row.templateName),
                                h('span', {
                                    style: {
                                        "display": "inline",
                                        'lineHeight':'18px',
                                        'padding':'1px 3px',
                                        "border": "1px solid #2d8cf0",
                                        "fontSize": "11px",
                                        "text-align": "center",
                                        "borderRadius": "5px",
                                        "marginLeft": "5px",
                                        "color": "#2d8cf0"
                                    }
                                }, '默认合同')
                            ])
                        }else{
                            return h('div',params.row.templateName)
                        }
                    }
    			},
    			{
    				title:'适用场景类型',
    				//key:'age'
                    render:(h,params)=>{
                        console.log()
                        if(params.row.applicableScenarioType == '0'){
                          return h('div','新签')
                        }else if(params.row.applicableScenarioType == '1'){
                          return h('div','续签')
                        }
                    }
    			},
                {
                    title:'系统模板',
                    render:(h,params)=>{
                        if(params.row.systemStatus =='2'){
                            return h('div','是')
                        }else{
                            return h('div','否')
                        }
                    }
                },
    			{
    				title:'创建日期',
    				//key:'address'
                    render:(h,params)=>{
                        return h('div',this.$com.changeDate(params.row.createTime))
                    }
    			},
    			{
    				title:'合同模板状态',
                    render:(h,params)=>{
                        if(params.row.status == '0'){
                          return h('div','草稿')
                        }else if(params.row.status == '1'){
                          return h('div','启用')
                        }else if(params.row.status == '2'){                            
                          return h('div','停用')
                        }
                    }
    			},
    			{
                    title:'操作',
                    key:'action',
                    align:'center',
                    width:400,
                    render:(h,params)=>{
                        let start = h(
                                'Button',
                                {
                                    props:{
                                        size:'small'
                                    },
                                    on:{
                                        'click':()=>{
                                            //启用合同
                                                this.$ajax.put(
                                                    this,
                                                    this.$api.START_CONTRACT_TEMPLATE.replace('{id}',params.row.id),
                                                    {},
                                                    (res) =>{
                                                        this.$Message.success('设置成功');
                                                        this.getList();
                                                    }
                                                )
                                        }
                                    },
                                    style:{
                                        margin:'3px'
                                    }
                                },
                                '启用'
                            );
                        let stop = h(
                                'Button',
                                {
                                    props:{
                                        size:'small'
                                    },
                                    on:{
                                        'click':()=>{
                                            //启用合同
                                            this.$ajax.put(
                                                this,
                                                this.$api.STOP_CONTRACT_TEMPLATE.replace('{id}',params.row.id),
                                                {},
                                                (res) =>{
                                                    this.$Message.success('设置成功');
                                                    this.getList();
                                                }
                                            )
                                        }
                                    },
                                    style:{
                                        margin:'3px'
                                    }
                                },
                                '停用'
                            );
                        let down = h(
                                        'Button', 
                                        {
                                            props: {
                                                size: 'small'
                                            },
                                            on:{
                                                'click': () =>{
                                                  
                                                },

                                            },
                                            style: {
                                                margin: '3px'
                                            }
                                        },
                                        '下载（未对接）'
                                                    
                                    );

                        let view = h(
                                        'Button', 
                                        {
                                            props: {
                                                size: 'small'
                                            },
                                            on:{
                                                'click': () =>{
                                                  
                                                },

                                            },
                                            style: {
                                                margin: '3px'
                                            }
                                        },
                                        '预览（未对接）'
                                                    
                                    );
                        let del = h(
                                        'Button', 
                                        {
                                            props: {
                                                size: 'small'
                                            },
                                            on:{
                                                'click': () =>{
                                                    //删除合同
                                                    this.$ajax.delete(
                                                        this,
                                                        this.$api.DELETE_CONTRACT_TEMPLATE.replace('{id}',params.row.id),
                                                        {},
                                                        (res) =>{
                                                            this.$Message.success('删除成功');
                                                            this.getList();
                                                        }
                                                    )
                                                },

                                            },
                                            style: {
                                                margin: '3px'
                                            }
                                        },
                                        '删除'
                                                    
                                    );
                        let setdefault = h(
                                        'Button', 
                                        {
                                            props: {
                                                size: 'small'
                                            },
                                            on:{
                                                'click': () =>{
                                                  //设为默认合同
                                                  this.$ajax.put(
                                                    this,
                                                    this.$api.DEFAULT_CONTRACT_TEMPLATE.replace('{id}',params.row.id),
                                                    {},
                                                    (res) =>{
                                                        this.$Message.success('设置成功');
                                                        this.getList();
                                                    }
                                                    )
                                                },

                                            },
                                            style: {
                                                margin: '3px'
                                            }
                                        },
                                        '设为默认'
                                                    
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
                                                        name:'contractTemplate/edit',
                                                        query:{id:params.row.id,}
                                                    })
                                                }
                                            },
                                            style: {
                                                margin: '3px'
                                            }
                                        },
                                        '编辑'
                                    );
                        
                        if(params.row.systemStatus == '2'){
                            //系统默认
                            if(params.row.templateStatus == '0'){//已是默认
                                return h('div',[view,down])
                            }else{
                                return h('div',[view,down,setdefault])
                            }
                        }else{
                            if(params.row.status == '1'){//启用
                                if(params.row.templateStatus == '0'){//已是默认
                                    return h('div',[view,down,edit,stop])
                                }else{//非默认
                                    return h('div',[view,down,edit,stop,setdefault])
                                }
                            }else{//停用状态下
                                return h('div',[view,down,edit,start,del,setdefault])
                            } 
                        }
                    }
                }

    		],
    		searchData:{},
    	}
  	},
    mounted(){
        this.getList();
    },
  	methods:{
  		handleSearch(){
  			this.getList(this.searchData);
  		},
  		handleReset(){
  		    this.searchData = {};
            this.getList();
  		},
        getList(params ={}){
            this.$ajax.get(
              this,
              this.$api.GET_CONTRACT_TEMPLATE_LIST,
              params,
              (res) => {
                const list = res.data.content;
                this.data = list;
              },
            );
        },

  	}
}
</script>
