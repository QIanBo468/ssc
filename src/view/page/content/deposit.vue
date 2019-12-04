<template>
  <div class="deposit">
    <titlebar title="提现"></titlebar>

    <div class="qrCode">
      <div class="qrCodecent">
        <p>钱包地址</p>
        <input placeholder="请输入USDT地址" v-model="usdt" type="text" />
      </div>
      <div class="qrCodecent">
        <p>金额</p>
        <input placeholder="请输入金额" v-model="RMB" type="text" />
      </div>
      <div class="qrCodecent">
        <p>提现密码</p>
        <input placeholder="请输入提现密码" v-model="pay" type="text" />
      </div>
      <!-- <div class="qrCodecent">
        <p>存款人姓名</p>
        <input 
        placeholder="请输入存款人姓名"
        v-model="name"  type="text" />
      </div>-->

      <ul>
        <li>充值步骤：</li>
        <li>1.在火币网购买USDT</li>
        <li>2.从法币账户转入币币账户</li>
        <li>3.点击提笔输入USDT复制彩金彩钱包地址，输入提笔数量确定</li>
        <li>4后台提交褪影的USDT数量，就会有折合人民币的提示，输入姓名提交</li>
        <li>温馨提示：请每次充值时务必核对最新的二维码钱包地址信息!平台会用不定期更换新的二维码钱包地址。如因本人原因造成的损失平台概不负责！</li>
      </ul>

      <div class="btn" @click="submit">
        <img src="@/assets/confirm.png" alt />
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
     this.$axios
        .fetchPost("/portal/Digiccy", {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "2000",
          data: {

          }
        }).then(res=>{
          window.console.log(res)
        })
  },
  methods: {
    submit() {
      if (!this.usdt) {
          this.$toast('请输入USDT地址')
          return
      } else if (!this.RMB) {
        this.$toast('请输入金额')
        return
      } else if (!this.pay) {
        this.$toast('请输入提现密码')
        return
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
          this.$toast(res.message)
          window.console.log(res);
        });
    }
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
  height: 100%;
  background: url(../../../assets/myBg.jpg);
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
    margin-top: 4rem;
    .qrCodecent {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      input {
        color: #e1cc9e;
        background: transparent;
        border: none;
        border-bottom: 1px solid #e1cc9e;
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
</style>