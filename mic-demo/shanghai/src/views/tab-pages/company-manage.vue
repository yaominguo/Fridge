<template>
<Card dis-hover>
  <Tabs type="card" value="branch" :animated="false">
    <TabPane label="分店管理" name="branch">
      <BranchList />
    </TabPane>
    <TabPane label="职位管理" name="role">
      <RolesList />
    </TabPane>
    <TabPane label="员工账户管理" name="staff">
      <StaffManage />
    </TabPane>
    <TabPane label="项目管理" name="project">
      <AssetProject />
    </TabPane>
  </Tabs>
</Card>
</template>

<script>
import BranchList from '@/views/permission/branchSetting/list';
import RolesList from '@/views/permission/roles/list';
import StaffManage from '@/views/permission/staffManage/list';
import AssetProject from '@/views/asset/project/project'

export default {
  name: 'CompanyMange',
  components: {
    BranchList,
    RolesList,
    StaffManage,
    AssetProject,
  }
}
</script>

<style>

</style>
