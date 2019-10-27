<template>
  <div class="help">
    <van-nav-bar
      class="team-title"
      title="帮助"
      right-text="帮助记录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="help-check acea-row row-center-wrapper">
      <!-- class="help-check-item  acea-row row-center-wrapper" -->
      <div
        class="help-check-item acea-row row-center-wrapper"
        v-bind:class="checkNum==0? 'check' :'' "
        v-on:click="check(0)"
      >提供帮助</div>
      <div
        class="help-check-item acea-row row-center-wrapper"
        v-bind:class="checkNum==1? 'check' :'' "
        v-on:click="check(1)"
      >接受帮助</div>
    </div>
    <div class="help-head acea-row row-center-wrapper">
      <div class="help-contnet-head-left">以提供帮助元(元)</div>
      <div class="help-contnet-head-cont">
        <span>{{helpNum}}.</span>
        <span style="font-size:14px;">00</span>
      </div>
    </div>
    <div class="help-table">
      <!-- <van-cell-group>
          <van-field
            
            label-width="60%"
            input-align="right"
            label-class="integral-input-text"
            label="排单币"
            value="1个"
          />
      </van-cell-group>-->
      <van-cell title="排单币" value="1个" />
      <van-cell-group>
        <van-field
          v-model="toPeopleNum"
          label-width="60%"
          input-align="right"
          label-class="integral-input-text"
          label="提供帮助"
          placeholder="输入金额"
        />
      </van-cell-group>
    </div>

    <van-button size="large" color="#ffddaa" style="color:#000;">确认</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkNum: 0,
      toPeopleNum: "",
      helpNum: "11132"
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push('/helplock')
    },
    check(num) {
      this.checkNum = num;
      this.$toast(this.checkNum);
    }
  }
};
</script>

<style lang='less' scope>

.help {
  padding: 0 1rem;
}
.van-nav-bar {
  background: transparent;
  .van-nav-bar__title {
    color: #f2c684;
     font-size:20px;
  }
  .van-nav-bar__right {
    .van-nav-bar__text {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}

.help-check {
  color: #ffffff;
  font-size: 0.9rem;
  color: #ffddaa;
  div:first-child {
    border-radius: 1rem 0 0 1rem;
  }
  div:nth-child(2) {
    border-radius: 0 1rem 1rem 0;
  }
  div {
    width: 6rem;
    height: 2rem;
    border: 1px solid #ffddaa;
    box-sizing: border-box;
  }
  .check {
    background: #ffddaa;
    color: #000;
  }
}
.help-head {
  height: 6rem;
  position: relative;
  background: url("../../../static/images/titleBg.png");
  background-size: 100% 100%;
  margin-top: 1rem;
  .help-contnet-head-left {
    position: absolute;
    top: 1rem;
    left: 0.5rem;
  }
  .help-contnet-head-cont {
    font-size: 30px;
    font-family: Microsoft YaHei UI;
    font-weight: bold;
    color: rgba(11, 11, 31, 1);
  }
}
  .help-table{
      margin-top: 1rem;
     .van-cell-group,.van-cell{
         background: transparent;
     }
     div:nth-child(2){
         border-top:0; 
          border-radius:0 0 0.3rem 0.3rem ;
     }
     >div{
         border: 1px solid #ffddaa;
         border-radius: 0.3rem 0.3rem 0 0;
          
     }
       .van-cell__title{
         color: #ffddaa;
         }
  }
  .van-button {
      margin-top: 4rem;
    color: #000 !important;
  }
</style>