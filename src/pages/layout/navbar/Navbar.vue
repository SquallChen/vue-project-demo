<template>
  <div class="navMain">
    <router-link to="/home">首页</router-link>
    <router-link to="/about">about</router-link>
    <router-link to="/top">top</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "navMain",
  data() {
    return {
    }
  },
  methods: {
  },
  created(){
  }
}
</script>

<style scoped lang="stylus">
.navMain
  a
    color red
</style>