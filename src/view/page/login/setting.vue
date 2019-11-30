<template>
  <div class="setting">
    <titlebar title="安全设置"></titlebar>
    <van-tabs
      background="transparent"
      title-active-color="#d3b787"
      title-inactive-color="#fff"
      color="#d3b787"
      :border="false"
      v-model="active"
    >
      <van-tab title="修改登入密码">
        <div class="tab-content">
          <van-cell-group class="userSet">
            <van-field
              v-model="oldpassword"
              label-class="left-input"
              :border="false"
              label="输入原登入密码"
            />
          </van-cell-group>
          <van-cell-group class="userSet">
            <van-field v-model="password" label-class="left-input" label="输入新登入密码" />
          </van-cell-group>
          <van-cell-group class="userSet">
            <van-field v-model="repassword" label-class="left-input" label="确认新登入密码" />
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="设置提款密码">
        <van-cell-group class="userSet">
          <van-field v-model="tikuan" label-class="left-input" label="输入提款密码" />
        </van-cell-group>
      </van-tab>
    </van-tabs>
    <div class="setBtn">
      <van-button class="setbtn" @click="submit">确认修改</van-button>
    </div>

    <p
      class="beizhu"
    >{{active == 0 ? '备注：请妥善保管好您的登入密码，如遗忘请联系在线客服处理' : '备注：由纯数字组成6-13个数字，不能和登陆密码相同'}}</p>
    <div class="setfoot">
      未满18周岁禁止购买
      <br />Copyright © LOTTERY |彩金彩| 版权所有
    </div>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";

export default {
  components: {
    titlebar
  },
  data() {
    return {
      active: 0,
      oldpassword: null,
      password: null,
      repassword: null,
      tikuan: null
    };
  },
  methods:{
    submit() {
      let inactive ='';
      if (this.active == 0) {
          inactive = 2001
      } else {
        inactive = 2005
      }
      this.$axios.fetchPost("portal", {
        source: "web",
          version: "v1",
          module: "User",
          interface: inactive,
          data: {
            // account: this.name,
            oldPassword: this.oldpassword,
            password:this.password
          }
      }).then(res => {
        window.console.log(res)
        this.$toast(res.message)
      })
    }
  }
};
</script>

<style lang='less' scope>
.setting {
  width: 100%;
  height: 100%;
}
.userSet {
  margin-top: 0.8rem;
  border: none;
  display: flex;
}
.left-input {
  color: #fff;
  font-size: 0.8rem;
  margin-right: 0.5rem;
}
.tab-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.setfoot {
  font-size: 0.8px;
  text-align: center;
  color: #8b889b;
  margin-top: 5rem;
}
.setBtn {
  display: flex;
  justify-content: center;
  width: 100%;
}
.setbtn {
  width: 80%;
  margin: 3rem 0;
  background: #d3b787;
  border: none;
  font-size: 1rem;
  color: #fff;
  font-weight: bold;
}
.beizhu {
  color: #fff;
  font-size: 0.8px;
  text-align: center;
}
</style>