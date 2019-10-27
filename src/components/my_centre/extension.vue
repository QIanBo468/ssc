<template>
  <div class="extension">
    <van-nav-bar class="extension-title" title="推广二维码" left-arrow @click-left="onClickLeft" />
    <div class="extension-head acea-row row-center">
      <van-image width="13rem" height="5rem" src="../../../static/images/extensionUsdt.png" />
    </div>
    <div class="extension-con acea-row row-center-wrapper">
      <div class="img-box">
          <van-image class="image-bottom" width="11rem" src="../../../static/images/extensionBottom.png" />
        <van-image width="12rem" height="12.2rem" src="../../../static/images/extensionKuang.png" />
        <van-image
          class="image-wife"
          width="2rem"
          height="1.9rem"
          src="../../../static/images/extensionWife.png"
        />
        <van-image
          class="image-sett"
          width="2.4rem"
          height="2.6rem"
          src="../../../static/images/extensionSetting.png"
        />
        <van-image
          class="image-hua"
          width="4rem"
          height="4.2rem"
          src="../../../static/images/extensionHua.png"
        />
      </div>
    </div>
    <div class="extension-tips acea-row row-center">长按二维码进行分享</div>
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
    }
  }
};
</script>

<style  lang='less' scope>
.extension {
  padding: 0 1rem;
}
.van-nav-bar {
  background: transparent;
  .van-nav-bar__title {
    color: #f2c684;
     font-size:20px;
  }
}
.extension-head {
  margin-top: 3rem;
}
.extension-con {
  margin-top: 3rem;
  .img-box {
    position: relative;

    .image-wife,
    .image-sett,.image-hua,.image-bottom  {
      position: absolute;
    }
    .image-wife {
      top: -1.2rem;
      left: -0.3rem;
    }
    .image-sett {
      bottom: 1rem;
      left: -3rem;
    }
    .image-hua {
      bottom: -6rem;
      right: -4rem;
    }
    .image-bottom{
        bottom: -0.4rem;
        left: 0.5rem;
    }
  }
}
.extension-tips {
  color: #ffddaa;
  margin-top: 1rem;
}
</style>