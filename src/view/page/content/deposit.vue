<template>
  <div class="deposit">
    <titlebar title="提现"></titlebar>
    <div class="deposithint">
      <p>UDSDT实时汇率:</p>
      <p>可提现金额:</p>
      <p>USDT</p>
      <p>实际到账:</p>
    </div>
    <div class="qrCode">
      <div class="qrCodecent">
        <!-- <p>钱包地址</p> -->
        <input placeholder="请输入USDT地址" v-model="usdt" type="text" />
      </div>
      <div class="qrCodecent">
        <!-- <p>金额</p> -->
        <input placeholder="请输入金额" v-model="RMB" type="text" />
      </div>
      <div class="qrCodecent">
        <!-- <p>提现密码</p> -->
        <input placeholder="请输入提现密码" v-model="pay" type="text" />
      </div>
      <div class="btn" @click="submit">
        提交
        <!-- <img src="@/assets/confirm.png" alt /> -->
      </div>
    </div>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";

export default {
  components: {
    titlebar
  },
  data() {
    return {
      usdt: "",
      RMB: "",
      pay: "",
      type: ""
    };
  },
  created() {
    if (this.$route.query.item == 0) {
      //credit_1 中心钱包  credit_2金币钱包  credit_3盈利钱包 credit_4收益钱包
      this.type = "credit_1";
    } else if (this.$route.query.item == 1) {
      this.type = "credit_4";
    } else if (this.$route.query.item == 2) {
      this.type = "credit_3";
    }
    this.$axios
      .fetchPost("/portal/Digiccy", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "2000",
        data: {}
      })
      .then(res => {
        window.console.log(res);
      });
  },
  methods: {
    submit() {
      if (!this.usdt) {
        this.$toast("请输入USDT地址");
        return;
      } else if (!this.RMB) {
        this.$toast("请输入金额");
        return;
      } else if (!this.pay) {
        this.$toast("请输入提现密码");
        return;
      }
      this.$axios
        .fetchPost("/portal/Digiccy", {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "2001",
          data: {
            creditType: this.type,
            address: this.usdt,
            amount: this.RMB,
            safeword: this.pay
          }
        })
        .then(res => {
          this.usdt = "";
          this.RMB = "";
          this.pay = "";
          this.$toast(res.message);
          window.console.log(res);
        });
    }
  }
};
</script>

<style lang='less' scope>
h2 {
  margin-top: 20px;
  text-align: center;
  color: #e1cc9e;
}
.deposit {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  // align-items: center;
  overflow-y: auto;
  .deposithint{
    padding:.2rem 2rem;
    p{
      color: #333;
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 1rem;
    }
  }
  .qrCode {
    // width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 30px;
    color: #fff;
    margin-top: 1rem;
    .qrCodecent {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      width: 100%;
      input {
        color: #af53d1;
        background: transparent;
        border: none;
        border-bottom: 1px solid #af53d1;
        width: 100%;
        font-size: 15px;
        margin-bottom: 0.8rem;
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
        color: #000;
        font-size: 15px;
        margin-right: 50px;
      }
      img {
        width: 175px;
        height: 175px;
      }
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
    background: #af53d1;
    text-align: center;
    line-height: 3rem;
    width: 80%;
    height: 3rem;
    border-radius: 20px;
    img {
      width: 150px;
      height: 45px;
    }
  }
}
</style>