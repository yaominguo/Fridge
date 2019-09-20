// table-expand.vue
<style scoped>
    .expand-row{
        margin-bottom: 10px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="12">
                <span class="expand-key">记账信息: </span>
                <span class="expand-value">{{ row.jzxx }}</span>
            </Col>
            <Col span="12">
                <span class="expand-key">记账备注: </span>
                <span class="expand-value">{{ row.note }}</span>
            </Col>
            
        </Row>
        <Row class="expand-row">
            <Col span="12">
                <span class="expand-key">核销信息: </span>
                <span class="expand-value">{{ row.hxxx }}</span>
            </Col>
            <Col span="12">
                <span class="expand-key">照片凭证: </span>
                <span class="expand-value">无</span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="12">
                <span class="expand-key">编号: </span>
                <span class="expand-value">{{ row.bh }}</span>
            </Col>
        </Row>
        <Row type="flex" justify="start">
            <Col span="2">
                <Button type="primary" @click="affirm">确认收款</Button>
            </Col>
            <Col offset="1" span="2">
                <Button type="primary" @click="edit">编辑</Button>
            </Col>
            <Col span="2">
                <Button @click="cancel">作废</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        methods:{
            affirm(){
                alert('确认')
            },
            edit(){
                alert('编辑')
            },
            cancel(){
                alert('作废')
            }
        }
    };
</script>

// table.vue
<!-- <template>
    <Table :columns="columns10" :data="data9"></Table>
</template>
<script>
    import expandRow from './table-expand.vue';
    export default {
        components: { expandRow },
        data () {
            return {
                columns10: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data9: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        job: 'Data engineer',
                        interest: 'badminton',
                        birthday: '1991-05-14',
                        book: 'Steve Jobs',
                        movie: 'The Prestige',
                        music: 'I Cry'
                    },
                    {
                        name: 'Jim Green',
                        age: 25,
                        address: 'London No. 1 Lake Park',
                        job: 'Data Scientist',
                        interest: 'volleyball',
                        birthday: '1989-03-18',
                        book: 'My Struggle',
                        movie: 'Roman Holiday',
                        music: 'My Heart Will Go On'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        job: 'Data Product Manager',
                        interest: 'tennis',
                        birthday: '1992-01-31',
                        book: 'Win',
                        movie: 'Jobs',
                        music: 'Don’t Cry'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        job: 'Data Analyst',
                        interest: 'snooker',
                        birthday: '1988-7-25',
                        book: 'A Dream in Red Mansions',
                        movie: 'A Chinese Ghost Story',
                        music: 'actor'
                    }
                ]
            }
        }
    }
</script> -->
