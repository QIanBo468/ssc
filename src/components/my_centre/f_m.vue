<template>
  <div class="financial_management">
    <van-nav-bar  title="财务管理" left-arrow @click-left="onClickLeft" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
         <van-row type="flex" justify="space-between">
          <van-col span="6" class="acea-row row-center-wrapper">时间</van-col>
          <van-col span="6" class="acea-row row-center-wrapper">会员账号</van-col>
          <van-col span="6" class="acea-row row-center-wrapper">推荐奖</van-col>
          <van-col span="6" class="acea-row row-center-wrapper">类型</van-col>
        </van-row>   
        <van-row type="flex" justify="space-between" v-for="item in list" :key="item">
          <van-col span="6" class="acea-row row-center-wrapper">{{item.time}}</van-col>
          <van-col span="6" class="acea-row row-center-wrapper">{{item.id}}</van-col>
          <van-col span="6" class="acea-row row-center-wrapper">{{item.num}}</van-col>
          <van-col span="6" v-if="item.type == 1" class="acea-row row-center-wrapper" style="color:#00FFFF;">激活</van-col>
          <van-col span="6" v-else class="acea-row row-center-wrapper" style="color:#E60012;">转账</van-col>
        </van-row>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: true,
      list: [
        { time: "2019.10.02", id: "212324", num: "125",type:0 },
        { time: "2019.10.02", id: "2123468", num: "123",type:1  },
        { time: "2019.10.02", id: "2468", num: "125",type:1 },
        { time: "2019.10.02", id: "212324", num: "12245",type:0 },
        { time: "2019.10.02", id: "212324", num: "123245",type:1 }
      ]
    };
  },
  methods: {
     onClickLeft() {
      this.$toast("返回");
    },
    onLoad() {
      // 异步更新数据
    //   setTimeout(() => {
    //     // for (let i = 0; i < 10; i++) {
    //     //   this.list.push(this.list.length + 1);
    //     // }
    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 500);
    }
  }
};
</script>

<style  lang='less' scope>

.financial_management {
  padding: 0 1rem;

.van-nav-bar {
   
  background: transparent;
  .van-nav-bar__title {
    color: #f2c684;
     font-size:20px;
  }
}
.van-list{
    margin-top:3rem; 
    .van-row{
        
        height: 3rem; 
        color: #fff;
          border: 1px solid #F2C684; 
           border-top: 0;
    }
    .van-row:nth-child(1){
        border: 1px solid #F2C684; 
            
    }
   
}
}
</style>