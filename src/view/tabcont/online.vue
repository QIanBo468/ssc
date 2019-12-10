<template>
  <div class="online">
   
    <titlebar title="联系客服"></titlebar>
     <div class="online-box">
    <!-- <img src="../../assets/111.png" alt=""> -->
  
    <van-cell-group>
      <van-field v-model="online.name" label="账号:" type="number" placeholder="请输入您的账号" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="online.phone" maxlength="11" label="手机号码:" placeholder="您的手机号" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="online.QQ" maxlength="10"  label="QQ:" type="number" placeholder="请输入QQ账户" />
    </van-cell-group>
      <van-cell-group >
      <van-field v-model="online.leave" type="textarea" placeholder="请详细阐述问题" />
    </van-cell-group>

    <button class="onlinesubmit" @click="submit">提交</button>
  </div>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
// import QRCode from "qrcode"; 
export default {
  components: {
    titlebar
  },
  data() {
    return {
      online: {
        value: "",
        leave: "",
        phone: null,
        name: "",
        QQ: null
      }
    };
  },
  methods: {
    submit() {
      this.$axios
        .fetchPost("portal", {
          source: "web",
          version: "v1",
          module: "Account",
          interface: 4000,
          data: {
            message: this.online.leave,
            account: this.online.phone,
            nickname: this.online.name,
            QQ: this.online.QQ
          }
        })
        .then(res => {
          this.$toast(res.message);
          if (res.code ==0 ) {
              this.online.leave = ""
            this.online.phone =""
            this.online.name =""
            this.online.QQ= ""
          }
        });
    }
  }
};
</script>

<style lang='less' scope>
.online {
  display: flex;
  flex-direction: column;
  height: 100vh;
  // align-items: center;
    .online-box{
      height: 100vh;
      min-height: 667px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  /deep/.van-field__control{
    color:#0197f1 !important;
    border-bottom: 1px solid #0197f1;
    height: 2rem;
  }
  .van-field__control:last-child{
    border: 1px solid #0197f1;
  
  }
.van-field--min-height .van-field__control{
  min-height: 150px;
}
}
.onlinesubmit {
  width: 80%;
  height: 2.8rem;
  margin: 5rem auto;
  border: none;
  // background: #d3b787;
  background: url(../../assets/btn_big2@3x.png)  no-repeat ;
  background-size: 100%;
  color: #fff;

}
</style>