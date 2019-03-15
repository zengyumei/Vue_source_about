<template>
  <div id="app">
    <!--<img src="./assets/logo.png"> 
    路由匹配到的将会在view中进行渲染
    -->
    <router-view class="view one" name="a"></router-view>
    <router-view class="view two" name="b"></router-view>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  padding: 0;
  margin: 0;
}
</style>
