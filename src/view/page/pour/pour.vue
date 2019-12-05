<template>
  <div class="downPour" @click.stop="kjRecord = false">
    <titlebar :title=" type== 0 ? '北京PK拾':'幸运飞艇'"></titlebar>
    <!-- 开奖区 -->
    <div class="header">
      <!-- logo区 -->
      <div class="logo">
        <img class="logoimg" :src="type ==0 ? logo : logo1" alt />
        <div class="kai">
          <div class="qihao">
            <div class="qihaonum">
              {{type ==0 ? '北京PK拾': '幸运飞艇'}}
              <span>{{qihao}}</span> 期
            </div>
            <div class="qihaoimg" @click.stop="kjRecord = !kjRecord">
              <img src="@/assets/louhao.png" alt />近期开奖
            </div>
          </div>
          <div class="jiang">
            <div class="jianghao" v-if="daojishi">
              <transition v-for="(item,index) of num" :key="index">
                <img :src="item.src1" alt />
              </transition>
            </div>
            <div class="jianghint" v-else>
              <transition-group>
                <span class="one" :key="1">正</span>
                <span class="one" :key="2">在</span>
                <span class="one" :key="3">开</span>
                <span class="one" :key="4">奖</span>
                <span class="one" :key="5">中</span>
              </transition-group>
            </div>
          </div>
        </div>
      </div>

      <!-- 期号 -->
      <div class="issue">
        <div>
          {{qihao}} 期 &nbsp;
          <span></span> &nbsp;
          <van-count-down @finish="finished" :time="time*1000" />
        </div>

        <p>金币: {{jinbi}} 当前流水: {{jiangliushui}}</p>
      </div>
    </div>

    <!-- 选号 -->
    <div class="xuanhao">
      <h3>冠军</h3>

      <ul>
        <li
          :class="item.flg ? 'xuanzhong':''"
          v-for="item of arry"
          :key="item.num"
          @click="xuanzhong(item)"
        >{{item.num}}</li>
      </ul>
    </div>

    <!-- 倍率 -->
    <div class="beilv">
      <p v-if="beilv">共4注，金额{{beishu*4* +price}}.00元</p>
      <p v-else>请选择四位数字</p>

      <div class="touzhu">
        <div class="stepper">
          <span>元</span>
          <div class="stepper-cont">
            <p @click="jianhao">-</p>
            <input onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" type="text" v-model="beishu" />
            <p @click="beishu++">+</p>
          </div>倍
        </div>
        <button @click="pourzhus">添加投注</button>
      </div>

      <div class="pours">
        <div v-if="pourzhu">
          <p>[4注]</p>
          <p>{{beishu* 4 * +price}}.00元</p>
          <p>{{beishu}}倍</p>
          <p>元模式</p>
          <van-icon name="close" @click="pourzhu = false"></van-icon>
        </div>
      </div>
    </div>

    <!-- 确认投注 -->
    <div class="affirm">
      <div class="affirm-content">
        <div>
          <p>总注数4注</p>
          <div @click="tzRecordes">
            <img src="@/assets/iconfont-2jilu.png" alt />投注记录
          </div>
        </div>
        <h3 v-if="pourzhu">总金额 {{beishu*4* +price}}.00 元</h3>
        <van-button class="affirm-btn" @click="submit">确认投注</van-button>
      </div>
    </div>

    <!-- 开奖记录 -->
    <van-popup class="kjRecord" v-model="kjRecord">
      <div class="kjRecord-content">
        <h3>近期开奖</h3>
        <ul>
          <li v-for="item of kjRecords" :key="item.qihao">
            <p>{{item.thirdNumberPeriods}}</p>
            <span>{{item.thirdNumber}}</span>
          </li>
        </ul>
        <div @click="kjRecord = !kjRecord">关闭</div>
      </div>
    </van-popup>
    <!-- 投注记录 -->
    <van-popup class="tzRecord" v-model="tzRecord">
      <div class="pops">
        <div>
          <ul class="pop-title">
            <li>编号</li>
            <li>期号</li>
            <li>倍数</li>
            <li>模式</li>
            <li>状态</li>
            <!-- <li>操作</li> -->
          </ul>
          <ul class="pop-content">
            <li v-for="item of tzRecords" :key="item.bianhao" @click="tzxq(item)">
              <span>{{item.id}}</span>
              <span>{{item.number_periods}}</span>
              <span>{{item.multiple}}</span>
              <span>{{item.typeName}}</span>
              <span>{{item.isWinName}}</span>
              <!-- <span>{{item.caozuo}}</span> -->
            </li>
            <li class="wu">没有更多了</li>
          </ul>
          <button class="btn" @click="tzRecord = false">关闭</button>
        </div>
      </div>

    </van-popup>
    
      <van-popup class="Tzxiangqing" v-model="touzhuxiangqing">
        <div class="tzxq-cont">
          <h3>投注信息</h3>
          <div>
            <p>购买金额:{{TZXQ.amount}}</p>
            <p>期号:{{TZXQ.numberPeriods}}</p>
          </div>
          <div>
            <p>中奖金额:{{TZXQ.winAmount}}</p>
            <p>投注时间:{{TZXQ.createdAt}}</p>
          </div>
          <div>
            <p>订单状态:{{TZXQ.isWinName}}</p>
            <p>开奖时间:{{TZXQ.lotteryTime}}</p>
          </div>
          <div>购买盈亏:{{TZXQ.profit}}</div>
          <div>开奖号码:{{TZXQ.winNumber}}</div>
          <div>投注内容:{{TZXQ.number}}</div>

          <van-button v-if="TZXQ.isWinName =='未开奖'"  @click="revocation(TZXQ)">是否撤单</van-button>
          <van-button @click="touzhuxiangqing = false">关闭</van-button>
        </div>
      </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import titlebar from "@/components/NavBar";

