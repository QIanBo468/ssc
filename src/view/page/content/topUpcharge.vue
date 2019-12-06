<template>
  <div class="charge">
    <titlebar title="充值"></titlebar>
    <!--   
        <div class="user">
          <img :src="user.avatar" alt />
          <div>
            <p>{{user.account}}</p>
            <p>ID：{{user.id}}</p>
            <h3>中心钱包：{{tixian.value}}</h3>
          </div>
    </div>-->
    <UserXq :wallet=false></UserXq>
    <div class="qrCharge">
      <div class="qrCode">
        <div class="qrCodecent">
          <p>收款信息</p>
        </div>
        <div class="qrCodecent">
          <p>收款方式</p>
          <span>USDT</span>
        </div>
        <div class="qrCodecent">
          <p>链名称</p>
          <span>ERC20</span>
        </div>
        <div class="qrCodecent">
          <p>收款码</p>
          <img :src="resdata.qrCode" alt />
        </div>
        <div class="qrCodecent qrwallet">
          <div>
            <p>收款钱包</p>
            <span @click="copy(resdata.address)">一键复制</span>
          </div>

          <span class="address-text">{{resdata.address}}</span>
        </div>
      </div>

      <div class="hint">
        <img src="@/assets/icon_tips.png" alt />扫码支付或者钱包支付
      </div>

      <div class="qrCode"></div>
    </div>
    <ul>
      <li>充值步骤：</li>
      <li
        style="white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-all;"
        v-html="chongzhiText"
      ></li>
      <!-- <li>2.从法币账户转入币币账户</li>
          <li>3.点击提笔输入USDT复制彩金彩钱包地址，输入提笔数量确定</li>
          <li>4后台提交褪影的USDT数量，就会有折合人民币的提示，输入姓名提交</li>
          <li>重要提示：请每次充值时务必核对最新的二维码钱包地址信息!平台会用不定期更换新的二维码钱包地址。如因本人原因造成的损失平台概不负责！</li>
          <li>温馨提示：人民币提现每日仅限1次，金额5000元以内。</li>
      <li>USDT提现无上限</li>-->
    </ul>
    <!-- </van-tab> -->

    <!-- <van-tab title="提现"> -->
    <!-- <div class="user">
          <img :src="user.avatar" alt />
          <div>
            <p>{{user.account}}</p>
            <p>ID:{{user.id}}</p>
            <h3>中心钱包：{{user.wallet}}</h3>
          </div>
        </div>

        <div class="walletshouyi">
          <div>
            <p>盈利钱包</p>
            <span>{{tixian.yingli}}</span>
          </div>
          <div>
            <p>收益钱包</p>
            <span>{{tixian.shouyi}}</span>
          </div>
          <div>
            <p>中心钱包</p>
            <span>{{tixian.zhongxin}}</span>
          </div>
        </div>

        <div class="wallet" @click="$router.push({path:'deposit',query:{item:0}})">
          <span>中心钱包提现</span>
          <img src="@/assets/cz_icon.png" alt />
        </div>
        <div class="wallet" @click="$router.push({path:'deposit',query:{item:1}})">
          <span>收益钱包提现</span>
          <img src="@/assets/cz_icon.png" alt />
        </div>
        <div class="wallet" @click="$router.push({path:'deposit',query:{item:2}})">
          <span>盈利钱包提现</span>
          <img src="@/assets/cz_icon.png" alt />
        </div>

        <ul>
          <li>温馨提示</li>
          <li
            style="white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-all;"
            v-html="tixianText"
          ></li>
    </ul>-->
    <!-- </van-tab> -->
    <!-- </van-tabs> -->
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
import UserXq from "@/components/UserXq";
export default {
  data() {
    return {
      active: 0,
      user: {},
      tixian: {
        yingli: "0.00",
        shouyi: "0.00",
        zhongxin: "0.00"
      },
      tixianText: "",
      chongzhiText: "",
      date: "",
      usdt: "",
      RMB: null,
      name: "",
      resdata: {}
    };
  },

  components: {
    titlebar,
    UserXq
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

    // this.$axios
    //   .fetchPost("portal", {
    //     source: "web",
    //     version: "v1",
    //     module: "Finance",
    //     interface: "1000"
    //   })
    //   .then(res => {
    //     this.tixian = res.data.creditList.credit_1;
    //     window.console.log("钱包信息", res);
    //   });

    this.$axios
      .fetchPost("portal/Digiccy", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1000"
      })
      .then(res => {
        this.chongzhiText = res.data.statement;
        window.console.log(res);
      });
    this.$axios
      .fetchPost("portal/Digiccy", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "2000"
      })
      .then(res => {
        this.tixianText = res.data.params.statement;
        window.console.log(res);
      });

    let date;
    date = new Date().toLocaleString();
    // let dateTime = date.;
    // let dates = dateTime.substring(0, 10); //截取日期
    // let time = dateTime.substring(10, 20); //截取时间
    // let week = date.getDay(); //星期
    // let hour = date.getHours(); //小时
    this.date = date;

    this.$axios
      .fetchPost("portal/Digiccy", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1000"
      })
      .then(res => {
        this.resdata = res.data;
        window.console.log(this.resdata);
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    submit() {
      if (!this.usdt) {
        this.$toast("请输入USDT");
        return;
      } else if (!this.RMB) {
        this.$toast("请输入RMB");
        return;
      }
      this.$axios
        .fetchPost("portal/Digiccy", {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "1001",
          data: {
            address: this.usdt,
            amount: this.RMB
          }
        })
        .then(res => {
          this.$toast(res.message);
          window.console.log(res);
        });
      //   console.log('确认')
    },
    copy(num) {
      // this.show = true;
      this.$toast("已复制");
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", num);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
      }
      document.body.removeChild(input);
    }
  }
};
</script>

