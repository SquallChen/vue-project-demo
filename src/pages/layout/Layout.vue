<template>
  <div class="app-wrapper">
    <div class="navContainer">
      <navbar></navbar>
    </div>
    <div class="mainContainer">
      <div class="sidebarContainer">
        <sidebar></sidebar>
      </div>
      <div class="appMain">
        <appMain></appMain>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import AppMain from './appMain/AppMain';
// import TagsView from './tagsView/TagsView';
export default {
  name: 'layout',
  data() {
    return {};
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    // TagsView
  },
  computed: {

  }
};
</script>

<style lang="stylus" scoped>
.app-wrapper
  position relative
  height 100%
  width 100%
  display flex
  flex-direction column
  .navContainer
    height 80px
    border-bottom 1px solid #ccc;
  .mainContainer
    width 100%
    display flex
    flex-wrap wrap
    flex 1
    .sidebarContainer
      width 200px
      border-right 1px solid #ccc;
    .appMain
      flex 1
</style>