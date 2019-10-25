<template>
  <div class="my-data">
      <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <img width="20px" height="20px" src="../../../static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="激活码管理">激活码管理</slot>
    </van-nav-bar>
    <div class="name">
      <van-cell-group>
        <van-field
        v-model="mydata.name" 
        placeholder="请输入姓名" 
        label="姓名" 
        input-align="right" />
      </van-cell-group>
      <van-cell-group>
        <van-field 
        v-model="mydata.nicheng"
         placeholder="请输入昵称" 
         label="昵称" 
         input-align="right" />
      </van-cell-group>
    </div>
    <div class="name">
      <van-cell-group>
        <van-field
         v-model="mydata.usdt"
        placeholder="填写地址"
         label="USDT地址"
          input-align="right" />
      </van-cell-group>
    </div>

    <div class="name">
      <van-cell-group>
        <van-field
          v-model="mydata.phone"
          placeholder="请输入手机号"
          type="number"
          label="手机号"
          input-align="right"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="mydata.pay"
         placeholder="请输入支付宝账号"
          label="支付宝"
           input-align="right" />
      </van-cell-group>
      <van-cell-group>
        <van-field 
        v-model="mydata.wx"
         placeholder="请输入微信账号" 
         label="微信号" 
         input-align="right" />
      </van-cell-group>
    </div>
    <div class="name">
        <van-cell-group>
          <van-field v-model="mydata.bankname" 
          placeholder="中国银行" 
          label="银行名称" 
          input-align="right" 
          disabled
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
           v-model="mydata.kaihu" 
           placeholder="请输入开户行地址" 
           label="开户地址" 
           input-align="right" />
        </van-cell-group>
        <van-cell-group>
          <van-field 
          v-model="mydata.kahao" 
          placeholder="请输入银行卡号" 
          label="银行卡号" 
          type="number"
          input-align="right" />
        </van-cell-group>
      </div>
      <button class="btn">保存</button>
  </div>
</template>

<script>
export default {
    data () {
        return{
            mydata: {
                name:'',
                nicheng:'',
                usdt:'',
                phone: null,
                pay:'',
                wx:'',
                bankname: '',
                kaihu:'',
                kahao: null
            }
        }
    }
};
</script>

<style lang='less' scope>
.my-data{
    padding: 0 11px;
    .name{
        margin-bottom: 22px;
        span{
            color: #FFDDAA;
            font-size: 14px;
        }
        .van-cell-group{
            background: transparent;
        }
        .van-cell{
            background: transparent;
            border: 1px solid #FFDDAA;
        }
        .van-field__control{
            color: #fff;
        }
    }
    .btn{
        width: 100%;
        height: 45px;
        background: #FFDDAA;
        border: none;
        text-align: center;
    }
}



  .jhnav {
    background: none;
    margin-bottom: 10px;
    .van-nav-bar__title {
      color: #ffddaa;
    }
  }
  [class*=van-hairline]::after{
      border: none;
  }
  .van-hairline--bottom::after {
  border: none;
}
</style>