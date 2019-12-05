<template>
  <div class="tabbar">
    <router-view style="flex:1"></router-view>
    <van-tabbar
      style="background-color: #fff;"
      active-color="#6803A3"
      inactive-color="#999"
      v-model="active"
    >
      <van-tabbar-item to="/">
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.normal" />
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="online">
        <img slot="icon" slot-scope="props" :src="props.active ? mall.active : mall.normal" />
        <span>在线客服</span>
      </van-tabbar-item>
      <van-tabbar-item to="addpople"  >
        <img
         
          src="../assets/tianjiahuiyuan_btn@3x.png"
          width="58px"
          height="58px"
          alt
          style=" margin-bottom: 25px;"
        />
        <!-- <span>增加会员</span> -->
      </van-tabbar-item>
      <van-tabbar-item to="yaoqing">
        <img slot="icon" slot-scope="props" :src="props.active ? deal.active : deal.normal" />
        <span>邀请好友</span>
      </van-tabbar-item>
      <van-tabbar-item to="myindex">
        <img slot="icon" slot-scope="props" :src="props.active ? user.active : user.normal" />
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: require("../assets/home_icon_xuanze@3x.png"),
        normal: require("../assets/home_icon_moren@3x.png")
      },
      mall: {
        active: require("../assets/kefu_icon_xuanze@3x.png"),
        normal: require("../assets/kefu_icon_moren@3x.png")
      },
      deal: {
        active: require("../assets/yaoqinghaoyou_icon_xuanze@3x.png"),
        normal: require("../assets/yaoqinghaoyou_icon_moren@3x.png")
      },
      user: {
        active: require("../assets/wode_icon_xuanze@3x.png"),
        normal: require("../assets/wode_icon_moren@3x.png")
      }
    };
  },
   created () {
        if(this.$route.path == '/') {
            this.actives = 0;
        }
        if(this.$route.path == '/online') {

            this.actives = 1;
        }
        if(this.$route.path == '/addpople'){
            this.actives = 2
        }
        if(this.$route.path == '/yaoqing'){
            this.actives = 3
        }
        if(this.$route.path == '/myindex'){
            this.actives = 4
        }
    }
};
</script>

<style lang='less' scope>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
 
}
.van-tabbar {
  background-color: #fff;

  span {
    font-size: 11px;
  }
}
.van-hairline--top-bottom::after {
  border-width: 0;
}
</style>