<template>
  <div class="index">
    <van-nav-bar class="indexnav" title="首页"></van-nav-bar>
    <van-swipe :loop="false" :width="300" @change="onChange" class="swiper">
      <van-swipe-item v-for="item of adSwiper" :key="item.id">
        <img :src="item.adimg" alt />
      </van-swipe-item>

      <div class="custom-indicator" slot="indicator">
        <span :class="current == 0 ?  indicator : ''"></span>
        <span :class="current == 1 ?  indicator : ''"></span>
        <span :class="current == 2 ?  indicator : ''"></span>
        <span :class="current == 3 ?  indicator : ''"></span>
      </div>
    </van-swipe>

    <div class="gonggao">
      <div class="ggtitle">
        <img src="../../../static/images/gonggao.png" alt />
        <span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{gonggao}}</span>
      </div>
      <p>查看</p>
    </div>

    <div class="moneytitle">
      <div class="g"></div>
      <p>我的钱包</p>
    </div>

    <!-- 状态列表 -->
    <van-swipe
      :loop="false"
      :width="330"
      @change="onChange"
      :show-indicators="false"
      class="moneyswiper"
    >
      <van-swipe-item>
        <div class="money-item" v-for="item of moneySwiper.slice(0,4)" :key="item.id">
          <img :src="item.zuimg" alt />
          <span>{{item.zuname}}</span>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="money-item" v-for="item of moneySwiper.slice(4, 6)" :key="item.id">
          <img :src="item.zuimg" alt />
          <span>{{item.zuname}}</span>
        </div>
      </van-swipe-item>
    </van-swipe>


    <!-- 列表 -->
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <div class="moneylist" v-for="(item, index) of list" :key="index">
    <div class="list-left">
      <div class="left-active">
        <div class="red"></div>
        {{item.active}}
      </div>
      <p>{{item.name}}</p>
    </div>
    <div class="list-right">
      <p class="right-time">{{item.time}}</p>
      <div class="purse">￥{{item.purse}}</div>
    </div>
    
  </div>
</van-list>

  </div>
</template>

<script>
export default {
  data() {
    return {
      adSwiper: [
        { id: 0, adimg: "./static/images/swiper@3x.png" },
        { id: 1, adimg: "./static/images/swiper1@3x.png" },
        { id: 2, adimg: "./static/images/swiper@3x.png" },
        { id: 3, adimg: "./static/images/swiper1@3x.png" }
      ],
      moneySwiper: [
        { id: 0, zuimg: "./static/images/zujifen.png", zuname: "宏信积分" },
        { id: 1, zuimg: "./static/images/zuqianbao.png", zuname: "静态钱包" },
        { id: 2, zuimg: "./static/images/zuqianbao.png", zuname: "动态钱包" },
        { id: 3, zuimg: "./static/images/zujihuo.png", zuname: "激活码管理" },
        { id: 4, zuimg: "./static/images/zubangzhu.png", zuname: "寻求帮助" },
        { id: 5, zuimg: "./static/images/zubangzhu.png", zuname: "寻求帮助" }
      ],
      current: 0,
      indicator: "xuanzhong",
      gonggao: "三周年奖励之特大喜讯",
      loading: false,
      finished: false,
      list: [
        {active: '匹配中', time: '2019.10.11  10:10:10', name: '123456789', purse: '1000.00'},
        {active: '匹配中', time: '2019.10.11  10:10:10', name: '123456789', purse: '1000.00'},
        {active: '匹配中', time: '2019.10.11  10:10:10', name: '123456789', purse: '1000.00'},
        {active: '匹配中', time: '2019.10.11  10:10:10', name: '123456789', purse: '1000.00'}
      ]
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    onLoad () {
      setTimeout (() =>{
        
        for (let i =0 ; i<4; i++){
          console.log(this.list[i])
        }

        // 加载状态结束
      
      this.loading = false 

      // 数据全部加载完成
      if (this.list.length >=4){
        this.finished = true
      }
      },500)
     
    }
  }
};
</script>

<style lang='less' scope>
.index {
  color: #ffddaa;
}
.indexnav {
  background: transparent;
}
.van-nav-bar__title {
  color: #ffddaa;
}
.swiper {
  margin: 0 11px;
  img {
    height: 130px;
  }
  .van-swipe__indicators {
    bottom: -20px;
  }
  .custom-indicator {
    // display: flex;
    text-align: center;
    span {
      display: inline-block;
      width: 16px;
      height: 4px;
      border-radius: 6px;
      background: #fff;
    }
    .xuanzhong {
      background: #ffddaa;
    }
  }
}

.gonggao {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #26263c;
  margin: 0 11px 10px 13px;
  padding: 0 10px;
  box-sizing: border-box;
  .ggtitle {
    display: flex;
    align-items: center;
    img {
      width: 34px;
      height: 28px;
      margin-right: 15px;
    }
    span {
      font-size: 14px;
      color: #fff;
    }
  }
  p {
    font-size: 14px;
  }
}

.moneytitle {
  margin-left: 11px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .g {
    width: 2px;
    height: 12px;
    background: #ffddaa;
    margin-right: 10px;
  }
  p {
    font-size: 14px;
  }
}
.moneyswiper {
  margin-left: 11px;
  margin-bottom: 20px;
  .van-swipe-item {
    display: flex;
  }
  .money-item {
    margin-right: 20px;
    width: 63px;
    //  overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 53px;
      margin-bottom: 5px;
    }
    span {
      font-size: 12px;
      text-align: center;
    }
  }
}

.moneylist{
  background: #ffddaa;
  color: #26263c;
  height: 80px;
  margin-bottom: 5px;
  padding: 0 11px;
  margin: 10px 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  p{
    margin: 0;
    padding: 0;
  }
  .list-left{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .left-active{
      display: flex;
      align-items: center;
      .red{
      background: #f00;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      margin-right: 5px;
      }
      color: #0B0B1F;
      font-size: 12px;
    }
    p{
      font-size: 16px;
      color: #000
    }
  }
  .list-right{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    p{
      margin: 0;
      padding: 0;
    }
    .right-time{
     color:  #956621;
     font-size: 12px;
    }
    .purse{
      color: #000;
      font-weight: bold;
    }
  }
}
</style>