<template>
	<Card class="card" dis-hover>
		<!-- 步骤条 -->
		<div id="steps">
			<Row type="flex" justify="center">
				<Col span="10" :offset="3">
				<Steps :current="current">
					<Step title="广告位信息"></Step>
					<Step title="价格信息补充"></Step>
				</Steps>
				</Col>
			</Row>
		</div>
		<formList :current="current" @show-next-step="changeCurrent" @return-step="returnStep"></formList>
	</Card>
</template>
<script>
	import formList from "./formList.vue"
	export default {
		components: {
			formList
		},
		data() {
			return {
				current: 0,
			}
		},
		methods: {
			changeCurrent(){
				this.current=1;
			},
			returnStep(){
				this.current=0;
			}
		},
		mounted() {}
	}
</script>
<style scoped>
	#steps {
		margin: 50px 0 40px 0;
	}
</style>
