<template>
  <div class="content">
    <van-nav-bar class="jhnav" title="抢单中心">
      <!-- <slot slot="left" name="left">
        <img width="20px" height="20px" src="../../../static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">{{title}}</slot>-->
    </van-nav-bar>

    <div class="banner">单用户最高可买入额度:￥3000元</div>

    <div class="timedata">
      <p>距离开始时间还有:</p>
      <van-count-down :time="time">
        <template v-slot="timeData">
          <span class="item">{{ parseInt(timeData.hours /10)}}</span>
          <span class="item">{{ timeData.hours %10 }}</span> <span class="dian">:</span>
          <span class="item">{{ parseInt(timeData.minutes / 10)}}</span>
          <span class="item">{{ timeData.minutes % 10}}</span> <span class="dian">:</span>
          <span class="item">{{ parseInt(timeData.seconds /10)}}</span>
          <span class="item">{{ timeData.seconds %10}}</span>
        </template>
      </van-count-down>
    </div>

    <div class="btn" @click="submit">
        <img width="155px;" height="155px;" src="../../../static/images/12.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 8 * 60 * 60 * 1000
    };
  },
  methods: {
      submit() {
          console.log(1)
      }
  }
};
</script>

<style lang='less' scope>
.content {
  padding: 0 11px;
}
.banner {
  height: 85px;
  background: url(../../../static/images/14@3x.png) no-repeat no-repeat;
  background-size: 100%;
  text-align: center;
  line-height: 85px;
  font-size: 16px;
  color: #0b0b1f;
  margin-bottom: 40px;
}
.item {
  display: inline-block;
  width: 31px;
  height: 31px;
  margin-right: 5px;
  border-radius: 5px;
  text-align: center;
  line-height: 31px;
  font-size: 14px;
  font-weight: bold;
  color: #000;
  font-size: 12px;
  text-align: center;
  background-color: #FFDDAA;
  
}
.dian{
      color: #FFDDAA;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-right: 5px;
  }
.timedata{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    margin-bottom: 110px;
}
.btn{
    text-align: center;
}
.jhnav {
  background: none;
  margin-bottom: 10px;
  .van-nav-bar__title {
    color: #ffddaa;
  }
}
[class*="van-hairline"]::after {
  border: none;
}
.van-hairline--bottom::after {
  border: none;
}
</style>