<template>
  <div class="tabbar">
    <router-view style="flex:1"></router-view>
    <van-tabbar style="background-color: #000;" active-color='#fcf0cd' inactive-color='#fcf0cd' v-model="active">
      <van-tabbar-item to="/">
        <img src="../assets/home.png" width="24px" height="24px" slot="icon" alt />
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="online">
        <img src="../assets/online.png" width="24px" height="24px" slot="icon" alt />
        <span>在线客服</span>
      </van-tabbar-item>
      <van-tabbar-item to="addpople">
        <img src="../assets/add.png" width="66px" height="66px"  alt />
      </van-tabbar-item>
      <van-tabbar-item to="yaoqing">
        <img src="../assets/yaoqing.png" width="24px" height="24px" slot="icon" alt />
        <span>邀请好友</span>
      </van-tabbar-item>
      <van-tabbar-item to="myindex">
        <img src="../assets/my.png" width="24px" height="24px" slot="icon" alt />
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return{
      active:0
    }
  }
};
</script>

<style lang='less' scope>
.tabbar{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.van-tabbar{
  background-color: #000;
}

</style>