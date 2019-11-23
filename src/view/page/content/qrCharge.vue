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
        <p>收款码</p>
        <img src="@/assets/111.png" alt />
      </div>
      <div class="qrCodecent">
        <div>
          <p>收款钱包</p>
          <span>复制</span>
        </div>

        <span>113132132123123123</span>
      </div>
    </div>

    <div class="hint">
      <img src="@/assets/icon_tips.png" alt />扫码支付或者钱包支付
    </div>

    <div class="qrCode">
      <div class="qrCodecent">
        <p>入款确认信息</p>
      </div>
      <div class="qrCodecent">
        <p>存款时间</p>
        <span>{{date}}</span>
      </div>
      <div class="qrCodecent">
        <p>USDT</p>
        <input
            placeholder="请输入USDT地址"
         v-model="usdt" type="text" />
      </div>
      <div class="qrCodecent">
        <p>RMB</p>
        <input 
         placeholder="请输入RMB金额"
        v-model="RMB"  type="text" />
      </div>
      <div class="qrCodecent">
        <p>存款人姓名</p>
        <input 
        placeholder="请输入存款人姓名"
        v-model="name"  type="text" />
      </div>

        <ul>
      <li>充值步骤：</li>
      <li>1.在火币网购买USDT</li>
      <li>2.从法币账户转入币币账户</li>
      <li>3.点击提笔输入USDT复制彩金彩钱包地址，输入提笔数量确定</li>
      <li>4后台提交褪影的USDT数量，就会有折合人民币的提示，输入姓名提交</li>
      <li>温馨提示：请每次充值时务必核对最新的二维码钱包地址信息!平台会用不定期更换新的二维码钱包地址。如因本人原因造成的损失平台概不负责！</li>
    </ul>

    <div class="btn" @click="submit">
        <img src="@/assets/confirm.png" alt="">
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
      date: "",
      usdt:'',
      RMB:null,
      name:''
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
  },
  methods: {
      submit() {
          if(!this.usdt) {
              this.$toast('请输入USDT')
              return
          } else if (!this.RMB) {
              this.$toast('请输入RMB')
              return
          } else if (!this.name) {
              this.$toast('请输入姓名')
              return
          }
        //   console.log('确认')
      }
  }
};
</script>

<style lang='less' scope>
.qrCharge {
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
  .qrCode:last-child{
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
    span{
        color: #f00;
    }
  }

  .btn{
      text-align: center;
      img{
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