<template>
  <div class="yaoqing">
    <titlebar title="邀请好友"></titlebar>
    <h3>邀请好友下载APP</h3>
    <div class="yaoqingqrcode" ref="qrcodeContainer"></div>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
import QRCode from "qrcodejs2";
export default {
  components: {
    titlebar
  },
  created() {
 this.showQRCode()
  },
  methods: {
    showQRCode() {
      
      this.$nextTick(()=>{ 
      var qrcode = new QRCode(this.$refs.qrcodeContainer, {
        text: "https://www.baidu.com",
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      })
    }
  }
};
</script>

<style lang='less' scope>
.yaoqing {
  width: 100%;
  height: 100%;
  .img {
    width: 100px;
    height: 100px;
  }
  h3{
    margin-top: 2rem;
    text-align: center;
    color: #fff;
  }
.yaoqingqrcode{
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}
}
</style>