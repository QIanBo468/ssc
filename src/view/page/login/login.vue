<template>
  <div class="container">
    <img  class="logo" src="../../../assets/logo.png" alt="">
    <div>
      <van-cell-group :border='false' >
        <img src="@/assets/icon_user.png" alt />
        <van-field maxlength='16' v-model="name" placeholder="请输入用户名" />
      </van-cell-group>
      <van-cell-group :border='false' >
          <img src="@/assets/icon_pass.png" alt="">
        <van-field maxlength='16' v-model="password" type="password" placeholder="请输入密码" />
      </van-cell-group>
      <van-cell-group :border='false'>
        <img src="@/assets/icon_code.png" alt />
        <van-field   maxlength=6 v-model="catpah" placeholder="请输入验证码" />
      </van-cell-group>
    </div>
    <button class="login-btn" @click="submit">登录</button>

    <div class="foot">
      未满18周岁禁止购买
      <br>
       Copyright © LOTTERY  |彩金彩| 版权所有
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
  methods: {
    submit() {
       if(!this.name){
        this.$toast('请输入用户名')
        return
      } else if (! this.password){
        this.$toast('请输入密码')
        return
      }
      this.$axios.fetchPost('portal',{
        source:"web",
        version:'v1',
        module:"Account",
        interface:'1000',
        data:{
        account: this.name,
        password:this.password
        }
      }).then(res=>{
        if(res.code ==0) {
this.$router.push('/')
        } else{
          this.$toast(res.message)
        }
        window.console.log(res)
      })
      // 
    }
  }
};
</script>

<style lang='less' scope>
.container {
  width: 100%;
  height: 100%;
  background: url(../../../assets/login_bg.png);
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo{
    width:280px;
    height: 170px;
    position: absolute;
    top: 5%;
  }
  img{
  width: 28px;
  height: 28px;
  line-height: 44px;
}
}

.van-cell-group{
margin-top: 10px;
}  
.login-btn{
  width: 80%;
  margin: 0 auto;
  color: #190e0e;
  background: #caa43f;
  border: none;
  height: 40px;
  font-weight: bold;
  font-size: 16px;
}
.foot{
  box-sizing: border-box;
  margin-top: 30px;
  color: #ae9287;
  font-size: 12px;
  text-align: center;
}
</style>