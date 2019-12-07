<template>
  <div class="depcharge">
    <titlebar title="提现" routes='/'></titlebar>
    <UserXq :wallet="false"></UserXq>

    <div class="wallet" @click="$router.push({path:'deposit',query:{item:0}})">
      <span>中心钱包提现</span>
      <img src="@/assets/more@3x.png" alt />
    </div>
    <!-- <div class="wallet" @click="$router.push({path:'deposit',query:{item:1}})">
      <span>收益钱包提现</span>
      <img src="@/assets/cz_icon.png" alt />
    </div> -->
    <div class="wallet" @click="$router.push({path:'deposit',query:{item:2}})">
      <span>盈利钱包提现</span>
      <img src="@/assets/more@3x.png" alt />
    </div>

    <ul>
      <li>温馨提示</li>
      <li
        style="white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-all;"
        v-html="tixianText"
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
.depcharge {
  background: transparent;
  width: 100%;
  height: 100%;
  .wallet {
    padding: 0;
    height: 40px;
    width: 100%;
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
      color: #333;
      font-size: 15px;
    }
    img {
      width: 25px;
      height: 25px;
    }
  }
  ul {
    padding: 2rem;
    li {
      color: #999;
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

    .qrCodecent {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      &:first-child {
        p {
          font-size: 18px;
          margin-bottom: 10px;
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
            color: #edd39a;
            border: 1px solid #edd39a;
            padding: 2px;
            border-radius: 3px;
          }
        }
      }
      p {
        color: #fff;
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
        border-bottom: 1px solid #edd39a;
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
    color: #edd39a;
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