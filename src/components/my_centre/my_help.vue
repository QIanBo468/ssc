<template>
  <div class="myhelp">
    <van-nav-bar
      class="jhnav"
      @click-left="onClickLeft"
      right-text="帮助记录"
      @click-right="onClickRight"
    >
      <slot slot="left" name="left">
        <img width="20px" height="20px" src="../../../static/images/left@3x.png" alt />
      </slot>

      <slot slot="title" name="帮助">帮助</slot>
    </van-nav-bar>

    <van-tabs
      class="helptab"
      type="card"
      background="none"
      title-active-color="#000"
      color="#F2C684"
    >
      <van-tab title="提供帮助">
        <div class="content">
          <div class="cont-meony">
            <span></span>
            <p></p>
          </div>
        </div>
        <div>
          <van-cell-group>
            <van-field label="排单币" v-model="value" placeholder="请输入用户名" label-align='right' />
          </van-cell-group>
          <van-cell-group>
            <van-field label="提供帮助" v-model="value" placeholder="请输入用户名"  label-align='right'/>
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="接受帮助"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/helplock");
    }
  }
};
</script>

<style lang='less' scope>
.jhnav {
  background: none;
  margin-bottom: 10px;
  .van-nav-bar__title {
    color: #ffddaa;
  }
}
[class*="van-hairline"]::after {
  border: none;
}
.van-hairline--bottom::after {
  border: none;
}
</style>