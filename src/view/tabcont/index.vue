<template>
  <div class="index">
    <div class="index-box">
      <div class="nav">
        <img src="@/assets/icon-512.png" alt width="30px" height="30px" />
        <p>JinDuoduo</p>
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
        <van-notice-bar :text="notice.title"></van-notice-bar>
      </div>

      <div class="indexrouter">
        <div class="router-cont" @click="$router.push('topUpcharge')">
          <img width="58px" height="58px" src="@/assets/chongzhi_icon@3x.png" alt />
          <span>充值</span>
        </div>
        <div class="router-cont" @click="$router.push('depcharge')">
          <img width="58px" height="58px" src="@/assets/tixian_icon@3x.png" alt />
          <span>提现</span>
        </div>
        <div class="router-cont" @click="$router.push('edSwitch')">
          <img width="58px" height="58px" src="@/assets/eduzhuanhuan_icon@3x.png" alt />
          <span>额度转换</span>
        </div>
        <div class="router-cont" @click="$router.push('notice')">
          <img width="58px" height="58px" src="@/assets/qianbao_icon@3x.png" alt />
          <span>公告</span>
        </div>
      </div>

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
            <img src="@/assets/7@3x.png" alt />
            <div>
              <p>{{beijingbefor.numberPeriods}}期开奖号码</p>
              <ul>
                <li v-for="(item,index) of beijingnum " :key="index">{{item}}</li>
              </ul>
              <p>当前期数:{{beijing.qihao}}</p>
              <div>
                <p>剩余时间:</p>
                <van-count-down @finish="finished" :time="beijing.time*1000+1" />
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
            <img src="@/assets/7@3x1.png" alt />
            <div>
              <p>{{youtingbefor.numberPeriods}}期开奖号码</p>
              <ul>
                <li v-for="(item,index) of youtingnum " :key="index">{{item}}</li>
              </ul>
              <p>当前期数:{{youting.qihao}}</p>
              <div>
                <p>剩余时间:</p>
                <van-count-down @finish="finished" :time="youting.time*1000+1" />
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
// import { Dialog } from "vant";
export default {
  data() {
    return {
      user: "张三",
      swiper: [],
      beijing: {
        qihao: "",
        time: 10
      },
      youting: {
        qihao: "",
        time: 10
      },
      pitch: [],
      pitchs: [],
      kjRecords: {},
      lastId: 0,
      page: 1,
      beijingnum: [],
      beijingbefor: "",
      youtingnum: [],
      youtingbefor: "",
      Rtime: false,
      notice: ""
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
    this.$axios
      .fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "Content",
        interface: "3000",
        data: {
          lastId: 0,
          page: 1
        }
      })
      .then(res => {
        if (res.code == 0) {
          window.console.log(res);
          this.notice = res.data.list[0];
        }
      });
    // setTimeout(()=>{
    this.beijingdangqian();
    this.youtingdangqian();
    this.beijingkj();
    this.youtingkj();
    // },1000)
  },
  methods: {
    // xinkaijiangs() {
    //   setInterval(() => {
    //     this.xinkaijiang();
    //   }, 60000);
    // },
    // xinkaijiang() {
    //   this.$axios
    //     .fetchPost("portal", {
    //       source: "web",
    //       version: "v1",
    //       module: "Lottery",
    //       interface: "1008",
    //       data: {
    //         type: this.playtype
    //       }
    //     })
    //     .then(res => {
    //       // this.jinbi = res.data.creditList.credit_2.value;
    //       // this.jiangliushui = res.data.prize;
    //       window.console.log("最新开奖号码", res);
    //       this.current = res.data.numberPeriods;
    //       this.num = res.data.thirdNumber.split(",");
    //       if (!res.data.isLottery) {
    //         this.thirdNumber = 0;
    //       } else {
    //         this.thirdNumber = 1;
    //       }
    //       //       setInterval(()=>{
    //       //         this.xinkaijiang()
    //       // },5000)
    //     });
    // },
    finished() {
      // this.querenTime = false;
      window.console.log("时间结束");
      // this.$router.go(0)
      setTimeout(() => {
        this.finishedss();
      }, 3000);
    },
    finishedss() {
      setTimeout(() => {
        // if (this.time >= 0) {
          this.$router.go(0);
        // }
        //
      }, 2000);
    },




    
    beijingdangqian() {
      let _this = this;
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
          _this.beijing.qihao = res.data.qishu;
          _this.beijing.time = res.data.kaijiang;
        });
    },
    youtingdangqian() {
      window.console.log("14684321");
      let _this = this;
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
          _this.youting.qihao = res.data.qishu;
          _this.youting.time = res.data.kaijiang;
        });
    },
    beijingkj() {
      let _this = this;
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
          _this.pitch = res.data.list.slice(0, 1)[0].thirdNumber;
          _this.beijingbefor = res.data.list[0];
          _this.beijingnum = this.pitch.split(",");

          window.console.log("近期开奖", res);
        });
    },
    youtingkj() {
      let _this = this;
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
            type: "2"
          }
        })
        .then(res => {
          _this.pitchs = res.data.list.slice(0, 1)[0].thirdNumber;
          _this.youtingbefor = res.data.list[0];
          _this.youtingnum = this.pitchs.split(",");

          window.console.log("近期开奖", this.youtingnum);
        });
    },
    finishedone() {
      // window.location.reload();
      //    this.beijingdangqian();
      // this.youtingdangqian();
      // this.beijingkj();
      // this.youtingkj();
      // this.$router.go(0);
    },
    finishedtwo() {
      // window.location.reload();
    },
    shuaxin() {
      this.$router.go(0);
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
  background: url("../../assets/index2@3x.png") no-repeat;
  background-size: 100%;
  padding-top: 2rem;
  .index-box {
    padding: 1rem;
    // padding-top: 3rem;
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
    position: fixed;
    width: 280px;
    // border:1px solid #333;
    z-index: 10;
    top: 10px;
    left: 50%;
    margin-left: -140px;
    color: #fff;
    // text-align: center;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 0.5rem;
    p {
      padding-top: 10px;
      position: absolute;
      right: 27%;
      top: 10%;
    }
    img {
      position: absolute;
      left: 28%;
    }
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
    // height: 8rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    align-items: center;
    margin-bottom: 2rem;
    a {
      width: 100%;
      height: 8rem;
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
            background: #af53d1;
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            line-height: 1.2rem;
            font-size: 10px;
            margin-right: 0.1rem;
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