export default {
  components: {
    titlebar
  },
  data() {
    return {
      type: 0,
      touzhuxiangqing: false,
      TZXQ:{},
      qihao: "",
      jinbi: "0.00",
      jiangliushui: 0,
      kjRecord: false, //开奖记录
      tzRecord: false, // 投注记录
      time: 100000, //倒计时
      daojishi: true,
      logo: require("../../../assets/bj_pk10.png"),
      logo1: require("../../../assets/tw_pk10.png"),
      num: [
        // 上期中奖号码
        { nums: "01", src1: require("../../../assets/m_c_01.png") },
        { nums: "03", src1: require("../../../assets/m_c_03.png") },
        { nums: "02", src1: require("../../../assets/m_c_02.png") },
        { nums: "04", src1: require("../../../assets/m_c_04.png") },
        { nums: "05", src1: require("../../../assets/m_c_05.png") },
        { nums: "06", src1: require("../../../assets/m_c_06.png") },
        { nums: "07", src1: require("../../../assets/m_c_07.png") },
        { nums: "08", src1: require("../../../assets/m_c_08.png") },
        { nums: "09", src1: require("../../../assets/m_c_09.png") },
        { nums: "10", src1: require("../../../assets/m_c_10.png") }
      ],
      arry: [
        // 选择奖号
        { num: "01", flg: false },
        { num: "02", flg: false },
        { num: "03", flg: false },
        { num: "04", flg: false },
        { num: "05", flg: false },
        { num: "06", flg: false },
        { num: "07", flg: false },
        { num: "08", flg: false },
        { num: "09", flg: false },
        { num: "10", flg: false }
      ],
      kjRecords: [],
      tzRecords: [],
      number: [], //选择的奖号
      sums: -1,
      temp: "",
      pitch: ["06", "04", "03", "02", "01", "05", "07", "08", "09", "10"],
      beilv: false,
      pourzhu: false, //添加投注 显示
      beishu: 1, //当前选择倍数
      lastId: 0,
      page: 1,
      playtype: "", // 玩法类型
      price: "" //单价
    };
  },
  created() {
    this.type = this.$route.query.type;
    if (this.type == 0) {
      this.playtype = "1";
    } else if (this.type == 1) {
      this.playtype = "2";
    }
    // console.log(this.num);
    this.zhushubefore();
    this.singular();
    this.dangqian();
    this.jinqikaijiang();
    this.liushui();
  },

  methods: {
    finished() {
      // console.log("时间结束");
      // this.zhushubefore();
      this.singular();
      this.dangqian();
      this.jinqikaijiang();
      // debugger
    },
    //钱包流水
    liushui() {
      this.$axios
        .fetchPost("portal", {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "1000"
        })
        .then(res => {
          this.jinbi = res.data.creditList.credit_2.value;
          this.jiangliushui = res.data.prize;
          window.console.log("钱包信息", res);
        });
    },
    zhushubefore() {},
    //单注价格
    singular() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1000",
          data: {
            type: this.playtype
          }
        })
        .then(res => {
          this.price = res.data.price;
          // window.console.log(typeof this.price);
        });
    },
    dangqian() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "10001",
          data: {
            type: this.playtype
          }
        })
        .then(res => {
          window.console.log(res);
          // this.price = res.data.price;
          this.qihao = res.data.qishu;
          this.time = res.data.fengpan;
        });
    },
    jinqikaijiang() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1004",
          data: {
            lastId: this.lastId,
            page: this.page,
            type: this.playtype
          }
        })
        .then(res => {
          this.kjRecords = res.data.list;
          this.pitch = res.data.list.slice(0, 1);
          window.console.log("近期开奖", this.pitch);
        });
      let that = this,
        // sum = 0,
        temp;

      // console.log(this.type);
      // console.log(this.num);

      // 根据数组，进行排序
      this.pitch.forEach(item => {
        that.sums++;
        that.num.findIndex((value, index) => {
          if (value.nums == item) {
            temp = that.num[index];
            that.num[index] = that.num[that.sums];
            that.num[that.sums] = temp;
          }
        });
      });
    },
    tzRecordes() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1003",
          data: {
            timeRange: "",
            lastId: this.lastId,
            page: this.page,
            type: this.playtype
          }
        })
        .then(res => {
          this.tzRecords = res.data.list;

          window.console.log("投注记录", res);
        });
      this.tzRecord = true;
    },
    submit() {
      if (this.number.length < 4) {
        this.$toast("请选择冠军号码");
        return;
      }
      if (!this.pourzhu) {
        this.$toast("请添加投注");
        return;
      }
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Lottery",
          interface: "1002",
          data: {
            number: this.number.join(","), //下注号码
            price: this.price, //价格
            quantity: "4",
            multiple: this.beishu.toString(),
            type: this.playtype
          }
        })
        .then(res => {
          this.$toast(res.message);
          if (res.code == 0) {
            setTimeout(() => {
              window.location.reload();
            }, 500)((this.this.number = [])),
              (this.beishu = "");
          }
          window.console.log(res);
        });
    },
    revocation(item) {
      let that = this;
      if (item.isWinName == "未开奖") {
        Dialog.confirm({
          confirmButtonColor: "#ffdd00",
          cancelButtonColor: "#cdaa6f",
          // title: "标题",
          message: "是否撤销"
        })
          .then(() => {
            that.$axios
              .fetchPost("/portal", {
                source: "web",
                version: "v1",
                module: "Lottery",
                interface: "1006",
                data: {
                  id: item.id.toString()
                }
              })
              .then(res => {
                that.$toast(res.message);
                if (res.code == 0) {
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }
                window.console.log(res);
              });
          })
          .catch(() => {});
      }
    },
    tzxq(item) {
      this.touzhuxiangqing = true
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
              this.TZXQ = res.data
                window.console.log(res);
              });
    },


