<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <!-- // HACK: 是否启用标签页-->
      <!-- <tags-view></tags-view> -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import AppMain from './appMain/AppMain';
import TagsView from './tagsView/TagsView';
export default {
  name: 'layout',
  data() {
    return {};
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.user.sidebar;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>