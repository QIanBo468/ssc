<template>
  <div class="yaoqing">
      <titlebar title="邀请好友"></titlebar>
      <h3>邀请好友下载APP</h3>
      <img class="img" src="@/assets/111.png" alt="">
  </div>
</template>

<script>

import titlebar from "@/components/NavBar";

export default {
  components: {
    titlebar
  }
}
</script>

<style lang='less' scope>
.yaoqing{
  width: 100%;
  height: 100%;
  .img{
    width: 100px;
    height: 100px;
  }
}
</style>