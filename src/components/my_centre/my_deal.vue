<template>
  <div class="my_deal">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <img width="20px" height="20px" src="../../../static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">{{title}}</slot>
    </van-nav-bar>

    <div class="deal">
        <div class="dealtitle">
            <span>时间</span>
            <span>{{dealtype.dzhanghu}}</span>
            <span>{{dealtype.dnum}}</span>
            <span>{{dealtype.dway}}</span>
        </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="dealtitle" v-for="(item, index) of mydata" :key="index">
            <span>{{item.time}}</span>
            <span>{{item.zhanghu}}</span>
            <span>{{item.num}}</span>
            <span :class="[item.way =='激活' ? 'blue' : 'red']">{{item.way}}</span>
            </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    dealtype:{
        dzhanghu: '接受账户',
        dnum: '数量',
        dway: '方式'

    },
      title: "全部交易记录",
      loading: false,
      finished: false,
      mydata: [
        {
          time: "2019.10.01",
          zhanghu: 1234567652,
          num: 1,
          way: "激活"
        },
        {
          time: "2019.10.01",
          zhanghu: 1234567652,
          num: 1,
          way: "转账"
        },
        {
          time: "2019.10.01",
          zhanghu: 1234567652,
          num: 1,
          way: "激活"
        },
        {
          time: "2019.10.01",
          zhanghu: 1234567652,
          num: 1,
          way: "转账"
        },
        {
          time: "2019.10.01",
          zhanghu: 1234567652,
          num: 1,
          way: "激活"
        },
        {
          time: "2019.10.01",
          zhanghu: 1234567652,
          num: 1,
          way: "转账"
        },
        {
          time: "2019.10.01",
          zhanghu: 1234567652,
          num: 1,
          way: "转账"
        },
        {
          time: "2019.10.01",
          zhanghu: 1234567652,
          num: 1,
          way: "激活"
        },
        {
          time: "2019.10.01",
          zhanghu: 1234567652,
          num: 1,
          way: "转账"
        }
      ]
    };
  },
  methods: {
      onClickLeft () {
          this.$router.go(-1)
      },
      onLoad () {
        if(this.mydata){
            this.loading = false;
            this.finished = true;
        }
      }
  }
};
</script>

<style lang='less' scope>
.my_deal{
    padding: 0 11px;
    color: #ffffff;
    .deal{
        .dealtitle{
            height: 40px;
            display: flex;
            justify-content:space-around;
            align-items: center;
            border:1px solid #ffddaa;
            font-size: 12px;
            color: #ffffff;
            span{
                display: inline-block;
                flex: 1;
                text-align: center;
            }
            .red{
                color: #f00;
            }
            .blue{
                color: #00FFFF;
            }
        }
        
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