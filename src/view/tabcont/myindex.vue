<template>
  <div class="myindex">
    <van-nav-bar title="我的" :border="false">
      <slot slot="right" name="right">
        <img width="30px" height="30px" src="@/assets/set@3x.png" alt />
      </slot>
    </van-nav-bar>
    <div class="mindex-contnet">
      <div class="mindex-contnet-box">
        <div class="userdata">
          <div class="user">
            <div class="avatar">
              <img class="touxiang" :src="user.avatar" alt />
              <div class="level">
                <span>{{user.account}}</span>
                <!-- <span>ID: {{user.id}}</span> -->
              </div>
              <div class="indexAdderss" @click="$router.push('myAddress')">
                <img src="@/assets/card_icon@3x1.png" alt />
                地址簿
              </div>
            </div>
          </div>
          <!-- <div class="index-jindu"> -->
          <div class="jindu">
            <span>VIP{{user.levelLeft}}</span>
            <van-progress
              stroke-width="8"
              track-color="#DCDEEA"
              color="#1989fa"
              pivot-text
              :percentage="user.levelPercent"
            />
            <span>VIP{{user.levelRight}}</span>
          </div>
          <p>{{user.levelTxt}}</p>
        </div>
      </div>
      <div class="myindex-wallet">
        <div class="wallet-item">
          <img src="@/assets/zhongxinqianbao_icon@3x.png" alt />
          <div>
            <p>中心钱包</p>
            <span>￥{{wallet.credit_1.value}}</span>
          </div>
        </div>
        <div class="wallet-item">
          <img src="@/assets/jinbiqianbao_icon@3x.png" alt />
          <div>
            <p>金币钱包</p>
            <span>￥{{wallet.credit_2.value}}</span>
          </div>
        </div>
        <div class="wallet-item">
          <img src="@/assets/yingliqianbao_icon@3x.png" alt />
          <div>
            <p>盈利钱包</p>
            <span>￥{{wallet.credit_3.value}}</span>
          </div>
        </div>
        <div class="wallet-item">
          <img src="@/assets/shouyiqianbao_icon@3x.png" alt />
          <div>
            <p>收益钱包</p>
            <span>￥{{wallet.credit_4.value}}</span>
          </div>
        </div>
      </div>

      <div class="myindexrouter">
        <div class="router-cont" @click="$router.push('topUpcharge')">
          <img width="58px" height="58px" src="@/assets/home_recharge@3x.png" alt />
          <span>充值</span>
        </div>
        <div class="router-cont" @click="$router.push('depcharge')">
          <img width="58px" height="58px" src="@/assets/home_withdrawal@3x.png" alt />
          <span>提现</span>
        </div>
        <div class="router-cont" @click="$router.push('edSwitch')">
          <img width="58px" height="58px" src="@/assets/home_conversion@3x.png" alt />
          <span>额度转换</span>
        </div>
        <div class="router-cont" @click="$router.push('notice')">
          <img width="58px" height="58px" src="@/assets/home_money@3x.png" alt />
          <span>公告</span>
        </div>
      </div>

      <!-- <div class="index-btn">
        <img src="@/assets/chongzhi.png" alt @click="$router.push('charge')" />

        <img src="@/assets/btn_change.png" @click="$router.push('edSwitch')" alt />
      </div>-->
      <ul class="list">
        <li>
          <router-link to="touzhu">
            <p>投注记录</p>
            <img src="@/assets/more@3x.png" alt />
          </router-link>
        </li>
        <li>
          <router-link to="topUp">
            <p>充值记录</p>
            <img src="@/assets/more@3x.png" alt />
          </router-link>
        </li>
        <li>
          <router-link to="depositRecord">
            <p>提现记录</p>
            <img src="@/assets/more@3x.png" alt />
          </router-link>
        </li>
        <li>
          <router-link to="mingxi">
            <p>账变明细</p>
            <img src="@/assets/more@3x.png" alt />
          </router-link>
        </li>
        <li>
          <router-link to="addpople">
            <p>增加会员</p>
            <img src="@/assets/more@3x.png" alt />
          </router-link>
        </li>
        <li>
          <router-link to="yaoqing">
            <p>邀请好友</p>
            <img src="@/assets/more@3x.png" alt />
          </router-link>
        </li>
        <li>
          <router-link to="myteam">
            <p>我的团队</p>
            <img src="@/assets/more@3x.png" alt />
          </router-link>
        </li>
        <li>
          <router-link to="setting">
            <p>安全设置</p>
            <img src="@/assets/more@3x.png" alt />
          </router-link>
        </li>
        <li>
          <div @click="exit">
            <p>退出登录</p>
            <img src="@/assets/more@3x.png" alt />
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      wallet: {
        credit_1: "",
        credit_2: "",
        credit_3: "",
        credit_4: ""
      }
    };
  },
  created() {
    this.$axios
      .fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "User",
        interface: "1000"
      })
      .then(res => {
        if (res.code == 0) {
          this.user = res.data;
        } else {
          this.$toast(res.message);
        }
        window.console.log(res);
      });

    this.$axios
      .fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1000"
      })
      .then(res => {
        this.wallet.credit_1 = res.data.creditList.credit_1;
        this.wallet.credit_2 = res.data.creditList.credit_2;
        this.wallet.credit_3 = res.data.creditList.credit_3;
        this.wallet.credit_4 = res.data.creditList.credit_4;
        window.console.log("钱包信息", res);
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
          this.$toast(res.message);
          localStorage.setItem("accessToken", "");
          this.$router.push("login");
        });
    }
  }
};
</script>

