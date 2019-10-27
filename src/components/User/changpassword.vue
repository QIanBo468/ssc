<template>
  <div class="changePassword">
    <van-nav-bar class="team-title" title="修改密码" left-arrow @click-left="onClickLeft" />
    <div class="chang-form">
      <van-cell-group>
        <!-- label="用户名" -->
        <van-field v-model="password" placeholder="请输入密码" />
        <!-- label="密码" -->
        <van-field v-model="passwordRepeat" type="password" placeholder="再次请输入密码" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="newPassword" type="password" placeholder="请输入新密码" />
        <van-field v-model="newPasswordRepeat" type="password" placeholder="再次请输新入密码" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="sms" center clearable placeholder="请输入手机号">
          <van-button slot="button" size="small" type="primary "  @click="codesubmit">发送验证码</van-button>
        </van-field>
        <van-field v-model="phoneNum" type="tel" placeholder="请输入手机验证码" />
        <!-- label="短信验证码" -->
      </van-cell-group>
    </div>
    <div class="change-request">
      <van-button size="large" color="#ffddaa" style="color:#000;">确认修改</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "", //原密码
      passwordRepeat: "", //原密码确认
      newPassword: "", //新密码
      newPasswordRepeat: "", //新密码确认
      phoneNum: "", //手机号
      sms: "" //短信验证码
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    codesubmit() {
     this.$toast("发送验证码");
    },
  }
};
</script>

<style  lang='less' scope>
.changePassword {
  padding: 0 1rem;
}
.van-nav-bar {
  background: transparent;
  .van-nav-bar__title {
    color: #f2c684;
     font-size:20px;
  }
}
.chang-form {
  .van-cell-group {
    margin-top: 1rem;
    background: transparent;
    van-cell{
    background: transparent;

    }
    div:nth-child(2) {
      border-top: 0;
      border-radius: 0 0 0.3rem 0.3rem;
    }
    > div {
      border: 1px solid #ffddaa;
      border-radius: 0.3rem 0.3rem 0 0;
    }
     .van-button {
        background: none;
        border: none;
        color: #f00;
      }
  }

}
.change-request {
  .van-button {
    margin-top: 4rem;
  }
}
</style>