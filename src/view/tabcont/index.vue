<template>
  <div class="index">
    <div class="nav">
      <img src="@/assets/logo.png" alt />
      <!-- <p>欢迎回来{{user}}</p> -->
    </div>
    <div class="index-ad">
      <van-swipe :height="150" :autoplay="3000" indicator-color="#f00">
        <van-swipe-item v-for="(item,index) of swiper" :key="index">
          <img width="100%" height="150" :src="item.image" alt />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="notice" @click="$router.push('notice')">
      <img src="@/assets/vioce.png" slot alt="left-icon" />
      <van-notice-bar text="热烈祝贺彩金多app全新上线！！"></van-notice-bar>
    </div>
    <div class="line">
      <p></p>
    </div>

    <div class="index-btn">
      <router-link to="charge">
        <img src="@/assets/chongzhi.png" alt />
      </router-link>
      <div @click="exit">
        <img src="@/assets/login.png" alt />
      </div>
    </div>

    <div class="indeximgone">
      <img :src="one" alt />
    </div>

    <div class="playlist">
      <router-link :to="{path:'pour',query:{type:0}}">
        <img src="@/assets/sai-1.png" alt />
      </router-link>
      <router-link :to="{path:'pour',query:{type:1}}">
        <img src="@/assets/sai-2.png" alt />
      </router-link>
    </div>

    <div class="indeximgtwo">
      <img :src="two" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "张三",
      swiper: [
        require("../../assets/1570505095.jpg"),
        require("../../assets/1570505099.png"),
        require("../../assets/1570505102.png")
      ],
      one: "",
      two: ""
    };
  },
  created() {
    this.$axios
      .fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "Content",
        interface: "getSlides",
        data: {}
      })
      .then(res => {
        window.console.log(res);
        this.swiper = res.data;
      });
    this.$axios
      .fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "Content",
        interface: "advertisingLists",
        data: {}
      })
      .then(res => {
        this.one = res.data.one;
        this.two = res.data.two;
        window.console.log(res);
      });
  },
  methods: {
     exit() {
      this.$axios
        .fetchPost("portal", {
          source: "web",
          version: "v1",
          module: "Account",
          interface: "2000"
        })
        .then(res => {
          window.console.log(res);
          // this.$toast(res.message);
          localStorage.setItem("accessToken", "");
          this.$router.push("login");
        });
    }
  }
};
</script>

<style lang='less' scope>
@color-index: #e4bb80;
@color-font: #fcf0cd;
@color-money: #ffc000;
@bor-bot: 1px solid #d3b787;
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  // overflow-x: hidden;
  display: flex;
  flex-direction: column;
  //   align-items: center;
  .nav {
    background: #000;
    color: @color-font;
    position: fixed;
    z-index: 10;
    top: 0;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    img {
      height: 40px;
      width: 110px;
    }
  }
  .nav:after {
    content: "";
    clear: left;
    display: block;
  }
  .notice {
    width: 100%;
    display: flex;
    padding-left: 30px;
    align-items: center;
    height: 3rem;
    img {
      width: 20px;
      height: 20px;
    }
    .van-notice-bar {
      width: 70%;
      background: transparent;
    }
  }
  // .line {
  //   width: 100%;
  //   background: url(../../assets/line.png);
  //   background-size: 108%;
  //   height: 16px;
  //   margin: 10px 0;
  // }
  .index-btn {
    width: 100%;
    display: flex;
    justify-content: space-around;
    // margin-top: 10px;
    height: 3.5rem;
    img {
      width: 100px;
      height: 30px;
      margin-bottom: 20px;
    }
  }
  .indeximgone {
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100px;
    }
  }

  .playlist {
    width: 100%;
    height: 8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 2rem;
    img {
      width: 180px;
      height: 95px;
    }
  }
  .indeximgtwo {
    margin-bottom: 3rem;
    height: 180px;
  }
  img {
    height: 180px;
    width: 100%;
  }
}
</style>