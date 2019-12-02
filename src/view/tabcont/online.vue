<template>
  <div class="online">
    <titlebar title="联系客服n"></titlebar>
    <!-- <img src="../../assets/111.png" alt=""> -->
    <van-cell-group>
      <van-field v-model="online.leave" placeholder="请留言" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="online.phone" type="number" placeholder="您的手机号" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="online.name" placeholder="您的称呼" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="online.QQ" type="number" placeholder="请输入QQ账户" />
    </van-cell-group>

    <button class="onlinesubmit" @click="submit">提交</button>
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
            message: this.leave,
            account: this.phone,
            nickname: this.name,
            QQ: this.QQ
          }
        })
        .then(res => {
          this.$toast(res.message);
        });
    }
  }
};
</script>

<style>
.online {
  display: flex;
  flex-direction: column;
}
.onlinesubmit {
  width: 80%;
  height: 2.5rem;
  margin: 5rem auto;
  border: none;
  background: #d3b787;
}
</style>