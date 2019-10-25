<template>
  <div class="tabar">
    <router-view></router-view>
    <van-tabbar
     v-model="active"
      style="height:50px  position: sticky"
      active-color="#FFDDAA"
      inactive-color="#fff"
      >
      <!-- 跳转到首页 -->
      <van-tabbar-item  to="/index">
        <img
          :src="active ? index.normal : index.active"
          slot="icon"
          slot-scope="props"
          width="24px"
          height="24px"
        />
        <span class="xz">首页</span>
      </van-tabbar-item>
      <!-- 跳转到我的  页面 -->
      <van-tabbar-item to="/myindex">
        <img
          :src="active ? myindex.normal : myindex.active"
          slot="icon"
          slot-scope="props"
          width="24px"
          height="24px"
        />
        <span class="xz">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    data () {
        return {
            index: {
                active: './static/images/Avatar@3x.png',
                normal: './static/images/Avatar-s@3x.png'
            },
            myindex: {
                active: './static/images/user@3x(1).png',
                normal: './static/images/user-s.png'
            },
            active:0,
            flg: false,
            select: 0
        }
    }
};
</script>

<style lang='less' scope>
.van-tabbar-item{
    background: #0D0D26;
}
[class*=van-hairline]::after{
    border: none;
}
</style>