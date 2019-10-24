<template>
  <div id="login">
    <div class="loginindex">
      <van-nav-bar class="navbar" left-arrow @click-left="onClickLeft"></van-nav-bar>
      <div class="logo">
        <p>USDT</p>
        <span>|</span>
        <p>注册</p>
      </div>
      <div class="redlogin">
        <van-cell-group>
          <van-field 
          class="userName" 
          v-model="userName" 
          placeholder="输入账号" 
          v-validate="'required'"
          autocomplete="off" />
          <van-field
            v-model="password"
            class="userName"
            type="password"
            v-validate="'required'"
            placeholder="请输入密码"
            autocomplete="off"
          />
          <van-field
            class="userName"
            v-model="repeassword"
            type="password"
            v-validate="'required'"
            placeholder="请再次输入密码"
            autocomplete="off"
          />
        </van-cell-group>
      </div>
      <van-button type="default" class="btn" @click="submit">立即注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      password: "",
      repeassword: ''
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    submit () {
      this.$router.push('/Login')
    }
  }
};
</script>

<style lang='less' scope>
#login {
  width: 100%;
  height: 100%;
}
.loginindex {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 15px;
  .navbar {
    padding: 0;
    margin: 0;
    background: none;
    position: fixed;
    top: 0;
    .van-icon {
      color: #fff;
      font-size:20px;
      padding: 0;
      margin: 0;
    }
  }
  .logo {
    display: flex;
    align-items: center;
    p:last-child {
      color: #ffddaa;
      font-size: 18px;
    }
    p:first-child {
      color: #cfa972;
      font-size: 24px;
      font-weight: 900;
      font-style: italic;
    }
    span {
      color: #fff;
      font-size: 14px;
      margin: 0 15px;
    }
  }
  .redlogin {
    .userName {
      background: none;
      border:.5px solid #FFDDAA;
      border-radius: 2px;
      margin: 10px 0;
      input{
        color: #fff;
      }
    }
  }
  .btn {
    height: 50px;
    background: #ffddaa;
    font-size: 18px;
    font-weight: bold;
    border: none;
  }
}
.van-cell-group {
  background: transparent;
}
/deep/.van-cell {
  background: none;
}
[class*=van-hairline]::after{
  position: relative;
}
.van-cell{
  border: #cfa972;
}
.van-cell:not(:last-child)::after{
  border: none;
}
.van-nav-bar__left{
  left: 0;
}
</style>