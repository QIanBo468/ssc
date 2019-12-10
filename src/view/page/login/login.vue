<template>
  <div class="container">
    <!-- <img class="logo" src="../../../assets/logo.png" alt /> -->
    <div class="shuru">
      <van-cell-group :border="false">
        <img src="@/assets/xingming2@3x.png" alt />
        <van-field maxlength="16" v-model="name" placeholder="请输入用户名" />
      </van-cell-group>
      <van-cell-group :border="false">
        <img src="@/assets/jihuoma@3x(1).png" alt />
        <van-field maxlength="16" v-model="password" type="password" placeholder="请输入密码" />
      </van-cell-group>
      <van-cell-group :border="false">
        <img src="@/assets/jihuoma@3x(1).png" alt />
        <van-field maxlength="4" v-model="captcha" placeholder="请输入验证码" />
        <img class="captchaContent" :src="keys" alt width="100px !important" @click="yanzheng()" />
      </van-cell-group>
    </div>
    <button class="login-btn" @click="submit">登录</button>

    <div class="foot">
      未满18周岁禁止购买
      <br />Copyright © LOTTERY |金多多| 版权所有
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      password: "",
      // catpah: "",
      key:'',
      keys:'',
      captcha:''
    };
  },
  created() {
    if (localStorage.getItem("accessToken")) {
      this.$router.push("/");
    }
    this.yanzheng()
  },
  methods: {
    yanzheng() {
       this.$axios
        .fetchPost("portal", {
          source: "web",
          version: "v1",
          module: "Utils",
          interface: "1000",
          data: {
           
          }
        }).then(res=>{
          window.console.log(res)
          this.key = res.data.captchaKey
          this.keys = res.data.captchaContent
        })
    },
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
            password: this.password,
            key: this.key,
            captcha:this.captcha
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
            this.captcha = ""
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
  background: url(../../../assets/meng@3x.png) no-repeat;
  // background: #fff;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .shuru{
    margin-top: 4rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    color: #0197f1 !important;
  }
  /deep/.van-field__control{
    color: #0197f1;
  }
}
.captchaContent{
  width: 100px !important;
}
.van-cell-group {
  width: 80%;
  margin-top: 10px;
  display: flex;
}
.login-btn {
  width: 80%;
  margin: 0 auto;
  color: #FFF;
  // background: #caa43f;
  background: url(../../../assets/btn_big2@3x.png) no-repeat;
  background-size: 100%;
  border: none;
  height: 45px;
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