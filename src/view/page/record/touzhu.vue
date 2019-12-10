<template>
  <div class="touzhurecord">
    <titlebar title="投注记录"></titlebar>
    <!-- <times ref="headerChild" title="投注记录"></times> -->
    <!-- <button @click="submit(type,status)" class="topupbtn">查询</button> -->
    <!-- <recordList @showSubmit='submit' :zhonglei="true" :pantData="pantData" ></recordList> -->
    <div class="zhonglei">
      <div class="zlName">
        <!-- <p>彩种名称</p> -->
        <van-dropdown-menu active-color="#d3b787">
          <van-dropdown-item @change="xialaone" v-model="cainame" :options="cai1" />
        </van-dropdown-menu>
      </div>
      <!-- <div class="zlActive">
        <p>彩种状态</p>
        <van-dropdown-menu active-color="#d3b787">
          <van-dropdown-item @change="xialatwo" v-model="caiactive" :options="cai2" />
        </van-dropdown-menu>
      </div>-->
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="10" @load="onLoad">
      <div class="kjRecord-content">
        <!-- <h3>近期开奖</h3> -->
        <ul>
          <li v-for="item of kjRecords" :key="item.qihao" @click="recrd(item)">
            <div class="kjRecord-content-item">
              <p>{{item.type == 1 ? '北京赛车' : '幸运游艇'}}</p>
              <span>第{{item.number_periods}}期</span>
              <div class="kjRecord-content-one">
                <p>{{item.number}}</p>
              </div>
            </div>
            <h3 :class="[item.is_win == 1? 'red': '']">{{item.isWinName}}</h3>
          </li>
        </ul>
      </div>
    </van-list>
    <van-popup class="Tzxiangqing" v-model="touzhuxiangqing">
      <div class="tzxq-cont">
        <h3>投注信息</h3>
        <div>
          <p>
            购买金额:
            <span>{{TZXQ.amount}}</span>
          </p>
          <p>
            期号:
            <span>{{TZXQ.numberPeriods}}</span>
          </p>
        </div>
        <div>
          <p>
            中奖金额:
            <span>{{TZXQ.winAmount}}</span>
          </p>
          <p>
            投注时间:
            <span>{{TZXQ.createdAt}}</span>
          </p>
        </div>
        <div>
          <p>
            订单状态:
            <br />
            <span>{{TZXQ.isWinName}}</span>
          </p>
          <p>
            开奖时间:
            <span>{{TZXQ.lotteryTime}}</span>
          </p>
        </div>
        <div class="tzxq-cont-down">
          购买盈亏:
          <span>{{TZXQ.profit}}</span>
        </div>
        <div class="tzxq-cont-down">
          开奖号码:
          <span>{{TZXQ.winNumber}}</span>
        </div>
        <div class="tzxq-cont-down">
          投注内容:
          <span style="margin-right:40px;">{{TZXQ.number}}</span>
        </div>

        <!-- <van-button v-if="TZXQ.isWinName =='未开奖'" @click="revocation(TZXQ)">撤单</van-button> -->
        <van-button @click="touzhuxiangqing = false">关闭</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import titlebar from "@/components/NavBar";
// import times from "@/components/recordTime";
// import recordList from "@/components/recordListTou";

export default {
  components: {
    // times,
    titlebar
    // recordList
  },
  data() {
    return {
      lastId: 0,
      page: 1,
      type: "",
      pantData: "",
      status: "",
      loading: false,
      finished: false,
      kjRecords: [],
      playtype: 1,
      cai1: [
        { text: "全部彩种", value: 0 },
        { text: "北京PK拾", value: 1 },
        { text: "幸运飞艇", value: 2 }
      ],
      cainame: 0,
      touzhuxiangqing: false,
      TZXQ: []
    };
  },
  mounted() {
   
  },
  methods: {
    onLoad() {
      window.console.log('1111')
       this.submit();
    },
    xialaone() {
      // this.submit();
          window.console.log(this.cainame);
      let timeArry = "",_this = this;
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          interface: "1003",
          module: "Lottery",
          data: {
            timeRange: timeArry,
            lastId: this.lastId,
            page: this.page,
            type: this.cainame,
            status: status
          }
        })
        .then(res => {
          //  this.tzRecords = res.data.list;
          if (res.code == 0) {
            _this.lastId = res.data.lastId;
            _this.kjRecords =res.data.list
            _this.loading = false,
            
            res.data.list.forEach(element => {
              _this.kjRecords.push(element)
            });
          } else {
            _this.$toast(res.message);
            _this.finished = true;
          }
          window.console.log(res)
          _this.kjRecords.concat(res.data.list)
          window.console.log("投注记录",_this.kjRecords);
        });
    
    },
    recrd(item) {
      this.touzhuxiangqing = true;
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1007",
          data: {
            id: item.id.toString()
          }
        })
        .then(res => {
          this.TZXQ = res.data;
          window.console.log(res);
        });
    },
    submit() {
      window.console.log(this.cainame);
      let timeArry = "",_this = this;
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          interface: "1003",
          module: "Lottery",
          data: {
            timeRange: timeArry,
            lastId: this.lastId,
            page: this.page,
            type: this.cainame,
            status: status
          }
        })
        .then(res => {
          //  this.tzRecords = res.data.list;
          if (res.code == 0) {
            _this.lastId = res.data.lastId;
            _this.kjRecords.concat(res.data.list)
            _this.loading = false,
            
            res.data.list.forEach(element => {
              _this.kjRecords.push(element)
            });
          } else {
            _this.$toast(res.message);
            _this.finished = true;
          }
          window.console.log(res)
          _this.kjRecords.concat(res.data.list)
          window.console.log("投注记录",_this.kjRecords);
        });
    }
  }
};
</script>

<style lang='less' scope>
.touzhurecord {
  display: flex;
  flex-direction: column;
  align-content: center;
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
    .zhonglei {
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
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
  }
  .van-dropdown-menu__item{
    border-bottom: 1px dashed #333;
  }
}
.Tzxiangqing {
  display: flex;
  flex-direction: column;
  .tzxq-cont {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-sizing: border-box;
    h3 {
      font-size: 18px;
      margin-bottom: 1rem;
      color: #999;
    }
    div {
      display: flex;
      justify-content: space-around;

      font-size: 16px;
      border: 1px solid #999;
      // line-height: 18px;
      p {
        flex: 4;
        text-align: start;
        font-size: 15px;
        padding: 1rem;
        border-right: 1px solid #666;
        span {
          color: #666;
        }
      }
      p:last-child {
        flex: 6;
      }
    }
    .tzxq-cont-down {
      padding: 0.5rem;
      span {
        color: #666;
      }
    }
  }
  button {
    width: 80%;
    height: 3rem;
    background: #0197f1;
    border-radius: 20px;
    margin: 1rem auto;
    color: #fff;
  }
}
.topupbtn {
  margin: 1rem;
  height: 2rem;
  border: none;
  border-radius: 8px;
}
.red {
  color: #f00 !important;
}
</style>