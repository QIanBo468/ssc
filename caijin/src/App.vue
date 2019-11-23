<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <tabbar msg="Welcome to Your Vue.js App"/> -->
    <router-view />
  </div>
</template>

<script>
// import tabbar from './components/tabbar.vue'

export default {
  name: "app"
  // components: {
  //   tabbar
  // }
};
</script>

<style lang='less'>
html,
body {
  width: 100%;
  height: 100%;
  background: url(./assets/bg.jpg);
}
#app {
  width: 100%;
  height: 100%;
}

.van-nav-bar {
  background: transparent !important;
}
.van-nav-bar__title {
  color: #d3b787 !important;
  font-size: 18px !important;
}

.van-cell-group {
  background: transparent !important;
  display: flex;
  width: 100%;
  align-items: center;
}
.van-cell {
  background: transparent !important;
}
.van-field__control {
  font-size: 16px;
  color: #d3b787 !important;
}
</style>