<style lang='less' scope>
.charge {
  background: transparent;
  width: 100%;
  height: 100%;
  .user {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 50px;
    background: rgb(149, 34, 190);
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 8px;
    img {
      width: 43px;
      height: 43px;
      // border: 1px solid #f2e5ca;
      border-radius: 50%;
      margin-right: 20px;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      p {
        font-size: 14px;
        color: #fff;
        margin: 0;
        padding: 0;
      }
      h3 {
        // color: #e1cc9e;
        color: #fff;
        margin: 0;
        padding: 0;
        font-size: 14px;
      }
    }
  }
  .wallet {
    padding: 0;
    height: 40px;
    display: flex;
    justify-content: space-around;
    background: transparent;
    align-items: center;
    .walletone {
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 35px;
        height: 35px;
      }
    }
    span {
      //   line-height: 60px;
      margin-left: 5px;
      color: #e1cc9e;
    }
    img {
      width: 25px;
      height: 25px;
    }
  }
  ul {
    padding: 20px;
    li {
      color: #333;
      font-size: 14px;
      margin-bottom: 10px;
    }
    span {
      color: #f00;
    }
  }

  .walletshouyi {
    display: flex;
    padding: 10px;
    border: 1px solid #f2e5ca;
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
    p {
      font-size: 16px;
      color: #e1cc9e;
    }
    span {
      font-size: 16px;
      color: #e1cc9e;
      font-weight: bold;
    }
  }
}
.qrCharge {
  // width: 100%;
  // height: 100%;
  // background: url(../../../assets/myBg.jpg);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .qrCode {
    // width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 5px 30px;
    color: #fff;
    span {
      color: rgb(149, 34, 190);
    }
    .qrCodecent {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      &:first-child {
        p {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          color: rgb(149, 34, 190);
        }
        border-bottom: 1px solid #666;
      }
      &:last-child {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        div {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          span {
            color: rgb(149, 34, 190);
            border: 1px solid rgb(149, 34, 190);
            padding: 2px;
            border-radius: 3px;
            font-size: 12px;
          }
        }
        .address-text {
          font-size: 13px;
        }
      }
      p {
        color: rgb(149, 34, 190);
        font-size: 15px;
        margin-right: 50px;
      }
      img {
        width: 175px;
        height: 175px;
      }
    }
  }
  .qrCode:last-child {
    .qrCodecent {
      span {
        color: #edd39a;
      }
      input {
        background: transparent;
        color: #edd39a;
        width: 100%;
        border: none;
        border-bottom: 1px solid rgb(149, 34, 190);
      }
    }
    ul {
      padding: 20px;
      li {
        color: #ff6600;
        font-size: 14px;
        margin-bottom: 10px;
      }
      span {
        color: #f00;
      }
    }

    .btn {
      text-align: center;
      img {
        width: 150px;
        height: 45px;
      }
    }
  }

  .hint {
    color: rgb(149, 34, 190);
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    img {
      height: 18px;
      width: 18px;
    }
  }
  .qrwallet {
  }
}
</style>