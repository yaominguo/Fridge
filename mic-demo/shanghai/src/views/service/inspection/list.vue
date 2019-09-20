<template>
	<Card dis-hover>
		<Tabs type="card" :value="tabName" :animated="false">
			<TabPane label="主题" name="theme">
				<Theme />
			</TabPane>
			<TabPane label="巡查任务" name="">

			</TabPane>
			<TabPane label="检查单" name="">
			
			</TabPane>
			<TabPane label="整改单" name="">
				
			</TabPane>
		</Tabs>
	</Card>
</template>
<script>
	import Theme from './theme';
	export default {
		components: {
			Theme
		},
		data() {
			return {
				tabName: 'theme'
			}
		},
		mounted() {
			if (this.$route.params.tabs) {
				this.tabName = this.$route.params.tabs;
			}
		}
	}
</script>
