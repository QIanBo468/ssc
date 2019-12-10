<template>
  <div class="deposit">
   
      <titlebar title="提现" routes="depcharge"></titlebar>
       <div class="depoist-box">
      <div class="deposithint">
        <p>USDT实时汇率:{{rate}}</p>
        <p>可提现金额:{{Yue}}</p>
        <p v-if="type=='credit_1'">手续费:{{canshu.feeRate}}%</p>
        <p style="margin-top:1.5rem;">USDT</p>
        <p  v-if="type=='credit_1'">实际到账:{{((RMB-RMB*canshu.feeRate*0.01)/rate).toFixed(2)}}</p>
        <p v-else>实际到账:{{Math.floor(RMB/rate*100)/100}}</p>
         <!-- <p v-else>实际到账:{{(RMB/rate).toFixed(2)}}</p> -->
      </div>
      <div class="qrCode">
        <div class="qrCodecent">
          <!-- <p>钱包地址</p> -->
          <van-cell-group>
            <van-field
              v-model="usdt"
              right-icon="contact"
              placeholder="请输入USDT地址"
              @click-right-icon="$router.push('myAddress')"
            />
          </van-cell-group>
          <!-- <input placeholder="请输入USDT地址" v-model="usdt" type="text" />
          <van-icon name="manager-o"></van-icon>-->
        </div>
        <div class="qrCodecent">
          <!-- <p>金额</p> -->
          <van-cell-group>
            <van-field v-model="RMB" placeholder="请输入金额" />
          </van-cell-group>
          <!-- <input placeholder="请输入金额" v-model="RMB" type="text" /> -->
        </div>
        <div class="qrCodecent">
          <!-- <p>提现密码</p> -->
          <van-cell-group>
            <van-field v-model="pay" placeholder="请输入提现密码" />
          </van-cell-group>
          <!-- <input placeholder="请输入提现密码" v-model="pay" type="text" /> -->
        </div>
        
        <div class="btn" @click="submit">
          提交
          <!-- <img src="@/assets/confirm.png" alt /> -->
        </div>
     
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
      canshu: {
        feeRate: 5
      },
      Yue: "",
      usdt: "",
      RMB: "",
      pay: "",
      type: "",
      rate:''
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
    this.usdt = this.$route.query.address;
    this.$axios
      .fetchPost("/portal/Digiccy", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "2000",
        data: {}
      })
      .then(res => {
        this.canshu = res.data.params
        window.console.log(res);
      });
    this.$axios
      .fetchPost("/portal", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1000",
        data: {}
      })
      .then(res => {
        // this.canshu = res.data.params
        if (this.type == "credit_1") {
          this.Yue = res.data.creditList.credit_1.value;
        } else if (this.type == "credit_3") {
          this.Yue = res.data.creditList.credit_3.value;
        } else if (this.type == "credit_4") {
          this.Yue = res.data.creditList.credit_4.value;
        }
        window.console.log(res);
      });
       this.$axios
      .fetchPost("/portal/Digiccy", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1000",
        data: {}
      }).then(res=> {
        this.rate = res.data.rate
        window.console.log(res)
      })
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
  .depoist-box{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .deposithint {
    width: 100%;
    // margin-top: 2rem;
    // padding: 0.5rem 2rem;
     display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 5rem;
    padding-top: 2rem;
    p {
      color: #333;
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 1rem;
    }
  }
  .qrCode {
    width: 100%;
    height: 100%;
    padding-left: 5rem;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // padding: 5px 30px;
    color: #fff;
    // margin-top: 1rem;
    .qrCodecent {
      display: flex;
      align-items: center;

      margin-bottom: 15px;
      width: 100%;
      input {
        color: #0197f1;
        background: transparent;
        border: none;

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
    background: #0197f1;
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
  .van-cell {
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #0197f1;
  }
  .van-field__control {
    color: #0197f1 !important;
  }
}
</style>