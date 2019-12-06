<template>
  <div class="container">
    <!-- <img class="logo" src="../../../assets/logo.png" alt /> -->
    <div class="shuru">
      <van-cell-group :border="false">
        <img src="@/assets/xingming@3x.png" alt />
        <van-field maxlength="16" v-model="name" placeholder="请输入用户名" />
      </van-cell-group>
      <van-cell-group :border="false">
        <img src="@/assets/jihuoma@3x.png" alt />
        <van-field maxlength="16" v-model="password" type="password" placeholder="请输入密码" />
      </van-cell-group>
      <!-- <van-cell-group :border="false">
        <img src="@/assets/icon_code.png" alt />
        <van-field maxlength="6" v-model="catpah" placeholder="请输入验证码" />
      </van-cell-group> -->
    </div>
    <button class="login-btn" @click="submit">登录</button>

    <div class="foot">
      未满18周岁禁止购买
      <br />Copyright © LOTTERY |彩金彩| 版权所有
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      password: "",
      catpah: null
    };
  },
  created() {
    if (localStorage.getItem("accessToken")) {
      this.$router.push("/");
    }
  },
  methods: {
    submit() {
      if (!this.name) {
        this.$toast("请输入用户名");
        return;
      } else if (!this.password) {
        this.$toast("请输入密码");
        return;
      }
      this.$axios
        .fetchPost("portal", {
          source: "web",
          version: "v1",
          module: "Account",
          interface: "1000",
          data: {
            account: this.name,
            password: this.password
          }
        })
        .then(res => {
          if (res.code == 0) {
            localStorage.setItem(
              "accessToken",
              res.data.tokenType + " " + res.data.accessToken,
              res.data.expiresIn
            );
            this.$router.push("/");

           window.console.log(this.$router)
          } else {
            this.$toast(res.message);
          }
          window.console.log(res);
        });
      //
    }
  }
};
</script>

<style lang='less' scope>
.container {
  width: 100%;
  min-height: 667px;
  height: 100vh;
  background: url(../../../assets/bg@3x.png) no-repeat;
  // background: #fff;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .shuru{
    margin-bottom: 2rem;
  }
  .logo {
    width: 280px;
    height: 170px;
    position: absolute;
    top: 5%;
  }
  img {
    width: 28px;
    height: 28px;
    line-height: 44px;
  }
  input{
    color: #AF53D1 !important;
  }
  /deep/.van-field__control{
    color: #AF53D1;
  }
}

.van-cell-group {
  margin-top: 10px;
}
.login-btn {
  width: 80%;
  margin: 0 auto;
  color: #FFF;
  // background: #caa43f;
  background: url(../../../assets/btn_big@3x.png) no-repeat;
  background-size: 100%;
  border: none;
  height: 40px;
  font-weight: bold;
  font-size: 16px;
}
.foot {
  box-sizing: border-box;
  margin-top: 30px;
  color: #ae9287;
  font-size: 12px;
  text-align: center;
}
</style>