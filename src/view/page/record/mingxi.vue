<template>
  <div class="mingxi">
    <titlebar title="账变明细"></titlebar>
    <!-- <times ref="headerChild" title="账变记录"></times> -->

    <div class="zhonglei">
      <div class="zlName">
        <p>账变类型</p>
        <van-dropdown-menu active-color="#d3b787">
          <van-dropdown-item @change="xialatwo" v-model="val" :options="mingxi" />
        </van-dropdown-menu>
      </div>
    </div>
    <!-- <button class="topupbtn" @click="submit">查询</button> -->

    <!-- <div class="list-c">
      <ul class="title">
        <li>账变类型</li>
        <li>单号</li>
        <li>时间</li>
        <li>金额</li>
      </ul>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul class="list-content">
          <li v-for="(item,index) of list" :key="index">
            <span>
              {{item.typeName}}
              <br />
              {{item.creditName}}
            </span>
            <span>{{item.id}}</span>
            <span>{{item.createdAt}}</span>
            <span>{{item.num}}</span>
          </li>
        </ul>
      </van-list>
      <div class="upDown">
        <button @click="updown(-1)">上一页</button>
        <button @click="updown(1)">下一页</button>
      </div>
    </div>-->

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="kjRecord-content">
        <!-- <h3>近期开奖</h3> -->
        <ul>
          <li v-for="item of list" :key="item.qihao">
            <div class="kjRecord-content-item">
              <p>{{item.typeName}}</p>
              <span>{{item.remark}}</span>
              <div class="kjRecord-content-one">
                <p>{{item.createdAt}}</p>
              </div>
            </div>
            <h3 :class="[item.is_win == 1? 'red': '']">{{item.num}}</h3>
          </li>
        </ul>
      </div>
    </van-list>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
// import times from "@/components/recordTime";
export default {
  components: {
    titlebar
    // times
  },
  data() {
    return {
      val: 0,
      mingxi: [
        { text: "所有账变类型", value: 0 },
        { text: "钱包兑换", value: 1 },
        { text: "购买彩票", value: 2 },
        { text: "奖金派送", value: 3 },
        { text: "账户充值", value: 20 },
        { text: "账户提现", value: 21 }
        // { text: "提现失败", value: 6 },
        // { text: "提现成功", value: 7 },
        // { text: "系统充值", value: 8 },
        // { text: "活动礼金", value: 9 },
        // { text: "消费佣金", value: 10 },
        // { text: "投注扣款", value: 11 },
        // { text: "追号扣款", value: 12 }
      ],
      loading: false,
      finished: false,
      list: [
        { money: "0.00", number: "123456", type: "转账" },
        { money: "0.00", number: "123456", type: "转账" },
        { money: "0.00", number: "123456", type: "转账" },
        { money: "0.00", number: "123456", type: "转账" },
        { money: "0.00", number: "123456", type: "转账" },
        { money: "0.00", number: "123456", type: "转账" },
        { money: "0.00", number: "123456", type: "转账" },
        { money: "0.00", number: "123456", type: "转账" }
      ],
      lists: [],
      page: 1,
      paginal: 10,
      lastId: 0,
      financeType: ""
    };
  },
  methods: {
    xialatwo(value) {
      // let financeType;
      this.financeType = value;
      window.console.log(value);
      this.submit(value);
      // this.submit(value);
    },
    created() {
      this.submit();
    },
    onLoad() {
      this.submit();
    },
    updown(num) {
      this.page = this.page + num;
      window.console.log(this.page);
      this.submit();
    },
    submit(value) {
      let timeArry = "";
      // if (this.$refs.headerChild.start != "" && !this.$refs.headerChild.end) {
      //   timeArry = [this.$refs.headerChild.start, this.$refs.headerChild.end];
      // } else {
      //   timeArry = "";
      // }

      // if (!isNaN(financeType)) {

      //   Ftype = financeType;
      // } else {
      //   Ftype = "";
      // }
      // window.console.log(typeof financeType)
      if (!value) {
        value = "";
      }
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          interface: "1001",
          module: "Finance",
          data: {
            timeRange: timeArry,
            lastId: this.lastId,
            page: this.page,
            financeType: value
          }
        })
        .then(res => {
          //  this.tzRecords = res.data.list;
          if (res.code == 0) {
            this.lastId = res.data.lastId;
            this.list = res.data.list;
            this.loading = false;
            this.finished = true;
          } else if (res.code == 4500) {
            this.$toast("没有上一页了");
          } else {
            this.$toast(res.message);
          }

          window.console.log(res);
        });
    }
  }
};
</script>

<style lang='less' scope>
.mingxi {
  display: flex;
  flex-direction: column;
  align-content: center;
  .zhonglei {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    margin-top: 1rem;
    background: transparent;
    margin-bottom: 1rem;
    .zlName {
      display: flex;
      align-items: center;
      color: #666;
    }
    .zlActive {
      display: flex;
      align-items: center;
      color: #666;
    }
  }
  ul {
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    li {
      // background: #333;
      display: flex;
      // flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      margin-bottom: 0.5rem;
      border-bottom: 1px solid #f8f8f8;
      .kjRecord-content-item {
        // flex: 1;
      }
      p {
        font-size: 14px;
        color: #000;
        margin-bottom: 0.2rem;
      }
      span {
        color: #333;
        margin-bottom: 0.2rem;
        font-size: 13px;
      }
      .kjRecord-content-one {
        display: flex;
        align-items: center;

        p {
          color: #999;
          font-size: 12px;
          margin-right: 0.5rem;
        }
      }
      h3 {
        // flex: 1;
        color: #999;
        font-size: 14px;
      }
    }
  }
}
.topupbtn {
  margin: 1rem;
  height: 2rem;
  border: none;
  border-radius: 8px;
}

.title {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: transparent;
  li {
    flex: 1;
    text-align: center;
    height: 2.5rem;
    color: #af53d1;
    line-height: 2.5rem;
    font-weight: bold;
  }
}
.list-content {
  background: transparent;
  padding: 1rem;
  li {
    display: flex;
    justify-content: space-around;
    align-content: center;
    margin-top: 0.5rem;

    span {
      color: #af53d1;
      display: inline-block;
      flex: 1;
      text-align: center;
      font-size: 12px;
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

    background: #af53d1;
    color: #fff;
    height: 2rem;
    margin-left: 0.2rem;
    border-right: 6px;
    margin-bottom: 2rem;
    border-radius: 8px;
  }
}
</style>