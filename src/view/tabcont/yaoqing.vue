<template>
  <div class="yaoqing">
    <titlebar title="邀请好友"></titlebar>
    <h3>邀请好友下载APP</h3>
    <div class="qrbox">
      <div class="qrfff">
        <div class="yaoqingqrcode" ref="qrcodeContainer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
import QRCode from "qrcodejs2";
export default {
  components: {
    titlebar
  },
  data() {
    return {
      url: ""
    };
  },
  created() {
    this.$axios
      .fetchPost("portal", {
        source: "web",
        version: "v1",
        module: "User",
        interface: "7000",
        data: {}
      })
      .then(res => {
        this.url = res.data.url;
        this.showQRCode(res.data.url);
        window.console.log(res);
      });
  },
  methods: {
    showQRCode(url) {
      this.$nextTick(() => {
        new QRCode(this.$refs.qrcodeContainer, {
          text: url,
          width: 250,
          height: 250,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      });
    }
  }
};
</script>

<style lang='less' scope>
.yaoqing {
  width: 100%;
  height: 100%;
  .qrbox{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .qrfff {
    background: #fff;
    width: 270px;
    height: 270px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }
  .img {
    width: 100px;
    height: 100px;
  }
  h3 {
    margin-top: 2rem;
    text-align: center;
    color: #fff;
  }
  .yaoqingqrcode {
    
    display: flex;
    justify-content: center;
  }
}
</style>