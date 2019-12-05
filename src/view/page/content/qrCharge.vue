<template>
  <div class="qrCharge">
    <titlebar title="充值"></titlebar>
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
      <div class="qrCodecent">
        <div>
          <p>收款钱包</p>
          <span @click="copy(resdata.address)">复制</span>
        </div>

        <span>{{resdata.address}}</span>
      </div>
    </div>

    <div class="hint">
      <img src="@/assets/icon_tips.png" alt />扫码支付或者钱包支付
    </div>

     <div class="qrCode">
    </div>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
// import QRCode from 'qrcodejs2'

export default {
  components: {
    titlebar
  },
  data() {
    return {
      date: "",
      usdt: "",
      RMB: null,
      name: "",
      resdata: {}
    };
  },
  created() {
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
          data:{
            address: this.usdt,
            amount: this.RMB
          }
        })
        .then(res => {
          this.$toast(res.message)
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
}
</style>