jianhao() {
  if (this.beishu<=1) {
      return
  } else {
    this.beishu --
  }
},

    // 选择号码
    xuanzhong(item) {
      let sum = 0;
      // 循环当前选中个数
      this.arry.forEach(e => {
        if (e.flg && sum <= 3) {
          sum += 1;
          this.beilv = false;
        }
        if (sum > 3 && !item.flg) {
          this.$toast("最多可选四个数");
          // sum = 3
          this.beilv = true;
          // return;
        }
      });
      // 如果是未选项和总数不到4个 可以选中  且将其添加到选中数组
      if (!item.flg && sum <= 3) {
        if (sum > 2) {
          //当总数为4个的时间显示下方的标注
          this.beilv = true;
        }
        item.flg = !item.flg;
        let a = this.number.findIndex(value => {
          return value.num == item.num;
        });
        if (a != -1) {
          this.number.splice(a, 1);
          return;
        } else {
          this.number.push(item.num);
          return;
        }
      }

      // 如果 是已经选中 则将其变为未选中  且从选中数组中删除
      if (item.flg) {
        item.flg = !item.flg;
        sum--;
        if (sum <= 3) {
          this.beilv = false;
        }
        let a = this.number.findIndex(value => {
          return value.num == item.num;
        });
        if (a != -1) {
          this.number.splice(a, 1);

          return;
        }
      }
    },
    // 下注提示
    pourzhus() {
      if (this.beilv) {
        this.pourzhu = true;
      } else if (!this.beilv) {
        Dialog.alert({
          confirmButtonColor: "#ffdd00",
          cancelButtonColor: "#cdaa6f",
          // title: "标题",
          message: "请选择4位数字"
        }).then(() => {});
      }
    }
  }
};
</script>

