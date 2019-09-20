<template>
  <Layout class="ov-layout">
    <Sider v-if="mode === 4"
      ref="sider"
      :class="siderClass"
      :width="siderWidth"
      collapsible
      :hide-trigger="hideTrigger"
      :collapsed-width="78"
      v-model="isCollapsed">
      <div v-if="mode === 4" class="ov-logo">
        <slot name="logo"></slot>
      </div>
      <slot name="sider">
        <!-- <SiderMenu :menu="menu" :isCollapsed="isCollapsed"></SiderMenu> -->
      </slot>
    </Sider>
    <Layout class="ov-layout-mode-not-4">
      <Header class="ov-header">
        <Row>
          <Col :span="collapsedIconSpan">
            <Icon v-if="mode === 4"
              @click.native="collapsedSider"
              :class="rotateIcon"
              type="md-menu"
              size="24">
            </Icon>
          </Col>
          <Col v-if="mode !== 4" :span="logoSpan">
            <slot name="logo"></slot>
          </Col>
          <Col :span="menuSpan">
            <slot name="menu">&nbsp;</slot>
          </Col>
          <Col :span="profileSpan">
            <slot name="profile"></slot>
          </Col>
        </Row>
        <Row>
          <Col>
            <slot name="subHeader"></slot>
          </Col>
        </Row>
      </Header>
      <Layout class="ov-layout-mode-not-4">
        <Sider v-if="mode === 2"
          ref="sider"
          :class="siderClass"
          :width="siderWidth"
          collapsible
          :hide-trigger="hideTrigger"
          :collapsed-width="78"
          v-model="isCollapsed">
          <slot name="sider">
            <!-- <SiderMenu :menu="menu" :isCollapsed="isCollapsed"></SiderMenu> -->
          </slot>
        </Sider>
        <Content :class="contentClass">
          <Breadcrumb v-if="breadcrumb" class="ov-breadcrumb">
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
            <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
          </Breadcrumb>
          <slot name="content"></slot>
        </Content>
        <Sider v-if="mode === 3"
          ref="sider"
          :class="siderClass"
          :width="siderWidth"
          collapsible
          reverse-arrow
          :collapsed-width="78"
          v-model="isCollapsed">
          <slot name="sider">
            <!-- <SiderMenu :menu="menu" :isCollapsed="isCollapsed"></SiderMenu> -->
          </slot>
        </Sider>
      </Layout>
      <Footer v-if="footer" class="ov-footer">
        <slot name="footer"></slot>
      </Footer>
    </Layout>
  </Layout>
</template>

<script>
import SiderMenu from '@/components/Layout/SiderMenu';

export default {
  name: 'Management',
  components: {
    SiderMenu,
  },
  props: {
    fixed: {
      type: Boolean,
      default: true,
    },
    mode: {
      type: Number,
      default: 4,
    },
    siderWidth: {
      type: Number,
      default: 240,
    },
    siderShadow: {
      type: Boolean,
      default: true,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    breadcrumb: {
      type: Boolean,
      default: true,
    },
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
    hideTrigger: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
  },
  data() {
    return {
      profileSpan: 7,
    };
  },
  computed: {
    contentClass() {
      return `ov-content ${this.fixed ? 'ov-content-fixed' : ''}`;
    },
    siderClass() {
      return `ov-sider ${this.siderShadow ? 'ov-sider-shadow' : ''}`;
    },
    rotateIcon() {
      return `ov-menu-icon ${this.isCollapsed ? 'ov-rotate-icon' : ''}`;
    },
    collapsedIconSpan() {
      return this.mode === 4 ? 2 : 0;
    },
    logoSpan() {
      return this.mode === 4 ? 0 : 2;
    },
    menuSpan() {
      return 24 - this.logoSpan - this.collapsedIconSpan - this.profileSpan;
    },
  },
  methods: {
    collapsedSider() {
      this.$refs.sider.toggleCollapse();
    },
  },
  watch: {
  },
};
</script>

<style scoped>
.ov-layout {
  width: 100%;
  height: 100%;
}
.ov-layout-mode-not-4 {
  height: 100%;
}
.ov-header {
  padding: 0;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0,21,41,.20);
  z-index: 10;
}
.ov-logo {
  background: #002140;
  height: 64px;
  line-height: 64px;
}
.ov-sider {
  background: #001529;
  transition: none;
}
.ov-sider.ov-sider-shadow {
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
}
.ov-menu-icon {
  cursor: pointer;
  margin: 0 20px 0 10px;
  transition: all .3s;
}
.ov-rotate-icon {
  transform: rotate(-90deg);
}
.ov-breadcrumb {
  height: 48px;
  line-height: 48px;
  text-align: left;
  padding-left: 32px;
}
.ov-content {
  width: 100%;
  padding: 24px;
}
.ov-content-fixed {
  overflow: auto;
  height: 100%;
}
.ov-footer {
  padding: 0;
  height: 64px;
}
</style>

