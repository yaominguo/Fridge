<template>
  <Menu :class="menuClass" theme="dark" accordion width="auto">
    <template v-if="!isCollapsed">
      <template v-if="data && data.length > 0">
        <template v-for="menu in data">
          <Submenu :key="menu.meta.title" :name="menu.meta.title">
            <template slot="title">
              <Icon :type="menu.meta.icon" class="ov-menu-icon" />
              <span class="ov-menu-title">{{ menu.meta.title }}</span>
            </template>
            <template v-if="menu.children && menu.children.length > 0">
              <MenuItem v-for="subMenu in menu.children"
                :key="subMenu.meta.title"
                v-if="!subMenu.hide"
                class="ov-menu-submenu"
                :name="subMenu.name"
                :to="{name: subMenu.name}">
                <Icon :type="subMenu.meta.icon" class="ov-menu-icon" />
                <span class="ov-menu-title">{{ subMenu.meta.title }}</span>
              </MenuItem>
            </template>
          </Submenu>
        </template>
      </template>
    </template>
    <template v-if="isCollapsed">
      <template v-if="data && data.length > 0">
        <template v-for="menu in data">
          <Dropdown :key="menu.meta.title"
              placement="right-start"
              trigger="hover"
              class="ov-menu-dropdown"
              @on-click="handleRouteTo">
            <MenuItem :key="menu.meta.title"
              :name="menu.meta.title"
              class="ov-menu-collapsed-item"
              transfer>
              <Icon :type="menu.meta.icon" class="ov-menu-collapsed-icon" />
              <div v-if="menu.meta.abbr" class="ov-menu-collapsed-abbr">{{ menu.meta.abbr }}</div>
            </MenuItem>
            <DropdownMenu class="ov-menu-submenu-poptip" slot="list">
              <template v-if="menu.children && menu.children.length > 0">
                <DropdownItem v-for="subMenu in menu.children"
                  :key="subMenu.meta.title"
                  v-if="!subMenu.hide"
                  :name="subMenu.name">
                  <Icon :type="subMenu.meta.icon" class="ov-menu-icon" />
                  <span class="ov-menu-title ov-menu-dropdown-title">{{ subMenu.meta.title }}</span>
                </DropdownItem>
              </template>
            </DropdownMenu>
          </Dropdown>
        </template>
      </template>
    </template>
  </Menu>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      default() {
        return [];
      },
    },
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // data: this.menu,
    };
  },
  computed: {
    data() {
      return this.$store.state.menuRouter;
    },
    menuClass() {
      return `ov-menu ${this.isCollapsed ? 'ov-menu-collapsed' : ''}`;
    },
  },
  methods: {
    handleRouteTo(name) {
      this.$router.push({
        name,
      });
    },
  },
};
</script>

<style scoped>
/* .ov-menu {
  margin-top: 24px;
} */
.ov-menu.ivu-menu-dark {
  background: #001529;
}
.ov-menu-submenu {
  background: #000c17;
  text-align: left;
}
.ov-menu-collapsed, .ov-menu-collapsed-item {
  width: 78px;
  text-align: center;
  padding: 13px 0;
}
.ov-menu-collapsed-item .ov-menu-collapsed-icon {
  margin-right: 0;
}
.ov-menu-collapsed-icon {
  font-size: 20px;
  color: #ffffff;
}
.ov-menu-collapsed-abbr {
  margin-top: 4px;
  font-size: 12px;
  color: #f0f0f0;
}
.ov-menu-icon {
  font-size: 14px;
  vertical-align: middle;
}
.ov-menu-title {
  vertical-align: middle;
}
.ov-menu-dropdown-title {
  margin-left: 8px;
}
.ivu-dropdown-item {
  text-align: left;
}
</style>

<style>
.ov-menu.ivu-menu-dark .ivu-menu-opened {
  background: #001529;
}
.ov-menu.ivu-menu-dark .ivu-menu-opened .ivu-menu-submenu-title {
  background: #001529;
  color: #ffffff;
}
.ov-menu .ivu-menu-submenu-title {
  text-align: left;
}
.ov-menu.ivu-menu-dark .ivu-menu-submenu .ivu-menu-item:hover {
  background: #000c17!important;
}
.ov-menu.ivu-menu-dark .ivu-menu-submenu-title:hover {
  background: transparent;
}
.ov-menu.ivu-menu-dark .ivu-menu-submenu .ivu-menu-item-active,
.ov-menu.ivu-menu-dark .ivu-menu-submenu .ivu-menu-item-active:hover {
  background: #2d8cf0!important;
}
.ov-menu-collapsed.ivu-menu-dark .ivu-menu-item:hover,
.ov-menu-collapsed.ivu-menu-dark .ivu-menu-submenu-title:hover {
  background: #000c17;
}
.ov-menu-collapsed.ivu-menu-dark .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: #2d8cf0!important;
}
.ov-menu-collapsed .ivu-select-dropdown {
  margin-left: 4px;
  text-align: left;
}
.ivu-layout-sider-trigger {
  transition: none;
  border-top: 1px solid #333333;
  background: #001529;
}
</style>