<style lang='less' scope>
.downPour {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ffce6f;
    .logoimg {
      width: 6.8rem;
      height: 4.8rem;
    }
    .logo {
      display: flex;

      .kai {
        width: 100%;
      }
      .qihao {
        width: 100%;
        display: flex;
        justify-content: space-around;
        color: #ffc000;
        font-size: 0.8rem;
        span {
          color: #ecc788;
        }
        .qihaoimg {
          font-size: 0.5rem;
          color: #e8673e;
        }
      }
      .jiang {
        .jianghao {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          overflow: hidden;
          img {
            // flex: 1;
            width: 2.7rem;
            height: 1.7rem;
            margin-right: 8px;
            margin-top: 5px;
          }
        }
        .jianghint {
          color: #ecc788;
          display: flex;
          width: 100%;
          overflow: hidden;
          .one {
            display: inline-block;
            height: 50px;
            width: 50px;
            border: 1px solid #ecc788;
            text-align: center;
            line-height: 50px;
            border-radius: 50%;
          }
        }
      }
    }
    .issue {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #f00;
      margin-top: 30px;
      div {
        display: flex;
        align-items: center;
        font-size: 18px;
      }
      span {
        width: 24px;
        height: 24px;
        background: url(../../../assets/iconfont-wodedingdan10.png);
        background-size: 100%;
      }
      p {
        margin-top: 20px;
        color: #ad8460;
        margin-bottom: 10px;
      }
    }
  }

  .xuanhao {
    margin-bottom: 10px;
    h3 {
      color: #ffc000;
      margin: 10px 15px 0;
    }
    ul {
      width: 60%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0 auto;
      li {
        // flex: 1;
        background: #fff;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        text-align: center;
        line-height: 2.5rem;
        font-size: 1rem;
        font-weight: bold;
        color: #7b7b7b;
        margin: 10px 0px;
      }
      .xuanzhong {
        background: url("../../../assets/m_yuan2.png");
        background-size: 100%;
        color: #fff;
      }
    }
  }

  .beilv {
    border-top: 1px solid #ad8460;

    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin-bottom: 20px;
      color: #ffc000;
    }
    .touzhu {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      color: #fff;
      .stepper {
        display: flex;
        align-items: center;
        .stepper-cont {
          display: flex;
          align-items: center;
          p {
            background: #fff;
            padding-left: 5px;
            padding-right: 5px;
            margin: 0;
          }
        }
      }
      span {
        display: inline-block;
        color: #fff;
        height: 25px;
        width: 25px;
        text-align: center;
        border-radius: 6px;
        background: #ecc788;
        margin-right: 5px;
      }
      input {
        width: 80px;
        height: 25px;
        border: none;
        border-radius: 8px;
        color: #000;
        font-weight: bold;
        text-align: center;
      }
      button {
        background: #cdaa6f;
        color: #fff;
        border: none;
        width: 100px;
        height: 30px;
        border-radius: 8px;
      }
    }
    .pours {
      box-sizing: border-box;
      width: 100%;
      margin-top: 10px;
      padding: 0 15px;
      background: #949494;
      height: 40px;
      div {
        line-height: 40px;
        background: #a4a4a4;
        align-items: center;
        width: 100%;
        display: flex;
        justify-content: space-around;
        p {
          margin: 0;
          padding: 0;
          color: #fff;
        }
      }
    }
  }
}

.affirm {
  display: flex;
  flex-direction: column;
  padding: 15px;
  .affirm-content {
    background: #161618;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      p {
        color: #dcbf88;
        font-size: 16px;
        font-weight: bold;
      }
      div {
        color: #dcbf88;
        img {
          width: 16px;
          height: 20px;
        }
      }
    }
    h3 {
      text-align: center;
      color: #dcbf88;
      margin-bottom: 5px;
    }
    .affirm-btn {
      background: #cdaa6f;
      color: #fff;
      border: none;
    }
  }
}
.kjRecord {
  height: 50%;

  width: 100%;

  .kjRecord-content {
    width: 100%;
    // position: fixed;
    // top: 15%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
  }
  h3 {
    color: #7b7b7b;
    font-size: 15px;
  }
  ul {
    margin: 10px 0;
    width: 100%;
  }
  li {
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    color: #828282;
    border: 1px solid #828282;
    margin-top: 2px;
  }
  div {
    color: #f00;
  }
}
.tzRecord {
  width: 100%;
  height: 400px;
  background: transparent;
  padding: 15px;
  box-sizing: border-box;
  .pops {
    background: #cdaa6f;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30px;
      align-self: flex-end;
      border: none;
    }
    .pop-title {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      background: #48382b;
      height: 30px;
      align-items: center;
      color: #fff;
      font-size: 15px;
    }
    .pop-content {
      li {
        display: flex;
        font-size: 12px;
        color: #fff;
        justify-content: space-around;
        text-align: center;
        border-bottom: 1px solid #48382b;

        span {
          display: inline-block;
          flex: 1;
          border-right: 1px solid #48382b;
          box-sizing: border-box;
          padding-bottom: 3px;
        }
      }
      .wu {
        background: #48382b;
        margin-top: 20px;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
      }
    }
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
      font-size: 22px;
      margin-bottom: 1rem;
    }
    div{
      display: flex;
      justify-content: space-around;
      margin-bottom: 1rem;
      font-size: 18px;
      p{
        flex: 4;
        text-align: start;
        
      }
      p:last-child{
       flex: 6; 
      }
    }
  }
}
// 倒计时颜色
.van-count-down {
  color: #f00;
}
</style>