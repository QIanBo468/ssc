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
            v-model="userPhone"
            placeholder="输入手机号"
            v-validate="'required|phones'"
            autocomplete="off"
          />
          <van-field class="userName" v-model="sms" center placeholder="请输入短信验证码">
            <van-button
              class="smsbtn"
              slot="button"
              size="small"
              type="primary"
              @click="codesubmit"
            >发送验证码</van-button>
          </van-field>
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
          <div class="security">
            <van-field class="userName" v-model="security" center placeholder="请输入验证码">
            </van-field>
            <img width="50px;" height="30px;" class="securitybtn" @click="codesubmit" src="../../../static/images/sms.jpg" />
          </div>
        </van-cell-group>
      </div>
      <van-button type="default" class="btn" @click="submit">确认</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userPhone: "",
      password: "",
      repeassword: "",
      sms: null,
      security: null
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/Login");
    },
    codesubmit() {
      console.log("发送验证码");
    },
    submit() {
      this.$router.push("/Login");
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
      font-size: 20px;
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
      border: 0.5px solid #ffddaa;
      border-radius: 2px;
      margin: 10px 0;
      input {
        color: #fff;
      }
      .smsbtn {
        background: none;
        border: none;
        color: #f00;
      }
      .securitybtn {
        background: url(../../../static/images/sms.jpg);
        border: none;
      }
    }
    .security{
         position: relative;
        // display: flex;// 
      img{
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -11.5px;
      }
      }
  }
  .btn {
    height: 50px;
    background: #ffddaa;
    font-size: 18px;
    font-weight: bold;
    border: none;
    margin-bottom: 80px;
  }
}
.van-cell-group {
  background: transparent;
}
/deep/.van-cell {
  background: none;
}
[class*="van-hairline"]::after {
  position: relative;
}
.van-cell {
  border: #cfa972;
}
.van-cell:not(:last-child)::after {
  border: none;
}
.van-nav-bar__left {
  left: 0;
}
</style>