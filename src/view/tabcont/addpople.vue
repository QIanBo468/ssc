<template>
  <div class="register">
    <titlebar title="注册"></titlebar>
    <div class="register-input">
      <div>
        <img src="@/assets/xingming@3x.png" alt />
        <input v-model="name" maxlength="16" type="text" placeholder="请输入账号" />
      </div>
      <div>
        <img src="@/assets/jihuoma@3x.png" alt />
        <input v-model="password" maxlength="16" type="text" placeholder="请输入登录密码" />
      </div>
      <div>
        <img src="@/assets/jihuoma@3x.png" alt />
        <input v-model="repassword" maxlength="16" type="text" placeholder="确认登录密码" />
      </div>
      <van-button class="btn" @click="submit">注册</van-button>
    </div>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";

export default {
  data() {
    return {
      name: "",
      password: "",
      repassword: ""
    };
  },
  components: {
    titlebar
  },
  methods: {
    submit() {
      if (!this.name) {
        this.$toast("请输入账号");
        return;
      } else if (!this.password) {
        this.$toast("请输入密码");
        return;
      } else if (!this.repassword) {
        this.$toast("请确认密码");
        return;
      }
      this.$axios.fetchPost("portal", {
        source: "web",
          version: "v1",
          module: "Account",
          interface: "1002",
          data: {
            account: this.name,
            password: this.password,
            password_confirmation:this.repassword
          }
      }).then(res => {
        if (res.code == 0) {
          this.$toast('注册成功')
          this.name = '',
          this.password= "",
          this.repassword =""
        } else {
          this.$toast(res.message)
        }
        
        window.console.log(res)
      })
    }
  }
};
</script>

<style lang='less' scope>
.register {
  width: 100%;
  height: 100%;
  .register-input {
    margin-top: 100px;
    width: 100%;
    // height: 100%;;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    div {
      width: 70%;
      border-bottom: 1px solid #af53d1;
      display: flex;
      margin-bottom: 30px;
      img {
        width: 25px;
        height: 24px;
      }
      input {
        width: 100%;
        background: transparent;
        border: none;
        color: #af53d1;
        padding-left: 30px;
      }
    }
  }
  .btn {
    background: #af53d1;
    border: none;
    width: 60%;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    border-radius: 18px;
  }
}
</style>