<template>
  <div class="index">
    <div class="index-box">
      <div class="nav">
        <!-- <img src="@/assets/logo.png" alt /> -->
        <p>首页</p>
      </div>
      <div class="index-ad">
        <van-swipe :height="150" :autoplay="3000" indicator-color="#f00">
          <van-swipe-item v-for="(item,index) of swiper" :key="index">
            <img width="100%" height="150" :src="item.image" alt />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="notice" @click="$router.push('notice')">
        <img src="@/assets/zhanbao@3x.png" slot alt="left-icon" />
        <van-notice-bar text="热烈祝贺彩金多app全新上线！！"></van-notice-bar>
      </div>

      <div class="indexrouter">
           <div class="router-cont" @click="$router.push('charge')">
          <img width="58px" height="58px" src="@/assets/home_recharge@3x.png" alt />
          <span>充值</span>
        </div>
        <div class="router-cont" @click="$router.push('deposit')">
          <img width="58px" height="58px" src="@/assets/home_withdrawal@3x.png" alt />
          <span>提现</span>
        </div>
        <div class="router-cont" @click="$router.push('edSwitch')">
          <img width="58px" height="58px" src="@/assets/home_conversion@3x.png" alt />
          <span>额度转换</span>
        </div>
        <div class="router-cont"  @click="$router.push('notice')">
          <img width="58px" height="58px" src="@/assets/home_money@3x.png" alt />
          <span>公告</span>
        </div>
      </div>
      <!-- <div class="index-btn">
      <router-link to="charge">
        <img src="@/assets/chongzhi.png" alt />
      </router-link>
      <div @click="exit">
        <img src="@/assets/login.png" alt />
      </div>
      </div>-->

      <!-- <div class="indeximgone">
      <img :src="one" alt />
      </div>-->

      <div class="playlist">
        <!-- <div> -->
        <router-link :to="{path:'pour',query:{type:0}}">
          <div class="playlist-item-title">
            <div class="shuxian">
              <span></span>
              <p>北京赛车</p>
            </div>
            <p>详情</p>
          </div>
          <div class="playlist-item-contnet">
            <img src="@/assets/play@3x.png" alt />
            <div>
              <p>{{beijing.qihao}}期开奖号码</p>
              <ul>
                <li v-for="(item,index) of beijingnum " :key="index">{{item}}</li>
              </ul>
              <p>当前期数:{{beijing.qihao}}</p>
              <div>
                <p>剩余时间:</p>
                <van-count-down @finish="finishedone" :time="beijing.time*1000" />
              </div>
            </div>
          </div>
        </router-link>
        <!-- </div> -->
        <!-- <div> -->
        <router-link :to="{path:'pour',query:{type:1}}">
          <div class="playlist-item-title">
            <div class="shuxian">
              <span></span>
              <p>幸运游艇</p>
            </div>
            <p>详情</p>
          </div>
          <div class="playlist-item-contnet">
            <img src="@/assets/paly@3x(1).png" alt />
            <div>
              <p>{{youting.qihao}}期开奖号码</p>
              <ul>
                <li v-for="(item,index) of youtingnum " :key="index">{{item}}</li>
              </ul>
              <p>当前期数:{{youting.qihao}}</p>
              <div>
                <p>剩余时间:</p>
                <van-count-down @finish="finishedtwo" :time="youting.time*1000" />
              </div>
            </div>
          </div>
        </router-link>
        <!-- </div> -->
      </div>

      <!-- <div class="indeximgtwo">
      <img :src="two" alt />
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "张三",
      swiper: [],
      beijing: {
        qihao: "",
        time: ""
      },
      youting: {
        qihao: "",
        time: ""
      },
      pitch: [],
      pitchs: [],
      kjRecords: {},
      lastId: 0,
      page: 1,
      beijingnum: [],
      youtingnum: []
    };
  },
  created() {
    //轮播
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

    this.beijingdangqian();
    this.youtingdangqian();
    this.beijingkj();
    this.youtingkj();
  },
  methods: {
    beijingdangqian() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "10001",
          data: {
            type: "1"
          }
        })
        .then(res => {
          window.console.log(res);
          // this.price = res.data.price;
          this.beijing.qihao = res.data.qishu;
          this.beijing.time = res.data.kaijiang;
        });
    },
    youtingdangqian() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "10001",
          data: {
            type: "2"
          }
        })
        .then(res => {
          window.console.log(res);
          // this.price = res.data.price;
          this.youting.qihao = res.data.qishu;
          this.youting.time = res.data.kaijiang;
        });
    },
    beijingkj() {
      // let _this = this;
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1004",
          data: {
            lastId: this.lastId,
            page: this.page,
            type: "1"
          }
        })
        .then(res => {
          this.pitch = res.data.list.slice(0, 1)[0].thirdNumber;

          this.beijingnum = this.pitch.split(",");

          window.console.log("近期开奖", this.beijingnum);
        });
    },
    youtingkj() {
      // let _this = this;
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1004",
          data: {
            lastId: this.lastId,
            page: this.page,
            type: "1"
          }
        })
        .then(res => {
          this.pitchs = res.data.list.slice(0, 1)[0].thirdNumber;

          this.youtingnum = this.pitchs.split(",");

          window.console.log("近期开奖", this.youtingnum);
        });
    },
    finishedone() {
      // window.location.reload();
    },
    finishedtwo() {
      // window.location.reload();
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
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  // overflow-x: hidden;
  display: flex;
  flex-direction: column;
  //   align-items: center;
  background: url("../../assets/index@3x.png") no-repeat;
  background-size: 100%;

  .index-box {
    padding: 1rem;
    padding-top: 3rem;
    box-sizing: border-box;
    .indexrouter {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .router-cont {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 13px;
        color: #333;
      }
    }
  }

  .nav {
    //   background: #000;
    //   color: @color-font;
    position: absolute;
    z-index: 10;
    top: 10px;
    left: 50%;
    color: #fff;
    text-align: center;
    // width: 100%;
    box-sizing: border-box;
    //   height: 40px;
    //   display: flex;
    //   justify-content: space-around;
    //   align-items: center;
    //   font-size: 12px;
    //   img {
    //     height: 40px;
    //     width: 110px;
    //   }
  }
  .nav:after {
    content: "";
    clear: left;
    display: block;
  }
  .notice {
    // width: 100%;
    display: flex;
    padding-left: 30px;
    align-items: center;
    height: 3rem;
    box-sizing: border-box;
    img {
      width: 20px;
      height: 20px;
    }
    .van-notice-bar {
      width: 70%;
      background: transparent;
      font-size: 14px;
      .van-notice-bar__content {
        font-size: 14px;
        color: #666;
      }
    }
  }
  // .line {
  //   width: 100%;
  //   background: url(../../assets/line.png);
  //   background-size: 108%;
  //   height: 16px;
  //   margin: 10px 0;
  // }

  .playlist {
    width: 100%;
    height: 8rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    align-items: center;
    margin-bottom: 2rem;
    a {
      width: 100%;
      border-radius: 6px;
      box-shadow: 6px 2px 10px #ddd4ec;
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 0.5rem;
      font-size: 12px;
      color: #333;
      p {
        font-size: 12px;
      }
      .playlist-item-title {
        display: flex;
        justify-content: space-between;
        .shuxian {
          display: flex;
          align-items: center;

          span {
            display: inline-block;
            height: 12px;
            width: 4px;
            background: #0994f2;
            margin-right: 5px;
          }
        }
      }
      .playlist-item-contnet {
        display: flex;
        align-items: center;
        // justify-content: space-around;
        div {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        ul {
          display: flex;
          li {
            background: #0197f1;
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            line-height: 1.2rem;
            font-size: 10px;
            margin-right: .1rem;
          }
        }
        img {
          margin: 0 1rem;
        }
      }
      img {
        width: 5.6rem;
        height: 5.6rem;
      }
    }
  }
  .indeximgtwo {
    margin-bottom: 3rem;
    height: 180px;
  }
}
</style>