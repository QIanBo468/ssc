<template>
  <div class="recordList">
    <div class="zhonglei" v-if="zhonglei">
      <div class="zlName">
        <p>彩种名称</p>
        <van-dropdown-menu active-color="#d3b787">
          <van-dropdown-item v-model="cainame" :options="cai1" />
        </van-dropdown-menu>
      </div>
      <div class="zlActive">
        <p>彩种状态</p>
        <van-dropdown-menu active-color="#d3b787">
          <van-dropdown-item v-model="caiactive" :options="cai2" />
        </van-dropdown-menu>
      </div>
    </div>

    <div class="search" v-if="searchpop">
      <van-dropdown-menu>
        <van-dropdown-item
          active-color="#000"
          @close="closeDropdown(dropdown)"
          v-model="dropdown"
          :options="option1"
        />
        <van-search
          background="#eee"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          show-action
          shape="round"
          v-model="searchs"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </van-dropdown-menu>
    </div>

    <div class="list-c">
      <ul class="title" v-if="topDes==1">
        
        <li>时间</li>
        <li>钱包名称</li>
        <li>金额</li>
        <li>状态</li>
      </ul>
      <ul class="title" v-else>
        
        <!-- <li>地址</li> -->
        <li>时间</li>
        <li>金额</li>
        <li>状态</li>
      </ul>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="10">
        <ul class="list-content" v-if="topDes==1">
          <li v-for="(item,index) of pantData" :key="index">
            <span>{{item.createdAt}}</span>
            <span>{{item.creditName}}</span>
            
            <span>{{item.money}}</span>
            <span>{{item.status == 0 ? '申请中': (item.status == 1 ? '提币成功':'申请被驳回')}}</span>
          </li>
        </ul>
        <ul class="list-content" v-else>
          <li v-for="(item,index) of pantData" :key="index">
            
            <!-- <span>{{item.address}}</span> -->
            <span>{{item.createdAt}}</span>
            <span>{{item.amount}}</span>
            <span>{{!item.status ? '成功': (item.status == 1 ? '申请中':'失败')}}</span>
          </li>
        </ul>
      </van-list>
      <!-- <div class="upDown">
        <button @click="updown(-1)">上一页</button>
        <button @click="updown(1)">下一页</button>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  props: ["zhonglei", "searchpop", "pantData", "title", "topDes"],
  data() {
    return {
      cainame: 0,
      caiactive: 0,
      cai1: [
        { text: "全部彩种", value: 0 },
        { text: "北京PK拾", value: 1 },
        { text: "幸运飞艇", value: 2 }
      ],
      cai2: [
        { text: "所有状态", value: 0 },
        { text: "已派奖", value: 1 },
        { text: "未中奖", value: 2 },
        { text: "未开奖", value: 3 }
      ],
      dropdown: "",
      option1: [
        { text: "每页10条", value: 0 },
        { text: "每页25条", value: 1 },
        { text: "每页50条", value: 2 },
        { text: "每页100条", value: 3 }
      ],
      searchs: "",
      list: [
        { money: "1.00", number: "123456", type: "现金支付", active: "已开奖" },
        { money: "2.00", number: "789456", type: "现金支付", active: "已开奖" },
        { money: "3.00", number: "123789", type: "现金支付", active: "已开奖" },
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
      loading: true,
      finished: true,
      currentPage: 1,
      page: 0,
      paginal: 10
    };
  },
  created() {
    window.console.log(this.pantData);
    window.console.log(this.Types);
    this.loading = false;
    this.finished = true;
    // this.lists = pantData
  },
  methods: {
    onLoad() {
      // if (a >= 0) {
      //   if (this.lists.length < this.paginal && num > 0) {
      //     this.$toast("没有更多了");
      //     return;
      //   }
      //   this.lists = this.list.slice(a, a + this.paginal);
      //   //  this.loading = false;
      //   // this.finished =true;
      // } else {
      //   this.lists = this.list.slice(0, this.paginal);
      //   this.loading = false;
      //   this.finished = true;
      // }
    },
    updown(num) {
      this.page = this.page + num;
      window.console.log(this.page);
      this.submit();
    },
    onSearch() {
      if (!this.searchs) {
        this.$toast("请输入关键字");
        return;
      }
      let searchList = [];
      let that = this;
      window.console.log(this.searchs);
      // window.console.log(this.searchs,searchList)
      this.list.forEach(item => {
        Object.keys(item).forEach(demo => {
          // searchList.push(item)
          // window.console.log(item[demo])
          window.console.log(that.searchs);
          if (item[demo] == that.searchs) {
            searchList.push(item);
          }

          return searchList;
        });
        // if(item[demo]){
        //   searchList.push(item)
        this.lists = searchList;
        // }
      });
    },
    closeDropdown(a) {
      window.console.log(a);
      switch (a) {
        case 0:
          this.paginal = 10;
          this.onLoad();
          break;
        case 1:
          this.paginal = 25;
          this.onLoad();
          break;
        case 2:
          this.paginal = 50;
          this.onLoad();
          break;
        case 3:
          this.paginal = 100;
          this.onLoad();
          break;
      }
    }
  }
};
</script>

<style lang='less' scope>
.recordList {
  display: flex;
  flex-direction: column;
  .zhonglei {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    // background: #eee;
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
  .title {
    margin-top: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: transparent;
    li {
      flex: 1;
      text-align: center;
      height: 2.5rem;
      color: #0197f1;
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
      border-bottom: 1px solid #eee;
      span {
        color: #666;
        display: inline-block;
        flex: 1;
        text-align: center;
        font-size: 14px;
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
      margin-bottom: 2rem;
      border-radius: 8px;
    }
  }
}
.van-dropdown-menu__item {
  background: #eeeeee;
}
</style>