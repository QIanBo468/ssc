<template>
  <div class="recordList">
    <div class="list-c">
      <ul class="title">
        <li>充值金额</li>
        <li>充值单号</li>
        <li>充值方式</li>
        <li>状态</li>
      </ul>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul class="list-content">
          <li v-for="(item,index) of lists" :key="index">
            <span>{{item.money}}</span>
            <span>{{item.number}}</span>
            <span>{{item.type}}</span>
            <span>{{item.active}}</span>
          </li>
        </ul>
      </van-list>
      <div class="upDown">
        <!-- <p>显示{{}}</p> -->
        <button @click="updown(-1)">上一页</button>
        <button @click="updown(1)">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { money: "1.00", number: "123456", type: "现金支付", active: "已开奖" },
        { money: "2.00", number: "123456", type: "现金支付", active: "已开奖" },
        { money: "3.00", number: "123456", type: "现金支付", active: "已开奖" },
        { money: "4.00", number: "123456", type: "现金支付", active: "已开奖" },
        { money: "5.00", number: "123456", type: "现金支付", active: "已开奖" },
        { money: "6.00", number: "123456", type: "现金支付", active: "已开奖" },
        { money: "7.00", number: "123456", type: "现金支付", active: "已开奖" },
        { money: "8.00", number: "123456", type: "现金支付", active: "已开奖" },
        { money: "9.00", number: "123456", type: "现金支付", active: "已开奖" },
        {
          money: "10.00",
          number: "123456",
          type: "现金支付",
          active: "已开奖"
        },
        {
          money: "11.00",
          number: "123456",
          type: "现金支付",
          active: "已开奖"
        },
        {
          money: "12.00",
          number: "123456",
          type: "现金支付",
          active: "已开奖"
        },
        {
          money: "13.00",
          number: "123456",
          type: "现金支付",
          active: "已开奖"
        },
        { money: "14.00", number: "123456", type: "现金支付", active: "已开奖" }
      ],
      lists: [],
      loading: false,
      finished: false,
      currentPage: 1,
      page: 0
    };
  },
  methods: {
    onLoad(a) {
      if (a >= 0) {
        this.lists = this.list.slice(a, a + 10);
      } else{
          this.lists = this.list.slice(0, 10);
            this.loading= true
      }
    },
    updown(num) {
      if (this.page < 0) return;
      this.page += num;
      this.onLoad(this.page * 10,num);
    }
  }
};
</script>

<style lang='less' scope>
.recordList {
  display: flex;
  flex-direction: column;

  .title {
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #999;
    li {
      flex: 1;
      text-align: center;
      height: 2.5rem;
      color: #fff;
      line-height: 2.5rem;
      font-weight: bold;
    }
  }
  .list-content {
    background: #666;
    li {
      display: flex;
      justify-content: space-around;
      align-content: center;
      margin-top: 0.5rem;
      span {
        color: #eeeeee;
        display: inline-block;
        flex: 1;
        text-align: center;
      }
    }
  }
  .upDown {
    display: flex;
    justify-content: center;
    button {
      border: none;
    //   padding: 0.5rem;
    width: 8rem;
    height: 2.5rem;
      margin-left: 0.2rem;
      border-right: 6px;
    }
  }
}
</style>