<style lang='less' sceop>
.myindex {
  width: 100%;
  height: 100%;
  // background: url(../../assets/myBg.jpg);
  // display: flex;
  // flex-direction: column;
  background: url("../../assets/index2@3x.png") no-repeat;
  background-size: 100%;
  .mindex-contnet {
    // height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  .userdata {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    background: #fff;
    position: relative;
    box-shadow: 2px 6px 10px #ddd4ec;
    .user {
      display: flex;
      // justify-content: space-around;
      align-items: center;
      margin-bottom: 1rem;
      height: 5rem;
      .avatar {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .level {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          margin-left: 2rem;
          margin-top: 3.5rem;
          // span {
          span:first-child {
            font-size: 15px;
            color: #333;
          }
          span:last-child {
            font-size: 13px;
            color: #666;
          }
          // }
        }
        .indexAdderss {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #6cc0f5;
          width: 4.5rem;
          height: 2rem;
          font-size: 13px;
          text-align: center;
          border-top-left-radius: 11px;
          border-bottom-left-radius: 11px;
          img {
            width: 1rem;
            height: 1rem;
          }
        }
        .touxiang {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 1px solid #ffc000;
          position: absolute;
          top: -2.3rem;
          left: 2rem;
        }
      }
    }
    .jindu {
      width: 80%;
      height: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;

      span {
        color: #0197f1;
        font-size: 13px;
      }
      // }
    }
    p {
      color: #999999;
      font-size: 14px;
      text-align: center;
      margin: 0;
      padding: 0;
    }
  }
}

// 钱包
.myindex-wallet {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  // height: 5rem;
  padding: 20px 0;
  // border-top: 1px solid #504339;
  // border-bottom: 1px solid #504339;
  margin-top: 10px;
  width: 100%;

  .wallet-item {
    width: 50%;
    height: 3.75rem;
    // background: url(../../assets/wallet_bg.png) no-repeat;
    box-shadow: 2px 6px 10px #ddd4ec;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
    p {
      font-size: 10px;
      margin: 0;
      padding: 0;
      color: #333;
      text-align: center;
      // margin-bottom: 10px;
    }
    span {
      display: block;
      font-size: 15px;
      color: #333333;
      text-align: center;
    }
    img {
      width: 22px;
      height: 22px;
      margin-right: 0.2rem;
    }
  }
}
.myindexrouter {
  display: flex;
  justify-content: space-around;
  .router-cont {
    color: #333;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
  }
}
// .index-btn {
//   width: 100%;
//   display: flex;
//   justify-content: space-around;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   height: 4rem;
//   img {
//     width: 130px;
//     height: 50px;
//   }
// }

.list {
  margin-top: 1.5rem;
  margin-bottom: 30px;
  // width: 100%;
  // height: 16rem;
  li {
    // width: 3.5rem;
    height: 3.2rem;
    // margin: 0.5rem;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 13px;
        color: #666;
        font-weight: bold;
      }
    }
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 13px;
        color: #666;
        font-weight: bold;
      }
    }
    img {
      width: 18px;
      height: 18px;
    }
  }
}
/deep/.van-nav-bar__title {
  color: #fff;
}
.van-nav-bar__right {
  display: flex;
  align-items: center;
}
.mindexbtn {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 50px;
  .mindexbtn-img {
    width: 100%;
  }
}
.van-progress {
  margin-top: 10px;
  width: 80%;
  border: 1px solid #f2e5ca;
  margin: 0 auto;
}
</style>