<template>
  <div class="Jhcode">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <img width="20px" height="20px" src="../../../static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="激活码管理">激活码管理</slot>
    </van-nav-bar>

    <div class="jh_content">
      <div class="jh-num">
          <span>激活码余额(个)</span>
          <p>12</p>
      </div>
      <van-cell-group>
        <van-field v-model="zhanghao" 
        placeholder="输入账号" 
        label="转入激活码到"
        input-align='right'
        
        />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="shuliang"
         placeholder="输入数量" 
         type="number"
         label="转入激活数量"
         input-align='right'
         />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return{
            zhanghao:'',
            shuliang: null,
        }
    },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang='less' scope>
.Jhcode {
    padding: 0 11px;
  .jhnav {
    background: none;
    .van-nav-bar__title {
      color: #ffddaa;
    }
  }
  .jh_content{
      background: url(../../../static/images/14@3x.png) no-repeat no-repeat;
      display: flex;
      flex-direction: column;
      border-radius: 3px;
  }
}
.van-hairline--bottom::after {
  border: none;
}
</style>