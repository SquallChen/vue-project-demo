<template>
  <div class="navMain">
    <router-link to="/home">首页</router-link>
    <router-link to="/about">about</router-link>
    <router-link to="/top">top</router-link>
    <span @click="logout">退出</span>
  </div>
</template>

<script type="text/ecmascript-6">
import { local, cookie } from '@/utils/token';
export default {
  name: "navMain",
  data() {
    return {
    }
  },
  methods: {
    logout(){
      cookie.del('token');
      cookie.del('name');
      location.reload();
    }
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