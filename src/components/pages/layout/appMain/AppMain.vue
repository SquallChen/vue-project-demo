<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {};
  }
  /* computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    }
  } */
};
</script>

<style lang="stylus" scoped>
.app-main
  min-height 100%
  height 100%
  padding 15px
</style>

