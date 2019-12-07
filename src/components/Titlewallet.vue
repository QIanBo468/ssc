<template>
  <div class="myindex-wallet">
    <div class="wallet-item">
      <img src="@/assets/zhongxinqianbao_icon@3x.png" alt />
      <div>
        <p>中心钱包</p>
        <span>￥{{wallet.credit_1}}</span>
      </div>
    </div>
    <div class="wallet-item">
      <img src="@/assets/jinbiqianbao_icon@3x.png" alt />
      <div>
        <p>金币钱包</p>
        <span>￥{{wallet.credit_2}}</span>
      </div>
    </div>
    <div class="wallet-item">
      <img src="@/assets/yingliqianbao_icon@3x.png" alt />
      <div>
        <p>盈利钱包</p>
        <span>￥{{wallet.credit_3}}</span>
      </div>
    </div>
    <div class="wallet-item">
      <img src="@/assets/shouyiqianbao_icon@3x.png" alt />
      <div>
        <p>收益钱包</p>
        <span>￥{{wallet.credit_4}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return{
               wallet:{
                credit_1:'',
                credit_2:'',
                credit_3:'',
                credit_4:''
         }
        }
      
    },
    created() {
          this.$axios
      .fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1000"
      })
      .then(res => {
        this.wallet.credit_1 = res.data.creditList.credit_1.value;
        this.wallet.credit_2 = res.data.creditList.credit_2.value;
        this.wallet.credit_3 = res.data.creditList.credit_3.value;
        this.wallet.credit_4 = res.data.creditList.credit_4.value;
        window.console.log("钱包信息", res);
      });
  },
    // },
};
</script>

<style lang="less">
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
</style>