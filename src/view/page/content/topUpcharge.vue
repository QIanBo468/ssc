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
    <UserXq :wallet="false"></UserXq>
    <div class="qrCharge">
      <div class="qrCode">
        <div class="qrCodecent">
          <p>收款方式: USDT</p>
        </div>
        <!-- <div class="qrCodecent">
          <p>收款方式</p>
          <span>USDT</span>
        </div>-->
        <div class="qrCodecent">
          <p>实时汇率:</p>
          <span>7.05</span>
        </div>
        <div class="qrCodecent">
          <p>链名称</p>
          <span>ERC20</span>
        </div>

        <div class="qrCodecentimg">
          <!-- <p>收款码</p> -->
          <img :src="resdata.qrCode" alt />
        </div>
        <div class="qrwallet">
          <div>
            <p>收款钱包</p>
          </div>
          <div>
            <span class="address-text">{{resdata.address}}</span>
            <span @click="copy(resdata.address)">复制地址</span>
          </div>
        </div>

        <div class="topUp-box">
          <p style="color:#0197f1">汇率计算:</p>
          <div>
            <van-field
              class="topUp-input"
              v-model="huilv"
              type="number"
              placeholder="请输入RMB金额"
            />≈
            <!-- <van-field class="topUp-input" v-model="huilvusde" type="number" placeholder="换算为USDT" /> -->
            <p class="huansuan">换算为{{(huilv/7.05).toFixed(2)}}USDT</p>
            
          </div>
        </div>
      </div>

      <div class="hint">
        <!-- <img src="@/assets/icon_tips.png" alt />扫码支付或者钱包支付 -->
      </div>

      <div class="qrCode"></div>
    </div>
    <ul>
      <li>充值步骤：</li>
      <li
        style="white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-all; color:#999999"
        v-html="chongzhiText"
      ></li>
    </ul>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
import UserXq from "@/components/Titlewallet";
export default {
  data() {
    return {
      active: 0,
      user: {},
      huilv: null,
      huilvusde:null,
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
  watch : {
    huilv () {
      this.huilvusde =   Math.ceil(this.huilv/7.05/100)
    }
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
    background: #0197f1;
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
    // border: 1px solid #f2e5ca;
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
      color: #666;
      font-weight: bold;
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
          color: #0197f1;
        }
        border-bottom: none;
      }
      // &:last-child {
      //   display: flex;
      //   flex-direction: column;
      //   align-items: flex-start;
      //   justify-content: space-between;
      //   div {
      //     display: flex;
      //     align-items: center;
      //     margin-bottom: 5px;
      //     span {
      //       color: rgb(149, 34, 190);

      //       border: 1px solid rgb(149, 34, 190);
      //       padding: 2px;
      //       border-radius: 3px;
      //       font-size: 12px;
      //     }
      //   }
      //   .address-text {
      //     font-size: 13px;
      //   }
      // }
      p {
        color: #0197f1;
        font-size: 15px;
        margin-right: 50px;
        font-weight: bold;
      }
      img {
        width: 175px;
        height: 175px;
      }
    }
    .qrCodecentimg {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
      img {
        width: 175px;
        height: 175px;
      }
    }
  }

  .topUp-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #333;
    p{
      color: #0197f1;
      font-size: 15px;
      font-weight: bold;
    }
    .huansuan{
      font-size: 13px;
      margin-left: 1rem;
      color: #999;
    }
    div{
      display: flex;
      align-items: center;
    }
    .van-field__control{
      font-size: 13px !important;
    }
    .van-cell{
      border-bottom: 1px solid #eee;
      width: 150px;
    }
    .van-cell:not(:last-child)::after{
      border: none;
    }
  }

  .hint {
    color: #0197f1;
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
    display: flex;
    flex-direction: column;
    border: none;
    div {
      // display: flex;
      width: 100%;
      p {
        color: #0197f1;
        font-weight: bold;
        font-size: 15px;
        margin-bottom: 0.5rem;
      }
      span:first-child {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: none;
        font-size: 13px;
      }
      span:last-child {
        font-size: 13px;
        display: inline-block;
        // width: 6rem;
        text-align: center;
        // border-left: solid #666;
      }
    }
  }
  .van-field__control {
    color: #999 !important;
    // border-bottom: 1px solid #999;
  }
}
</style>