<template>
  <div class="main">
    <header class="header">
      <div class="top">

      </div>
      <nav class="navs">
        <router-link to="/home" >首页</router-link>
        <router-link to="/aboutme" >关于我们</router-link>
        <router-link to="/production" >产品方案</router-link>
      </nav>
    </header>
    <div class="content">
        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transition>
    </div>   
    <div class="footer">

    </div>
  </div>
</template>
<script>
  export default {
      name: 'main-view',
      data() {
          return {
          }
      }
  }
</script>

<style lang="stylus">
</style>
