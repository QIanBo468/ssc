<template>
  <div class="setting">
    <titlebar title="安全设置"></titlebar>
    <van-tabs
      background="transparent"
      title-active-color="#0197f1"
      title-inactive-color="#333"
      color="#0197f1"
      :border="false"
      v-model="active"
    >
      <van-tab title="修改登入密码">
        <!-- <div class="tab-content"> -->
          <van-cell-group class="userSet">
            <van-field
              v-model="mima.oldpassword"
              label-class="left-input"
              :border="false"
              label="输入原登入密码"
            />
          </van-cell-group>
          <van-cell-group class="userSet">
            <van-field v-model="mima.password" label-class="left-input" label="输入新登入密码" />
          </van-cell-group>
          <van-cell-group class="userSet">
            <van-field v-model="mima.repassword" label-class="left-input" label="确认新登入密码" />
          </van-cell-group>
        <!-- </div> -->
      </van-tab>
      <van-tab title="设置提款密码">
        <van-cell-group class="userSet">
          <van-field v-model="pay.oldtikuan" label-class="left-input" label="请输入原密码" />
        </van-cell-group>
        <van-cell-group class="userSet">
          <van-field v-model="pay.tikuan" label-class="left-input" label="输入提款密码" />
        </van-cell-group>
        <van-cell-group class="userSet">
          <van-field v-model="pay.retikuan" label-class="left-input" label="确认提款密码" />
        </van-cell-group>

      </van-tab>
    </van-tabs>
    <div class="setBtn">
      <van-button class="setbtn" @click="submit">确认修改</van-button>
    </div>

    <p
      class="beizhu"
    >{{active == 0 ? '备注：请妥善保管好您的登入密码，如遗忘请联系在线客服处理' : '备注：由纯数字组成6-13个数字，不能和登陆密码相同(初始提款密码为登录密码)'}}</p>
    <div class="setfoot">
      未满18周岁禁止购买
      <br />Copyright © LOTTERY |金多多| 版权所有
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
      mima: {
        oldpassword: null,
        password: null,
        repassword: null
      },
      pay: {
        tikuan: null,
        retikuan: null,
        oldtikuan: null
      },
      active: 0
    };
  },
  methods: {
    submit() {
      // let inactive = "";
        window.console.log(this.active)
      if (this.active == 0) {
        if (!this.mima.oldpassword) {
          this.$toast("请输入原登录密码");
          return;
        } else if (!this.mima.password) {
          this.$toast("请输入新登录密码");
          return;
        } else if (!this.mima.repassword) {
          this.$toast("请再次输入密码");
          return;
        }
        this.$axios
          .fetchPost("portal", {
            source: "web",
            version: "v1",
            module: "User",
            interface: "2001",
            data: {
              // account: this.name,
              oldPassword: this.mima.oldpassword,
              password: this.mima.password
              // oldSafeword: this.pay.oldtikuan,
              // safeword:this.pay.tikuan
            }
          })
          .then(res => {
            (this.mima.oldpassword = ""),
              (this.mima.password = ""),
              (this.mima.repassword = ""),
              this.$toast(res.message);
            if (res.code == 0) {
              localStorage.setItem("accessToken", "");
              this.$router.push("login");
            }
          });
      } else {
        if (!this.pay.oldtikuan) {
          this.$toast("请输入原提款密码");
          return;
        } else if (!this.pay.tikuan) {
          this.$toast("请输入新提款密码");
          return;
        } else if (!this.pay.retikuan) {
          this.$toast("请再次输入密码");
          return;
        }
        this.$axios
          .fetchPost("portal", {
            source: "web",
            version: "v1",
            module: "User",
            interface: "2005",
            data: {
              oldSafeword: this.pay.oldtikuan,
              safeword: this.pay.tikuan
            }
          })
          .then(res => {
            (this.pay.tikuan = ""),
              (this.pay.oldtikuan = ""),
              (this.pay.retikuan = "");
            this.$toast(res.message);
          });
      }
    }
  }
};
</script>

<style lang='less' scope>
.setting {
  width: 100%;
  height: 100%;
  p{
    color: #999;
  }
}
.userSet {
  margin-top: 0.8rem;
  border: none;
  display: flex;
  color: #0197f1;
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
  background: #0197f1;
  border: none;
  font-size: 1rem;
  color: #fff;
  font-weight: bold;
  border-radius: 20px;
}
.beizhu {
  color: #fff;
  font-size: 0.8px;
  text-align: center;
  padding: 2rem;
  box-sizing: border-box;
}

.van-cell__title{
  color: #0197f1;
}
.van-cell{
  // border-bottom: 1px solid #0197f1;
}

</style>